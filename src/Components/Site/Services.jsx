import { useState } from "react";

const services = [
  {
    number: "01",
    title: "Branding Design",
    desc: "I break down complex user experience problems to create integrity-focused solutions that connect billions of people",
  },
  {
    number: "02",
    title: "UI/UX Design",
    desc: "I break down complex user experience problems to create integrity-focused solutions that connect billions of people",
  },
  {
    number: "03",
    title: "Web Design",
    desc: "I break down complex user experience problems to create integrity-focused solutions that connect billions of people",
  },
  {
    number: "04",
    title: "App Design",
    desc: "I break down complex user experience problems to create integrity-focused solutions that connect billions of people",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

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
          {services.map((service, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center justify-between p-6 rounded-xl border cursor-pointer transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#a78bfa]/30 to-[#6b3ff0]/30 border-[#a78bfa]/50 text-white shadow-lg shadow-purple-500/10"
                      : "bg-gray-900/50 border-white/5 text-white/70 hover:border-[#a78bfa]/30 hover:bg-gray-900/70"
                  }`}
              >
                <div className="flex items-start gap-5">
                  <span className={`font-bold text-lg ${isActive ? "text-[#a78bfa]" : "text-white/50"}`}>
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
                    <p className={`text-sm ${isActive ? "text-white/90" : "text-white/60"}`}>
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
