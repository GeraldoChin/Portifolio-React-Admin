import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaProjectDiagram,
  FaStar,
  FaChartLine
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const API_URL = "http://localhost:5000/api/projects";
const UPLOADS_URL = "http://localhost:5000/uploads";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "Planejado",
    image: null
  });

  // 🔹 Buscar projetos
  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 🔹 Abrir modal (novo ou editar)
  const openForm = (project = null) => {
    setShowForm(true);

    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        status: project.status,
        image: null
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        category: "",
        status: "Planejado",
        image: null
      });
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      status: "Planejado",
      image: null
    });
  };

  // 🔹 Criar / Editar
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("status", formData.status);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingProject) {
        await fetch(`${API_URL}/${editingProject.id}`, {
          method: "PUT",
          body: data
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          body: data
        });
      }

      closeForm();
      fetchProjects();
    } catch (err) {
      console.error("Erro ao salvar projeto:", err);
    }
  };

  // 🔹 Deletar
  const deleteProject = async (id) => {
    if (!confirm("Deseja realmente excluir este projeto?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchProjects();
    } catch (err) {
      console.error("Erro ao deletar projeto:", err);
    }
  };

  // 🔹 Estatísticas
  const statusCounts = [
    { name: "Concluído", value: projects.filter(p => p.status === "Concluído").length },
    { name: "Em progresso", value: projects.filter(p => p.status === "Em progresso").length },
    { name: "Planejado", value: projects.filter(p => p.status === "Planejado").length },
  ];

  const COLORS = ["#16a34a", "#eab308", "#6b7280"];

  const stats = [
    { title: "Total de Projetos", value: projects.length, icon: <FaProjectDiagram /> },
    { title: "Concluídos", value: statusCounts[0].value, icon: <FaStar /> },
    { title: "Em progresso", value: statusCounts[1].value, icon: <FaChartLine /> },
  ];

  return (
    <div className="space-y-8 animate-fadeIn p-6">

      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gerenciar Projetos</h2>
        <button
          type="button"
          onClick={() => openForm()}
          className="flex items-center gap-2 px-5 py-2 bg-[#a78bfa]/20 text-[#a78bfa] rounded-lg hover:bg-[#a78bfa]/30 transition"
        >
          <FaPlus /> Novo Projeto
        </button>
      </div>

      {/* Cards + Gráfico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 grid sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-gray-900/80 rounded-xl p-6 flex items-center gap-4">
              <div className="text-3xl text-[#a78bfa]">{s.icon}</div>
              <div>
                <p className="text-gray-400 text-sm">{s.title}</p>
                <h3 className="text-white text-xl font-semibold">{s.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 bg-gray-900/80 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusCounts} dataKey="value" nameKey="name" outerRadius={80} label>
                {statusCounts.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <div key={p.id} className="bg-gray-900/80 rounded-xl overflow-hidden">
            {p.image && (
              <img
                src={`${UPLOADS_URL}/${p.image}`}
                alt={p.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-white font-semibold">{p.title}</h3>
              <p className="text-gray-400 text-sm">{p.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-gray-900/80 rounded-xl p-6 overflow-x-auto">
        <table className="w-full text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3">Título</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Status</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-gray-800">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.status}</td>
                <td className="p-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => openForm(p)}
                    className="p-2 bg-gray-700 rounded"
                  >
                    <FaEdit />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteProject(p.id)}
                    className="p-2 bg-red-700 rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded-xl w-full max-w-lg space-y-4"
          >
            <input
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Título"
              required
              className="w-full p-3 bg-gray-800 text-white rounded"
            />

            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descrição"
              required
              className="w-full p-3 bg-gray-800 text-white rounded"
            />

            <input
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              placeholder="Categoria"
              required
              className="w-full p-3 bg-gray-800 text-white rounded"
            />

            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-3 bg-gray-800 text-white rounded"
            >
              <option value="Planejado">Planejado</option>
              <option value="Em progresso">Em progresso</option>
              <option value="Concluído">Concluído</option>
            </select>

            <input
              type="file"
              onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
              className="text-white"
            />

            <div className="flex justify-end gap-3">
              <button type="button" onClick={closeForm}>Cancelar</button>
              <button type="submit" className="bg-[#a78bfa] px-4 py-2 rounded">
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}