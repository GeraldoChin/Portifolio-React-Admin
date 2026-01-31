import { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const API_URL = "http://localhost:5000/api/testimonials";

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error("Erro ao carregar depoimentos", err);
    }
  };

  return (
    <section className="py-20 bg-gray-900/20">
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
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl p-8 relative"
            >
              <FaQuoteLeft className="absolute top-4 right-4 text-[#a78bfa]/20 text-3xl" />

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    t.avatar
                      ? `http://localhost:5000${t.avatar}`
                      : "https://i.pravatar.cc/150"
                  }
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

              {/* Stars */}
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < t.rating ? "text-yellow-400" : "text-gray-600"}
                  />
                ))}
              </div>

              <p className="text-[#b8a9d8] text-sm leading-relaxed">
                “{t.text}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
