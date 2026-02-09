// Simple inline SVG icons. Add more keys as needed.
// sections.json uses iconKey which maps here.
export const ICONS = {
  layout: svg(`<path d="M4 5h16v14H4z"/><path d="M4 9h16"/>`),
  rocket: svg(
    `<path d="M6.5 14.5 4 20l5.5-2.5"/><path d="M9 11c2.5-6 8.5-7 11-7-0.5 2.5-1 8.5-7 11l-4-4Z"/><path d="M10 10 7 7"/>`,
  ),
  cart: svg(
    `<path d="M6 6h15l-2 8H7L6 6Z"/><path d="M6 6 5 3H2"/><path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/><path d="M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>`,
  ),

  chart: svg(
    `<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16V9"/><path d="M12 16V7"/><path d="M16 16v-4"/>`,
  ),
  workflow: svg(
    `<path d="M7 7h6v6H7z"/><path d="M3 17h6v4H3z"/><path d="M15 17h6v4h-6z"/><path d="M10 13v4"/><path d="M9 17h6"/>`,
  ),
  code: svg(
    `<path d="m8 9-3 3 3 3"/><path d="m16 9 3 3-3 3"/><path d="M12 8l-2 8"/>`,
  ),

  users: svg(
    `<path d="M16 11a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"/><path d="M6 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M2 20c.5-3 3-5 6-5"/><path d="M10 20c.5-3 3-5 6-5"/><path d="M12 15c3 0 6 2 6 5"/>`,
  ),
  mic: svg(
    `<path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z"/><path d="M19 11a7 7 0 0 1-14 0"/><path d="M12 18v4"/><path d="M8 22h8"/>`,
  ),
  sparkles: svg(
    `<path d="M12 2l1.2 3.6L17 7l-3.8 1.4L12 12l-1.2-3.6L7 7l3.8-1.4L12 2Z"/><path d="M19 13l.8 2.4L22 16l-2.2.6L19 19l-.8-2.4L16 16l2.2-.6L19 13Z"/><path d="M4.5 12l.7 2.1L7 14.6l-1.8.6-.7 2.1-.7-2.1L2 14.6l1.8-.5.7-2.1Z"/>`,
  ),
};

function svg(inner) {
  return `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
         stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${inner}
    </svg>
  `;
}
