import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Works() {
  const [activeFilter, setActiveFilter] = useState("All");

  // 🔹 Dados estáticos dos projetos
  const projects = [
    { id: 1, title: "Mobile App", category: "Mobile", status: "Concluído", image: "mobile.png" },
    { id: 2, title: "E-commerce Store", category: "E-commerce", status: "Concluído", image: "e-comerce.png" },
    { id: 3, title: "Admin Dashboard", category: "UI/UX Design", status: "Concluído", image: "Admin.png" },
    { id: 4, title: "SEO Audit", category: "SEO Optimization", status: "Concluído", image: "devclub.png" },
  ];

  // 🔹 Geração de filtros automaticamente
  const filters = ["All", ...new Set(projects.map(p => p.category))];

  const filteredProjects = projects.filter(
    p => activeFilter === "All" || p.category === activeFilter
  );

  // 🔹 Card individual
  const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true, margin: "-100px" });

    // Caminho da imagem usando a pasta public/assets
    const imageSrc = project.image
      ? `/assets/${project.image}`           // busca na pasta public/assets
      : `/assets/placeholder.jpg`;           // fallback local

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 20px 40px rgba(167, 139, 250, 0.3)"
        }}
        className="bg-gray-900/50 border border-white/5 rounded-xl overflow-hidden cursor-pointer"
      >
        <div className="w-full h-64 overflow-hidden">
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
          <div className="text-[#a78bfa]/70 text-sm">
            {project.category} • {project.status}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="works" className="py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            My Recent Works
          </h2>
          <p className="text-[#a78bfa]/70 max-w-2xl mx-auto">
            We put your ideas and your wishes in the form of a unique web project.
          </p>
        </motion.div>

        {/* Filtros */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full border text-sm transition
                ${
                  activeFilter === filter
                    ? "bg-[#a78bfa]/20 text-[#a78bfa] border-[#a78bfa]/40"
                    : "bg-gray-900/50 border-white/10 text-white/70 hover:border-[#a78bfa]/40 hover:text-[#a78bfa]"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}

          {filteredProjects.length === 0 && (
            <p className="text-center text-white/50 col-span-full">
              Nenhum projeto encontrado
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
