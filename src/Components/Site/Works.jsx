import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/projects";
const UPLOADS_URL = "http://localhost:5000/uploads";

export default function Works() {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState(["All"]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // 👉 apenas projetos concluídos
        const completed = data.filter(p => p.status === "Concluído");

        setProjects(completed);

        // 👉 filtros por categoria
        const categories = ["All", ...new Set(completed.map(p => p.category))];
        setFilters(categories);
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    p => activeFilter === "All" || p.category === activeFilter
  );

  if (loading) {
    return (
      <section className="py-20 text-center text-white/60">
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
            We put your ideas and your wishes in the form of a unique web project.
          </p>
        </div>

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
          {filteredProjects.map(p => (
            <div
              key={p.id}
              className="bg-gray-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-[#a78bfa]/30 transition"
            >
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={
                    p.image
                      ? `${UPLOADS_URL}/${p.image}`
                      : "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={p.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {p.title}
                </h3>
                <div className="text-[#a78bfa]/70 text-sm">
                  {p.category} • {p.status}
                </div>
              </div>
            </div>
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
