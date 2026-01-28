export default function Navbar() {
  return (
    <header className="relative z-50 py-5">
      <div className="max-w-7xl mx-auto px-6 ">
        <nav className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3 font-bold text-white">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 text-2xl">
              G
            </div>
            <span>Geraldo Chin</span>
          </div>

          {/* Links */}
          <ul className="flex items-center gap-8">
            {["Home", "About", "Service", "Resume", "Contact"].map((item) => (
              <li
                key={item}
                className="text-white text-sm hover:text-purple-400 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Botão */}
          <a
            href="#"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-6 py-2 rounded-full transition"
          >
            Hire Me
          </a>

        </nav>
      </div>
    </header>
  );
}
