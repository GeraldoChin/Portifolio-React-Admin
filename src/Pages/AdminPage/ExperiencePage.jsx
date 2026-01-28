import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaBriefcase, FaCalendarAlt, FaBuilding } from "react-icons/fa";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([
    { id: 1, title: "Desenvolvedor Frontend", company: "Empresa X", period: "2021 - 2023", description: "Desenvolvimento de interfaces web modernas." },
    { id: 2, title: "Estagiário UX/UI", company: "Empresa Y", period: "2020 - 2021", description: "Auxílio na criação de protótipos e testes de usabilidade." },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", company: "", period: "", description: "" });

  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    setFormData({ title: "", company: "", period: "", description: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExperiences([...experiences, { ...formData, id: Date.now() }]);
    closeForm();
  };

  const deleteExperience = (id) => setExperiences(experiences.filter(e => e.id !== id));

  // Cards de estatísticas
  const stats = [
    { title: "Experiências", value: experiences.length, icon: <FaBriefcase /> },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Gerenciar Experiência</h2>
        <button
          onClick={openForm}
          className="flex items-center gap-2 px-5 py-2 bg-[#a78bfa]/20 text-[#a78bfa] rounded-lg hover:bg-[#a78bfa]/30 transition"
        >
          <FaPlus /> Nova Experiência
        </button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-gray-900/80 rounded-xl p-6 flex items-center gap-4 hover:shadow-lg hover:shadow-[#a78bfa]/20 transition">
            <div className="text-3xl text-[#a78bfa]">{s.icon}</div>
            <div>
              <p className="text-gray-400 text-sm">{s.title}</p>
              <h3 className="text-white text-xl font-semibold">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Grid de cards de experiências */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((e) => (
          <div key={e.id} className="bg-gray-900/80 rounded-xl p-6 hover:shadow-lg hover:shadow-[#a78bfa]/20 transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold text-lg">{e.title}</h3>
              <span className="text-sm text-gray-400">{e.period}</span>
            </div>
            <p className="text-gray-400 text-sm mb-2"><FaBuilding className="inline mr-1"/> {e.company}</p>
            <p className="text-gray-300 text-sm">{e.description}</p>
          </div>
        ))}
      </div>

      {/* Tabela detalhada */}
      <div className="bg-gray-900/80 border border-[#a78bfa]/20 rounded-xl p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Tabela de Experiências</h3>
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-[#a78bfa]/20">
              <th className="p-3">Cargo</th>
              <th className="p-3">Empresa</th>
              <th className="p-3">Período</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((e) => (
              <tr key={e.id} className="hover:bg-[#a78bfa]/10 transition">
                <td className="p-3">{e.title}</td>
                <td className="p-3">{e.company}</td>
                <td className="p-3">{e.period}</td>
                <td className="p-3 flex gap-2">
                  <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"><FaEdit /></button>
                  <button onClick={() => deleteExperience(e.id)} className="p-2 bg-red-800 hover:bg-red-700 rounded-lg transition"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-white font-semibold text-lg mb-4">Nova Experiência</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm mb-1">Cargo</label>
                <input type="text" required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-gray-800 text-white p-3 rounded-lg outline-none border border-gray-700"/>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm mb-1">Empresa</label>
                <input type="text" required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="bg-gray-800 text-white p-3 rounded-lg outline-none border border-gray-700"/>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm mb-1">Período</label>
                <input type="text" required
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  placeholder="Ex: 2020 - 2023"
                  className="bg-gray-800 text-white p-3 rounded-lg outline-none border border-gray-700"/>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm mb-1">Descrição</label>
                <textarea required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gray-800 text-white p-3 rounded-lg outline-none border border-gray-700"/>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={closeForm} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#a78bfa] hover:bg-[#8f6df2] rounded-lg text-white">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
