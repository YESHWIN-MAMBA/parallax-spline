# parallax-spline

A Spline-inspired 3D parallax, scrollable marketing homepage built for **Mamba**.  
It uses a fixed Three.js canvas behind modular, JSON-driven sections (Products, Resources, Community, Get in touch) to showcase web design + development capability.

## Demo

- Local: `http://localhost:5173`
- GitHub Pages: `https://<your-username>.github.io/parallax-spline/`

---

## Tech Stack

- **Vite** — dev server + production bundler
- **Vanilla JavaScript (ES Modules)** — modular UI (no React)
- **Three.js** — WebGL 3D scene (floating, interactive shapes)
- **CSS** — single stylesheet for the entire UI
- **JSON-driven content** — homepage sections/cards configured in `src/data/sections.json`
- **GitHub Pages** — free static hosting (via GitHub Actions)

> This is intentionally **not React**. The page is lightweight, fast, and easy to maintain with simple modules + JSON content.

---

## Key Features

### 3D Background (Three.js)

- Fixed full-screen canvas behind content (`#stage`)
- Floating shapes with:
  - subtle parallax movement based on pointer
  - scroll-driven camera depth movement
  - hover highlighting
  - click “impulse” interaction (pop/push effect)
  - optional spin-in-place behavior (object rotation)
- Softer, less-glossy materials to match a “Spline-like” aesthetic

### Scrollable Marketing Homepage

- Sections:
  - **Products**
  - **Resources**
  - **Community**
  - **Get in touch** (form)
- Responsive layout (desktop + mobile)
- Smooth anchor scrolling
- Active navigation highlighting (stable scroll-based logic)

### Content Managed via JSON

- Update section headings, descriptions, cards, and icons without changing code:
  - `src/data/sections.json`
- Each card includes an `iconKey` which maps to an inline SVG icon in:
  - `src/icons.js`

### Contact Form (UI)

- Form fields generated from JSON config (`sections.json`)
- Demo submit handler (logs payload + shows success message)
- Easy to swap to a real provider (Formspree / Netlify Forms / custom API)

---

## Project Structure

```
parallax-spline/
  index.html
  vite.config.js
  public/
    (static assets e.g. logos if used)
  src/
    main.js
    styles.css
    icons.js
    data/
      sections.json
    ui/
      header.js
      section.js
      contactForm.js
      footer.js
    three/
      scene.js
```

### Components / Modules

- `src/main.js`
  - Loads `sections.json`
  - Renders the full page (header → hero → sections → contact → footer)
  - Wires UI events (shuffle, form submit, nav active state)
  - Starts the Three.js scene

- `src/three/scene.js`
  - Creates renderer, scene, camera, lights
  - Generates objects (rounded cubes, spheres, optional rounded triangle prism)
  - Handles interactions (hover, click)
  - Animates parallax + scroll depth + object motion

- `src/ui/header.js`
  - Header markup from JSON nav items
  - Supports logo in the brand area (SVG/PNG)

- `src/ui/section.js`
  - Generic content section renderer
  - Cards + icons using `iconKey`

- `src/ui/contactForm.js`
  - JSON-driven form renderer (inputs/select/textarea)

- `src/ui/footer.js`
  - Footer links and branding

- `src/styles.css`
  - Single stylesheet for the full UI (layout, cards, form, nav)

---

## Getting Started

### Requirements

- Node.js 18+ (Node 20 recommended)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Configuration

### Edit content

Update copy, sections, cards, icons, and form fields in:

- `src/data/sections.json`

### Change card icons

Each card uses:

```json
"iconKey": "layout"
```

Available icons are mapped in:

- `src/icons.js`

Add your own icon by creating a new key in `ICONS` and referencing it in `sections.json`.

---

## Deployment (GitHub Pages)

This project is set up to deploy to GitHub Pages via GitHub Actions.

### Vite base path

Ensure `vite.config.js` includes the repo name:

```js
import { defineConfig } from "vite";

export default defineConfig({
  base: "/parallax-spline/",
});
```

### GitHub Actions workflow

Workflow lives at:

- `.github/workflows/deploy.yml`

Push to `main` to trigger deployment.

---

## License

Private / Individual project
