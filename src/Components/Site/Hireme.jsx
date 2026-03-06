import { useEffect, useRef, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "./Navbar";

export default function HireMe() {
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    const elements = [infoRef.current, formRef.current];
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

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

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    // Aqui você pode enviar para seu backend
    // Exemplo com fetch:
    /*
    fetch("/api/hire", {
      method: "POST",
      body: formData
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
    */

    alert("Form submitted! (implement backend to handle files)");
  };

  return (
    <section className="py-20 bg-gray-900 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            Hire Me
          </h1>
          <p className="text-purple-300 mt-4 max-w-2xl mx-auto">
            I am available for freelance or full-time work. Let's build something amazing together!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div ref={infoRef}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Let's collaborate!
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed max-w-md">
              I design and code beautifully simple solutions. Whether you need a website, web app, or UX design, I can help bring your project to life.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-900/50 border border-[#a78bfa]/30 rounded-lg text-[#a78bfa] text-xl">
                  <FaPhone />
                </div>
                <div>
                  <h4 className="text-[#a78bfa] text-sm mb-1">Call Me</h4>
                  <p className="text-white/80">+258 84 123 4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-900/50 border border-[#a78bfa]/30 rounded-lg text-[#a78bfa] text-xl">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-[#a78bfa] text-sm mb-1">Email Me</h4>
                  <p className="text-white/80">gerrald@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-900/50 border border-[#a78bfa]/30 rounded-lg text-[#a78bfa] text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-[#a78bfa] text-sm mb-1">Location</h4>
                  <p className="text-white/80">Nampula, Moçambique</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef}>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="bg-gray-900/40 backdrop-blur border border-white/5 rounded-xl p-8 flex flex-col gap-5 shadow-lg shadow-purple-500/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[#a78bfa] text-sm mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    required
                    className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#a78bfa] text-sm mb-1">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    required
                    className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[#a78bfa] text-sm mb-1">Project Details *</label>
                <textarea
                  name="project"
                  placeholder="Describe your project *"
                  required
                  className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none min-h-[120px] resize-y transition"
                />
              </div>

              {/* Upload de Arquivos */}
              <div className="flex flex-col">
                <label className="text-[#a78bfa] text-sm mb-1">Attach Files</label>
                <input
                  type="file"
                  name="files"
                  multiple
                  onChange={handleFileChange}
                  className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-3 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md shadow-purple-500/20"
              >
                Send Hire Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
