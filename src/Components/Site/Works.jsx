import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/projects";
const UPLOADS_URL = "http://localhost:5000/uploads";

export default function Works() {
  const [worksData, setWorksData] = useState([]);
  const [filters, setFilters] = useState(["All"]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorks() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // 👉 só projetos concluídos
        const visibleProjects = data.filter(
          project => project.status === "Concluído"
        );

        // 👉 adaptar dados para o layout
        const adaptedProjects = visibleProjects.map(project => ({
          id: project.id,
          title: project.title,
          category: project.category,
          image: project.image,
          meta: [project.category, project.status]
        }));

        // 👉 gerar filtros automaticamente
        const uniqueCategories = [
          "All",
          ...new Set(adaptedProjects.map(p => p.category))
        ];

        setFilters(uniqueCategories);
        setWorksData(adaptedProjects);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorks();
  }, []);

  const filteredWorks = worksData.filter(
    work => activeFilter === "All" || work.category === activeFilter
  );

  if (loading) {
    return (
      <section className="py-20 text-center text-white/70">
        Carregando projetos...
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            My Recent Works
          </h2>
          <p className="text-[#a78bfa]/70 max-w-2xl mx-auto">
            We put your ideas and your wishes in the form of a unique web project that inspires you and your customers.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full border text-sm transition-all
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
          {filteredWorks.map(work => (
            <div
              key={work.id}
              className="bg-gray-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden 
                         hover:border-[#a78bfa]/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="w-full h-64 bg-black/30 overflow-hidden">
                <img
                  src={`${UPLOADS_URL}/${work.image}`}
                  alt={work.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {work.title}
                </h3>

                <div className="flex gap-2 text-[#a78bfa]/70 text-sm flex-wrap">
                  {work.meta.map((m, i) => (
                    <span key={i}>
                      {m}{i < work.meta.length - 1 ? " •" : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredWorks.length === 0 && (
            <p className="text-center text-white/50 col-span-full">
              Nenhum projeto encontrado
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
