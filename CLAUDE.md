# CLAUDE.md — app/ (WatchHouse Edition)

This file provides guidance to Claude Code when working with the **`app/`** folder —
the redesigned multi-page SEFB UUM Degree Planner in the "Modern Coffee / WatchHouse"
editorial aesthetic.

---

## Project overview

Five-page, zero-build, fully self-contained academic dashboard for UUM SEFB students.
No framework, no CDN, no server — open `app/index.html` in any browser to start.
Works offline and on GitHub Pages without modification.

**All edits to this redesign go inside `app/`.** The original `SEFB_Dashboard.html`
in the project root is a separate, untouched legacy file — do not confuse the two.

---

## File structure

```
app/
  index.html          Overview page
  planner.html        Semester Planner page
  analytics.html      Analytics (charts + calculators) page
  audit.html          Degree Audit page
  settings.html       Settings / Help / About page
  README.md           Deployment instructions (GitHub Pages)

  css/
    watchhouse.css    Single design-system stylesheet — all tokens, components, layout,
                      light/dark, responsive, print. No external imports.

  js/
    data.js           Verbatim GRADES + PROGRAMS objects for all 5 SEFB programmes.
                      Extracted from the canonical SEFB_Dashboard.html. Do NOT
                      hand-edit course data here — sync from the root file instead.
    core-engine.js    State, persistence, prereq engine, GPA/CGPA, theming (light/dark),
                      shared actions (loadRecommended, resetPlan, extraSems), modals,
                      toast, renderAll() dispatch. Loaded on every page.
    charts.js         CGPA ring gauge (canvas), per-semester GPA bar chart (canvas),
                      CGPA trend sparkline (inline SVG), animateNumber count-up.
                      HiDPI/DPR-sharp, dark-mode aware. Loaded on pages with charts.
    ui.js             Inline SVG icon set (ICONS map + icon() helper), page chrome
                      (initChrome, nav active state, mobile drawer), all select renders
                      (programme / track / pathway / language), shared renders:
                      renderHeroStats, renderClassification, renderDegreeProgress,
                      renderMilestone, renderBadges, renderGpaTable, renderCharts,
                      renderAudit, renderAlerts (take-note panel), sessionToTerm().
    planner.js        renderSemesters(), buildAddDropdown() (full grouped optgroup logic
                      with D-track + F-field sub-sections and lock hints), attachDragHandlers(),
                      addCourse/removeCourse/setSemSession/setGrade, plannerSearch(),
                      exportPDF(). Loaded only on planner.html.
    calculators.js    Standalone GPA calculator + CGPA projection tool. Loaded only on
                      analytics.html.

  fonts/              Self-hosted OFL-licensed woff2 fonts (no CDN required):
                        Libre Caslon Text 400 / 400-italic / 700
                        Hanken Grotesk 300 / 400 / 600 / 700

  images/
    sefb.png          SEFB UUM logo (used as avatar in top bar)
    uum-pic1.jpg      Ambient backdrop (kept for future use)
```

---

## Design system (watchhouse.css)

### Aesthetic
"WatchHouse" editorial: bone & charcoal, **sharp 0 px corners**, 1 px blueprint borders,
no drop shadows. Two typefaces: **Libre Caslon Text** (serif display/headlines) and
**Hanken Grotesk** (sans body). Uppercase tracked labels everywhere.

### CSS custom properties (tokens)

| Token | Light value | Dark value |
|---|---|---|
| `--surface` | `#fef9f3` | `#16140f` |
| `--bone` | `#f9f4ee` | `#211e18` |
| `--ink` | `#1d1b18` | `#f5f0ea` |
| `--sub` | `#4c4546` | `#cfc9c0` |
| `--warm` | `#696561` | `#a8a299` |
| `--faint` | `#a59f98` | `#7e7872` |
| `--line` | `rgba(105,101,97,.16)` | `rgba(245,240,234,.12)` |
| `--amber` | `#d4a373` | same |
| `--amber-deep` | `#b07a3f` | same |
| `--charcoal` | `#1a1a1a` | `#0e0d0a` |
| `--error` | `#ba1a1a` | same |

Light/dark is toggled via `body.light-mode` / `body.dark-mode` classes.
`state.theme` is `"light"` or `"dark"` — no other values.

