import { useEffect, useRef, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);

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

  const contactItems = [
    { icon: FaPhone,         label: "Contacte-me",   value: "+258 87 5696885" },
    { icon: FaEnvelope,      label: "Email ",  value: "geeraldochin@gmail.com" },
    { icon: FaMapMarkerAlt,  label: "Endereço",   value: "Beira, Moçambique" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const apiUrl = import.meta.env.VITE_CONTACT_API_URL || "/api/contact";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível enviar a mensagem.");

      form.reset();
      setStatus({ type: "success", message: "Mensagem enviada com sucesso. Obrigado pelo contacto!" });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Erro de ligação. Tente novamente mais tarde." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#0d0b14]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">

 {/* Info */}
<div ref={infoRef}>
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
    Vamos trabalhar juntos!
  </h2>

  <p className="text-white/70 mb-8 leading-relaxed max-w-md text-sm sm:text-base">
    Desenvolvo e crio soluções digitais simples, modernas e eficientes.
    Tenho paixão pelo que faço e transformo ideias em experiências
    digitais funcionais.
  </p>

  <div className="flex flex-col gap-5 sm:gap-6">
    {contactItems.map(({ icon: Icon, label, value }) => (
      <div key={label} className="flex items-center gap-4">
        <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center bg-gray-900/50 border border-[#a78bfa]/30 rounded-lg text-[#a78bfa] text-lg sm:text-xl">
          <Icon />
        </div>

        <div>
          <h4 className="text-[#a78bfa] text-xs sm:text-sm mb-0.5">
            {label}
          </h4>
          <p className="text-white/80 text-sm sm:text-base">
            {value}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
          {/* Form */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="bg-gray-900/40 backdrop-blur border border-white/5 rounded-xl p-5 sm:p-8 flex flex-col gap-4 sm:gap-5 shadow-lg shadow-purple-500/5">
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[#a78bfa] text-xs sm:text-sm mb-1">Nome *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    required
                    className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white text-sm placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[#a78bfa] text-xs sm:text-sm mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    required
                    className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white text-sm placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[#a78bfa] text-xs sm:text-sm mb-1">Assunto *</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Assunto *"
                  required
                  className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white text-sm placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#a78bfa] text-xs sm:text-sm mb-1">Mensagem *</label>
                <textarea
                  placeholder="Mensagem *"
                  name="message"
                  required
                  className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white text-sm placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none min-h-[120px] resize-y transition"
                />
              </div>

              {status && (
                <p role="status" aria-live="polite" className={`text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="w-full mt-2 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md shadow-purple-500/20 text-sm sm:text-base"
              >
                {isSending ? "A enviar..." : "Enviar mensagem"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
