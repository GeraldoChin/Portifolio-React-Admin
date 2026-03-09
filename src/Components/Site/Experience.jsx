import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experienceData = [
  {
    id: 1,
    period: "2022 - Present",
    title: "Front-End Developer",
    company: "Tech Company Inc.",
    description: "Developing responsive web applications using React and TailwindCSS."
  },
  {
    id: 2,
    period: "2020 - 2022",
    title: "Junior Developer",
    company: "Startup XYZ",
    description: "Worked on full-stack development projects with Node.js and MongoDB."
  },
];

const educationData = [
  {
    id: 1,
    period: "2017 - 2020",
    course: "BSc in Computer Science",
    institution: "University of Example"
  },
  {
    id: 2,
    period: "2015 - 2017",
    course: "High School Diploma",
    institution: "Example High School"
  },
];

function AnimatedCard({ children, index, col }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 + col * 0.05, ease: "easeOut" }}
      className="relative pl-8 bg-gray-900/50 backdrop-blur-sm border border-white/5 rounded-lg p-4 md:p-5 hover:scale-[1.02] hover:border-[#a78bfa]/30 transition-all duration-300 h-full"
    >
      {children}
    </motion.div>
  );
}

export default function Resume() {
  const count = Math.max(experienceData.length, educationData.length);
  const rows  = Array.from({ length: count }, (_, i) => i);

  return (
    <section id="resume" className="py-20 bg-[#0d0b14] ">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Headers ── */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-24 mb-8">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
              💼 My Experience
            </h2>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
              🎓 My Education
            </h2>
          </div>
        </div>

        {/* ── Rows: each row = 1 exp card + 1 edu card, same height ── */}
        <div className="flex flex-col gap-4">
          {rows.map(i => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 items-stretch">

              {/* Experience card */}
              {experienceData[i] ? (
                <AnimatedCard index={i} col={0}>
                  <span className="absolute -left-1.5 top-6 w-3 h-3 rounded-full bg-[#a78bfa]" />
                  <div className="border-l border-white/10 pl-5">
                    <div className="text-[#8b5cf6] text-xs mb-1">{experienceData[i].period}</div>
                    <h3 className="text-base md:text-lg font-bold mb-1 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] bg-clip-text text-transparent">
                      {experienceData[i].title}
                    </h3>
                    <h4 className="text-sm md:text-base font-medium text-[#a78bfa]/80">
                      {experienceData[i].company}
                    </h4>
                    {experienceData[i].description && (
                      <p className="text-gray-300 text-sm mt-1">{experienceData[i].description}</p>
                    )}
                  </div>
                </AnimatedCard>
              ) : <div />}

              {/* Education card */}
              {educationData[i] ? (
                <AnimatedCard index={i} col={1}>
                  <span className="absolute -left-1.5 top-6 w-3 h-3 rounded-full bg-[#a78bfa]" />
                  <div className="border-l border-white/10 pl-5">
                    <div className="text-[#8b5cf6] text-xs mb-1">{educationData[i].period}</div>
                    <h3 className="text-base md:text-lg font-bold mb-1 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] bg-clip-text text-transparent">
                      {educationData[i].course}
                    </h3>
                    <h4 className="text-sm md:text-base font-medium text-[#a78bfa]/80">
                      {educationData[i].institution}
                    </h4>
                    {educationData[i].description && (
                      <p className="text-gray-300 text-sm mt-1">{educationData[i].description}</p>
                    )}
                  </div>
                </AnimatedCard>
              ) : <div />}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}