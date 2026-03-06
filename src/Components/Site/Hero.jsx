import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring suave — sem bounce, resposta lenta e elegante
  const springConfig = { stiffness: 60, damping: 20, mass: 1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Rotação muito subtil — apenas 6 graus máximo
  const rotateX = useTransform(springY, [-120, 120], [6, -6]);
  const rotateY = useTransform(springX, [-120, 120], [-6, 6]);

  // Paralaxe leve no glow — move na direcção oposta
  const glowX = useTransform(springX, [-120, 120], [12, -12]);
  const glowY = useTransform(springY, [-120, 120], [12, -12]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-8 md:px-12 py-20 sm:py-28 md:py-36"
    >
      {/* Manchas roxas */}
      <div className="absolute top-1/2 left-[-10%] md:left-[80%] w-72 md:w-96 h-72 md:h-96 bg-purple-400/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[25%] right-0 md:right-[-50px] w-52 md:w-64 h-52 md:h-64 bg-purple-600/20 rounded-full filter blur-2xl animate-pulse"></div>
      <div className="absolute top-[30%] right-[5%] md:right-[10%] w-40 md:w-52 h-40 md:h-52 bg-purple-300/10 rounded-full filter blur-2xl animate-pulse"></div>
      <div className="absolute bottom-[5%] left-[5%] md:left-[20%] w-60 md:w-72 h-60 md:h-72 bg-purple-500/15 rounded-full filter blur-3xl animate-pulse"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col md:flex-row items-center gap-y-12 md:gap-y-0 gap-x-8">

        {/* TEXTO */}
        <div className="flex-1 min-w-0 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#a78bfa] text-xl sm:text-2xl mb-2 truncate"
          >
            I am Geraldo Chin
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-[80px] font-bold leading-tight mb-6 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent w-full md:w-2xl break-words"
          >
            Web Developer + UX Designer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-purple-200 leading-relaxed mb-8 max-w-full sm:max-w-lg mx-auto md:mx-0"
          >
            I help you build brand for your business at an affordable price.
            Thousands of clients have procured exceptional results while
            working with our dedicated team. When an unknown printer took a
            galley of type and scrambled it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center md:justify-start items-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full border border-purple-900 text-white font-semibold hover:bg-purple-500 hover:border-purple-500 transition"
            >
              <FaDownload />
              Download CV
            </motion.a>

            <div className="flex gap-3 justify-center md:justify-start">
              {[FaGithub, FaLinkedin, FaEnvelope].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, color: "#a78bfa" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-3 rounded-full border border-purple-900 text-white text-2xl hover:border-purple-500 transition"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* IMAGEM */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex-1 flex justify-center min-w-0 w-full max-w-[400px] sm:max-w-[450px] mt-8 md:mt-0"
        >
          {/* Perspective wrapper — necessário para o 3D funcionar correctamente */}
          <div
            className="relative w-full"
            style={{ perspective: "1000px" }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              x.set(e.clientX - rect.left - rect.width  / 2);
              y.set(e.clientY - rect.top  - rect.height / 2);
            }}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
          >
            {/* Glow que se move em paralaxe */}
            <motion.div
              className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-3xl"
              style={{ x: glowX, y: glowY }}
            />

            {/* Imagem com rotação 3D suave — SEM hover:scale que conflitua */}
            <motion.img
              src="/img/img.jpg"
              alt="Geraldo Chin"
              className="relative w-full rounded-2xl shadow-2xl border border-purple-500/20 object-cover"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            />

            {/* Reflexo de luz que segue o rato */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: useTransform(
                  [springX, springY],
                  ([lx, ly]) =>
                    `radial-gradient(circle at ${50 + (lx / 120) * 30}% ${50 + (ly / 120) * 30}%, rgba(167,139,250,0.08) 0%, transparent 65%)`
                ),
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}