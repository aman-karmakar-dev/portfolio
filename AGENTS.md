# Portfolio Project Instructions

## Project
Personal portfolio for Aman, a frontend developer focused on immersive digital experiences.
Live at https://aman-karmakar.vercel.app/ — repository at https://github.com/aman-karmakar-dev/portfolio.

## Technology
- React 19
- JavaScript (JSX), never TypeScript
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- GSAP and `@gsap/react` (ScrollTrigger)
- Motion (`motion/react`)
- Lucide React
- React Router 7

## Architecture
- `src/App.jsx` — routes and the shared site layout (Navbar + Footer). Case-study pages render outside the layout.
- `src/pages/` — `Home`, `Aurelis`, `Sovi`.
- `src/sections/` — home page sections (hero, work, capabilities, about, experience, contact, …), one folder per section.
- `src/components/` — shared components (`Navbar`, `Footer`) and `components/ui`.
- `src/data/site.js` — single source of truth for site metadata, navigation, project paths, contact and socials.
- `public/` — self-hosted fonts (`fonts/`, with OFL licenses), images, favicon. Never reference Google Fonts CDN.

### Routes
- `/` — main portfolio experience
- `/work/aurelis` — AURELIS case study (`src/pages/Aurelis.jsx`)
- `/work/sovi` — SOVI case study (`src/pages/Sovi.jsx`)

## Design Direction
Dark Editorial.

### Design Tokens
- Background: #0B0C0E
- Primary text: #F1EEE7
- Accent: #C4F56A
- Surface: #141518
- Muted text: #858585

### Typography
- Space Grotesk: Display
- Inter: Body
- Instrument Serif: Editorial accents (italic serif highlights)

## Design Principles
- Premium editorial aesthetic.
- Strong typography and intentional whitespace.
- Asymmetric layouts.
- Subtle, purposeful animations.
- Responsive desktop and mobile layouts.
- No generic templates.
- Avoid excessive gradients and glassmorphism.

## Development Rules
- Inspect existing code before editing.
- Use reusable React components.
- Keep components maintainable.
- Use GSAP for complex animations.
- Respect reduced-motion preferences.
- Avoid unnecessary dependencies.
- Never introduce TypeScript.
- Never remove working functionality without permission.
- Test builds using `npm run build`.
- Run `npm run lint` before committing.

## Project Assets
- AURELIS screenshots: `public/images/` (e.g. `homepage.png`, `properties.png`, `property-details.png`).
- SOVI screenshots: `public/images/sovi-case-study-assets/screenshots/desktop/`.
- Amazon Clone screenshots: `public/images/amazon-clone/`.
- AURELIS is the flagship portfolio case study. Present it accurately as a project developed by the portfolio owner.
- SOVI is live in production at https://sovi-coffee.vercel.app/. Do not invent features, metrics or status for any project.
- Certificates/credential PDFs and images in `public/images/` are used for verification links only; some are not referenced in `src/` — do not delete without checking references first.

## Contact
- The enquiry form uses Web3Forms; the access key is provided via `VITE_WEB3FORMS_ACCESS_KEY` (see `.env.example`). Never commit real keys.
- `.env*` files are git-ignored except `.env.example`.
- Public site shows email and GitHub only — no phone numbers or WhatsApp links.

## Current Development Priorities
1. Keep the portfolio accurate, fast and accessible (reduced motion, keyboard navigation, semantic HTML).
2. Maintain and polish the AURELIS and SOVI case studies.
3. Ensure the production build (`npm run build`) stays clean.
4. Iterate on remaining sections incrementally — do not rebuild the site in one pass.
