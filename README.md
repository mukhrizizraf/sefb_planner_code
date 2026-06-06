# SEFB Degree Planner

Academic degree planner for UUM SEFB students — plan semesters, simulate CGPA, and track graduation progress.

**Live site:** https://mukhrizizraf.github.io/sefb_planner_code/

## Pages

| File | Page | Purpose |
|------|------|---------|
| `index.html` | **Overview** | CGPA ring gauge, current standing, achievement badges, degree progress, estimated graduation |
| `planner.html` | **Semester Planner** | Programme setup, drag-and-drop course placement, prereq enforcement, Dean's List simulator, PDF export |
| `analytics.html` | **CGPA Simulation** | Per-semester GPA bar chart, CGPA trend sparkline, GPA & CGPA what-if calculators |
| `audit.html` | **Graduation Checklist** | Graduation eligibility, component fulfilment, Professional Practice, badges |
| `courselist.html` | **Course List** | Searchable full programme course table with prereqs and category filters |
| `help.html` | **Help** | Annotated screenshot tour — step-by-step guide for new users |
| `settings.html` | **Settings** | Programme/track/pathway/language selectors, light↔dark theme, plan actions, about |

## Features

- **5 programmes** — BFin, BBank, BSc Economics, BRisk & Insurance, BAgribusiness
- **Prerequisite enforcement** — locks courses until prereqs are passed; fail-grade aware
- **English pathway & foreign language** selectors with automatic course substitution
- **Dean's List simulator** — auto-fills a semester with top grades in one click
- **Graduation audit** — eligibility based on passed credits only (not just placed)
- **Light / dark theme** — persists across pages
- **Mobile-responsive** — works on phone, tablet, and desktop
- **Offline-ready** — no CDN, no build step; works from `file://` or GitHub Pages

## Architecture

```
*.html              7 pages — shared topbar, mobile drawer + bottom nav, footer
css/watchhouse.css  full design system (tokens, light/dark, components, responsive, print)
js/
  data.js           GRADES + PROGRAMS (curriculum data for all 5 programmes)
  core-engine.js    state, localStorage, prereq engine, GPA/CGPA, theming, modals
  charts.js         CGPA ring gauge + GPA bar chart + sparkline (canvas, HiDPI)
  ui.js             icons, chrome, shared renders, audit, alerts, course list
  planner.js        semester grid, drag-and-drop, course actions, PDF export
  calculators.js    standalone GPA + CGPA projection calculators
fonts/              self-hosted Libre Caslon Text + Hanken Grotesk (woff2, OFL)
images/             logo + editorial photography
```

Student plans are saved in `localStorage` under key `sefb_planner_v2` — nothing is uploaded to any server.

## Programmes

| ID | Programme | Credits | Tracks |
|----|-----------|---------|--------|
| BFIN | Bachelor of Finance (Hons) | 122 | Investment / Wealth Management |
| BBANK | Bachelor of Banking (Hons) | 120 | KK / PR / MP / PM |
| BECONS | Bachelor of Science Economics (Hons) | 125 | — |
| BRMI | Bachelor of Risk Management & Insurance (Hons) | 120 | — |
| BAGRO | Bachelor of Agribusiness (Hons) | 125 | — |
