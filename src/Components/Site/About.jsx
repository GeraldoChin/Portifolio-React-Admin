import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaUser,
  FaLaptopCode,
  FaRocket,
  FaDownload,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCode,
} from "react-icons/fa";

import Navbar from "./Navbar";
import Footer from "./Footer";

/* ── Framer variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13 } },
};

/* ── Data ── */
const skills = [
  { label: "React & Next.js",     level: 92 },
  { label: "Node.js & Express",   level: 88 },
  { label: "MySQL / PostgreSQL",  level: 80 },
  { label: "Tailwind CSS",        level: 95 },
  { label: "Docker & DevOps",     level: 70 },
];

const cards = [
  {
    icon: <FaUser />,
    title: "Perfil",
    text:  "Desenvolvedor apaixonado por construir interfaces elegantes e back-ends robustos, com foco em qualidade de código e experiência do utilizador.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Tecnologias",
    text:  "React, Next.js, Node.js, MySQL, TailwindCSS — ferramentas modernas para escalar desde MVPs até produtos completos.",
  },
  {
    icon: <FaRocket />,
    title: "Objetivo",
    text:  "Criar produtos digitais que resolvam problemas reais, com atenção ao detalhe e uma visão clara de impacto.",
  },
];

const timeline = [
  { icon: <FaBriefcase />,    year: "2023 — Atual",  title: "Fullstack Developer",    place: "Freelance" },
  { icon: <FaBriefcase />,    year: "2022 — 2023",   title: "Frontend Developer",     place: "Startup XYZ" },
  { icon: <FaGraduationCap />,year: "2019 — 2022",   title: "Engenharia Informática", place: "Universidade ABC" },
];

const techBadges = ["React","Next.js","Node.js","TypeScript","TailwindCSS","MySQL","PostgreSQL","Docker","Git","REST APIs","Figma","Linux"];

