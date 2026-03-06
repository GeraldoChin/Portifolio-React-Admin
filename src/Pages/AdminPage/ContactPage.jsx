import { useEffect, useState } from "react";
import { FaTrash, FaReply, FaUser, FaEnvelope } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const API_URL = "http://localhost:5000/api/contacts";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar contatos:", err);
    }
  };

  const totalMessages = contacts.length;
  const repliedCount = contacts.filter(c => c.replied).length;
  const pendingCount = totalMessages - repliedCount;

  const statusCounts = [
    { name: "Respondidas", value: repliedCount },
    { name: "Pendentes", value: pendingCount },
  ];

  const COLORS = ["#16a34a", "#facc15"]; // verde e amarelo

  const stats = [
    { title: "Total de Mensagens", value: totalMessages, color: "#a78bfa" },
    { title: "Respondidas", value: repliedCount, color: "#16a34a" },
    { title: "Pendentes", value: pendingCount, color: "#facc15" },
  ];

  const openModal = (contact) => {
    setSelectedContact(contact);
    setReplyText(contact.reply_message || "");
  };

  const closeModal = () => {
    setSelectedContact(null);
    setReplyText("");
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    await fetch(`${API_URL}/${selectedContact.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ replied: true, reply_message: replyText }),
    });
    fetchContacts();
    closeModal();
  };

  const deleteContact = async (id) => {
    if (!confirm("Deseja realmente excluir esta mensagem?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchContacts();
    closeModal();
  };

  return (
    <div className="space-y-8 animate-fadeIn p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Mensagens de Contato</h2>
      </div>

      {/* Cards + Gráfico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 grid sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-gray-900/80 rounded-xl p-6 flex flex-col items-start gap-2">
              <p className="text-gray-400 text-sm">{s.title}</p>
              <h3 className="text-white text-xl font-semibold">{s.value}</h3>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 bg-gray-900/80 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusCounts} dataKey="value" nameKey="name" outerRadius={80} label>
                {statusCounts.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid de mensagens */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map(c => (
          <div
            key={c.id}
            onClick={() => openModal(c)}
            className="bg-gray-900/80 rounded-xl p-6 cursor-pointer hover:shadow-lg hover:shadow-purple-500/30 transition"
          >
            <div className="flex items-center gap-3">
              <FaUser className="text-purple-400 text-xl" />
              <h3 className="text-white font-semibold">{c.name}</h3>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mt-1">
              <FaEnvelope /> <span className="truncate">{c.email}</span>
            </div>
            <p className="text-sm text-gray-300 mt-2"><b>Assunto:</b> {c.subject}</p>
            <div className="text-gray-400 text-sm mt-1 truncate max-h-16 overflow-hidden">{c.message}</div>
            {c.replied && <span className="text-green-400 font-semibold text-sm mt-2 block">Respondida</span>}
          </div>
        ))}
      </div>

      {/* Tabela detalhada */}
      <div className="bg-gray-900/80 rounded-xl p-6 overflow-x-auto">
        <table className="w-full text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3">Nome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Assunto</th>
              <th className="p-3">Status</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c.id} className="hover:bg-gray-800">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.subject}</td>
                <td className="p-3">{c.replied ? "Respondida" : "Pendente"}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openModal(c)}
                    className="p-2 bg-purple-700 rounded"
                  >
                    <FaReply />
                  </button>
                  <button
                    onClick={() => deleteContact(c.id)}
                    className="p-2 bg-red-700 rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de detalhes */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-gray-900 rounded-xl p-6 w-full max-w-lg space-y-4"
          >
            <h3 className="text-xl font-bold text-white">{selectedContact.name}</h3>
            <p className="text-gray-400"><b>Email:</b> {selectedContact.email}</p>
            <p className="text-gray-400"><b>Assunto:</b> {selectedContact.subject}</p>
            <div className="bg-gray-800 p-4 rounded text-gray-200 whitespace-pre-line max-h-40 overflow-y-auto">
              {selectedContact.message}
            </div>

            <textarea
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Escreva sua resposta..."
              className="w-full p-3 bg-gray-800 text-white rounded min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex justify-end gap-3 mt-2">
              <button onClick={closeModal} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition">Fechar</button>
              <button onClick={handleReply} className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition flex items-center gap-2"><FaReply /> Responder</button>
              <button onClick={() => deleteContact(selectedContact.id)} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition flex items-center gap-2"><FaTrash /> Deletar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
