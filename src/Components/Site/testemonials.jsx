import { useRef } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

export default function Testimonials() {
  // 🔹 Depoimentos estáticos
  const testimonials = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "CEO",
      company: "TechCorp",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "They transformed our digital presence with an amazing web project!",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Project Manager",
      company: "Startup Inc.",
      avatar: "https://i.pravatar.cc/150?img=2",
      rating: 4,
      text: "Professional and reliable, highly recommended for web solutions.",
    },
    {
      id: 3,
      name: "Carla Mendes",
      role: "Marketing Lead",
      company: "Creative Studio",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      text: "A unique approach to web development, very creative and inspiring.",
    },
  ];

  const AnimatedCard = ({ children, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
        className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl p-8 relative"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-[#0f0a1a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            My Client's Stories
          </h2>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Empowering people in a new digital journey with my super services
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <AnimatedCard key={t.id} index={index}>
              <FaQuoteLeft className="absolute top-4 right-4 text-[#a78bfa]/20 text-3xl" />

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#a78bfa]"
                />
                <div>
                  <h4 className="text-white font-semibold">{t.name}</h4>
                  <p className="text-[#a78bfa] text-sm">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>

              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < t.rating ? "text-yellow-400" : "text-gray-600"}
                  />
                ))}
              </div>

              <p className="text-[#b8a9d8] text-sm leading-relaxed">“{t.text}”</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
