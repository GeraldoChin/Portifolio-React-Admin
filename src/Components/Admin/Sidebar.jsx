import {
  FaBars,
  FaTimes,
  FaCog,
  FaHome,
  FaProjectDiagram,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaComment,
  FaSignOutAlt,
  FaPenFancy, // Blogs
  FaEnvelope, // Contact
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin" },
    { name: "Projetos", icon: <FaProjectDiagram />, path: "/admin/projects" },
    { name: "Serviços", icon: <FaCog />, path: "/admin/services" },
    { name: "Experiência", icon: <FaBriefcase />, path: "/admin/experience" },
    { name: "Educação", icon: <FaGraduationCap />, path: "/admin/education" },
    { name: "Skills", icon: <FaStar />, path: "/admin/skills" },
    { name: "Depoimentos", icon: <FaComment />, path: "/admin/testimonials" },
    { name: "Blogs", icon: <FaPenFancy />, path: "/admin/blogs" },
    { name: "Contact", icon: <FaEnvelope />, path: "/admin/contact" }, // Novo link
  ];

  return (
    <>
      {/* Botão Mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 text-white bg-purple-600 p-2 rounded-lg"
      >
        <FaBars />
      </button>

      {/* Overlay Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar Mobile */}
      <aside
        className={`
          flex flex-col bg-gray-900 border-r border-purple-800 transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          lg:flex-shrink-0 lg:relative lg:translate-x-0
          fixed lg:hidden top-0 h-screen z-50
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Topo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-purple-800">
          {!collapsed && <span className="text-purple-400 font-bold">Admin Panel</span>}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-300 hover:text-white hidden lg:block"
          >
            {collapsed ? <FaTimes /> : <FaBars />}
          </button>

          {!collapsed && (
            <button
              onClick={() => setMobileOpen(false)}
              className="text-gray-300 hover:text-white lg:hidden"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Perfil */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-purple-800">
          <img
            src="https://i.pravatar.cc/100"
            alt="Perfil"
            className="w-10 h-10 rounded-full border border-purple-500"
          />
          {!collapsed && (
            <div>
              <p className="text-white font-semibold">Geraldo</p>
              <p className="text-sm text-gray-400">Admin</p>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition relative group"
            >
              <span className="text-purple-400 text-lg">{item.icon}</span>
              {!collapsed && item.name}

              {collapsed && (
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 rounded-md text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Rodapé */}
        <div className="p-3 border-t border-purple-800 space-y-2">
          <Link
            to="/admin/settings"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-purple-700 text-white rounded-lg transition w-full justify-center"
          >
            <FaCog /> {!collapsed && "Configurações"}
          </Link>
          <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition">
            <FaSignOutAlt /> {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Sidebar Desktop */}
      <aside
        className={`
          hidden lg:flex flex-col bg-gray-900 border-r border-purple-800 transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          flex-shrink-0
        `}
      >
        {/* Topo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-purple-800">
          {!collapsed && <span className="text-purple-400 font-bold">Admin Panel</span>}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-300 hover:text-white"
          >
            {collapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        {/* Perfil */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-purple-800">
          <img
            src="https://i.pravatar.cc/100"
            alt="Perfil"
            className="w-10 h-10 rounded-full border border-purple-500"
          />
          {!collapsed && (
            <div>
              <p className="text-white font-semibold">Geraldo</p>
              <p className="text-sm text-gray-400">Admin</p>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition relative group"
            >
              <span className="text-purple-400 text-lg">{item.icon}</span>
              {!collapsed && item.name}

              {collapsed && (
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 rounded-md text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Rodapé */}
        <div className="p-3 border-t border-purple-800 space-y-2">
          <Link
            to="/admin/settings"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-purple-700 text-white rounded-lg transition w-full justify-center"
          >
            <FaCog /> {!collapsed && "Configurações"}
          </Link>
          <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition">
            <FaSignOutAlt /> {!collapsed && "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}