### Key CSS classes
- `.bone-card` / `.panel` — main card containers (bone bg, 1 px border)
- `.dark-card` — inverted charcoal card (audit status, milestone)
- `.stat-card` — KPI tile (large serif number + uppercase label)
- `.btn-outline` / `.btn-solid` / `.btn-ghost` — three button variants; add `.sm` for small
- `.eyebrow` — amber-deep uppercase label above headings
- `.chip` — context/metadata pill (border, uppercase, inline value)
- `.progress-track` / `.progress-fill` — 2 px minimalist progress bar
- `.sem-card` — semester card (add `.is-current`, `.is-extra`)
- `.course-row` — editorial course row inside a semester card
- `.cat-{A…H}` on `.course-row` — coloured 3 px left border per component category
- `.take-note` / `.has-alerts` — alert panel (amber border, shows on `.has-alerts`)
- `.audit-row` / `.is-ok` — graduation audit row + completion state
- `.badge` / `.is-gold` — achievement badge card

### Icons
All icons are **inline SVG** — no icon font, no external request.
The `ICONS` map in `ui.js` covers: `overview, planner, analytics, audit, settings,
menu, close, add, download, reset, light, dark, chevron, arch, trophy, book,
search, warn, person, cap`.

Use the `icon(name, extraClass)` helper in JS to generate an `<svg class="ic …">` string.
Add new icons by appending a path string to `ICONS` in `ui.js`.

To place an icon declaratively in HTML, use `<span data-icon="name"></span>` —
`hydrateIcons()` (called inside `initChrome()`) replaces it with the SVG.

---

## Boot sequence (per page)

Every page ends with this minimal inline `<script>`:

```js
loadState();      // from core-engine.js — reads localStorage, applies theme
initChrome();     // from ui.js — sets nav active state, hydrates icons, wires toggles
renderAll();      // from core-engine.js — dispatches every render fn that exists on this page
// page-specific extras e.g.:
gpaCalcRender();  // analytics only
cgpaCalcRender(); // analytics only
```

`renderAll()` calls `safe(name)` for every known render function. `safe()` silently
skips any function that doesn't exist or whose target element is absent — so loading
`ui.js` on every page is safe even if a given page lacks a `#badges` or `#semesters` div.

Each page declares `<body data-page="pagename">`. `initChrome()` reads this to set the
active nav link.

---

## Shared state

```js
state = {
  programId: "BFIN",      // active programme key
  trackId:   "INV",       // specialization track (empty "" if programme has none)
  plan:      {},           // { [semesterNumber]: [{code, grade}, …] }
  theme:     "light",      // "light" | "dark"
  pathId:    "L2",         // English pathway: L1 | L2 | L3 | EX
  langId:    "MAN",        // Foreign language family: MAN | ARA | JPN | FRA | KOR | OTH
  extraSems: 0,            // extension semesters added beyond p.semCount
  semSession:{},           // { [semesterNumber]: "A241" } — UUM session codes
  lastSaved: timestamp,
  dismissedAlerts: [],
  alertsMuted: false
}
```

Persisted in `localStorage` under key `"sefb_planner_v2"` (same key as the legacy
dashboard, so existing student plans load automatically in the new UI).

---

## Data layer (data.js)

`data.js` is a **verbatim slice** of `SEFB_Dashboard.html` lines 1628–2327.
It defines `GRADES` and `PROGRAMS.{BFIN, BBANK, BECONS, BRMI, BAGRO}`.

**If curriculum data changes**, update `SEFB_Dashboard.html` (the canonical source)
then re-extract: open the root file, copy lines 1628–2327 into `app/js/data.js`,
keeping the header comment block at the top. Do not edit course objects directly in
`data.js`.

Programme totals for validation: BFIN 122 cr | BBANK 120 cr | BECONS 125 cr | BRMI 120 cr | BAGRO 125 cr.

---

## Prerequisite engine (core-engine.js — isPrereqsMet)

Four checks, evaluated in order:
1. **Course-code prereqs** — must appear in an *earlier* semester. B-cat English courses
   outside the student's chosen pathway are automatically exempted.
