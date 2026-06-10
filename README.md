# Electronics Sale — Tech Brand Landing Page

A Samsung-inspired electronics storefront landing page built with React, Vite, GSAP animations, Three.js, and Tailwind CSS v4.

## Tech Stack

- **React 19** + TypeScript
- **Vite 6** — build tool and dev server
- **Tailwind CSS v4** — utility-first styling
- **GSAP** — scroll-triggered animations
- **Three.js** + `@react-three/fiber` + `@react-three/drei` — interactive 3D scene
- **Framer Motion** — component transitions
- **Radix UI** — accessible headless UI primitives
- **Wouter** — client-side routing
- **TanStack Query** — async state management

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
electronics-sale/
├── public/
│   ├── favicon.svg
│   └── hero-phone.png          # Hero section product image
├── src/
│   ├── assets/images/          # Static product images
│   ├── components/
│   │   ├── sections/           # Page sections (Navbar, Hero, etc.)
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ThreeFeature.tsx   # Three.js interactive scene
│   │   │   ├── FeaturedProduct.tsx
│   │   │   ├── FeaturesStrip.tsx
│   │   │   ├── PromoBanner.tsx
│   │   │   └── Footer.tsx
│   │   ├── three/
│   │   │   └── ThreeScene.tsx  # R3F meshes (TorusKnot, FloatingParticles)
│   │   └── ui/                 # Radix-based shadcn/ui components
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css               # Tailwind v4 theme + CSS variables
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Notes

- The Three.js scene (`ThreeFeature`) detects WebGL support at runtime and falls back to a CSS-only animated scene if unavailable.
- All GSAP animations are scroll-triggered via `ScrollTrigger`.
- The project was originally scaffolded on Replit and has been restructured as a fully standalone local project.
