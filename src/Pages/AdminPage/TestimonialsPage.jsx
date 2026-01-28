import { useState } from "react";
import { FaPlus, FaQuoteLeft, FaTrash, FaStar } from "react-icons/fa";


export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Carlos Mendes",
      company: "Tech Solutions",
      role: "CEO",
      text: "Excelente profissional, muito comprometido com resultados!",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
    },
    {
      id: 2,
      name: "Ana Silva",
      company: "Creative Studio",
      role: "Designer",
      text: "Trabalhar com ele foi uma experiência incrível.",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 4,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    text: "",
    avatar: "",
    rating: 5,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTestimonials([...testimonials, { ...formData, id: Date.now() }]);
    setFormData({ name: "", company: "", role: "", text: "", avatar: "", rating: 5 });
    setShowForm(false);
  };

  const deleteTestimonial = (id) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  const filtered = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Depoimentos</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded-lg border border-gray-700"
          />
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2 bg-[#a78bfa]/20 text-[#a78bfa] rounded-lg hover:bg-[#a78bfa]/30 transition"
          >
            <FaPlus /> Novo
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900/80 border border-[#a78bfa]/20 rounded-xl p-6 relative hover:shadow-lg hover:shadow-[#a78bfa]/20 transition"
          >
            <FaQuoteLeft className="text-[#a78bfa]/20 text-4xl absolute top-4 right-4" />

            <div className="flex items-center gap-4 mb-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#a78bfa]"
              />
              <div>
                <h3 className="text-white font-semibold">{t.name}</h3>
                <p className="text-sm text-gray-400">{t.role} • {t.company}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={i < t.rating ? "text-yellow-400" : "text-gray-600"}
                />
              ))}
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              "{t.text}"
            </p>

            <button
              onClick={() => deleteTestimonial(t.id)}
              className="absolute bottom-4 right-4 text-red-400 hover:text-red-500 transition"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-xl p-6 w-full max-w-lg"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Novo Depoimento</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>

              {["name", "company", "role", "avatar"].map((field, i) => (
                <input
                  key={i}
                  placeholder={field}
                  required
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700"
                />
              ))}

              <textarea
                placeholder="Depoimento"
                required
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700"
              />

              {/* Rating */}
              <div className="flex gap-2 items-center">
                <span className="text-gray-400">Avaliação:</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    onClick={() => setFormData({ ...formData, rating: i + 1 })}
                    className={`cursor-pointer ${
                      i < formData.rating ? "text-yellow-400" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#a78bfa] hover:bg-[#8f6df2] rounded-lg text-white"
                >
                  Salvar
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
