import { useEffect } from "react";

export default function AppScripts() {
  useEffect(() => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Fade-in ao scroll
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("animate-in");
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "all 0.8s ease-out";
      observer.observe(section);
    });

    // Outras animações de cards, stats e skills...
    const cards = document.querySelectorAll(
      ".service-card, .work-card, .testimonial-card, .blog-card, .skill-item, .timeline-item"
    );
    cards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
      observer.observe(card);
    });

    // Stats
    const stats = document.querySelectorAll(".stat-item");
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target.querySelector("h3");
          const finalValue = target.textContent;
          if (!isNaN(parseInt(finalValue))) {
            animateValue(target, 0, parseInt(finalValue), 2000);
          }
          entry.target.classList.add("animate-in");
          statsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    stats.forEach(stat => {
      stat.style.opacity = "0";
      stat.style.transform = "translateY(20px)";
      stat.style.transition = "all 0.6s ease-out";
      statsObserver.observe(stat);
    });

    // Função auxiliar
    function animateValue(element, start, end, duration) {
      const suffix = element.textContent.replace(/[0-9.]/g, "");
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + suffix;
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }

    // Cleanup para evitar duplicação de listeners
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.replaceWith(anchor.cloneNode(true));
      });
    };
  }, []);

  return null; // Esse componente só executa efeitos
}
