import { useState, useEffect } from "react";
import { FaBell, FaCog, FaSignOutAlt, FaMoon, FaSun, FaUser } from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className=" m-7 h-20 bg-gray-900/80 dark:bg-gray-900/80 backdrop-blur border-b border-[#a78bfa]/30 px-8 flex items-center justify-between">

      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-400">Gerencie seu portfólio</p>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-5 relative">

        {/* Dark / Light */}
        <button
          onClick={() => setDark(!dark)}
          className="p-3 rounded-lg bg-gray-800/50 hover:bg-[#a78bfa]/20 text-gray-300 hover:text-[#a78bfa] transition"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notificação */}
        <button className="relative p-3 rounded-lg bg-gray-800/50 hover:bg-[#a78bfa]/20 text-gray-300 hover:text-[#a78bfa] transition">
          <FaBell />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#a78bfa] rounded-full"></span>
        </button>

        {/* Perfil */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-gray-800/50 hover:bg-[#a78bfa]/20 px-3 py-2 rounded-lg transition"
          >
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Perfil"
              className="w-10 h-10 rounded-full border-2 border-[#a78bfa]"
            />
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-white">Geraldo</p>
              <p className="text-xs text-gray-400">Administrador</p>
            </div>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-[#a78bfa]/20 rounded-xl shadow-lg overflow-hidden z-50">
              <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-[#a78bfa]/20 transition">
                <FaUser /> Perfil
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-[#a78bfa]/20 transition">
                <FaCog /> Configurações
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 transition">
                <FaSignOutAlt /> Sair
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
