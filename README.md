# TeddyPups U.A.E.

A production Next.js web application for **TeddyPups U.A.E.**, a boutique teacup and miniature puppy showcase based in Downtown Dubai. The platform presents locally available showroom puppies alongside an international concierge import service, combining interactive scroll-driven storytelling, an animated SVG mascot, and a complete multi-page browsing experience.

Live deployment: `https://karan825.github.io/Teddy/`

---

## Overview

The application is designed around a cohesive storybook aesthetic and serves two primary customer journeys:

1. **In-Dubai Showroom Visits**: Prospective families can browse available miniature and teacup breeds, inspect verified photo and video galleries, and schedule a private showroom visit in Downtown Dubai.
2. **International Import Concierge**: Families can explore rare Korean teacup breeds, review health documentation and travel guarantees, and initiate inquiries directly via WhatsApp or the postal-style contact letterform.

---

## Pages and Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Eight-section interactive homepage featuring the hero lineup with quilted scalloped border, sticky horizontal-scroll *Meet the pups* hall, Korea-to-Dubai flight route, scroll-synced WhatsApp concierge preview, Trust Passport, Happy Families polaroid wall, Night FAQ, Cozy House CTA, and basket footer. |
| `/puppies` | Filterable catalog of all 33 puppies styled as Teddy's sketchbook, supporting filtering by availability origin (`Everywhere`, `In Dubai`, `Imported`, `Korean Teacup`), breed, and gender. |
| `/puppies/[slug]` | Statically generated profile pages for all 33 puppies with multi-image galleries, video modal playback, clinical specifications, and pre-filled WhatsApp inquiry links. |
| `/happy-families` | Polaroid photo wall displaying 64 adoption moments with an interactive lightbox viewer. |
| `/how-it-works` | Dual-mode adoption workflow (`In Dubai` vs. `Imported`), step-by-step cards, puppy promise seals, and delivery route overview. |
| `/faq` | Searchable corkboard of pinned FAQ note cards with 3D unfold transitions. |
| `/contact` | Postal stationery inquiry letterform with client-side validation alongside Downtown Dubai showroom details. |
| `/gone-home` | Archive of 27 adopted puppies presented as vintage travel ticket stubs. |

---

## Technology Stack and Tools

### Core Framework and UI
- **Next.js 16 (App Router)**: Static-export-ready architecture generating 43+ pre-rendered HTML routes (`output: "export"`).
- **React 19 & TypeScript**: Strongly typed data models (`PuppyProfile`, `FamilyItem`, `FaqItem`, `GoneHomeItem`) and modular presentation components.
- **Tailwind CSS v4**: Utility styling layered alongside the site's custom design tokens, typography (`Fraunces`, `Figtree`, `Shantell Sans`), and CSS keyframe animations.

### Motion, Graphics, and Interactivity
- **Lenis**: Smooth inertia wheel and touch scrolling (`SmoothScroll`).
- **Custom SVG Mascot Rig (`PupSvg`, `PupActor`, `PupLayer`)**: Modular 300x240 vector puppet with `requestAnimationFrame`-driven scroll waypoint interpolation, hip-pivoted 4-leg walk cycles, idle blinking, click-triggered tail wagging, speech bubbles, and heart particles.
- **HTML5 Canvas 2D (`PawTrailCanvas`)**: Cursor-tracking fading paw print particle overlay with custom SVG paw cursors.
- **Route Transition Curtain (`RouteCurtain`)**: Full-viewport quilted transition overlay with an animated walking mascot and paw print trail.

### Quality Assurance and Deployment
- **ESLint & TypeScript (`tsc --noEmit`)**: Static analysis and strict type checking.
- **Playwright**: Automated headless Chromium verification across desktop (`1440x900`), tablet (`768x1024`), and mobile (`390x844`) viewports.
- **GitHub Actions & GitHub Pages**: Automated static build, asset `basePath` rewriting (`scripts/fix_basepath.js`), and deployment via `.github/workflows/deploy.yml`.

---

## Project Structure

```text
clone/
├── .github/workflows/deploy.yml   # GitHub Pages CI/CD pipeline
├── app/                           # Next.js App Router pages, layout, fonts, and CSS
├── components/
│   ├── contact/                   # Postal letterform and showroom card
│   ├── families/                  # Happy families polaroid wall and lightbox
│   ├── faq/                       # Searchable FAQ corkboard
│   ├── gone-home/                 # Vintage ticket stub archive
│   ├── home/                      # Homepage scene sections (Hero, Meet, Paths, Chat, Trust, Families, FAQ, CTA)
│   ├── how-it-works/              # Dual-mode workflow and delivery overview
│   ├── layout/                    # Header, footer, mobile dock, Lenis, paw canvas, route curtain
│   ├── mascot/                    # SVG puppet rig, actor interactions, scroll waypoint layer
│   ├── puppies/                   # Sketchbook catalog, circular cards, and puppy detail view
│   └── ui/                        # Shared UI primitives
├── data/                          # Structured JSON datasets (puppies, families, faq, gone_home)
├── lib/                           # Data access helpers
├── public/                        # Static media, brand logo, and SVG paw cursors
├── scripts/                       # Build utilities and Playwright verification script
└── types/                         # TypeScript domain interfaces
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build production static export
npm run build
```

---

## Deployment

Pushes to the `main` branch trigger `.github/workflows/deploy.yml`, which:
1. Installs dependencies (`npm ci`).
2. Builds the Next.js static export (`GITHUB_ACTIONS=true npm run build`) into `./out`.
3. Rewrites root-relative asset paths for the `/Teddy` GitHub Pages subpath (`node scripts/fix_basepath.js`).
4. Uploads and deploys `./out` to GitHub Pages.
