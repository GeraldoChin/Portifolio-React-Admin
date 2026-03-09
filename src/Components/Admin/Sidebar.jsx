import {
  FaBars, FaTimes, FaCog, FaHome, FaProjectDiagram,
  FaBriefcase, FaGraduationCap, FaStar, FaComment,
  FaSignOutAlt, FaPenFancy, FaEnvelope,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { name: "Dashboard",   icon: <FaHome />,          path: "/admin" },
  { name: "Projetos",    icon: <FaProjectDiagram />, path: "/admin/projects" },
  { name: "Serviços",    icon: <FaCog />,            path: "/admin/services" },
  { name: "Experiência", icon: <FaBriefcase />,      path: "/admin/experience" },
  { name: "Educação",    icon: <FaGraduationCap />,  path: "/admin/education" },
  { name: "Skills",      icon: <FaStar />,           path: "/admin/skills" },
  { name: "Depoimentos", icon: <FaComment />,        path: "/admin/testimonials" },
  { name: "Blogs",       icon: <FaPenFancy />,       path: "/admin/blogs" },
  { name: "Contact",     icon: <FaEnvelope />,       path: "/admin/contact" },
];

function SidebarContent({ collapsed, setCollapsed, onClose }) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-gray-900 border-r border-white/5">

      {/* Topo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/5 flex-shrink-0">
        {!collapsed && (
          <span className="text-[#a78bfa] font-bold text-sm tracking-wide">
            Admin Panel
          </span>
        )}
        <button
          onClick={onClose ?? (() => setCollapsed(!collapsed))}
          className="text-gray-400 hover:text-white transition ml-auto"
        >
          {onClose ? <FaTimes /> : collapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* Perfil */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-white/5 flex-shrink-0 ${collapsed ? "justify-center" : ""}`}>
        <img
          src="https://i.pravatar.cc/100"
          alt="Perfil"
          className="w-9 h-9 rounded-full border border-[#a78bfa]/40 flex-shrink-0"
        />
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-semibold text-sm truncate">Geraldo</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        )}
      </div>

      {/* Menu — scroll aqui */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 min-h-0">
        {menu.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition relative group
                ${active
                  ? "bg-[#a78bfa]/15 text-[#a78bfa] border border-[#a78bfa]/20"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <span className={`text-base flex-shrink-0 ${active ? "text-[#a78bfa]" : "text-gray-500 group-hover:text-[#a78bfa]"} transition`}>
                {item.icon}
              </span>

              {!collapsed && (
                <span className="text-sm truncate">{item.name}</span>
              )}

              {/* Tooltip quando collapsed */}
              {collapsed && (
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-gray-800 border border-white/10 rounded-lg text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div className="p-3 border-t border-white/5 space-y-2 flex-shrink-0">
        <Link
          to="/admin/settings"
          onClick={onClose}
          className={`flex items-center gap-2 px-3 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition text-sm
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <FaCog className="flex-shrink-0" />
          {!collapsed && <span>Configurações</span>}
        </Link>

        <button
          className={`w-full flex items-center gap-2 bg-red-600/80 hover:bg-red-600 text-white py-2.5 px-3 rounded-lg transition text-sm
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <FaSignOutAlt className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* Botão abrir mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 text-white bg-[#a78bfa] p-2 rounded-lg shadow-lg"
      >
        <FaBars />
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Mobile */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50 w-64
          lg:hidden
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent
          collapsed={false}
          setCollapsed={setCollapsed}
          onClose={() => setMobileOpen(false)}
        />
      </aside>

      {/* Sidebar Desktop */}
      <aside
        className={`
          hidden lg:block flex-shrink-0 h-screen sticky top-0
          transition-all duration-300
          ${collapsed ? "w-[72px]" : "w-64"}
        `}
      >
        <SidebarContent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onClose={null}
        />
      </aside>
    </>
  );
}