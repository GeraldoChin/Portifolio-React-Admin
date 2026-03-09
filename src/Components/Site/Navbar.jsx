import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "#home", type: "scroll" },
    { name: "About", href: "/about", type: "route" },
    { name: "Service", href: "#service", type: "scroll" },
    { name: "Resume", href: "/resume", type: "route" },
    { name: "Contact", href: "#contact", type: "scroll" },
  ];

  // Remove o link da página atual (para rotas)
  const filteredNavItems = navItems.filter(item => {
    if (item.type === "route" && item.href === location.pathname) return false;
    return true;
  });

  // Mostrar navbar quando o mouse está no topo
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY < 50) setShowNavbar(true);
    };

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavbar(false);
      else setShowNavbar(true);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleClick = (item) => {
    setMenuOpen(false);

    if (item.type === "scroll") {
      if (location.pathname === "/") {
        const section = document.querySelector(item.href);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: item.href } });
      }
    } else if (item.type === "route") {
      navigate(item.href);
    }
  };

  // Definir cor do navbar conforme a página
  const headerBg = (location.pathname === "/resume" || location.pathname === "/hireme")
    ? "bg-gray-900"
    : "bg-gray-950";

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 left-0 w-full z-50 ${headerBg} backdrop-blur shadow-md transition-colors`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div   onClick={() => navigate("/admin")} className="flex items-center gap-3 font-bold text-white text-lg">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 text-2xl">
                G
              </div>
              <span>Geraldo Chin</span>
            </div>

            <ul className="hidden md:flex items-center gap-8">
              {filteredNavItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleClick(item)}
                    className="text-white text-sm hover:text-purple-400 transition"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate("/hireme")}
                  className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] hover:opacity-90 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:shadow-[0_0_24px_rgba(167,139,250,0.4)] self-start sm:self-auto"
                >
                  Hire Me
                </button>
              </li>
            </ul>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white text-2xl"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Menu mobile */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`md:hidden overflow-hidden ${headerBg}`}
              >
                <ul className="flex flex-col gap-4 px-6 py-4">
                  {filteredNavItems.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => handleClick(item)}
                        className="text-white text-lg hover:text-purple-400 transition block text-left w-full"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => navigate("/hireme")}
                      className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-6 py-2 rounded-full transition block text-center w-full"
                    >
                      Hire Me
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
