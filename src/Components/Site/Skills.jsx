import { useState, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa"; // fallback caso o ícone não exista
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

// Combina todos os ícones
const Icons = { ...FaIcons, ...SiIcons };

export default function Skills() {
  const [skills, setSkills] = useState([]);

  const API_URL = "http://localhost:5000/api/skills"; // ajuste conforme seu backend

  // Buscar skills do backend
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

  // Função para renderizar ícone dinamicamente
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="text-4xl text-[#8b5cf6]" /> : <FaQuestionCircle className="text-4xl text-gray-400" />;
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
            <div key={index} className="text-center">
              {/* Ícone */}
              <div className="w-20 h-20 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                {renderIcon(skill.icon)}
              </div>
              {/* Percentual */}
              <div className="text-2xl font-bold mb-1 text-white">{skill.percent}%</div>
              {/* Nome */}
              <div className="text-[#a78bfa] text-sm">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
