export function ContactSection(contact) {
  return `
    <section class="block" id="${contact.id}">
      <div class="panel">
        <h2>${escapeHtml(contact.title)}</h2>
        <p>${escapeHtml(contact.subtitle)}</p>

        <form class="form" id="contactForm">
          <div class="form-grid">
            ${contact.fields.map((f) => Field(f)).join("")}
          </div>

          <div class="form-actions">
            <button class="btn primary" type="submit">${escapeHtml(contact.submitLabel)}</button>
            <div class="form-note" id="formNote" aria-live="polite"></div>
          </div>
        </form>
      </div>
    </section>
  `;
}

function Field(f) {
  const req = f.required ? "required" : "";
  const id = `f_${f.name}`;

  if (f.type === "textarea") {
    return `
      <label class="field field-full" for="${id}">
        <span>${escapeHtml(f.label)}${f.required ? " *" : ""}</span>
        <textarea id="${id}" name="${escapeHtml(f.name)}" placeholder="${escapeHtml(f.placeholder ?? "")}" ${req}></textarea>
      </label>
    `;
  }

  if (f.type === "select") {
    return `
      <label class="field" for="${id}">
        <span>${escapeHtml(f.label)}${f.required ? " *" : ""}</span>
        <select id="${id}" name="${escapeHtml(f.name)}" ${req}>
          <option value="" disabled selected>Select…</option>
          ${(f.options ?? []).map((o) => `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join("")}
        </select>
      </label>
    `;
  }

  return `
    <label class="field" for="${id}">
      <span>${escapeHtml(f.label)}${f.required ? " *" : ""}</span>
      <input id="${id}" name="${escapeHtml(f.name)}" type="${escapeHtml(f.type)}"
             placeholder="${escapeHtml(f.placeholder ?? "")}" ${req} />
    </label>
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
