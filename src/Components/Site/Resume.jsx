import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaGraduationCap,
  FaDownload,
  FaCode,
  FaServer,
  FaPalette,
  FaTools,
  FaExternalLinkAlt,
} from "react-icons/fa";

import Navbar from "./Navbar";
import Footer from "./Footer";

/* ── variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } };

/* ── data ── */
const experience = [
  {
    role:    "Fullstack Developer",
    company: "Freelance",
    period:  "2023 — Atual",
    type:    "Remoto",
    desc:    "Desenvolvimento de aplicações web completas para clientes de diferentes sectores. Gestão de projetos do levantamento de requisitos ao deploy em produção.",
    tags:    ["React", "Node.js", "MySQL", "TailwindCSS"],
  },
  {
    role:    "Frontend Developer",
    company: "Startup XYZ",
    period:  "2022 — 2023",
    type:    "Híbrido",
    desc:    "Responsável pela construção do design system e implementação de interfaces responsivas. Colaboração directa com a equipa de produto e UX.",
    tags:    ["React", "TypeScript", "Figma", "CSS Modules"],
  },
  {
    role:    "Junior Web Developer",
    company: "Agência ABC",
    period:  "2021 — 2022",
    type:    "Presencial",
    desc:    "Desenvolvimento de landing pages e e-commerces para pequenas e médias empresas. Manutenção de sistemas legados em PHP e WordPress.",
    tags:    ["HTML/CSS", "JavaScript", "PHP", "WordPress"],
  },
];

const education = [
  {
    degree: "Licenciatura em Engenharia Informática",
    school: "Universidade ABC",
    period: "2019 — 2022",
    desc:   "Especialização em Engenharia de Software. Trabalho final sobre arquitecturas de microsserviços com Node.js.",
  },
  {
    degree: "Curso de UX/UI Design",
    school: "Plataforma Online XYZ",
    period: "2022",
    desc:   "Fundamentos de design centrado no utilizador, prototipagem em Figma e testes de usabilidade.",
  },
];

const skillGroups = [
  {
    icon:   <FaCode />,
    label:  "Frontend",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "HTML/CSS"],
  },
  {
    icon:   <FaServer />,
    label:  "Backend",
    skills: ["Node.js", "Express", "REST APIs", "GraphQL", "MySQL", "PostgreSQL"],
  },
  {
    icon:   <FaPalette />,
    label:  "Design & UI",
    skills: ["Figma", "Design Systems", "Responsive Design", "Acessibilidade"],
  },
  {
    icon:   <FaTools />,
    label:  "DevOps & Tools",
    skills: ["Docker", "Git & GitHub", "CI/CD", "Linux", "Vercel", "AWS"],
  },
];

const certifications = [
  { name: "Meta Front-End Developer",         issuer: "Meta / Coursera",    year: "2023" },
  { name: "Node.js Application Developer",    issuer: "OpenJS Foundation",  year: "2022" },
  { name: "Google UX Design Certificate",     issuer: "Google / Coursera",  year: "2022" },
];

