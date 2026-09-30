# Developer Portfolio

A fast, minimalist, static developer portfolio website built with **Astro**, **GSAP**, **Lenis**, and **plain CSS** (CSS custom properties, no Tailwind). 

Designed to be accessible (WCAG AA contrast), highly responsive, SEO-optimized, and motion-driven with award-winning 60fps micro-animations.

---

## 🚀 Key Features & Motion Architecture

- **Smooth Momentum Scrolling**: Powered by [Lenis](https://lenis.darkroom.engineering/) synchronized directly with GSAP `ScrollTrigger`.
- **Masked Heading Line Reveals**: Section titles and hero text slide up from behind clipping masks (`overflow: hidden` line wrappers) with staggered timing.
- **Header Auto-Hide**: Header hides on scroll down past threshold and reappears immediately on scroll up.
- **Top Scroll Progress Bar**: An accent-colored progress indicator tracks vertical scroll depth at the top of the viewport.
- **Project Detail Routes & View Transitions**: Clicking any project smoothly transitions to a dynamic project detail page (`/projects/[id]`) using shared-element image expansion via Astro View Transitions (`ClientRouter`), complete with project-to-project navigation.
- **Parallax & Custom View Cursor**: Desktop project cards feature subtle image parallax along with a custom floating "View" cursor following mouse movement.
- **Experience Timeline Drawing**: The vertical timeline line draws downward dynamically as the user scrolls, scaling node dots into place.
- **Number Counter Metrics**: Key performance metrics ("99%+", "50k+", "42%") dynamically count up when scrolled into view.
- **Magnetic Buttons**: Interactive primary and secondary desktop buttons calculate relative cursor position and apply subtle magnetic pull (`.btn-magnetic`).
- **Dark / Light Mode**: Seamless theme toggling driven by CSS custom properties with an anti-FOUC inline script in `<head>`.
- **Accessibility & Motion Safety**: Respects `prefers-reduced-motion` automatically by disabling Lenis, parallax, magnetic forces, and custom cursors, showing static content cleanly.

---

## 🎨 Motion & Animation Configuration

All animation parameters, easing functions, and ScrollTrigger options are managed in [`src/scripts/animations.ts`](file:///c:/Users/DELL/Downloads/Portfolio/src/scripts/animations.ts) and [`src/styles/global.css`](file:///c:/Users/DELL/Downloads/Portfolio/src/styles/global.css).

### Easing & Timing Parameters
- **Global Easing Curve**: `power3.out` (`cubic-bezier(0.16, 1, 0.3, 1)`) for clean, organic momentum.
- **Hero Intro Duration**: `0.9s` line mask reveal, `0.7s` stagger fade (1.2s total sequence, played once per session stored in `sessionStorage`).
- **Scroll Reveal Threshold**: Triggers when elements reach `82%` from the top of the viewport (`start: 'top 82%'`).

### Adjusting Animation Parameters
- **Change Lenis Scroll Speed**: Modify `duration` or `wheelMultiplier` in `initAnimations()` inside `src/scripts/animations.ts`.
- **Change Magnetic Force**: Adjust the `0.35` multiplier in `setupMagneticButtons()` inside `src/scripts/animations.ts`.
- **Modify Parallax Intensity**: Change `yPercent: -10` in `setupProjectParallax()` inside `src/scripts/animations.ts`.
- **Change Accent Color**: Adjust `--color-accent` in `src/styles/global.css`.

---

## 📁 Directory Structure

```
Portfolio/
├── public/
│   ├── favicon.svg           # Developer SVG icon
│   └── projects/             # High-resolution project preview screenshots
├── src/
│   ├── components/
│   │   ├── Header.astro      # Auto-hiding header, nav links, & theme toggle
│   │   ├── Hero.astro        # Masked line reveal intro & magnetic buttons
│   │   ├── Projects.astro    # Featured parallax cards & project detail links
│   │   ├── AboutSkills.astro # Bio, metric counters, & categorized tech stack
│   │   ├── Experience.astro  # Dynamic line-drawing career timeline
│   │   ├── Contact.astro     # Magnetic CTA buttons & email copy tool
│   │   └── Footer.astro      # Social links and back-to-top smooth scroll
│   ├── data/
│   │   ├── personal.ts       # Bio, skills, & work experience timeline
│   │   └── projects.ts       # Project data single source of truth
│   ├── layouts/
│   │   └── Layout.astro      # Shell, ViewTransitions router, progress bar, cursor
│   ├── pages/
│   │   ├── index.astro       # Main portfolio entrypoint
│   │   └── projects/
│   │       └── [id].astro    # Dynamic project detail page with shared transition
│   ├── scripts/
│   │   └── animations.ts     # GSAP + Lenis animation controller
│   └── styles/
│       └── global.css        # Design tokens, variables, & motion rules
├── astro.config.mjs
├── package.json
└── README.md
```

---

## 🛠️ Local Development & Deployment

### Start Development Server
```bash
npm run dev
```
Open `http://localhost:4321` in your browser.

### Build Production Bundle
```bash
npm run build
```
Static production output will be built into the `dist/` directory.

### Deploying to Vercel / Netlify
- **Vercel**: Import repository into Vercel Dashboard. Vercel automatically builds Astro.
- **Netlify**: Connect repository, set build command to `npm run build` and publish directory to `dist`.
