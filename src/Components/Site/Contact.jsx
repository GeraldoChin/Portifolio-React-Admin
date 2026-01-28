export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">

          {/* Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
              Let's work together!
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed max-w-md">
              I design and code beautifully simple things and I love what I do. Just simple like that!
            </p>

            <div className="flex flex-col gap-6">

              {/* Call */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-900/50 border border-[#a78bfa]/30 rounded-lg text-[#a78bfa] text-xl">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h4 className="text-[#a78bfa] text-sm mb-1">Call Me</h4>
                  <p className="text-white/80">+258 84 123 4567</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-900/50 border border-[#a78bfa]/30 rounded-lg text-[#a78bfa] text-xl">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-[#a78bfa] text-sm mb-1">Email Me</h4>
                  <p className="text-white/80">gerrald@example.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-900/50 border border-[#a78bfa]/30 rounded-lg text-[#a78bfa] text-xl">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="text-[#a78bfa] text-sm mb-1">Address</h4>
                  <p className="text-white/80">Nampula, Moçambique</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <form className="bg-gray-900/40 backdrop-blur border border-white/5 rounded-xl p-8 flex flex-col gap-5 shadow-lg shadow-purple-500/5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[#a78bfa] text-sm mb-1">Your Name *</label>
                  <input
                    type="text"
                    placeholder="Name *"
                    required
                    className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#a78bfa] text-sm mb-1">Your Email *</label>
                  <input
                    type="email"
                    placeholder="Email *"
                    required
                    className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[#a78bfa] text-sm mb-1">Subject *</label>
                <input
                  type="text"
                  placeholder="Subject *"
                  required
                  className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#a78bfa] text-sm mb-1">Your Message *</label>
                <textarea
                  placeholder="Your Message *"
                  required
                  className="bg-gray-900/60 border border-[#a78bfa]/20 rounded-md p-3 text-white placeholder:text-white/40 focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 outline-none min-h-[120px] resize-y transition"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-3 bg-gradient-to-r from-[#a78bfa] to-[#6b3ff0] hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md shadow-purple-500/20"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