/* ── helpers ── */
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-6 h-px bg-purple-500" />
      <span className="text-purple-400 text-[10px] tracking-[0.22em] uppercase font-semibold">
        {children}
      </span>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold mb-8 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-x-hidden">

      {/* BLOBS */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-[-60px] left-[-80px]  w-[400px] h-[400px] bg-purple-800/10 rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="fixed top-[50%] right-[15%]        w-[280px] h-[280px] bg-purple-500/5  rounded-full blur-[90px]  pointer-events-none z-0" />

      <Navbar />

      <main className="flex-1 relative z-10 px-6 py-20 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-24">

          {/* ══════════════════════════
              HEADER
          ══════════════════════════ */}
          <motion.section
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-10 border-b border-purple-900/40"
          >
            <div>
              <motion.div variants={fadeUp}>
                <SectionLabel>Currículo</SectionLabel>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold leading-tight mt-2"
              >
                Geraldo Chin
                <span className="block text-xl sm:text-2xl font-normal mt-2 bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                  Fullstack Developer
                </span>
              </motion.h1>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-5 text-sm text-gray-500">
                {["📍 Disponível remotamente", "✉️ hello@geraldochin.dev", "🌐 geraldochin.dev"].map(i => (
                  <span key={i}>{i}</span>
                ))}
              </motion.div>
            </div>

            <motion.a
              variants={fadeUp}
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:shadow-[0_0_24px_rgba(168,85,247,0.4)] self-start sm:self-auto"
            >
              <FaDownload size={12} />
              Baixar PDF
            </motion.a>
          </motion.section>

          {/* ══════════════════════════
              EXPERIENCE + EDUCATION
              (2-col on large screens)
          ══════════════════════════ */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">

            {/* EXPERIENCE */}
            <motion.section
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp}><SectionLabel>Percurso profissional</SectionLabel></motion.div>
              <motion.div variants={fadeUp}><SectionTitle>Experiência</SectionTitle></motion.div>

              <div className="relative flex flex-col gap-0">
                {/* vertical line */}
                <div className="absolute left-[17px] top-3 bottom-3 w-px bg-purple-900/50" />

                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="group relative pl-12 pb-10 last:pb-0"
                  >
                    {/* dot */}
                    <div className="absolute left-0 top-0 w-9 h-9 rounded-full border border-purple-900 bg-gray-950 flex items-center justify-center text-purple-400 text-sm group-hover:border-purple-500 transition-colors">
                      <FaBriefcase />
                    </div>

                    <div className="bg-gray-900/50 border border-purple-900/30 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group-hover:bg-gray-900/80">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-white font-semibold text-base">{exp.role}</h3>
                          <p className="text-purple-400 text-sm font-medium">{exp.company}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] text-purple-500 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                            {exp.period}
                          </span>
                          <span className="text-[10px] text-gray-600 uppercase tracking-wider">{exp.type}</span>
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.desc}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map(t => (
                          <span key={t} className="text-[11px] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* RIGHT COL: Education + Certs */}
            <div className="flex flex-col gap-14">

              {/* EDUCATION */}
              <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeUp}><SectionLabel>Formação</SectionLabel></motion.div>
                <motion.div variants={fadeUp}><SectionTitle>Educação</SectionTitle></motion.div>

                <div className="relative flex flex-col gap-0">
                  <div className="absolute left-[17px] top-3 bottom-3 w-px bg-purple-900/50" />

                  {education.map((edu, i) => (
                    <motion.div key={i} variants={fadeUp} className="group relative pl-12 pb-8 last:pb-0">
                      <div className="absolute left-0 top-0 w-9 h-9 rounded-full border border-purple-900 bg-gray-950 flex items-center justify-center text-purple-400 text-sm group-hover:border-purple-500 transition-colors">
                        <FaGraduationCap />
                      </div>

                      <div className="bg-gray-900/50 border border-purple-900/30 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-white font-semibold text-sm leading-snug">{edu.degree}</h3>
                          <span className="text-[10px] text-purple-500 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 flex-shrink-0">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-purple-400 text-xs font-medium mb-2">{edu.school}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{edu.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* CERTIFICATIONS */}
              <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeUp}><SectionLabel>Certificações</SectionLabel></motion.div>
                <motion.div variants={fadeUp}><SectionTitle>Certificados</SectionTitle></motion.div>

                <div className="flex flex-col gap-3">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      whileHover={{ x: 4 }}
                      className="group flex items-center justify-between gap-4 bg-gray-900/50 border border-purple-900/30 rounded-xl px-5 py-4 hover:border-purple-500/40 transition-all cursor-default"
                    >
                      <div>
                        <p className="text-white text-sm font-medium">{cert.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{cert.issuer}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                          {cert.year}
                        </span>
                        <FaExternalLinkAlt className="text-purple-900 group-hover:text-purple-500 transition-colors text-xs" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

            </div>
          </div>

          {/* ══════════════════════════
              SKILLS GRID
          ══════════════════════════ */}
          <motion.section
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}><SectionLabel>Competências</SectionLabel></motion.div>
            <motion.div variants={fadeUp}><SectionTitle>Stack técnica</SectionTitle></motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {skillGroups.map((group, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="group bg-gray-900/50 border border-purple-900/30 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-sm group-hover:bg-purple-500/20 transition-colors">
                      {group.icon}
                    </div>
                    <span className="text-white font-semibold text-sm">{group.label}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {group.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-2 text-gray-400 text-sm">
                        <div className="w-1 h-1 rounded-full bg-purple-500/60 flex-shrink-0" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ══════════════════════════
              CTA STRIP
          ══════════════════════════ */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl border border-purple-500/20 bg-gray-900/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-purple-800/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 p-10">
              <div>
                <p className="text-white font-semibold text-lg mb-1">Tens um projeto em mente?</p>
                <p className="text-gray-500 text-sm">Estou disponível para novos desafios — vamos criar algo juntos.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <a
                  href="/cv.pdf"
                  download
                  className="flex items-center gap-2 border border-purple-900 hover:border-purple-500 text-gray-300 hover:text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                >
                  <FaDownload size={11} />
                  CV em PDF
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-[0_0_24px_rgba(168,85,247,0.35)]"
                >
                  Contactar
                </a>
              </div>
            </div>
          </motion.section>

        </div>
      </main>

      <Footer />
    </div>
  );
}