# SU·EN Studio

Portfolio website for SU·EN Studio, an architecture and interiors practice based in Kerala and Bangalore.

> **Status:** Work in progress.

## Features

- Scroll-driven intro with the studio's six principles: Light, Form, Context, Flow, Tactility, Void
- Hero, studio bio and animated stats
- "The Process" section (six phases from site visit to interiors)
- Featured projects carousel
- Projects archive (`/projects`) and project detail pages (`/projects/[slug]`) with galleries
- Contact page with inquiry form
- Light and dark theme
- Loading state and page transitions

## Tech Stack

- Next.js (App Router) and React
- TypeScript
- CSS Modules and global CSS
- GSAP and Framer Motion
- Google Fonts via `next/font` (Syne, Inter, Space Mono, Fraunces)
- Deployed on Vercel

## Getting Started

Requires Node.js 20.9 or newer.

```bash
git clone https://github.com/aghar-usman/suen-studio.git
cd suen-studio
npm install
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |
| `npm run lint` | Run ESLint |

### Environment variables

If the contact form needs API keys, add them to `.env.local` (do not commit it). See `lib/contact.ts`.

## Project Structure

```
app/            Routes: home, /projects, /projects/[slug], /contact
components/     Hero, studio bio, process, featured projects, archive, gallery, nav, footer
lib/            Project data, contact logic, theme hook
public/images/  Logos and project images (public/images/projects/<slug>/)
```

## Adding a Project

1. Add images to `public/images/projects/<slug>/` (`cover.jpg`, then `01.jpg`, `02.jpg`, ...).
2. Add an entry to `lib/projects-data.ts`. The slug becomes the URL `/projects/<slug>`.

## Work in Progress

- Images missing for Caper Residence, Box House, Gokulam Residence and Casa Dhalaan
- Footer Instagram link is a placeholder
- Contact form delivery to be verified in production
- SEO, accessibility and image optimisation still to do

## License

© 2026 SU·EN Studio. All rights reserved.
