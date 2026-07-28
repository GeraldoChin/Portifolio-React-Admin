import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  SiReact, SiNodedotjs, SiMongodb, SiTailwindcss,
  SiNextdotjs, SiTypescript, SiMysql, SiFigma,
  SiWordpress, SiJavascript, SiPhp, SiShopify,
} from "react-icons/si";
import { X, Images, Globe, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

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

// ---------------------------------------------------------------------------
// DADOS — adicione `images` (galeria) e `liveUrl` (site publicado) em cada projeto
// ---------------------------------------------------------------------------
const projects = [
  {
    id: 1,
    title: "Mobile App",
    category: "Mobile",
    status: "Concluído",
    image: "mobile.png",
    techs: ["React", "Node.js", "MongoDB", "TypeScript"],
    images: ["mobile.png", "mobile-2.png", "mobile-3.png"],
    liveUrl: "https://exemplo-mobile-app.com",
  },
  {
    id: 2,
    title: "E-commerce Store",
    category: "E-commerce",
    status: "Concluído",
    image: "e-comerce.png",
    techs: ["Shopify", "JavaScript", "Tailwind"],
    images: ["e-comerce.png", "e-comerce-2.png"],
    liveUrl: "https://exemplo-ecommerce.com",
  },
  {
    id: 3,
    title: "Admin Dashboard",
    category: "UI/UX Design",
    status: "Concluído",
    image: "Admin.png",
    techs: ["Figma", "React", "Tailwind", "TypeScript"],
    images: ["Admin.png", "Admin-2.png"],
    liveUrl: "https://chatgpt.com/",
  },
  {
    id: 4,
    title: "SEO Audit",
    category: "SEO Optimization",
    status: "Concluído",
    image: "devclub.png",
    techs: ["WordPress", "PHP", "MySQL"],
    images: ["devclub.png"],
    liveUrl: "https://exemplo-devclub.com",
  },
];

function TechPill({ name }) {
  const tech = TECH_MAP[name];
  if (!tech) return null;
  const Icon = tech.icon;

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/8 bg-gray-800/60 hover:bg-gray-700/60 hover:border-white/15 transition-all duration-200">
      <Icon style={{ color: tech.color }} size={12} className="flex-shrink-0" />
      <span className="text-[11px] font-medium text-gray-300 leading-none whitespace-nowrap">
        {tech.label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MODAL — duas abas: Fotos (galeria) e Site (iframe com fallback)
// ---------------------------------------------------------------------------
function ProjectModal({ project, onClose }) {
  const [tab, setTab] = useState("photos"); // "photos" | "site"
  const [photoIndex, setPhotoIndex] = useState(0);
  const [iframeFailed, setIframeFailed] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Fecha com ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Se o iframe não avisar "load" em X segundos, assumimos bloqueio (X-Frame-Options)
  useEffect(() => {
    if (tab !== "site") return;
    setIframeLoading(true);
    setIframeFailed(false);
    const timeout = setTimeout(() => setIframeFailed(true), 4000);
    return () => clearTimeout(timeout);
  }, [tab, project]);

  const images = project.images?.length ? project.images : [project.image];

  const nextPhoto = () => setPhotoIndex((i) => (i + 1) % images.length);
  const prevPhoto = () => setPhotoIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Painel */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[88vh] bg-gray-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/8 flex-shrink-0">
          <div>
            <h3 className="text-white font-semibold text-base sm:text-lg leading-tight">
              {project.title}
            </h3>
            <p className="text-[#a78bfa]/60 text-xs mt-0.5">
              {project.category} · {project.status}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-5 sm:px-6 pt-4 flex-shrink-0">
          <button
            onClick={() => setTab("photos")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200
              ${tab === "photos"
                ? "bg-[#a78bfa]/20 text-[#a78bfa] border-[#a78bfa]/40"
                : "bg-gray-800/50 border-white/10 text-white/60 hover:text-white hover:border-white/20"}`}
          >
            <Images size={14} /> Fotos
          </button>
          {project.liveUrl && (
            <button
              onClick={() => setTab("site")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200
                ${tab === "site"
                  ? "bg-[#a78bfa]/20 text-[#a78bfa] border-[#a78bfa]/40"
                  : "bg-gray-800/50 border-white/10 text-white/60 hover:text-white hover:border-white/20"}`}
            >
              <Globe size={14} /> Site Ao Vivo
            </button>
          )}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 min-h-0 p-5 sm:p-6 overflow-y-auto">
          {tab === "photos" && (
            <div className="flex flex-col gap-3">
              <div className="relative w-full aspect-video bg-gray-950 rounded-xl overflow-hidden border border-white/8">
                <img
                  src={`/assets/${images[photoIndex]}`}
                  alt={`${project.title} — imagem ${photoIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      aria-label="Foto anterior"
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextPhoto}
                      aria-label="Próxima foto"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={img + i}
                      onClick={() => setPhotoIndex(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors
                        ${i === photoIndex ? "border-[#a78bfa]" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img src={`/assets/${img}`} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "site" && (
            <div className="relative w-full h-[60vh] rounded-xl overflow-hidden border border-white/8 bg-gray-950">
              {iframeLoading && !iframeFailed && (
                <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">
                  Carregando site...
                </div>
              )}

              {iframeFailed ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
                  <Globe size={28} className="text-white/30" />
                  <p className="text-white/60 text-sm max-w-sm">
                    Este site não permite ser exibido dentro de outra página
                    (restrição de segurança do próprio site).
                  </p>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#a78bfa]/20 text-[#a78bfa] border border-[#a78bfa]/40 text-sm hover:bg-[#a78bfa]/30 transition-colors"
                  >
                    Abrir em nova aba <ExternalLink size={14} />
                  </a>
                </div>
              ) : (
                <iframe
                  key={project.liveUrl}
                  src={project.liveUrl}
                  title={`${project.title} — site ao vivo`}
                  className="w-full h-full"
                  onLoad={() => setIframeLoading(false)}
                  onError={() => setIframeFailed(true)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              )}
            </div>
          )}
        </div>

        {/* Footer com link direto (sempre visível na aba site) */}
        {tab === "site" && project.liveUrl && !iframeFailed && (
          <div className="px-5 sm:px-6 py-3 border-t border-white/8 flex justify-end flex-shrink-0">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#a78bfa] transition-colors"
            >
              Abrir em nova aba <ExternalLink size={12} />
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onOpen }) {
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
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(project)}
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

        {/* Stack */}
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
  const [selectedProject, setSelectedProject] = useState(null);

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
            Transformamos as suas ideias e os seus objetivos num projeto web único.
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
            <ProjectCard key={p.id} project={p} index={i} onOpen={setSelectedProject} />
          ))}

          {filteredProjects.length === 0 && (
            <p className="text-center text-white/50 col-span-full py-12">
              Nenhum projeto encontrado
            </p>
          )}
        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}