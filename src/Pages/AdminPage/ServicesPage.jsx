import { useState, useMemo } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaCogs, FaLayerGroup, FaRocket, FaUsers } from "react-icons/fa";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function ServicesPage() {
  const [services, setServices] = useState([
    { id: 1, name: "Web Design", description: "Criação de sites responsivos", icon: <FaCogs />, category: "Design" },
    { id: 2, name: "SEO", description: "Otimização para motores de busca", icon: <FaRocket />, category: "Marketing" },
    { id: 3, name: "Consultoria", description: "Consultoria tecnológica", icon: <FaLayerGroup />, category: "Consulting" },
    { id: 4, name: "Mobile App", description: "Aplicativos Android/iOS", icon: <FaUsers />, category: "Desenvolvimento" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", icon: "", category: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    setFormData({ name: "", description: "", icon: "", category: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setServices([...services, { ...formData, id: Date.now() }]);
    closeForm();
  };

  const deleteService = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const COLORS = ["#a78bfa", "#f472b6", "#34d399", "#facc15", "#60a5fa"];
  
  // Preparar dados do gráfico
  const chartData = useMemo(() => {
    const counts = {};
    services.forEach((s) => counts[s.category] = (counts[s.category] || 0) + 1);
    return Object.keys(counts).map((key) => ({ name: key, value: counts[key] }));
  }, [services]);

  // Filtrar serviços pela busca
  const filteredServices = useMemo(() => 
    services.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
    ), [services, searchTerm]
  );

  // Cards de números mais bonitos
//   const stats = [
//     { title: "Total de Serviços", value: services.length, icon: <FaCogs className="text-3xl" />, bg: "from-purple-500 to-indigo-500" },
//     { title: "Categorias", value: new Set(services.map(s => s.category)).size, icon: <FaLayerGroup className="text-3xl" />, bg: "from-pink-500 to-rose-500" },
//     { title: "Ativos", value: services.length, icon: <FaUsers className="text-3xl" />, bg: "from-green-500 to-lime-500" },
//     { title: "Último Adicionado", value: services[services.length-1]?.name || "-", icon: <FaRocket className="text-3xl" />, bg: "from-yellow-400 to-orange-400" },
//   ];

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Cabeçalho e ações */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Gerenciar Serviços</h2>
        <button
          onClick={openForm}
          className="flex items-center gap-2 px-5 py-2 bg-[#a78bfa]/20 text-[#a78bfa] rounded-lg hover:bg-[#a78bfa]/30 transition"
        >
          <FaPlus /> Novo Serviço
        </button>
      </div>

    
    {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/80 rounded-xl p-6 flex flex-col items-center hover:shadow-lg hover:shadow-[#a78bfa]/20 transition">
          <p className="text-gray-400">Total de Serviços</p>
          <h3 className="text-2xl font-bold text-white">{services.length}</h3>
        </div>
        <div className="bg-gray-900/80 rounded-xl p-6 flex flex-col items-center hover:shadow-lg hover:shadow-[#f472b6]/20 transition">
          <p className="text-gray-400">Categorias</p>
          <h3 className="text-2xl font-bold text-white">{new Set(services.map(s => s.category)).size}</h3>
        </div>
        <div className="bg-gray-900/80 rounded-xl p-6 flex flex-col items-center hover:shadow-lg hover:shadow-[#34d399]/20 transition">
          <p className="text-gray-400">Ativos</p>
          <h3 className="text-2xl font-bold text-white">{services.length}</h3>
        </div>
        <div className="bg-gray-900/80 rounded-xl p-6 flex flex-col items-center hover:shadow-lg hover:shadow-[#facc15]/20 transition">
          <p className="text-gray-400">Última Adição</p>
          <h3 className="text-2xl font-bold text-white">{services[services.length-1]?.name || "-"}</h3>
        </div>
      </div>

      {/* Grid: gráfico + cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de categorias */}
        <div className="lg:col-span-1 bg-gray-900/80 border border-[#a78bfa]/20 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 text-center">Distribuição por Categoria</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cards de serviços */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredServices.map(s => (
            <div key={s.id} className="bg-gray-900/80 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg hover:shadow-[#a78bfa]/20 transition">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-white font-semibold text-lg">{s.name}</h3>
              <p className="text-gray-400 text-sm mt-2">{s.description}</p>
              <span className="mt-2 text-xs px-2 py-1 rounded-full bg-purple-600/20 text-purple-400">{s.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filtro / Busca */}
      <div className="flex justify-end mb-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar serviços..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-[#a78bfa] border border-gray-700"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Tabela detalhada */}
      <div className="bg-gray-900/80 border border-[#a78bfa]/20 rounded-xl p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Tabela de Serviços</h3>
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-[#a78bfa]/20">
              <th className="p-3">Ícone</th>
              <th className="p-3">Nome</th>
              <th className="p-3">Descrição</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map(s => (
              <tr key={s.id} className="hover:bg-[#a78bfa]/10 transition">
                <td className="p-3 text-xl">{s.icon}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.description}</td>
                <td className="p-3">{s.category}</td>
                <td className="p-3 flex gap-2">
                  <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"><FaEdit /></button>
                  <button onClick={() => deleteService(s.id)} className="p-2 bg-red-800 hover:bg-red-700 rounded-lg transition"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-white font-semibold text-lg mb-4">Novo Serviço</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm mb-1">Nome</label>
                <input type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-800 text-white p-3 rounded-lg outline-none focus:border-[#a78bfa] border border-gray-700"/>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm mb-1">Descrição</label>
                <textarea required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gray-800 text-white p-3 rounded-lg outline-none border border-gray-700"/>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm mb-1">Ícone (React Icon)</label>
                <input type="text" required
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  placeholder="Ex: FaCogs"
                  className="bg-gray-800 text-white p-3 rounded-lg outline-none border border-gray-700"/>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-sm mb-1">Categoria</label>
                <input type="text" required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
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


