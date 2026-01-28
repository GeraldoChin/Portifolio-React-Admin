const testimonials = [
  {
    name: "Client Name",
    position: "Position",
    text: "Great work! Very professional and creative. Highly recommended for any design project.",
  },
  {
    name: "Client Name",
    position: "Position",
    text: "Excellent developer! Delivered the project on time with amazing quality. Will work again.",
  },
  {
    name: "Client Name",
    position: "Position",
    text: "Outstanding work! Very talented designer with great attention to detail.",
  },
];

export default function Testimonials() {
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
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl p-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#8b5cf6]"></div>
                <div>
                  <h4 className="text-white font-semibold">{item.name}</h4>
                  <p className="text-[#a78bfa] text-sm">{item.position}</p>
                </div>
              </div>
              <p className="text-[#b8a9d8]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
