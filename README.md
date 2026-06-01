# SEFB Degree Planner — "Modern Coffee" Edition

A complete redesign of the SEFB UUM Degree Planner in the **WatchHouse** editorial
aesthetic (bone & charcoal, Libre Caslon + Hanken Grotesk). Multi-page, fully
self-contained, and offline-ready.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | **Overview** — CGPA ring, standing, achievement portfolio, estimated graduation, degree progress |
| `planner.html` | **Semester Planner** — programme setup, search, take-note alerts, drag-and-drop semester stack, PDF export |
| `analytics.html` | **Analytics** — per-semester GPA bar chart, CGPA trend, GPA & CGPA what-if calculators |
| `audit.html` | **Degree Audit** — graduation eligibility, component fulfilment, advisor & notes, badges |
| `settings.html` | **Settings** — programme/track/pathway/language, light↔dark, plan actions, help, about |

## Self-contained / offline
- **No CDNs, no build step.** Fonts are self-hosted (`fonts/*.woff2`, OFL-licensed),
  icons are inline SVG, all CSS/JS is local.
- The only "http" string in the code is the SVG XML namespace inside a `data:` URI — never fetched.
- Works by double-clicking `index.html` (`file://`) **and** when hosted on GitHub Pages.
- Student plans are saved in `localStorage` (`sefb_planner_v2`) — the same key as the
  classic dashboard, so existing plans carry over. Nothing is uploaded.

## Architecture
```
app/
  *.html              5 pages (shared top bar, mobile drawer + bottom nav, footer)
  css/watchhouse.css  design system (tokens, light/dark, components, responsive, print)
  js/
    data.js           GRADES + PROGRAMS (verbatim curriculum for all 5 programmes)
    core-engine.js    state, persistence, prereq engine, GPA/CGPA, theming, actions, modals
    charts.js         CGPA ring gauge + GPA bar chart + sparkline (canvas, HiDPI)
    ui.js             inline icons, chrome, selectors, shared renders, audit, alerts
    planner.js        semester grid, drag-and-drop, course placement, PDF export
    calculators.js    standalone GPA + CGPA projection tools
  fonts/              self-hosted Libre Caslon Text + Hanken Grotesk (woff2)
  images/             logo / ambient imagery
```
Each page loads only the scripts it needs and calls `renderAll()`; every render guards
on its own target element, so the shared engine is safe across pages.

## Deploy to GitHub Pages
1. Push this repository to GitHub.
2. **Settings → Pages →** Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Open `https://<username>.github.io/<repo>/app/` (or move the contents of `app/` to the
   repo root and open `index.html` directly).

The original single-file `SEFB_Dashboard.html` is untouched and still works as the classic dashboard.
