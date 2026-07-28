import { useRef } from "react";
import { FaQuestionCircle, FaReact, FaHtml5, FaCss3Alt, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiJavascript, SiTypescript } from "react-icons/si";
import { motion, useInView } from "framer-motion";

// 🔹 Ícone + cor oficial de cada tecnologia
const Icons = {
  FaReact:       { Icon: FaReact,       color: "#61DAFB" }, // React azul-ciano
  FaHtml5:       { Icon: FaHtml5,       color: "#E34F26" }, // HTML5 laranja
  FaCss3Alt:     { Icon: FaCss3Alt,     color: "#2965F1" }, // CSS3 azul
  SiTailwindcss: { Icon: SiTailwindcss, color: "#38BDF8" }, // Tailwind ciano
  SiJavascript:  { Icon: SiJavascript,  color: "#F7DF1E" }, // JavaScript amarelo
  SiTypescript:  { Icon: SiTypescript,  color: "#3178C6" }, // TypeScript azul
  FaNodeJs:      { Icon: FaNodeJs,      color: "#68A063" }, // Node.js verde
};

export default function Skills() {
  // 🔹 Dados estáticos das skills
  const skills = [
    { name: "React", icon: "FaReact", percent: 50 },
    { name: "HTML5", icon: "FaHtml5", percent: 85 },
    { name: "CSS3", icon: "FaCss3Alt", percent: 65 },
    { name: "TailwindCSS", icon: "SiTailwindcss", percent: 85 },
    { name: "JavaScript", icon: "SiJavascript", percent: 40 },
    // { name: "TypeScript", icon: "SiTypescript", percent: 80 },
    { name: "Node.js", icon: "FaNodeJs", percent: 40 },
  ];

  // 🔹 Função para renderizar ícones com a cor da própria tecnologia
  const renderIcon = (iconName) => {
    const tech = Icons[iconName];
    if (!tech) return <FaQuestionCircle className="text-4xl text-gray-400" />;
    const { Icon: IconComponent, color } = tech;
    return <IconComponent className="text-4xl" style={{ color }} />;
  };

  // 🔹 Card animado
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
          delay: index * 0.2,
          ease: "easeOut",
        }}
        className="text-center"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            My Skills
          </h2>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Transformamos as suas ideias e os seus desejos em um projeto web único que inspira você e os seus clientes.
          </p>
        </div>

        {/* Grid de Skills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10 mt-10">
          {skills.map((skill, index) => {
            const color = Icons[skill.icon]?.color ?? "#8b5cf6";
            return (
              <AnimatedSkillCard key={index} index={index}>
                <div
                  className="w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4 border transition-transform duration-300 hover:scale-105"
                  style={{
                    backgroundColor: `${color}1A`, // ~10% opacidade
                    borderColor: `${color}4D`,     // ~30% opacidade
                  }}
                >
                  {renderIcon(skill.icon)}
                </div>
                <div className="text-2xl font-bold mb-1 text-white">{skill.percent}%</div>
                <div className="text-[#a78bfa] text-sm">{skill.name}</div>
              </AnimatedSkillCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}