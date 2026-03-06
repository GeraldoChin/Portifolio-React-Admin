import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";

export default function Hero() {
  // Motion values para o efeito de seguir o mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-8 md:px-12 py-20 sm:py-28 md:py-36"
    >
      {/* Manchas roxas */}
      <div className="absolute top-1/2 left-[-10%] md:left-[80%] w-72 md:w-96 h-72 md:h-96 bg-purple-400/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-[25%] right-0 md:right-[-50px] w-52 md:w-64 h-52 md:h-64 bg-purple-600/20 rounded-full filter blur-2xl animate-pulse-slow"></div>
      <div className="absolute top-[30%] right-[5%] md:right-[10%] w-40 md:w-52 h-40 md:h-52 bg-purple-300/10 rounded-full filter blur-2xl animate-pulse-slow"></div>
      <div className="absolute bottom-[5%] left-[5%] md:left-[20%] w-60 md:w-72 h-60 md:h-72 bg-purple-500/15 rounded-full filter blur-3xl animate-pulse-slow"></div>

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

          {/* BOTÃO + REDES SOCIAIS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center md:justify-start items-center gap-4"
          >
            {/* Botão Download CV */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full border border-purple-900 text-white font-semibold hover:bg-purple-500 hover:border-purple-500 transition"
            >
              <FaDownload />
              Download CV
            </motion.a>

            {/* Redes sociais com borda individual */}
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

        {/* IMAGEM ORIGINAL COM EFEITO DE SEGUIR O MOUSE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex-1 flex justify-center min-w-0 w-full max-w-[400px] sm:max-w-[450px] mt-8 md:mt-0"
        >
          <div
            className="relative w-full"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const posX = e.clientX - rect.left - rect.width / 2;
              const posY = e.clientY - rect.top - rect.height / 2;
              x.set(posX);
              y.set(posY);
            }}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
          >
            {/* Glow atrás da foto */}
            <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-3xl animate-pulse-slow"></div>

            <motion.img
              src="/img/img.jpg"
              alt="Geraldo Chin"
              className="relative w-full rounded-2xl shadow-2xl border border-purple-500/20 object-cover transition-transform duration-500 hover:scale-105"
              style={{ rotateX, rotateY }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
