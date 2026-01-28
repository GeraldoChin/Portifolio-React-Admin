const blogs = [
  {
    date: "08 January 2024",
    title: "How to Create a Strong Visual Hierarchy",
    author: "Gerrald",
    image: "/img/aluno1.jpg",
  },
  {
    date: "05 January 2024",
    title: "The Future of Web Design: Trends to Watch in 2024",
    author: "Gerrald",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%231a0033' width='600' height='400'/%3E%3Crect x='150' y='100' width='300' height='200' fill='%238b5cf6' opacity='0.3' rx='10'/%3E%3C/svg%3E",
  },
  {
    date: "02 January 2024",
    title: "UX Design Best Practices for Mobile Applications",
    author: "Gerrald",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%231a0033' width='600' height='400'/%3E%3Cpath d='M200,200 L400,150 L350,300 Z' fill='%238b5cf6' opacity='0.3'/%3E%3C/svg%3E",
  },
];

export default function Blogs() {
  return (
    <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-6">

        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            Recent Blogs
          </h2>
          <p className="text-purple-300 max-w-2xl mx-auto">
            We put your ideas and your wishes in the form of a unique web project that inspires you and your customers.
          </p>
        </div>

        {/* Grid de blogs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl overflow-hidden cursor-pointer transition-transform hover:translate-y-[-5px]"
            >
              <div className="w-full h-64 bg-[#1a0033] flex items-center justify-center overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-[#8b5cf6] text-sm mb-2">{blog.date}</div>
                <h3 className="text-white text-lg font-semibold mb-3">{blog.title}</h3>
                <div className="flex items-center gap-2 text-[#a78bfa] text-sm">
                  <i className="far fa-user"></i>
                  <span>By {blog.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
