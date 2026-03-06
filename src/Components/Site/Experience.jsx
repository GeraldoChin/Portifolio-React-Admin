import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Resume() {
  const [experienceData, setExperienceData] = useState([]);
  const [educationData, setEducationData] = useState([]);

  const EXPERIENCE_API = "http://localhost:5000/api/experiences";
  const EDUCATION_API = "http://localhost:5000/api/education";

  useEffect(() => {
    fetchExperiences();
    fetchEducation();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch(EXPERIENCE_API);
      const data = await res.json();
      setExperienceData(data);
    } catch (err) {
      console.error("Erro ao buscar experiências:", err);
    }
  };

  const fetchEducation = async () => {
    try {
      const res = await fetch(EDUCATION_API);
      const data = await res.json();
      setEducationData(data);
    } catch (err) {
      console.error("Erro ao buscar educação:", err);
    }
  };

  // Card animado
  const AnimatedCard = ({ children }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" }); // dispara quando entra na tela

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative pl-8 bg-gray-900/50 backdrop-blur-sm border border-white/5 rounded-lg p-4 md:p-5 hover:scale-[1.02] hover:border-[#a78bfa]/30 transition-all duration-300"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section id="resume" className="py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-24">

          {/* Experience */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
              💼 My Experience
            </h2>
            <div className="space-y-4">
              {experienceData.map((item) => (
                <AnimatedCard key={item.id}>
                  <span className="absolute -left-1.5 top-6 w-3 h-3 rounded-full bg-[#a78bfa]"></span>
                  <div className="border-l border-white/10 pl-5">
                    <div className="text-[#8b5cf6] text-xs mb-1">{item.period}</div>
                    <h3 className="text-base md:text-lg font-bold mb-1 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    <h4 className="text-sm md:text-base font-medium text-[#a78bfa]/80">
                      {item.company}
                    </h4>
                    {item.description && <p className="text-gray-300 text-sm mt-1">{item.description}</p>}
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
              🎓 My Education
            </h2>
            <div className="space-y-4">
              {educationData.map((item) => (
                <AnimatedCard key={item.id}>
                  <span className="absolute -left-1.5 top-6 w-3 h-3 rounded-full bg-[#a78bfa]"></span>
                  <div className="border-l border-white/10 pl-5">
                    <div className="text-[#8b5cf6] text-xs mb-1">{item.period}</div>
                    <h3 className="text-base md:text-lg font-bold mb-1 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] bg-clip-text text-transparent">
                      {item.course}
                    </h3>
                    <h4 className="text-sm md:text-base font-medium text-[#a78bfa]/80">
                      {item.institution}
                    </h4>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
