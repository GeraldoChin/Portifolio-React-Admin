import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import nodemailer from "nodemailer";

// Loads a local .env without exposing SMTP credentials to the browser bundle.
try {
  const envFile = await readFile(new URL("./.env", import.meta.url), "utf8");
  for (const line of envFile.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
    if (match && process.env[match[1]] === undefined) {
      process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/, "$2");
    }
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const port = Number(process.env.PORT || 5000);
const maxBodyBytes = 10_000;
const recentSubmissions = new Map();

function respond(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > maxBodyBytes) {
        reject(Object.assign(new Error("Corpo demasiado grande"), { status: 413 }));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(Object.assign(new Error("JSON inválido"), { status: 400 }));
      }
    });
    request.on("error", reject);
  });
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin;
  const allowedOrigin = process.env.WEB_ORIGIN;
  if (origin && allowedOrigin && origin !== allowedOrigin) {
    return respond(response, 403, { error: "Origem não autorizada." });
  }

  if (request.method === "OPTIONS") {
    if (origin) response.setHeader("Access-Control-Allow-Origin", allowedOrigin || origin);
    response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.writeHead(204).end();
    return;
  }

  if (request.method !== "POST" || request.url !== "/api/contact") {
    return respond(response, 404, { error: "Rota não encontrada." });
  }
  if (origin) response.setHeader("Access-Control-Allow-Origin", allowedOrigin || origin);

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactTo = process.env.CONTACT_TO;
  if (!smtpHost || !smtpUser || !smtpPass || !contactTo) {
    return respond(response, 503, { error: "O serviço de email ainda não está configurado." });
  }

  try {
    const clientKey = request.headers["x-forwarded-for"] || request.socket.remoteAddress || "unknown";
    const lastSubmission = recentSubmissions.get(clientKey) || 0;
    if (Date.now() - lastSubmission < 30_000) {
      return respond(response, 429, { error: "Aguarde um pouco antes de enviar outra mensagem." });
    }

    const { name, email, subject, message, website } = await readJson(request);
    if (website) return respond(response, 200, { ok: true }); // Honeypot for bots.
    const clean = (value, limit) => typeof value === "string" ? value.trim().slice(0, limit) : "";
    const senderName = clean(name, 100);
    const senderEmail = clean(email, 254);
    const mailSubject = clean(subject, 160);
    const mailMessage = clean(message, 5000);
    if (!senderName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail) || !mailSubject || !mailMessage) {
      return respond(response, 400, { error: "Preencha todos os campos com dados válidos." });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: smtpUser, pass: smtpPass },
    });
    await transporter.sendMail({
      from: process.env.MAIL_FROM || smtpUser,
      to: contactTo,
      replyTo: { name: senderName, address: senderEmail },
      subject: `[Contacto do site] ${mailSubject}`,
      text: `Nome: ${senderName}\nEmail: ${senderEmail}\n\n${mailMessage}`,
    });
    recentSubmissions.set(clientKey, Date.now());
    return respond(response, 200, { ok: true, message: "Mensagem enviada com sucesso." });
  } catch (error) {
    console.error("Falha ao enviar email de contacto:", error.message);
    return respond(response, error.status || 500, {
      error: error.status === 400 || error.status === 413 ? error.message : "Não foi possível enviar a mensagem. Tente novamente mais tarde.",
    });
  }
});

server.listen(port, () => console.log(`API de contacto disponível na porta ${port}.`));
