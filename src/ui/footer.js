export function Footer({ left, links }) {
  const year = new Date().getFullYear();
  return `
    <footer>
      <div class="footer tiny">
        <div>
          <strong style="color:rgba(233,236,255,.9)">${escapeHtml(left)}</strong><br/>
          © ${year} All rights reserved.
        </div>
        <div class="footer-links">
          ${links.map((l) => `<a href="${l.href}">${escapeHtml(l.label)}</a>`).join("")}
        </div>
      </div>
    </footer>
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