2. **Pass-grade enforcement** — a prereq graded in `FAIL_GRADES = {C-, D+, D, F}` counts
   as not satisfied.
3. **Minimum credits** — `c.minCr` requires `creditsBefore(semester) >= c.minCr`.
4. **Semester offering** — `c.offer = "odd" | "even"` restricts which semesters the course
   can appear in.

Lock indicators in the add dropdown: `● Odd/Even sems only · ✕ Prereq failed · 🔒 generic`.

---

## Charts (charts.js)

### CGPA ring gauge
- Canvas `440×440` logical px, `max-width:300px` via CSS, HiDPI via `dpr` + `setTransform`.
- Clean full-circle ring: track at low alpha, progress arc with amber/charcoal/error colour
  depending on tier, Dean's List tick at 3.67, centre serif CGPA value.
- `animateRingGauge(target)` — easing RAF loop. Call after `computeGPA()`.
- `_drawRingGauge(cgpa)` — single frame draw (also called by `animateRingGauge`).

### GPA bar chart
- `drawSemBarChart(perSemData)` — draws per-semester bars. Amber = Dean's-list semester
  (GPA ≥ 3.67), charcoal = normal, error-red = below 2.00. Amber dashed 3.67 line.
- Caches last data in `_lastPerData`; call `drawSemBarChart()` (no args) to redraw on
  resize/theme toggle.
- `redrawCharts()` — redraws both ring and bar. Wired to `window.resize` (debounced 150 ms).
  Call from `applyTheme` / `toggleTheme` in `core-engine.js` via `safe("redrawCharts")`.

### DOM elements expected
| ID | Page | Purpose |
|---|---|---|
| `cgpaRingCanvas` | index, (any) | Ring gauge canvas |
| `cgpaRingClass` | index | Classification label (`data-tier` attribute) |
| `cgpaRingMotiv` | index | Delta-to-next-tier text |
| `semBarCanvas` | analytics | Bar chart canvas |
| `semBarWrap` | analytics | Wrapper div (gets `.is-empty` class when no data) |
| `deansListBadge` | analytics | HTML pill — never drawn in canvas |
| `trendSparkline` | analytics | Receives `buildSparkline()` SVG string |

---

## Adding a new page

1. Copy the HTML chrome (topbar, drawer, bottomnav, footer, modal/confirm/toast divs,
   edge divs, script block) from any existing page.
2. Set `data-page="yourpage"` on `<body>`.
3. Add `<a data-nav="yourpage" href="yourpage.html">` to all five nav elements (topnav,
   drawer, bottomnav on every existing page).
4. Write the page-specific DOM; add IDs matching the render functions you need.
5. Load only the scripts required; call `loadState(); initChrome(); renderAll();` at the end.

---

## Editing guidelines

- **CSS changes** → `css/watchhouse.css` only. No inline styles except dynamic widths on
  canvas elements and progress bars.
- **New icons** → add to the `ICONS` object in `ui.js`; use `icon()` in JS or
  `data-icon="name"` in HTML.
- **New render function** → add to `renderAll()`'s dispatch array in `core-engine.js`
  so it fires on every page that has the target element.
- **Curriculum edits** → edit `PROGRAMS` in the root `SEFB_Dashboard.html`, then
  re-extract lines 1628–2327 into `app/js/data.js`.
- **No external dependencies** — do not add CDN links, `import`, or `require`. Everything
  must remain self-contained and offline-capable.
- **No build step** — keep it plain HTML/CSS/JS. The site must open by double-clicking
  `index.html`.
- **Custom confirm dialogs** → use `showConfirm(msg, onOk)` from `core-engine.js`.
  Never use browser-native `confirm()`.
- **Toast messages** → use `toast(msg)` from `core-engine.js`.
- **Theme** → call `toggleTheme()` from `core-engine.js`. Never manually set
  `body.classList` for theming.

---

## GitHub Pages deployment

Push the repo to GitHub. Go to **Settings → Pages → Deploy from branch → `main` `/root`**.
The site lives at `https://<user>.github.io/<repo>/app/`.

Alternatively, move the contents of `app/` to the repository root and set Pages to
deploy from `/root` — then the site is at `https://<user>.github.io/<repo>/`.

No build step needed. All assets are relative paths, so the site works at any depth.
