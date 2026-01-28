export default function Footer() {
  return (
    <footer className="text-center py-10 border-t border-purple-500/20 ">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
            G
          </div>
          <span className="text-white font-semibold">Gerrald</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {["Home", "About", "Service", "Resume", "Skills", "Contact"].map((link, i) => (
            <a
              key={i}
              href={`#${link.toLowerCase()}`}
              className="text-[#a78bfa] hover:text-white transition"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[#a78bfa] text-sm">
          © 2024 Gerrald. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
