import { useState, useEffect, useRef } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const API_URL = "http://localhost:5000/api/blogs"; // ajuste conforme seu backend

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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Erro ao buscar blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  // === Animação dos cards ===
  useEffect(() => {
    if (!cardRefs.current) return;

    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transition = `all 0.6s ease-out ${entry.target.dataset.index * 0.2}s`;
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((el) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(30px)";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [blogs]);

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
              key={blog.id}
              ref={addToRefs}
              data-index={index} // usado para delay individual
              className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl overflow-hidden cursor-pointer transition-transform hover:translate-y-[-5px]"
            >
              <div className="w-full h-64 bg-[#1a0033] flex items-center justify-center overflow-hidden">
                <img
                  src={
                    blog.image?.startsWith("http")
                      ? blog.image
                      : `http://localhost:5000/uploads/blogs/${blog.image}`
                  }
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
