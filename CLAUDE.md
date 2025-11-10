# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing page for Three Day Weekend, LLC - B2B automation/back-office solutions for tree care companies. Pure HTML/CSS/JS (no frameworks), deployed via GitHub Pages.

## Local Development

```bash
# Run local server
python -m http.server 8000
# OR
npm install -g serve && serve .

# Visit http://localhost:8000 or http://localhost:3000
```

## Deployment

```bash
# Push changes
git add .
git commit -m "message"
git push origin main

# Enable GitHub Pages (if not already)
gh repo edit --enable-pages --pages-branch main --pages-path /
```

Site goes live at `https://username.github.io/repository-name/`

## Architecture

### Core Components

**Static site with 3 layers:**

1. **HTML (index.html)**: Single-page layout with semantic sections (hero, value-props, features, stats, CTA, footer)
2. **Styling (css/)**:
   - `style.css`: Core styles using CSS custom properties (`:root` variables)
   - `animations.css`: Keyframes and scroll-reveal animations
3. **JavaScript (js/)**:
   - `main.js`: UI controllers (SmoothScroll, ScrollReveal, CounterAnimation, StickyNav, CardTilt, etc.)
   - `canvas-effects.js`: Hero canvas animation system (particles, waves, gradient orbs, geometric shapes)

### Animation System

**Scroll-triggered reveals:** Elements with `[data-reveal]` attribute use Intersection Observer API. When visible, `.revealed` class is added triggering CSS transitions.

**Canvas animation:** `CanvasEffect` class in `canvas-effects.js` manages:
- Particle system (60 particles desktop, 30 mobile) with mouse interaction
- Sine wave layers (3 waves at different frequencies)
- Animated gradient orbs (3 radial gradients moving via timestamp)
- Rotating geometric shapes (squares + circles)

**Number counters:** Elements with `[data-target]` attribute animate from 0 to target value using `CounterAnimation` class.

### Design System

**Brand colors (CSS variables in `style.css`):**
- Primary: `#024F4F` (deep teal)
- Secondary: `#00BFFF` (electric blue)
- Accent: `#FF6B35` (orange)

**Typography:**
- Headings: Montserrat (Google Fonts)
- Body: Inter (Google Fonts)

**Responsive breakpoints:**
- Mobile: <768px
- Tablet: 768px-1024px
- Desktop: >1024px

### JavaScript Architecture

All components use ES6 classes initialized on `DOMContentLoaded`:
- Each class handles its own initialization and event listeners
- Utility functions (`throttle`, `debounce`) optimize scroll/resize handlers
- No external dependencies - vanilla JS only

## Customization

**Brand identity:** Edit CSS variables in `css/style.css:6-52`

**Content updates:**
- Company name: Search "Three Day Weekend" in `index.html`
- Email: Replace `info@threeday.llc` in `index.html`
- Copy/messaging: Edit text content in HTML sections
- Stats: Update `data-target` attributes in stats section

**Visual customization:**
- Card icons: Modify SVG shapes in `.card-icon` elements
- Canvas colors: Edit `this.colors` object in `canvas-effects.js:18-23`
- Animation timing: Adjust CSS transition variables in `style.css:48-52`

## Performance Notes

- Canvas particle count reduces on mobile (30 vs 60)
- Scroll handlers use throttling (16ms for 60fps, 100ms for nav)
- Intersection Observer for scroll reveals (no constant scroll listening)
- Images use lazy loading pattern (data-src attribute support in `main.js`)
- Prefers-reduced-motion media query disables animations in `animations.css`

## Contact

Email: info@threeday.llc
