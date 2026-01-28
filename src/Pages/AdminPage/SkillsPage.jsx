import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaReact, FaNodeJs, FaCss3Alt, FaJsSquare } from "react-icons/fa";

export default function SkillsPage() {
  const [skills, setSkills] = useState([
    { id: 1, name: "React.js", icon: <FaReact className="text-blue-400" />, percent: 90 },
    { id: 2, name: "Node.js", icon: <FaNodeJs className="text-green-500" />, percent: 80 },
    { id: 3, name: "CSS3", icon: <FaCss3Alt className="text-blue-600" />, percent: 85 },
    { id: 4, name: "JavaScript", icon: <FaJsSquare className="text-yellow-400" />, percent: 95 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", icon: null, percent: 0 });

  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    setFormData({ name: "", icon: null, percent: 0 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSkills([...skills, { ...formData, id: Date.now() }]);
    closeForm();
  };

  const deleteSkill = (id) => setSkills(skills.filter(s => s.id !== id));

  return (
    <div className="space-y-10 p-6 bg-gray-950 min-h-screen">

      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-white">Gerenciar Skills</h2>
        <button
          onClick={openForm}
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
              <div className="text-4xl">{skill.icon}</div>
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
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"><FaEdit /></button>
              <button onClick={() => deleteSkill(skill.id)} className="p-2 bg-red-700 hover:bg-red-600 rounded-lg transition"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-lg animate-fadeIn">
            <h3 className="text-2xl text-white font-semibold mb-6">Adicionar Nova Skill</h3>
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
