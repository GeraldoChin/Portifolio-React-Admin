import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  DADOS DOS ARTIGOS                                                  */
/*  Tipos de bloco: p (parágrafo), h (subtítulo), list, quote          */
/* ------------------------------------------------------------------ */
const blogs = [
  {
    id: 1,
    title: "Como construir aplicações web modernas com React e Vite",
    category: "Desenvolvimento Web",
    author: "Geraldo Chin",
    date: "2026-09-28",
    readTime: 6,
    glyph: "</>",
    gradient: "from-[#4c1d95] via-[#6d28d9] to-[#1e1b4b]",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Do primeiro componente ao deploy: a estrutura e os hábitos que mantêm um projecto React rápido e fácil de manter.",
    content: [
      {
        type: "p",
        text: "Durante muito tempo, começar um projecto React significava esperar minutos por instalações e servidores de desenvolvimento lentos. O Vite mudou isso: arranca quase de imediato e actualiza o browser em milissegundos quando guarda um ficheiro. Para quem está a construir um portfólio, uma loja ou um painel de gestão, é hoje o ponto de partida mais prático.",
      },
      { type: "h", text: "Comece com uma estrutura simples" },
      {
        type: "p",
        text: "Um erro comum é criar dezenas de pastas antes de existir uma única funcionalidade. Prefira uma organização pequena e deixe-a crescer com o projecto:",
      },
      {
        type: "list",
        items: [
          "components/ para peças reutilizáveis, como botões, cartões e modais.",
          "sections/ para blocos de página, como Hero, Serviços e Contacto.",
          "hooks/ para lógica partilhada, como useInView ou useLocalStorage.",
          "assets/ para imagens, ícones e fontes.",
        ],
      },
      { type: "h", text: "Componentes pequenos, responsabilidades claras" },
      {
        type: "p",
        text: "Um componente deve fazer uma coisa bem. Se um ficheiro ultrapassa as 200 linhas ou mistura pedidos de dados, animações e layout, é sinal de que pode ser dividido. Componentes pequenos são mais fáceis de testar, de reutilizar e de entender quando volta ao código meses depois.",
      },
      {
        type: "quote",
        text: "Código que é fácil de ler é código que é fácil de corrigir.",
      },
      { type: "h", text: "Estado: use apenas o que precisa" },
      {
        type: "p",
        text: "Para a maioria dos sites, useState e useContext chegam. Bibliotecas de estado global só fazem sentido quando muitos componentes distantes precisam dos mesmos dados. Comece simples e só adicione complexidade quando o problema aparecer de verdade.",
      },
      { type: "h", text: "Prepare o deploy desde o início" },
      {
        type: "p",
        text: "Execute npm run build com frequência e verifique se o resultado funciona com npm run preview. Plataformas como Vercel e Netlify publicam o projecto directamente a partir do GitHub, e cada alteração enviada passa a estar online em poucos minutos.",
      },
    ],
  },
  {
    id: 2,
    title: "Princípios de UX que todo programador deve conhecer",
    category: "UI/UX Design",
    author: "Geraldo Chin",
    date: "2026-08-14",
    readTime: 5,
    glyph: "UX",
    gradient: "from-[#831843] via-[#9d174d] to-[#2e1065]",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Boas interfaces não dependem de talento artístico. Dependem de regras simples que qualquer programador pode aplicar.",
    content: [
      {
        type: "p",
        text: "Muitos programadores acreditam que design é uma questão de gosto. Na prática, grande parte de uma boa experiência de utilizador resulta de princípios testados e repetíveis. Conhecê-los ajuda a criar interfaces que as pessoas entendem sem precisar de instruções.",
      },
      { type: "h", text: "1. Hierarquia visual" },
      {
        type: "p",
        text: "O olho segue o que é maior, mais escuro ou mais contrastado. Use tamanho e peso para mostrar o que é mais importante em cada ecrã. Se tudo se destaca, nada se destaca.",
      },
      { type: "h", text: "2. Consistência" },
      {
        type: "p",
        text: "Um botão que faz a mesma coisa deve ter sempre o mesmo aspecto e o mesmo nome. A consistência reduz o esforço mental: o utilizador aprende uma vez e reconhece em todo o lado.",
      },
      { type: "h", text: "3. Feedback imediato" },
      {
        type: "p",
        text: "Cada acção precisa de uma resposta visível. Quando alguém clica em Enviar, mostre que o pedido está a ser processado e confirme quando terminar. O silêncio da interface gera dúvida e cliques repetidos.",
      },
      { type: "h", text: "4. Espaço em branco" },
      {
        type: "p",
        text: "Espaço vazio não é desperdício. Margens e espaçamentos generosos separam grupos de informação e tornam a leitura mais confortável, sobretudo em telemóveis.",
      },
      { type: "h", text: "5. Acessibilidade" },
      {
        type: "list",
        items: [
          "Garanta contraste suficiente entre texto e fundo.",
          "Torne todos os elementos interactivos utilizáveis com o teclado.",
          "Escreva texto alternativo nas imagens.",
          "Não use apenas a cor para transmitir informação.",
        ],
      },
      {
        type: "quote",
        text: "Se o utilizador precisa de pensar onde clicar, a interface ainda pode melhorar.",
      },
      {
        type: "p",
        text: "Teste o seu trabalho com pessoas reais, mesmo que sejam apenas três amigos. Observar alguém a usar o seu site durante cinco minutos revela mais do que horas de suposições.",
      },
    ],
  },
  {
    id: 3,
    title: "Como acelerar o seu site: guia prático de performance",
    category: "Performance",
    author: "Geraldo Chin",
    date: "2026-07-02",
    readTime: 7,
    glyph: "⚡",
    gradient: "from-[#0f766e] via-[#4c1d95] to-[#1e1b4b]",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Um site lento perde visitantes e clientes. Estas são as optimizações com maior impacto e menor esforço.",
    content: [
      {
        type: "p",
        text: "Em Moçambique, e em muitos outros mercados, grande parte dos visitantes acede à web por telemóvel e com ligações instáveis. Um site que demora a carregar perde pessoas antes de elas verem o seu conteúdo. A boa notícia é que poucas mudanças trazem a maior parte da melhoria.",
      },
      { type: "h", text: "Comece por medir" },
      {
        type: "p",
        text: "Antes de optimizar, saiba onde está o problema. O Lighthouse, disponível nas ferramentas de programador do Chrome e do Edge, analisa a página e indica o que está a atrasar o carregamento. Concentre-se nos três indicadores principais: LCP (quando o conteúdo principal aparece), INP (a rapidez de resposta aos cliques) e CLS (se o layout salta durante o carregamento).",
      },
      { type: "h", text: "Optimize as imagens" },
      {
        type: "p",
        text: "As imagens são normalmente a parte mais pesada de uma página. Converta-as para WebP ou AVIF, redimensione-as para o tamanho real em que são mostradas e use loading=\"lazy\" nas que ficam abaixo da primeira dobra. Só esta mudança pode reduzir o peso da página em mais de metade.",
      },
      { type: "h", text: "Envie menos JavaScript" },
      {
        type: "list",
        items: [
          "Carregue partes da aplicação apenas quando necessário, com React.lazy e import dinâmico.",
          "Remova bibliotecas que usa para uma única função.",
          "Analise o tamanho final do bundle antes de publicar.",
        ],
      },
      { type: "h", text: "Use cache e CDN" },
      {
        type: "p",
        text: "Uma CDN serve os seus ficheiros a partir de servidores próximos do visitante, e a cache evita descarregar de novo o que não mudou. Plataformas como Vercel, Netlify e Cloudflare já incluem isto por defeito.",
      },
      {
        type: "quote",
        text: "Cada segundo poupado no carregamento é um visitante que fica.",
      },
      {
        type: "p",
        text: "Performance não é um trabalho feito uma vez. Volte a medir sempre que adicionar uma funcionalidade grande, e o seu site continuará rápido à medida que cresce.",
      },
    ],
  },
];

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(`${dateString}T12:00:00`);
  const day = String(date.getDate()).padStart(2, "0");
  return `${day} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
};

/* ------------------------------------------------------------------ */
/*  CAPA DO ARTIGO (imagem com fallback para gradiente)                */
/* ------------------------------------------------------------------ */
function Cover({ blog, className = "" }) {
  const [failed, setFailed] = useState(false);
  const showImage = blog.image && !failed;

  return (
    <div className={`relative overflow-hidden bg-[#1a0033] ${className}`}>
      {showImage ? (
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-br ${blog.gradient} flex items-center justify-center`}
        >
          <span className="text-6xl md:text-7xl font-bold text-white/25 select-none">
            {blog.glyph}
          </span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CARTÃO ANIMADO (fora do componente principal para não remontar)    */
/* ------------------------------------------------------------------ */
function AnimatedCard({ index, onOpen, blog }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <button
        type="button"
        onClick={() => onOpen(blog)}
        aria-label={`Ler artigo: ${blog.title}`}
        className="group h-full w-full text-left bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]/50 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa] flex flex-col"
      >
        <div className="overflow-hidden">
          <Cover
            blog={blog}
            className="h-56 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-[#a78bfa] font-medium">{blog.category}</span>
            <span className="text-purple-300/70">{blog.readTime} min de leitura</span>
          </div>

          <h3 className="text-white text-lg font-semibold mb-2 leading-snug">
            {blog.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            {blog.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between text-sm">
            <span className="text-[#a78bfa]">{formatDate(blog.date)}</span>
            <span className="text-white font-medium group-hover:text-[#a78bfa] transition-colors">
              Ler artigo
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  MODAL DE LEITURA                                                   */
/* ------------------------------------------------------------------ */
function ArticleModal({ blog, onClose }) {
  const scrollRef = useRef(null);
  const closeRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Fechar com ESC, bloquear scroll da página e focar no botão fechar
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Fundo desfocado */}
      <div
        className="absolute inset-0 bg-[#02020a]/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Painel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-title"
        className="relative w-full max-w-3xl h-full sm:h-auto sm:max-h-[90vh] flex flex-col bg-[#080814] sm:rounded-2xl border border-[#8b5cf6]/30 shadow-[0_30px_100px_-20px_rgba(139,92,246,0.45)] overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Esconde a barra de scroll (o scroll continua a funcionar) */}
        <style>{`
          .article-scroll { scrollbar-width: none; -ms-overflow-style: none; }
          .article-scroll::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Barra de progresso de leitura */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-20">
          <div
            className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#c4b5fd] transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Botão fechar */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar artigo"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/15 text-white flex items-center justify-center transition hover:bg-[#8b5cf6] hover:border-[#8b5cf6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Conteúdo com scroll */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="article-scroll flex-1 overflow-y-auto overscroll-contain"
        >
          <Cover blog={blog} className="h-56 sm:h-72" />

          <div className="px-6 sm:px-12 pb-12 pt-8">
            <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
              <span className="px-3 py-1 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#c4b5fd]">
                {blog.category}
              </span>
              <span className="text-gray-400">{blog.readTime} min de leitura</span>
            </div>

            <h2
              id="article-title"
              className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-6"
            >
              {blog.title}
            </h2>

            {/* Autor */}
            <div className="flex items-center gap-3 pb-8 mb-8 border-b border-white/10">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center text-white font-bold">
                {blog.author.charAt(0)}
              </div>
              <div>
                <div className="text-white font-medium">{blog.author}</div>
                <div className="text-sm text-gray-400">{formatDate(blog.date)}</div>
              </div>
            </div>

            {/* Corpo do artigo */}
            <div className="max-w-[65ch] mx-auto">
              {blog.content.map((block, i) => {
                if (block.type === "h") {
                  return (
                    <h3
                      key={i}
                      className="text-xl font-semibold text-white mt-10 mb-3"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="my-5 space-y-3">
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-gray-300 leading-relaxed text-[17px]"
                        >
                          <span className="mt-[11px] w-1.5 h-1.5 rounded-full bg-[#8b5cf6] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="my-8 pl-6 border-l-4 border-[#8b5cf6] text-xl text-[#ddd6fe] italic leading-relaxed"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-gray-300 leading-8 text-[17px] mb-5"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>

            {/* Rodapé */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm text-center sm:text-left">
                Gostou do artigo? Vamos conversar sobre o seu projecto.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-white/15 text-white text-sm transition hover:bg-white/10"
                >
                  Fechar
                </button>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white text-sm font-medium transition hover:opacity-90"
                >
                  Contactar
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SECÇÃO PRINCIPAL                                                   */
/* ------------------------------------------------------------------ */
export default function Blogs() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-20 bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-transparent">
            Artigos Recentes
          </h2>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Partilho conhecimentos, experiências e conteúdos sobre
            desenvolvimento web, tecnologia e inovação digital.
          </p>
        </div>

        {/* Grid de blogs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <AnimatedCard
              key={blog.id}
              index={index}
              blog={blog}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ArticleModal
            key={selected.id}
            blog={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}