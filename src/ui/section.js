import { ICONS } from "../icons.js";

export function ContentSection({ id, title, subtitle, cards }) {
  return `
    <section class="block" id="${id}">
      <div class="panel">
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(subtitle)}</p>

        <div class="grid">
          ${cards.map((card) => Card(card)).join("")}
        </div>
      </div>
    </section>
  `;
}

function Card({ title, text, iconKey }) {
  const icon = ICONS[iconKey] ?? ICONS.sparkles;
  return `
    <div class="tile">
      <div class="tile-head">
        <span class="tile-icon">${icon}</span>
        <strong>${escapeHtml(title)}</strong>
      </div>
      <span>${escapeHtml(text)}</span>
    </div>
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
