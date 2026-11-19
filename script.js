/* ═══════════════════════════════════════════
   RAJ GUPTA — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── Theme Toggle ──
  const toggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // ── Navbar scroll effect ──
  const nav = document.getElementById("nav");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ── Mobile menu ──
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav__links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  // ── Scroll Reveal ──
  const revealEls = document.querySelectorAll(
    ".section__title, .about__text, .stat-card, .timeline__item, .project-card, .skill-group, .contact__form"
  );

  revealEls.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));

  // ── Active nav link highlight ──
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav__links a");

  const highlightNav = () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute("id");
    });
    navAnchors.forEach((a) => {
      a.style.color =
        a.getAttribute("href") === `#${current}`
          ? "var(--text)"
          : "";
    });
  };

  window.addEventListener("scroll", highlightNav, { passive: true });

  // ── Contact Form ──
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type='submit']");
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Sent!`;
    btn.style.background = "#22c55e";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = "";
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
});
