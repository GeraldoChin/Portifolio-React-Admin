import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 2, suffix: "+", label: "Anos estudando" },
  { value: 20, suffix: "+", label: "Projetos" },
  { value: 5, suffix: "+", label: "Tecnologias" },
  { value: 100, suffix: "%", label: "Dedicação" },
];

export default function Stats() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // duração total da animação em ms
    const steps = 50; // quantos passos para animar
    const intervalTime = duration / steps;

    // calcula incrementos individuais
    const increments = stats.map(stat => stat.value / steps);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCounts(stats.map((stat, i) => {
        const nextValue = Math.min(Math.round(increments[i] * currentStep), stat.value);
        return nextValue;
      }));

      if (currentStep >= steps) clearInterval(interval);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} className="-mt-12 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 text-center md:text-left">

          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item p-6 md:p-8 flex-1 "
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-5xl md:text-6xl font-bold text-[#a78bfa] mb-1">
                {counts[index]}
                {stat.suffix}
              </h3>
              <p className="text-purple-300 text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
