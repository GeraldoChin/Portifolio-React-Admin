import { FaProjectDiagram, FaUsers, FaStar, FaChartLine, FaPlus } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const stats = [
    { title: "Projetos", value: "24", icon: <FaProjectDiagram />, trend: "+3" },
    { title: "Clientes", value: "12", icon: <FaUsers />, trend: "+2" },
    { title: "Avaliações", value: "4.9", icon: <FaStar />, trend: "+0.1" },
    { title: "Crescimento", value: "+18%", icon: <FaChartLine />, trend: "+5%" },
  ];

  const projects = [
    { name: "Portfolio Website", status: "Concluído" },
    { name: "Dashboard UI", status: "Em progresso" },
    { name: "Landing Page", status: "Concluído" },
    { name: "Mobile App", status: "Planejado" },
  ];

  const chartData = [
    { month: "Jan", projects: 4, clients: 2 },
    { month: "Feb", projects: 6, clients: 3 },
    { month: "Mar", projects: 8, clients: 4 },
    { month: "Apr", projects: 12, clients: 5 },
    { month: "May", projects: 18, clients: 8 },
    { month: "Jun", projects: 24, clients: 12 },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">

      {/* Ações rápidas */}
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center gap-2 px-5 py-2 bg-[#a78bfa]/20 text-[#a78bfa] rounded-lg hover:bg-[#a78bfa]/30 transition">
          <FaPlus /> Novo Projeto
        </button>
        <button className="px-5 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition">
          Gerir Serviços
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-gray-900/80 border border-[#a78bfa]/20 rounded-xl p-6 flex items-center justify-between 
            hover:scale-[1.02] hover:shadow-xl hover:shadow-[#a78bfa]/10 transition-all duration-300"
          >
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <p className="text-xs text-green-400 mt-1">{stat.trend} este mês</p>
            </div>
            <div className="text-3xl text-[#a78bfa]">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Conteúdo inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Projetos recentes */}
        <div className="lg:col-span-1 bg-gray-900/80 border border-[#a78bfa]/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Últimos Projetos</h3>
          <div className="space-y-4">
            {projects.map((project, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-gray-800/60 rounded-lg hover:bg-[#a78bfa]/10 transition"
              >
                <span className="text-gray-300">{project.name}</span>
                <span className={`text-xs px-3 py-1 rounded-full 
                  ${project.status === "Concluído" ? "bg-green-500/20 text-green-400" :
                    project.status === "Em progresso" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-gray-500/20 text-gray-400"}`}
                >
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico */}
        <div className="lg:col-span-2 bg-gray-900/80 border border-[#a78bfa]/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Crescimento Mensal</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid stroke="#6b21a8" strokeDasharray="5 5" />
              <XAxis dataKey="month" stroke="#a78bfa" />
              <YAxis stroke="#a78bfa" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="projects" stroke="#a78bfa" strokeWidth={3} />
              <Line type="monotone" dataKey="clients" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
