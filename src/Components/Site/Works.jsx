import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiNodedotjs, SiMongodb, SiTailwindcss,
  SiNextdotjs, SiTypescript, SiMysql, SiFigma,
  SiWordpress, SiJavascript, SiPhp, SiShopify,
} from "react-icons/si";

const TECH_MAP = {
  React:       { icon: SiReact,       color: "#61DAFB", label: "React"       },
  "Node.js":   { icon: SiNodedotjs,   color: "#68A063", label: "Node.js"     },
  MongoDB:     { icon: SiMongodb,     color: "#47A248", label: "MongoDB"     },
  Tailwind:    { icon: SiTailwindcss, color: "#38BDF8", label: "Tailwind"    },
  "Next.js":   { icon: SiNextdotjs,   color: "#ffffff", label: "Next.js"     },
  TypeScript:  { icon: SiTypescript,  color: "#3178C6", label: "TypeScript"  },
  MySQL:       { icon: SiMysql,       color: "#4479A1", label: "MySQL"       },
  Figma:       { icon: SiFigma,       color: "#F24E1E", label: "Figma"       },
  WordPress:   { icon: SiWordpress,   color: "#21759B", label: "WordPress"   },
  JavaScript:  { icon: SiJavascript,  color: "#F7DF1E", label: "JavaScript"  },
  PHP:         { icon: SiPhp,         color: "#8892BF", label: "PHP"         },
  Shopify:     { icon: SiShopify,     color: "#95BF47", label: "Shopify"     },
};

const projects = [
  {
    id: 1,
    title: "Mobile App",
    category: "Mobile",
    status: "Concluído",
    image: "mobile.png",
    techs: ["React", "Node.js", "MongoDB", "Tailwind"],
  },
  {
    id: 2,
    title: "E-commerce Store",
    category: "E-commerce",
    status: "Concluído",
    image: "project2.jpg",
    techs: ["Next.js", "TypeScript", "Shopify", "Tailwind"],
  },
  {
    id: 3,
    title: "Landing Page",
    category: "UI/UX Design",
    status: "Concluído",
    image: "project3.jpg",
    techs: ["React", "Figma", "Tailwind"],
  },
  {
    id: 4,
    title: "SEO Audit",
    category: "SEO Optimization",
    status: "Concluído",
    image: "project4.jpg",
    techs: ["WordPress", "PHP", "JavaScript", "MySQL"],
  },
];

function TechPill({ name }) {
  const tech = TECH_MAP[name];
  if (!tech) return null;
  const Icon = tech.icon;

  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/8 bg-gray-800/60 hover:bg-gray-700/60 hover:border-white/15 transition-all duration-200"
    >
      <Icon style={{ color: tech.color }} size={12} className="flex-shrink-0" />
      <span className="text-[11px] font-medium text-gray-300 leading-none whitespace-nowrap">
        {tech.label}
      </span>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const inView  = useInView(cardRef, { once: true, margin: "-80px" });

  const imageSrc = project.image
    ? `/assets/${project.image}`
    : `/assets/placeholder.jpg`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(167,139,250,0.2)" }}
      className="group bg-gray-900/50 border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-[#a78bfa]/25 transition-colors duration-300"
    >
      {/* Imagem */}
      <div className="w-full h-52 sm:h-60 overflow-hidden">
        <img
          src={imageSrc}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-5">

        {/* Título + categoria */}
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-white leading-snug mb-0.5">
            {project.title}
          </h3>
          <p className="text-[#a78bfa]/60 text-xs">
            {project.category} · {project.status}
          </p>
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-white/5 mb-4" />

        {/* Label + pills */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-gray-600 font-medium mb-2">
            Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.techs.map(tech => (
              <TechPill key={tech} name={tech} />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Works() {
  const [activeFilter, setActiveFilter] = useState("All");

// <<<<<<< HEAD
// =======
//   // 🔹 Dados estáticos dos projetos
//   const projects = [
//     { id: 1, title: "Mobile App", category: "Mobile", status: "Concluído", image: "mobile.png" },
//     { id: 2, title: "E-commerce Store", category: "E-commerce", status: "Concluído", image: "e-comerce.png" },
//     { id: 3, title: "Admin Dashboard", category: "UI/UX Design", status: "Concluído", image: "Admin.png" },
//     { id: 4, title: "SEO Audit", category: "SEO Optimization", status: "Concluído", image: "devclub.png" },
//   ];

//   // 🔹 Geração de filtros automaticamente
// >>>>>>> pagina-estatica
  const filters = ["All", ...new Set(projects.map(p => p.category))];
  const filteredProjects = projects.filter(
    p => activeFilter === "All" || p.category === activeFilter
  );

  return (
    <section id="works" className="py-16 sm:py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            My Recent Works
          </h2>
          <p className="text-[#a78bfa]/70 text-sm sm:text-base max-w-xl mx-auto">
            We put your ideas and your wishes in the form of a unique web project.
          </p>
        </motion.div>

        {/* Filtros */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm transition-all duration-200
                ${activeFilter === filter
                  ? "bg-[#a78bfa]/20 text-[#a78bfa] border-[#a78bfa]/40"
                  : "bg-gray-900/50 border-white/10 text-white/70 hover:border-[#a78bfa]/40 hover:text-[#a78bfa]"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}

          {filteredProjects.length === 0 && (
            <p className="text-center text-white/50 col-span-full py-12">
              Nenhum projeto encontrado
            </p>
          )}
        </div>

      </div>
    </section>
  );
}