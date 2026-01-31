import { useState, useEffect } from "react";
import { FaPlus, FaQuoteLeft, FaTrash, FaStar } from "react-icons/fa";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    text: "",
    avatar: null, // arquivo
    rating: 5,
  });

  const API_URL = "http://localhost:5000/api/testimonials";

  // 🔹 Carregar testimonials
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error("Erro ao carregar testimonials:", err);
    }
  };

  // 🔹 Criar testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("company", formData.company);
      form.append("role", formData.role);
      form.append("text", formData.text);
      form.append("rating", formData.rating);
      if (formData.avatar) form.append("avatar", formData.avatar);

      const res = await fetch(API_URL, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Erro ao criar testimonial");
      const newTestimonial = await res.json();

      setTestimonials([newTestimonial, ...testimonials]);
      setFormData({ name: "", company: "", role: "", text: "", avatar: null, rating: 5 });
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Deletar testimonial
  const deleteTestimonial = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao deletar testimonial");
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Filtrar testimonials
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

      {/* Grid de testimonials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-gray-900/80 border border-[#a78bfa]/20 rounded-xl p-6 relative hover:shadow-lg hover:shadow-[#a78bfa]/20 transition"
          >
            <FaQuoteLeft className="text-[#a78bfa]/20 text-4xl absolute top-4 right-4" />
            <div className="flex items-center gap-4 mb-3">
              <img
                src={t.avatar ? `http://localhost:5000${t.avatar}` : "https://i.pravatar.cc/150?img=12"}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#a78bfa]"
              />
              <div>
                <h3 className="text-white font-semibold">{t.name}</h3>
                <p className="text-sm text-gray-400">{t.role} • {t.company}</p>
              </div>
            </div>

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

      {/* Modal de formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-white font-semibold text-lg mb-4">Novo Depoimento</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>

              <input
                type="text"
                placeholder="Nome"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700"
              />
              <input
                type="text"
                placeholder="Empresa"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700"
              />
              <input
                type="text"
                placeholder="Cargo"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700"
              />
              <textarea
                placeholder="Depoimento"
                required
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700"
              />
              <input
                type="file"
                onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
                className="text-gray-400"
              />

              <div className="flex gap-2 items-center">
                <span className="text-gray-400">Avaliação:</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    onClick={() => setFormData({ ...formData, rating: i + 1 })}
                    className={`cursor-pointer ${i < formData.rating ? "text-yellow-400" : "text-gray-600"}`}
                  />
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-[#a78bfa] hover:bg-[#8f6df2] rounded-lg text-white">
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
