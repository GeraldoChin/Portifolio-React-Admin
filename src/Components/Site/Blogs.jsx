import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Blogs() {
  // 🔹 Dados estáticos dos blogs
  const blogs = [
    {
      id: 1,
      title: "How to Build Modern Web Apps",
      author: "Alice Johnson",
      date: "2026-02-15",
      image: "https://via.placeholder.com/400x250?text=Blog+1",
    },
    {
      id: 2,
      title: "UI/UX Tips for Developers",
      author: "Bob Smith",
      date: "2026-01-10",
      image: "https://via.placeholder.com/400x250?text=Blog+2",
    },
    {
      id: 3,
      title: "Optimizing Web Performance",
      author: "Carla Mendes",
      date: "2025-12-20",
      image: "https://via.placeholder.com/400x250?text=Blog+3",
    },
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const AnimatedCard = ({ children, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
        className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl overflow-hidden cursor-pointer transition-transform hover:translate-y-[-5px]"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-gray-900/20">
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
            <AnimatedCard key={blog.id} index={index}>
              <div className="w-full h-64 bg-[#1a0033] flex items-center justify-center overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-[#8b5cf6] text-sm mb-2">
                  {formatDate(blog.date)}
                </div>
                <h3 className="text-white text-lg font-semibold mb-3">{blog.title}</h3>
                <div className="flex items-center gap-2 text-[#a78bfa] text-sm">
                  <span>By {blog.author}</span>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
