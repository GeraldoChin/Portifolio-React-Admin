import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaUser,
  FaLaptopCode,
  FaRocket,
  FaDownload
} from "react-icons/fa";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 px-6 py-20 mt-12">

        {/* HERO */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Olá, eu sou{" "}
              <span className="text-purple-500 drop-shadow-[0_0_15px_#a855f7]">
                Desenvolvedor Fullstack
              </span>
            </h1>

            <p className="text-gray-300 leading-relaxed mb-6">
              Desenvolvo aplicações modernas, rápidas e escaláveis utilizando
              tecnologias atuais do mercado.
            </p>

            {/* LINKS + BOTÃO */}
            <div className="flex flex-wrap items-center gap-6 text-2xl">

              {/* Ícones */}
              <div className="flex gap-6 text-2xl">
                <FaGithub className="hover:text-purple-500 cursor-pointer transition" />
                <FaLinkedin className="hover:text-purple-500 cursor-pointer transition" />
                <FaEnvelope className="hover:text-purple-500 cursor-pointer transition" />
              </div>

              {/* Botão Baixar CV */}
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 bg-purple-600 px-6 py-3 rounded-xl shadow-lg hover:bg-purple-700 hover:scale-105 transition text-white"
              >
                <FaDownload />
                Baixar CV
              </a>
            </div>
          </motion.div>

          {/* FOTO */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-30 rounded-full"></div>

              <img
                src="/img/img.jpg"
                className="relative w-72 h-72 object-cover rounded-full border-4 border-purple-500 shadow-[0_0_40px_#a855f7]"
              />
            </div>
          </motion.div>

        </section>

        {/* SKILLS */}
        <section className="max-w-6xl mx-auto mt-24 grid md:grid-cols-3 gap-8">

          {[
            {
              icon: <FaUser />,
              title: "Perfil",
              text: "Desenvolvedor focado em soluções modernas."
            },
            {
              icon: <FaLaptopCode />,
              title: "Tecnologias",
              text: "React, Node.js, MySQL, Tailwind."
            },
            {
              icon: <FaRocket />,
              title: "Objetivo",
              text: "Criar soluções inovadoras."
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/60 border border-purple-500/20 rounded-2xl p-8 shadow-lg"
            >
              <div className="text-purple-500 text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-gray-400">{card.text}</p>
            </motion.div>
          ))}

        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
