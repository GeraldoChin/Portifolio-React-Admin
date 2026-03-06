import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Navbar from "./Navbar";

export default function Resume() {
  const [experienceData, setExperienceData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  // Substitua pelas URLs da sua API
  const EXPERIENCE_API = "http://localhost:5000/api/experiences";
  const EDUCATION_API = "http://localhost:5000/api/education";
  const SKILLS_API = "http://localhost:5000/api/skills";
  const PROJECTS_API = "http://localhost:5000/api/projects";
  const CERTIFICATES_API = "http://localhost:5000/api/certificates";

  useEffect(() => {
    fetchData(EXPERIENCE_API, setExperienceData);
    fetchData(EDUCATION_API, setEducationData);
    fetchData(SKILLS_API, setSkills);
    fetchData(PROJECTS_API, setProjects);
    fetchData(CERTIFICATES_API, setCertificates);
  }, []);

  const fetchData = async (api, setter) => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(`Erro ao buscar dados: ${api}`, err);
    }
  };

  // Função de animação para as skills
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start) + "%";
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const observerOptions = { threshold: 0.5 };
    const skillItems = document.querySelectorAll(".skill-item");

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const percentage = entry.target.querySelector(".skill-percentage");
          animateValue(percentage, 0, parseInt(percentage.dataset.value), 1200);
          skillsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    skillItems.forEach((skill) => skillsObserver.observe(skill));
  }, [skills]);

  return (
    <section className="py-20 bg-gray-900">
        <Navbar />
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-500 bg-clip-text text-transparent">
            My Resume
          </h1>
          <p className="text-purple-300 mt-4 max-w-2xl mx-auto">
            Experience, skills, and projects that showcase my professional journey.
          </p>
        </div>

        {/* Timeline: Experience & Education */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Experience */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-purple-400">💼 Experience</h2>
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-1 bg-purple-600 rounded"></div>
              <div className="space-y-8">
                {experienceData.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="pl-10 relative"
                  >
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-purple-500 rounded-full border-2 border-gray-900"></div>
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <p className="text-purple-300 text-sm">{item.company} • {item.period}</p>
                    {item.description && <p className="text-gray-300 mt-1">{item.description}</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-purple-400">🎓 Education</h2>
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-1 bg-purple-400 rounded"></div>
              <div className="space-y-8">
                {educationData.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="pl-10 relative"
                  >
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-purple-300 rounded-full border-2 border-gray-900"></div>
                    <h3 className="font-bold text-white text-lg">{item.course}</h3>
                    <p className="text-purple-300 text-sm">{item.institution} • {item.period}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">🛠 Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="skill-item text-center p-4 bg-gray-900/50 rounded-lg border border-white/10"
              >
                <div className="text-purple-500 text-3xl mb-2">{skill.icon && <i className={skill.icon}></i>}</div>
                <div className="text-white font-bold text-xl skill-percentage" data-value={skill.percent}>0%</div>
                <div className="text-purple-300 text-sm mt-1">{skill.name}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">📁 Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-gray-900/50 rounded-xl overflow-hidden border border-purple-500 hover:scale-105 transition-transform"
              >
                <div className="h-48 bg-gray-800 overflow-hidden">
                  <img
                    src={project.image ? `http://localhost:5000/uploads/projects/${project.image}` : "https://via.placeholder.com/400"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white">{project.title}</h3>
                  <p className="text-purple-300 text-sm mt-1">{project.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">🏅 Certificates & Languages</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {certificates.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-gray-900/50 p-4 rounded-lg text-center border border-purple-400 hover:shadow-lg transition"
              >
                <div className="text-purple-400 font-bold mb-2">{cert.name}</div>
                <div className="text-white text-sm">{cert.type}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
