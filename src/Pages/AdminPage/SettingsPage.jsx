import { useState } from "react";
import { FaUserCircle, FaCog, FaLock, FaSignOutAlt } from "react-icons/fa";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: "Geraldo",
    email: "geraldo@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Perfil atualizado com sucesso!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Senha alterada com sucesso!");
    setFormData({ ...formData, currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    alert("Logout realizado!");
    // Aqui você pode adicionar a lógica de logout real
  };

  return (
    <div className="space-y-8">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Configurações</h2>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Perfil do usuário */}
        <div className="bg-gray-900/80 border border-purple-700 rounded-xl p-6 flex flex-col items-center gap-4">
          <FaUserCircle className="text-purple-400 text-6xl" />
          <h3 className="text-white font-semibold text-lg">{formData.name}</h3>
          <p className="text-gray-400">{formData.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Alterar Perfil */}
        <div className="bg-gray-900/80 border border-purple-700 rounded-xl p-6 space-y-4">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <FaCog /> Perfil
          </h3>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-1">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 outline-none focus:border-purple-400"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 outline-none focus:border-purple-400"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition"
            >
              Salvar Perfil
            </button>
          </form>
        </div>

        {/* Alterar Senha */}
        <div className="bg-gray-900/80 border border-purple-700 rounded-xl p-6 space-y-4">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <FaLock /> Alterar Senha
          </h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-1">Senha Atual</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 outline-none focus:border-purple-400"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-1">Nova Senha</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 outline-none focus:border-purple-400"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm mb-1">Confirmar Nova Senha</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 outline-none focus:border-purple-400"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition"
            >
              Alterar Senha
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
