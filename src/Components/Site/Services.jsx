import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaCode, FaPencilRuler, FaSearch, FaShoppingCart, FaArrowRight, FaCheck, FaMobileAlt } from "react-icons/fa";


const services = [
  {
    number: "01",
    icon: <FaCode />,
    title: "Web Development",
    short: "Websites modernos, rápidos e escaláveis.",
    desc: "Desenvolvimento de aplicações web completas utilizando React, Tailwind CSS e Node.js. Foco em performance, acessibilidade e boas práticas de código.",
    features: ["React/Tailwind CSS", "Node.js & APIs REST", "Responsive Design"], // corrigido
    accent: "#a78bfa",
  },
  {
    number: "02",
    icon: <FaPencilRuler />,
    title: "UI/UX Design",
    short: "Interfaces intuitivas centradas no utilizador.",
    desc: "Design de interfaces elegantes com foco na experiência do utilizador. Desde wireframes e protótipos até ao handoff para desenvolvimento.",
    features: ["Figma Prototyping", "Design Systems", "User Research", "Usability Testing"],
    accent: "#c084fc",
  },
  {
    number: "03",
    icon: <FaMobileAlt />, // ícone para mobile
    title: "React Native App Development",
    short: "Aplicações móveis nativas e híbridas com React Native.",
    desc: "Desenvolvimento de apps iOS e Android utilizando React Native, com foco em performance, UI/UX intuitiva e integração com APIs e serviços externos.",
    features: ["React Native", "iOS & Android", "API Integration", "Responsive & Smooth UX"],
    accent: "#34d399",
  },
  {
    number: "04",
    icon: <FaShoppingCart />,
    title: "E-commerce Solutions",
    short: "Lojas online que convertem visitantes em clientes.",
    desc: "Criação de lojas online com experiência de compra fluida, integração de pagamentos e gestão de inventário simplificada.",
    features: ["Shopify / WooCommerce", "Payment Gateways", "Product Management", "Conversion Optimisation"],
    accent: "#e879f9",
  },
];


function ServiceCard({ service, index, isActive, onClick }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
    >
      <div
        className={`relative rounded-2xl border transition-all duration-500 overflow-hidden
          ${isActive
            ? "border-purple-500/50 bg-gray-900/80 shadow-[0_0_40px_rgba(168,85,247,0.1)]"
            : "border-purple-900/30 bg-gray-900/40 hover:border-purple-500/25 hover:bg-gray-900/60"
          }`}
      >
        {/* top accent line */}
        <div
          className="absolute top-0 left-0 h-px transition-all duration-700"
          style={{
            width:      isActive ? "100%" : "0%",
            background: `linear-gradient(to right, transparent, ${service.accent}, transparent)`,
          }}
        />

        {/* subtle bg glow when active */}
        {isActive && (
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 15% 50%, ${service.accent}, transparent 65%)` }}
          />
        )}

        <div className="relative p-6 sm:p-7">
          <div className="flex items-start gap-5">

            {/* icon */}
            <div
              className={`flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center text-base transition-all duration-300
                ${isActive
                  ? "border-purple-500/40 bg-purple-500/15 text-purple-300"
                  : "border-purple-900/40 bg-gray-800/60 text-purple-500/50 group-hover:border-purple-500/30 group-hover:text-purple-400"
                }`}
            >
              {service.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? "text-purple-400" : "text-gray-600"}`}>
                    {service.number}
                  </span>
                  <h3 className={`text-base sm:text-lg font-semibold mt-0.5 transition-all duration-300
                    ${isActive
                      ? "bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent"
                      : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${isActive ? "text-gray-300" : "text-gray-500"}`}>
                    {service.short}
                  </p>
                </div>

                {/* arrow rotates on active */}
                <motion.div
                  animate={{ rotate: isActive ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex-shrink-0 mt-1.5 transition-colors duration-300
                    ${isActive ? "text-purple-400" : "text-gray-700 group-hover:text-purple-600"}`}
                >
                  <FaArrowRight size={12} />
                </motion.div>
              </div>

              {/* expanded */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                    exit={{   opacity: 0, height: 0,       marginTop: 0  }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {service.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {service.features.map(f => (
                        <span
                          key={f}
                          className="flex items-center gap-1.5 text-[11px] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full"
                        >
                          <FaCheck size={7} className="text-purple-400" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="service" className="py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-6">

        {/* título — mantido igual ao original */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            My Quality Services
          </h2>
          <p className="text-[#a78bfa]/70 max-w-2xl mx-auto">
            We put your ideas and your wishes in the form of a unique web project that inspires you and your customers.
          </p>
        </div>

        {/* cards */}
        <div className="space-y-3">
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              index={i}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i === activeIndex ? -1 : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}