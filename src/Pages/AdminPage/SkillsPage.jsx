// ================== IMPORTS ==================
import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaQuestionCircle } from "react-icons/fa";

// Importa todos os ícones FontAwesome e Simple Icons
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

// Combina todos os ícones em um único objeto
const Icons = { ...FaIcons, ...SiIcons };

// ================== COMPONENT ==================
export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", icon: "", percent: 0 });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/api/skills"; // ajuste conforme backend

  // 🔹 Buscar skills do backend
  const fetchSkills = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error("Erro ao buscar skills:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // 🔹 Abrir formulário para criar ou editar
  const openForm = (skill = null) => {
    if (skill) {
      setFormData({ name: skill.name, icon: skill.icon, percent: skill.percent });
      setEditingId(skill.id);
    } else {
      setFormData({ name: "", icon: "SiTailwindcss", percent: 0 }); // valor padrão Tailwind
      setEditingId(null);
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({ name: "", icon: "SiTailwindcss", percent: 0 });
    setEditingId(null);
  };

  // 🔹 Criar ou atualizar skill
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao salvar skill");

      closeForm();
      fetchSkills();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar skill");
    }
  };

  // 🔹 Deletar skill
  const deleteSkill = async (id) => {
    if (!confirm("Tem certeza que deseja deletar esta skill?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao deletar skill");
      fetchSkills();
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar skill");
    }
  };

  // 🔹 Renderizar ícone dinamicamente
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="text-4xl text-sky-400" /> : <FaQuestionCircle className="text-4xl text-gray-500" />;
  };

  return (
    <div className="space-y-10 p-6 bg-gray-950 min-h-screen">

      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-white">Gerenciar Skills</h2>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <FaPlus /> Nova Skill
        </button>
      </div>

      {/* Grid de Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skills.map(skill => (
          <div key={skill.id} className="bg-gray-900/90 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300">

            {/* Ícone e nome */}
            <div className="flex items-center gap-4 mb-4">
              {renderIcon(skill.icon)}
              <h3 className="text-white text-xl font-semibold">{skill.name}</h3>
            </div>

            {/* Barra de progresso */}
            <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden mb-2">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${skill.percent}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm mb-4 text-right font-semibold">{skill.percent}%</p>

            {/* Botões de ação */}
            <div className="flex gap-3 justify-end">
              <button onClick={() => openForm(skill)} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"><FaEdit /></button>
              <button onClick={() => deleteSkill(skill.id)} className="p-2 bg-red-700 hover:bg-red-600 rounded-lg transition"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-lg animate-fadeIn">
            <h3 className="text-2xl text-white font-semibold mb-6">{editingId ? "Editar Skill" : "Adicionar Nova Skill"}</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>

              <div className="flex flex-col">
                <label className="text-gray-400 mb-1">Nome da Skill</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-800 text-white p-3 rounded-xl outline-none border border-gray-700 focus:border-purple-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-400 mb-1">Ícone</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="bg-gray-800 text-white p-3 rounded-xl outline-none border border-gray-700 focus:border-indigo-500"
                >
                  <option value="SiTailwindcss">Tailwind CSS</option>
                  {Object.keys(Icons).map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-400 mb-1">Percentual (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={formData.percent}
                  onChange={(e) => setFormData({ ...formData, percent: parseInt(e.target.value) })}
                  className="bg-gray-800 text-white p-3 rounded-xl outline-none border border-gray-700 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-center mb-4">
                {formData.icon && renderIcon(formData.icon)}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={closeForm} className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition">Cancelar</button>
                <button type="submit" className="px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-lg hover:scale-105 transition-transform">Salvar</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
