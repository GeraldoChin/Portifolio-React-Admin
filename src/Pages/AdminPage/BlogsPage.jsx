import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: null,
  });

  const API_URL = "http://localhost:5000/api/blogs"; // ajuste conforme seu backend

  // ===== ARRAY DE MESES =====
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // ===== FUNÇÃO PARA FORMATAR DATA =====
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // ===== PEGAR BLOGS DO BACKEND =====
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Erro ao buscar blogs:", err);
    }
  };

  // ===== CRIAR BLOG =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("author", formData.author);
      if (formData.image) data.append("image", formData.image);

      const res = await fetch(API_URL, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Erro ao criar blog");

      setFormData({ title: "", author: "", image: null });
      setShowForm(false);

      fetchBlogs(); // atualizar lista
    } catch (err) {
      console.error("Erro ao criar blog:", err);
    }
  };

  // ===== DELETE BLOG =====
  const deleteBlog = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar blog");

      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Erro ao deletar blog:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gerenciar Blogs</h2>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2 bg-[#a78bfa]/20 text-[#a78bfa] rounded-lg"
        >
          <FaPlus /> Novo Blog
        </button>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded-xl w-full max-w-lg space-y-4"
          >
            <input
              placeholder="Título"
              required
              className="w-full p-3 bg-gray-800 text-white rounded"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <input
              placeholder="Autor"
              required
              className="w-full p-3 bg-gray-800 text-white rounded"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />

            <input
              type="file"
              className="text-white"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)}>
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-[#a78bfa] px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LISTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-900 rounded-xl overflow-hidden"
          >
            <img
              src={
                blog.image?.startsWith("http")
                  ? blog.image
                  : `http://localhost:5000/uploads/blogs/${blog.image}`
              }
              alt={blog.title}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-white font-semibold">{blog.title}</h3>
              <p className="text-gray-400 text-sm">By {blog.author}</p>
              <p className="text-gray-500 text-xs">{formatDate(blog.date)}</p>

              <button
                onClick={() => deleteBlog(blog.id)}
                className="mt-3 text-red-400"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
