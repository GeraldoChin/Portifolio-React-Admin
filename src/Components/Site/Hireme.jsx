import { useEffect, useRef, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import Navbar from "./Navbar";

const CONTACT_ITEMS = [
  { icon: <FaPhone />, label: "Call Me", value: "+258 84 123 4567" },
  { icon: <FaEnvelope />, label: "Email Me", value: "gerrald@example.com" },
  { icon: <FaMapMarkerAlt />, label: "Location", value: "Nampula, Moçambique" },
];

const SERVICE_TAGS = ["Web Design", "React Dev", "UI/UX", "Freelance", "Full-time"];

export default function HireMe() {
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const [files, setFiles] = useState(null);
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const elements = [infoRef.current, formRef.current];
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = 1;
              entry.target.style.transform = "translateY(0)";
            }, i * 150);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => {
      if (el) {
        el.style.opacity = 0;
        el.style.transform = "translateY(40px)";
        el.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  const glowX = (mousePos.x / window.innerWidth) * 100;
  const glowY = (mousePos.y / window.innerHeight) * 100;

  return (
    <>
      <style>{`
        .hire-root {
          font-family: inherit;
          background: #080810;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          color: #e8e4f0;
        }

        .hire-root * { box-sizing: border-box; }

        .bg-glow {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          transition: background 0.1s ease;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        .grid-lines {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        .content-wrap {
          position: relative;
          z-index: 10;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px 80px;
        }

        .headline-block {
          padding: 120px 0 72px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a78bfa;
        }

        .eyebrow-line {
          width: 32px;
          height: 1px;
          background: #a78bfa;
          opacity: 0.7;
        }

        .page-title {
          font-family: inherit;
          font-size: clamp(52px, 7vw, 96px);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0;
        }

        .page-title span {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(167,139,250,0.5);
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .tag {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border: 1px solid rgba(167,139,250,0.2);
          border-radius: 100px;
          color: rgba(255,255,255,0.45);
          transition: all 0.3s;
        }
        .tag:hover {
          border-color: rgba(167,139,250,0.6);
          color: #a78bfa;
          background: rgba(167,139,250,0.06);
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr; gap: 48px; }
          .page-title { font-size: 48px; }
        }

        /* Left Column */
        .info-col {}

        .section-heading {
          font-family: inherit;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .info-text {
          font-size: 15px;
          line-height: 1.75;
          color: rgba(232,228,240,0.55);
          margin: 0 0 48px;
          max-width: 380px;
          font-weight: 300;
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: default;
          transition: all 0.3s;
          position: relative;
        }

        .contact-item:first-child { border-top: 1px solid rgba(255,255,255,0.05); }

        .contact-item:hover .contact-icon { background: rgba(167,139,250,0.15); border-color: rgba(167,139,250,0.5); }
        .contact-item:hover .contact-label { color: #a78bfa; }

        .contact-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(167,139,250,0.15);
          border-radius: 10px;
          color: #a78bfa;
          font-size: 15px;
          transition: all 0.3s;
          flex-shrink: 0;
          background: rgba(167,139,250,0.04);
        }

        .contact-text { display: flex; flex-direction: column; gap: 2px; }
        .contact-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(167,139,250,0.6);
          transition: color 0.3s;
        }
        .contact-value {
          font-size: 14px;
          font-weight: 400;
          color: rgba(232,228,240,0.8);
        }

        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 40px;
          padding: 10px 18px;
          background: rgba(34,197,94,0.06);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 100px;
          font-size: 12px;
          color: rgba(34,197,94,0.85);
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        .avail-dot {
          width: 7px;
          height: 7px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse-green 2s infinite;
        }

        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }

        /* Right Column - Form */
        .form-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 40px;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent);
        }

        .form-title {
          font-family: inherit;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 28px;
          letter-spacing: -0.01em;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 480px) {
          .form-grid-2 { grid-template-columns: 1fr; }
          .form-card { padding: 28px 20px; }
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 16px;
        }

        .field-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(167,139,250,0.7);
        }

        .field input,
        .field textarea {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 14px;
          font-family: inherit;
          color: #e8e4f0;
          outline: none;
          transition: all 0.25s;
          width: 100%;
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: rgba(232,228,240,0.2);
        }

        .field input:focus,
        .field textarea:focus {
          border-color: rgba(167,139,250,0.5);
          background: rgba(167,139,250,0.04);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.08);
        }

        .field textarea {
          min-height: 120px;
          resize: vertical;
          line-height: 1.6;
        }

        .file-input-wrapper {
          position: relative;
        }

        .file-input-label {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px dashed rgba(255,255,255,0.12);
          border-radius: 10px;
          font-size: 13px;
          color: rgba(232,228,240,0.4);
          cursor: pointer;
          transition: all 0.25s;
        }

        .file-input-label:hover {
          border-color: rgba(167,139,250,0.4);
          color: rgba(167,139,250,0.8);
          background: rgba(167,139,250,0.04);
        }

        .file-input-label svg { font-size: 16px; opacity: 0.6; }

        .file-input-real {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
        }

        .submit-btn {
          width: 100%;
          margin-top: 8px;
          padding: 15px 24px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #8b5cf6, #c084fc);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .submit-btn:hover::before { opacity: 1; }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(124,58,237,0.35); }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn span, .submit-btn svg { position: relative; z-index: 1; }

        .success-msg {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: rgba(8,8,16,0.92);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          z-index: 20;
          animation: fadeIn 0.4s ease;
        }

        .success-icon {
          width: 56px;
          height: 56px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .success-title {
          font-family: inherit;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
        }

        .success-sub {
          font-size: 13px;
          color: rgba(232,228,240,0.5);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <section className="hire-root">
        <div
          className="bg-glow"
          style={{
            background: `radial-gradient(ellipse 60% 50% at ${glowX}% ${glowY}%, rgba(109,40,217,0.12) 0%, transparent 70%), 
                         radial-gradient(ellipse 80% 60% at 20% 80%, rgba(59,7,100,0.15) 0%, transparent 60%),
                         radial-gradient(ellipse 50% 40% at 80% 10%, rgba(167,139,250,0.06) 0%, transparent 50%)`
          }}
        />
        <div className="grid-lines" />
        <div className="noise-overlay" />

        <Navbar />

        <div className="content-wrap">
          <div className="headline-block">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              Available for work
            </div>
            <h1 className="page-title">
              Let's build<br />
              something <span>great</span>
            </h1>
            <div className="tags-row">
              {SERVICE_TAGS.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="two-col">
            {/* Info Column */}
            <div ref={infoRef} className="info-col">
              <h2 className="section-heading">Work with me</h2>
              <p className="info-text">
                I craft clean, performant digital experiences — from polished landing pages to full web applications. Let's turn your idea into something real.
              </p>

              <div className="contact-list">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label} className="contact-item">
                    <div className="contact-icon">{item.icon}</div>
                    <div className="contact-text">
                      <span className="contact-label">{item.label}</span>
                      <span className="contact-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="availability-badge">
                <span className="avail-dot" />
                Currently available for new projects
              </div>
            </div>

            {/* Form Column */}
            <div ref={formRef}>
              <div className="form-card">
                {submitted && (
                  <div className="success-msg">
                    <div className="success-icon">✓</div>
                    <div className="success-title">Message sent!</div>
                    <div className="success-sub">I'll get back to you shortly.</div>
                  </div>
                )}

                <p className="form-title">Send a message</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-grid-2">
                    <div className="field">
                      <label className="field-label">Name *</label>
                      <input type="text" name="name" placeholder="Your name" required />
                    </div>
                    <div className="field">
                      <label className="field-label">Email *</label>
                      <input type="email" name="email" placeholder="you@email.com" required />
                    </div>
                  </div>

                  <div className="field">
                    <label className="field-label">Subject</label>
                    <input type="text" name="subject" placeholder="What's it about?" />
                  </div>

                  <div className="field">
                    <label className="field-label">Project Details *</label>
                    <textarea name="project" placeholder="Tell me about your project, timeline, and budget..." required />
                  </div>

                  <div className="field">
                    <label className="field-label">Attachments</label>
                    <div className="file-input-wrapper">
                      <label className="file-input-label">
                        <FaEnvelope style={{ opacity: 0.5 }} />
                        {files && files.length > 0
                          ? `${files.length} file(s) selected`
                          : "Click to attach files"}
                      </label>
                      <input
                        type="file"
                        className="file-input-real"
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="submit-btn">
                    <span>Send Hire Request</span>
                    <FaArrowRight />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}