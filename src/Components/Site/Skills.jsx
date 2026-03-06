import { useState, useEffect, useRef } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { motion, useInView } from "framer-motion";

const Icons = { ...FaIcons, ...SiIcons };

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const API_URL = "http://localhost:5000/api/skills";

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setSkills(data);
      } catch (err) {
        console.error("Erro ao buscar skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? (
      <IconComponent className="text-4xl text-[#8b5cf6]" />
    ) : (
      <FaQuestionCircle className="text-4xl text-gray-400" />
    );
  };

  const AnimatedSkillCard = ({ children, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.5, // aumenta o delay para um de cada vez
          ease: "easeOut",
        }}
        className="text-center"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            My Skills
          </h2>
          <p className="text-purple-300 max-w-2xl mx-auto">
            We put your ideas and your wishes in the form of a unique web project that inspires you and your customers.
          </p>
        </div>

        {/* Grid de Skills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10 mt-10">
          {skills.map((skill, index) => (
            <AnimatedSkillCard key={index} index={index}>
              <div className="w-20 h-20 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                {renderIcon(skill.icon)}
              </div>
              <div className="text-2xl font-bold mb-1 text-white">{skill.percent}%</div>
              <div className="text-[#a78bfa] text-sm">{skill.name}</div>
            </AnimatedSkillCard>
          ))}
        </div>
      </div>
    </section>
  );
}
