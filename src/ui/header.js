export function Header({ brand, nav }) {
  return `
    <header>
      <div class="nav">
        <div class="brand">
            <img class="logo" src="/mamba-logo.svg" alt="${escapeHtml(brand)} logo" />
            <span>${escapeHtml(brand)}</span>
        </div>


        <nav class="links" aria-label="Sections">
          ${nav.map((n) => `<a class="navlink" href="${n.href}">${escapeHtml(n.label)}</a>`).join("")}
        </nav>

        <div class="actions">
          <a class="pill" href="#contact">Log in</a>
          <a class="pill primary" href="#contact">Get Started</a>
        </div>
      </div>
    </header>
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