export default function AboutPage() {
  /* mouse-tilt para a foto */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-80, 80], [12, -12]);
  const rotateY = useTransform(mx, [-80, 80], [-12, 12]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-x-hidden">

      {/* ── AMBIENT BLOBS ── */}
      <div className="fixed top-[-120px] right-[-120px] w-[520px] h-[520px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-80px] left-[-80px]  w-[420px] h-[420px] bg-purple-800/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[45%] left-[30%]         w-[300px] h-[300px] bg-purple-500/5  rounded-full blur-[100px] pointer-events-none z-0" />

      <Navbar />

      <main className="flex-1 relative z-10 px-6 py-20 mt-12">

        {/* ══════════════════════════════════════
            HERO — grid-2-cols, mesma estrutura
        ══════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="w-7 h-px bg-purple-500" />
              <span className="text-purple-400 text-xs tracking-[0.2em] uppercase font-medium">
                Fullstack Developer — Portfolio
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
            >
              Olá, eu sou{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(168,85,247,0.5)]">
                Desenvolvedor<br />Fullstack
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-4 max-w-md">
              Desenvolvo aplicações modernas, rápidas e escaláveis —
              do design ao deploy, com atenção obsessiva ao detalhe.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <FaMapMarkerAlt className="text-purple-500" />
              <span>Disponível remotamente · Aberto a novos projetos</span>
            </motion.div>

            {/* actions */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(168,85,247,0.4)] active:scale-95"
              >
                <FaDownload size={12} />
                Baixar CV
              </a>

              <div className="flex gap-3">
                {[
                  { Icon: FaGithub,   href: "#", label: "GitHub"   },
                  { Icon: FaLinkedin, href: "#", label: "LinkedIn"  },
                  { Icon: FaEnvelope, href: "#", label: "Email"     },
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ scale: 1.15, color: "#a78bfa" }}
                    transition={{ type: "spring", stiffness: 350 }}
                    className="p-3 rounded-full border border-purple-900 text-gray-400 text-xl hover:border-purple-500 hover:text-purple-400 transition-colors"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* PHOTO — mouse tilt */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex justify-center"
          >
            <div
              className="relative"
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect();
                mx.set(e.clientX - r.left - r.width  / 2);
                my.set(e.clientY - r.top  - r.height / 2);
              }}
              onMouseLeave={() => { mx.set(0); my.set(0); }}
            >
              {/* outer glow ring */}
              <div className="absolute -inset-4 bg-purple-500/15 rounded-full blur-2xl animate-pulse" />
              {/* ring decoration */}
              <div className="absolute -inset-1 rounded-full border border-purple-500/30" />

              <motion.img
                src="/img/img.jpg"
                alt="Developer"
                style={{ rotateX, rotateY }}
                className="relative w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-full border-2 border-purple-500/60 shadow-[0_0_48px_rgba(168,85,247,0.35)] transition-transform duration-300"
              />

              {/* badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-2 -right-2 flex items-center gap-2 bg-gray-900 border border-purple-800 rounded-full px-3 py-1.5 text-xs font-medium text-purple-300 shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Disponível
              </motion.div>
            </div>
          </motion.div>

        </section>

        {/* ══════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════ */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-purple-900/20 rounded-2xl overflow-hidden border border-purple-900/40"
        >
          {[
            { n: "3+",   label: "Anos de experiência" },
            { n: "20+",  label: "Projetos entregues"  },
            { n: "10+",  label: "Clientes satisfeitos"},
            { n: "100%", label: "Projetos no prazo"   },
          ].map(s => (
            <motion.div
              key={s.n}
              variants={fadeUp}
              className="flex flex-col items-center justify-center py-8 px-4 bg-gray-900/60 hover:bg-gray-900/90 transition-colors"
            >
              <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                {s.n}
              </span>
              <span className="text-gray-500 text-xs mt-1 text-center">{s.label}</span>
            </motion.div>
          ))}
        </motion.section>

        {/* ══════════════════════════════════════
            CARDS — mesma grid-3-cols do original
        ══════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto mt-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {cards.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-gray-900/60 border border-purple-500/15 rounded-2xl p-8 shadow-lg overflow-hidden hover:border-purple-500/40 transition-all duration-300"
              >
                {/* hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 group-hover:to-transparent rounded-2xl transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xl mb-5 group-hover:bg-purple-500/20 transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{card.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            SKILLS + TIMELINE — 2 cols
        ══════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto mt-24 grid md:grid-cols-2 gap-16">

          {/* SKILLS */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
              <FaCode className="text-purple-500" />
              <span className="text-purple-400 text-xs tracking-[0.2em] uppercase font-medium">Stack técnica</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Competências
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-sm mb-8 leading-relaxed">
              Ferramentas que uso no dia a dia para construir produtos sólidos, do front ao back.
            </motion.p>

            <div className="flex flex-col gap-5">
              {skills.map((s, i) => (
                <motion.div key={s.label} variants={fadeUp}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-300">{s.label}</span>
                    <span className="text-xs text-purple-400 font-medium">{s.level}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-purple-700 to-purple-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* TIMELINE */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
              <FaBriefcase className="text-purple-500" />
              <span className="text-purple-400 text-xs tracking-[0.2em] uppercase font-medium">Percurso</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Experiência
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-sm mb-8 leading-relaxed">
              O caminho que me trouxe até aqui.
            </motion.p>

            <div className="relative flex flex-col gap-0">
              <div className="absolute left-[17px] top-2 bottom-2 w-px bg-purple-900/60" />

              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group relative pl-12 pb-8 last:pb-0"
                >
                  <div className="absolute left-0 top-0 w-9 h-9 rounded-full border border-purple-900 bg-gray-950 flex items-center justify-center text-purple-400 text-sm group-hover:border-purple-500 group-hover:text-purple-300 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-purple-500 uppercase tracking-widest font-medium">{item.year}</span>
                  <h3 className="text-white font-semibold text-base mt-0.5">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{item.place}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </section>

        {/* ══════════════════════════════════════
            TECH BADGES
        ══════════════════════════════════════ */}
        <motion.section
          className="max-w-6xl mx-auto mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-px bg-purple-500" />
            <span className="text-purple-400 text-xs tracking-[0.2em] uppercase font-medium">Tecnologias</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {techBadges.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                whileHover={{ scale: 1.08, borderColor: "rgba(168,85,247,0.6)" }}
                className="px-4 py-1.5 rounded-full border border-purple-900/60 bg-gray-900/50 text-gray-400 text-xs font-medium hover:text-purple-300 hover:bg-purple-500/10 transition-all cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            QUOTE / CTA
        ══════════════════════════════════════ */}
        <motion.section
          className="max-w-6xl mx-auto mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-2xl border border-purple-500/20 bg-gray-900/50 p-10 sm:p-14 overflow-hidden text-center">
            {/* bg glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-purple-800/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

            <div className="text-6xl text-purple-500/15 font-serif leading-none select-none mb-2">"</div>
            <p className="relative text-lg sm:text-xl text-gray-300 italic font-light leading-relaxed max-w-2xl mx-auto">
              O código de qualidade não é aquele que o computador consegue executar —
              é aquele que o humano consegue entender.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-purple-500/50" />
              <span className="text-[10px] text-purple-500 uppercase tracking-widest">Princípio de desenvolvimento</span>
              <div className="w-8 h-px bg-purple-500/50" />
            </div>

            {/* CTA */}
            <div className="mt-10">
              <p className="text-gray-500 text-sm mb-4">Tens um projeto em mente?</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:shadow-[0_0_28px_rgba(168,85,247,0.4)]"
              >
                Vamos conversar
              </a>
            </div>
          </div>
        </motion.section>

      </main>

      <Footer />
    </div>
  );
}