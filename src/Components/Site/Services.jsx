import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Services() {
  const [services, setServices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔹 Buscar dados do backend
  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((s, index) => ({
          number: String(index + 1).padStart(2, "0"),
          title: s.name,
          desc: s.description,
        }));
        setServices(formatted);
      })
      .catch((err) => console.error("Erro ao carregar serviços:", err));
  }, []);

  // Card individual
  const ServiceCard = ({ service, index, isActive, onClick }) => {
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={cardRef}
        onClick={onClick}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{
          // scale: 1.03,
          // boxShadow: "0 15px 25px rgba(167, 139, 250, 0.3)", // sem translate
        }}
        className={`flex items-center justify-between p-6 rounded-xl border cursor-pointer transition-all duration-300
          ${
            isActive
              ? "bg-gradient-to-r from-[#a78bfa]/30 to-[#6b3ff0]/30 border-[#a78bfa]/50 text-white shadow-lg shadow-purple-500/10"
              : "bg-gray-900/50 border-white/5 text-white/70 hover:border-[#a78bfa]/30 hover:bg-gray-900/70"
          }`}
      >
        <div className="flex items-start gap-5">
          <span
            className={`font-bold text-lg ${
              isActive ? "text-[#a78bfa]" : "text-white/50"
            }`}
          >
            {service.number}
          </span>

          <div>
            <h3
              className={`text-lg font-semibold mb-1 ${
                isActive
                  ? "bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent"
                  : "text-white"
              }`}
            >
              {service.title}
            </h3>
            <p
              className={`text-sm ${
                isActive ? "text-white/90" : "text-white/60"
              }`}
            >
              {service.desc}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="service" className="py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            My Quality Services
          </h2>
          <p className="text-[#a78bfa]/70 max-w-2xl mx-auto">
            We put your ideas and your wishes in the form of a unique web project that inspires you and your customers.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-5">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
