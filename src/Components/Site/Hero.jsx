export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center">
      {/* Manchas roxas */}
      {/* <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-red-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div> */}
      <div className="absolute top-[50%] left-[80%] w-96 h-96 bg-purple-400/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-[490px] right-[-50px] w-64 h-64 bg-purple-600/20 rounded-full filter blur-2xl animate-pulse-slow"></div>
      <div className="absolute top-[30%] right-[10%] w-52 h-52 bg-purple-300/10 rounded-full filter blur-2xl animate-pulse-slow"></div>
      <div className="absolute bottom-[10%] left-[20%] w-72 h-72 bg-purple-500/15 rounded-full filter blur-3xl animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row items-center gap-2">
          {/* Texto */}
          <div className="flex-1">
            <h2 className="text-[#a78bfa] text-2xl mb-2">I am Geraldo Chin</h2>

            <h1 className="text-5xl md:text-[80px] font-bold leading-tight mb-6 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent w-2xl">
              Web Developer + UX Designer
            </h1>

            <p className="text-purple-200 leading-relaxed mb-8 max-w-full ">
              I help you build brand for your business at an affordable price.
              Thousands of clients have procured exceptional results while
              working with our dedicated team. when an unknown printer took a
              galley of type and scrambled it.
            </p>

            <a
              href="#"
              className="inline-block px-8 py-4 rounded-full border border-purple-900 text-white font-semibold hover:bg-purple-500 hover:border-purple-500 transition"
            >
              Download CV
            </a>
          </div>

          {/* Imagem */}
          <div className="flex-1 flex justify-center">
            <div className="w-[300px] md:w-[450px]">
              <img
                src="/img/img.jpg"
                alt="Geraldo Chin"
                className="w-full rounded-2xl shadow-2xl border border-purple-500/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
