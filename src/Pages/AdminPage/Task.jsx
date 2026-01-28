export default function Tasks() {
  const tasks = [
    { name: "Atualizar portfólio", status: "pendente" },
    { name: "Revisar projetos", status: "em progresso" },
    { name: "Publicar site", status: "concluído" },
  ];

  return (
    <div className="bg-gray-900/80 border border-[#a78bfa]/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Tarefas</h3>
      <div className="space-y-3">
        {tasks.map((task, i) => (
          <div key={i} className="flex justify-between bg-gray-800/60 p-3 rounded-lg">
            <span className="text-gray-300">{task.name}</span>
            <span className={`text-xs px-3 py-1 rounded-full
              ${task.status === "concluído" && "bg-green-500/20 text-green-400"}
              ${task.status === "em progresso" && "bg-yellow-500/20 text-yellow-400"}
              ${task.status === "pendente" && "bg-red-500/20 text-red-400"}
            `}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
