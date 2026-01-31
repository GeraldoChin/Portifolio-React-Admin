import { useState, useMemo } from "react";
import { FaTrash, FaReply, FaUser, FaEnvelope, FaEdit } from "react-icons/fa";

// Dados iniciais
const initialContacts = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", subject: "Website Inquiry", message: "Hi, I would like to know more about your services.", date: "30 January 2026", replied: false, replyMessage: "" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", subject: "Design Project", message: "I have a project idea and I want to discuss it.", date: "29 January 2026", replied: false, replyMessage: "" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com", subject: "Collaboration", message: "Let's collaborate on a new web app.", date: "28 January 2026", replied: false, replyMessage: "" },
];

export default function ContactPage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 4;

  // ===== FILTRO E PESQUISA =====
  const filteredContacts = useMemo(() => {
    let filtered = contacts.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter === "replied") filtered = filtered.filter(c => c.replied);
    if (filter === "pending") filtered = filtered.filter(c => !c.replied);

    return filtered;
  }, [contacts, searchTerm, filter]);

  // ===== PAGINAÇÃO =====
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * contactsPerPage,
    currentPage * contactsPerPage
  );

  // ===== DELETAR =====
  const deleteContact = (id) => {
    if (confirm("Deseja realmente excluir esta mensagem?")) {
      setContacts(contacts.filter(c => c.id !== id));
      setSelectedContact(null);
    }
  };

  // ===== DETALHES =====
  const openDetails = (contact) => {
    setSelectedContact(contact);
    setReplyText(contact.replyMessage || "");
  };

  const closeDetails = () => {
    setSelectedContact(null);
    setReplyText("");
    setEditingContact(null);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // ===== RESPONDER =====
  const handleReply = () => {
    if (!replyText.trim()) return;
    setContacts(
      contacts.map(c =>
        c.id === selectedContact.id
          ? { ...c, replied: true, replyMessage: replyText }
          : c
      )
    );
    closeDetails();
  };

  // ===== EDITAR =====
  const openEdit = (contact) => {
    setEditingContact(contact.id);
    setFormData({
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message
    });
    setSelectedContact(contact);
    setReplyText(contact.replyMessage || "");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setContacts(
      contacts.map(c =>
        c.id === editingContact ? { ...c, ...formData } : c
      )
    );
    closeDetails();
  };

  // ===== ESTATÍSTICAS =====
  const totalMessages = contacts.length;
  const repliedCount = contacts.filter(c => c.replied).length;
  const pendingCount = totalMessages - repliedCount;

  return (
    <div className="space-y-8 animate-fadeIn p-6">

      {/* Cabeçalho + Estatísticas */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Mensagens de Contato</h2>

        <div className="flex flex-wrap gap-4">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <span className="text-gray-400 text-sm">Total</span>
            <h3 className="text-white font-bold">{totalMessages}</h3>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <span className="text-gray-400 text-sm">Respondidas</span>
            <h3 className="text-white font-bold">{repliedCount}</h3>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <span className="text-gray-400 text-sm">Pendentes</span>
            <h3 className="text-white font-bold">{pendingCount}</h3>
          </div>
        </div>
      </div>

      {/* Filtros e Pesquisa */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Pesquisar por nome, email ou assunto..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 p-3 bg-gray-800 text-white rounded placeholder-gray-400"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="p-3 bg-gray-800 text-white rounded"
        >
          <option value="all">Todas</option>
          <option value="replied">Respondidas</option>
          <option value="pending">Pendentes</option>
        </select>
      </div>

      {/* GRID DE MENSAGENS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedContacts.map(c => (
          <div
            key={c.id}
            className={`bg-gray-900/80 rounded-xl p-5 border border-purple-800 shadow hover:shadow-purple-500/50 cursor-pointer transition`}
            onClick={() => openDetails(c)}
          >
            <div className="flex items-center gap-3 mb-2">
              <FaUser className="text-purple-400" />
              <span className="text-white font-semibold">{c.name}</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <FaEnvelope className="text-purple-400" />
              <span className="text-gray-300 text-sm">{c.email}</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">
              <strong>Assunto:</strong> {c.subject}
            </p>
            <p className="text-gray-500 text-sm mb-3 truncate">{c.message}</p>
            <p className="text-gray-600 text-xs mb-2">{c.date}</p>
            <div className="flex justify-between items-center mt-2">
              {c.replied && <p className="text-green-400 text-sm font-semibold">Respondida</p>}
              <button
                onClick={(e) => { e.stopPropagation(); openEdit(c); }}
                className="bg-blue-600 px-2 py-1 rounded text-white text-sm flex items-center gap-1"
              >
                <FaEdit /> Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINAÇÃO */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50"
        >
          {"<"}
        </button>
        <span className="px-3 py-1 bg-gray-800 rounded">{currentPage}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50"
        >
          {">"}
        </button>
      </div>

      {/* MODAL DETALHES + EDIÇÃO + RESPOSTA */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={editingContact ? handleEditSubmit : e => { e.preventDefault(); handleReply(); }}
            className="bg-gray-900 p-6 rounded-xl w-full max-w-lg space-y-4"
          >
            <h3 className="text-white text-lg font-bold mb-2">{editingContact ? "Editar Mensagem" : "Detalhes da Mensagem"}</h3>

            <input
              type="text"
              value={formData.name || selectedContact.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-gray-800 text-white rounded"
              placeholder="Nome"
            />
            <input
              type="email"
              value={formData.email || selectedContact.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 bg-gray-800 text-white rounded"
              placeholder="Email"
            />
            <input
              type="text"
              value={formData.subject || selectedContact.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              className="w-full p-3 bg-gray-800 text-white rounded"
              placeholder="Assunto"
            />
            <textarea
              value={formData.message || selectedContact.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 bg-gray-800 text-white rounded resize-y min-h-[100px]"
              placeholder="Mensagem"
            />

            {!editingContact && (
              <textarea
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Escreva sua resposta..."
                className="w-full p-3 bg-gray-800 text-white rounded resize-y min-h-[80px]"
              />
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDetails}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Fechar
              </button>
              {editingContact ? (
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <FaEdit /> Salvar
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleReply}
                    className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition flex items-center gap-2"
                  >
                    <FaReply /> Responder
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteContact(selectedContact.id)}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition flex items-center gap-2"
                  >
                    <FaTrash /> Deletar
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
