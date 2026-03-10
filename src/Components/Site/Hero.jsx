import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 20, mass: 1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-80, 80], [12, -12]);
  const rotateY = useTransform(springX, [-80, 80], [-12, 12]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-8 md:px-12 py-20 sm:py-28 md:py-36"
    >
      {/* Manchas roxas */}
      <div className="absolute top-1/2 left-[-10%] sm:left-[-5%] md:left-[80%] w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-400/10 rounded-full filter blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-20px] sm:right-0 md:right-[-50px] w-40 sm:w-52 md:w-64 h-40 sm:h-52 md:h-64 bg-purple-600/20 rounded-full filter blur-2xl animate-pulse pointer-events-none" />
      <div className="absolute top-[30%] right-[5%] md:right-[10%] w-28 sm:w-40 md:w-52 h-28 sm:h-40 md:h-52 bg-purple-300/10 rounded-full filter blur-2xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-[5%] left-[5%] md:left-[20%] w-44 sm:w-60 md:w-72 h-44 sm:h-60 md:h-72 bg-purple-500/15 rounded-full filter blur-3xl animate-pulse pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col md:flex-row items-center gap-y-10 sm:gap-y-12 md:gap-y-0 md:gap-x-8 lg:gap-x-16">

        {/* ── TEXTO — flex-[3] para ocupar mais espaço que a imagem ── */}
        <div className="flex-[3] min-w-0 text-center md:text-left order-2 md:order-1">

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#a78bfa] text-lg sm:text-xl md:text-2xl mb-2"
          >
            I am Geraldo Chin
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px]
              font-bold leading-[1.15] mb-5 sm:mb-6
              bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent
            "
          >
            Web Developer +<br /> UX Designer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="
              text-purple-200 text-sm sm:text-base leading-relaxed mb-7 sm:mb-8
              max-w-full mx-auto md:mx-0
            "
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
            className="flex flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="
                inline-flex items-center gap-2
                px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4
                rounded-full border border-purple-900
                text-white text-sm sm:text-base font-semibold
                hover:bg-purple-500 hover:border-purple-500 transition
              "
            >
              <FaDownload />
              Download CV
            </motion.a>

            <div className="flex gap-2 sm:gap-3 justify-center md:justify-start">
              {[FaGithub, FaLinkedin, FaEnvelope].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, color: "#a78bfa" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="
                    p-2.5 sm:p-3 rounded-full border border-purple-900
                    text-white text-xl sm:text-2xl
                    hover:border-purple-500 transition
                  "
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── IMAGEM CIRCULAR — flex-[2] para ceder espaço ao texto ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex-[2] flex-shrink-0 flex justify-center order-1 md:order-2"
        >
          <div
            className="relative"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              x.set(e.clientX - r.left - r.width  / 2);
              y.set(e.clientY - r.top  - r.height / 2);
            }}
            onMouseLeave={() => { x.set(0); y.set(0); }}
          >
            {/* Glow externo pulsante */}
            <div className="absolute -inset-4 bg-purple-500/15 rounded-full blur-2xl animate-pulse pointer-events-none" />

            {/* Anel decorativo */}
            <div className="absolute -inset-1 rounded-full border border-purple-500/30 pointer-events-none" />

            {/* Foto circular com tilt 3D suave */}
            <motion.img
              src="/img/img.jpg"
              alt="Geraldo Chin"
              style={{ rotateX, rotateY }}
              className="
                relative
                w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80
                object-cover rounded-full
                border-2 border-purple-500/60
                shadow-[0_0_48px_rgba(168,85,247,0.35)]
                transition-transform duration-300
              "
            />

            {/* Badge "Disponível" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-2 -right-2 flex items-center gap-2 bg-gray-900 border border-purple-800 rounded-full px-3 py-1.5 text-xs font-medium text-purple-300 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Disponível
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}