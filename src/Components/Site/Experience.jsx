import { useRef } from "react";
import { motion, useInView } from "framer-motion";
const experienceData = [
  {
    id: 1,
    period: "Jan 2026 - Present",
    title: "Freelance Web Developer",
    company: "Autônomo",
    description:
      "Desenvolvimento de websites e landing pages responsivas utilizando HTML, CSS, JavaScript, Tailwind CSS e React. Integração com APIs REST e versionamento com Git/GitHub."
  },
  {
    id: 2,
    period: "Dec 2025 - Jan 2026",
    title: "Web Developer",
    company: "Universidade Zambeze (CETIC)",
    description:
      "Desenvolvimento de site acadêmico para apoio às atividades institucionais e colaboração com equipe técnica no levantamento de requisitos."
  },
  {
    id: 3,
    period: "Feb 2023 - Jan 2026",
    title: "Projetos Acadêmicos",
    company: "Engenharia Informática",
    description:
      "Desenvolvimento de sistemas acadêmicos, incluindo sistema de cobrança de taxas diárias, uso de Git/GitHub e colaboração em projetos."
  }
];
const educationData = [
  {
    id: 1,
    period: "Jan 2026 - (Em curso)",
    course: "Licenciatura em Engenharia Informática",
    institution: "Universidade Zambeze (UniZambeze)"
  },
  {
    id: 2,
    period: "2023 - 2026",
    course: "Desenvolvimento Web",
    institution: "Universidade Zambeze (CETIC)"
  },
  {
    id: 3,
    period: "2023 - 2024",
    course: "HTML, CSS & Git/GitHub",
    institution: "Curso em Vídeo & Thiago Matos (YouTube)",
  }
];

function AnimatedCard({ children, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="relative pl-8 bg-gray-900/50 backdrop-blur-sm border border-white/5 rounded-lg p-4 md:p-5 hover:scale-[1.02] hover:border-[#a78bfa]/30 transition-all duration-300"
    >
      {children}
    </motion.div>
  );
}

function SectionBlock({ title, items, renderCard }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent mb-6">
        {title}
      </h2>
      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <AnimatedCard key={item.id} index={i}>
            {renderCard(item)}
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="py-16 sm:py-20 bg-[#0d0b14]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14 sm:gap-16">

        {/* ── Experience ── */}
        <SectionBlock
          title="💼 My Experience"
          items={experienceData}
          renderCard={(item) => (
            <>
              <span className="absolute -left-1.5 top-6 w-3 h-3 rounded-full bg-[#a78bfa]" />
              <div className="border-l border-white/10 pl-4 sm:pl-5">
                <div className="text-[#8b5cf6] text-xs mb-1">{item.period}</div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <h4 className="text-sm md:text-base font-medium text-[#a78bfa]/80">
                  {item.company}
                </h4>
                {item.description && (
                  <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </>
          )}
        />

        {/* ── Education ── */}
        <SectionBlock
          title="🎓 My Education"
          items={educationData}
          renderCard={(item) => (
            <>
              <span className="absolute -left-1.5 top-6 w-3 h-3 rounded-full bg-[#a78bfa]" />
              <div className="border-l border-white/10 pl-4 sm:pl-5">
                <div className="text-[#8b5cf6] text-xs mb-1">{item.period}</div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] bg-clip-text text-transparent">
                  {item.course}
                </h3>
                <h4 className="text-sm md:text-base font-medium text-[#a78bfa]/80">
                  {item.institution}
                </h4>
                {item.description && (
                  <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </>
          )}
        />

      </div>
    </section>
  );
}