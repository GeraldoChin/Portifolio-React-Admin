import { useEffect, useRef, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaPaperclip } from "react-icons/fa";
import Navbar from "./Navbar";

const CONTACT_ITEMS = [
  { icon: <FaPhone />, label: "Call Me", value: "+258 84 123 4567" },
  { icon: <FaEnvelope />, label: "Email Me", value: "gerrald@example.com" },
  { icon: <FaMapMarkerAlt />, label: "Location", value: "Nampula, Moçambique" },
];

const SERVICE_TAGS = ["Web Design", "React Dev", "UI/UX", "Freelance", "Full-time"];

export default function HireMe() {
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const [files, setFiles] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const elements = [infoRef.current, formRef.current];
    const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transition = "all 0.6s ease-out";
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach((el) => {
      if (el) {
        el.style.opacity = 0;
        el.style.transform = "translateY(30px)";
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 bg-gray-900 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="mb-16 pt-8">
          <p className="text-[#a78bfa] text-xs tracking-[0.2em] uppercase mb-5 flex items-center gap-3">
            <span className="w-8 h-px bg-[#a78bfa] opacity-70 inline-block" />
            Available for work
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
              Let's build
            </span>
            <br />
            <span className="bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
              something{" "}
            </span>
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(167,139,250,0.5)" }}
            >
              great
            </span>
          </h1>

          <div className="flex flex-wrap gap-2">
            {SERVICE_TAGS.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border border-[#a78bfa]/20 rounded-full text-white/40 hover:border-[#a78bfa]/60 hover:text-[#a78bfa] transition cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Two columns ── */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* Info */}
          <div ref={infoRef}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
              Let's collaborate!
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed max-w-md">
              I design and code beautifully simple solutions. Whether you need a website, web app, or UX design, I can help bring your project to life.
            </p>

            {/* Contact items */}
            <div className="flex flex-col">
              {CONTACT_ITEMS.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-4 py-5 border-white/5 hover:bg-white/[0.02] transition rounded px-1
                    ${i === 0 ? "border-t border-b" : "border-b"}`}
                >
                  <div className="w-11 h-11 flex items-center justify-center bg-gray-900/50 border border-[#a78bfa]/20 rounded-lg text-[#a78bfa] text-base flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#a78bfa]/60 mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-white/80 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="inline-flex items-center gap-2 mt-8 px-4 py-2 bg-green-500/5 border border-green-500/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400/80 text-xs tracking-wide">
                Currently available for new projects
              </span>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="relative">
            {submitted && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-gray-900/95 rounded-xl backdrop-blur">
                <div className="w-14 h-14 flex items-center justify-center border border-green-500/30 bg-green-500/10 rounded-full text-green-400 text-2xl">
                  ✓
                </div>
                <p className="text-white font-semibold text-lg">Message sent!</p>
                <p className="text-white/40 text-sm">I'll get back to you shortly.</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-gray-900/40 backdrop-blur border border-white/5 rounded-xl p-8 flex flex-col gap-5 shadow-lg shadow-purple-500/5 relative overflow-hidden"
            >
              {/* top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a78bfa]/40 to-transparent" />

              <p className="text-white font-semibold text-lg mb-0">Send a message</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#a78bfa] text-xs tracking-widest uppercase">Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white text-sm placeholder:text-white/30 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#a78bfa] text-xs tracking-widest uppercase">Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    required
                    className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white text-sm placeholder:text-white/30 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#a78bfa] text-xs tracking-widest uppercase">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What's it about?"
                  className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white text-sm placeholder:text-white/30 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#a78bfa] text-xs tracking-widest uppercase">Project Details *</label>
                <textarea
                  name="project"
                  placeholder="Describe your project, timeline, and budget..."
                  required
                  className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white text-sm placeholder:text-white/30 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none min-h-[120px] resize-y transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#a78bfa] text-xs tracking-widest uppercase">Attachments</label>
                <label className="cursor-pointer flex items-center gap-3 bg-gray-900/60 border border-dashed border-[#a78bfa]/20 rounded-md p-3 text-white/35 hover:border-[#a78bfa]/50 hover:text-[#a78bfa]/70 transition text-sm">
                  <FaPaperclip className="opacity-50 flex-shrink-0" />
                  {files && files.length > 0
                    ? `${files.length} file(s) selected`
                    : "Click to attach files..."}
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-1 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md shadow-purple-500/20 flex items-center justify-center gap-2"
              >
                Send Hire Request
                <FaArrowRight className="text-xs" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}