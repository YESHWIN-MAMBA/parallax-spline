import "./styles.css";
import logoUrl from "./assets/mamba-logo.svg";

import data from "./data/sections.json";

import { Header } from "./ui/header.js";
import { ContentSection } from "./ui/section.js";
import { ContactSection } from "./ui/contactForm.js";
import { Footer } from "./ui/footer.js";

import { startScene } from "./three/scene.js";

const app = document.querySelector("#app");

app.innerHTML = `
  ${Header({ brand: data.site.brand, nav: data.nav, logoUrl })}
  <main>
    ${Hero(data)}
    ${data.sections.map((s) => ContentSection(s)).join("")}
    ${ContactSection(data.contact)}
    ${Footer(data.footer)}
  </main>
`;

function Hero(d) {
  return `
    <section class="hero" id="top">
      <div>
        <h1>${escapeHtml(d.hero.titleLines[0])}<br/>${escapeHtml(d.hero.titleLines[1])}</h1>
        <p class="lead">${escapeHtml(d.hero.lead)}</p>

        <div class="cta">
          <a class="btn primary" href="${d.site.ctaPrimaryHref}" id="cta">${escapeHtml(d.site.ctaPrimaryLabel)}</a>
          <a class="btn" href="#" id="randomize">${escapeHtml(d.site.ctaSecondaryLabel)}</a>
        </div>

        <div class="hint">
          <div class="mouse" aria-hidden="true"></div>
          <span>Scroll to explore depth</span>
        </div>
      </div>
    </section>
  `;
}

function escapeHtml(s = "") {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}

// --- Start 3D scene ---
const canvas = document.querySelector("#stage");
let populateFn = null;

startScene({
  canvas,
  onPopulateReady: (populate) => {
    populateFn = populate;
  },
});

// Shuffle objects button
document.addEventListener("click", (e) => {
  const el = e.target;
  if (el && el.id === "randomize") {
    e.preventDefault();
    populateFn && populateFn();
  }
});

// Contact form (demo submit handler)
document.addEventListener("submit", (e) => {
  const form = e.target;
  if (form && form.id === "contactForm") {
    e.preventDefault();

    const note = document.querySelector("#formNote");
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    // Demo success message (replace with real POST)
    note.textContent =
      "Thanks — we’ve received your message. We’ll be in touch shortly.";
    form.reset();

    // You can replace this with fetch() to your backend:
    // fetch("/api/contact", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) })
    console.log("Contact payload:", payload);
  }
});

// Active nav link highlight
setupActiveNav();

function setupActiveNav() {
  const links = Array.from(document.querySelectorAll("a.navlink"));

  // Sections we care about (top + each hash target)
  const sections = [
    document.querySelector("#top"),
    ...links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean),
  ];

  // Avoid duplicates
  const uniqueSections = Array.from(new Set(sections));

  // Stable "which section is active" logic based on scroll position
  const HEADER_OFFSET = 130; // keep in sync with CSS scroll-margin-top-ish

  function setActive(hash) {
    for (const a of links) {
      a.classList.toggle("active", a.getAttribute("href") === hash);
    }
  }

  function getActiveSectionHash() {
    const y = window.scrollY + HEADER_OFFSET;

    // Find the last section whose top is above current scroll position
    let current = uniqueSections[0]; // default to top
    for (const sec of uniqueSections) {
      if (!sec) continue;
      const top = sec.offsetTop;
      if (top <= y) current = sec;
    }
    return current && current.id ? `#${current.id}` : "#top";
  }

  // Throttle with rAF for smoothness and no flicker
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActive(getActiveSectionHash());
      ticking = false;
    });
  }

  // Update on load + on scroll + on resize
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  // Optional: when clicking nav links, update immediately (feels snappy)
  document.addEventListener("click", (e) => {
    const a = e.target?.closest?.("a.navlink");
    if (!a) return;
    setActive(a.getAttribute("href"));
  });
}
