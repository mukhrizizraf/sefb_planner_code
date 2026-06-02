# CLAUDE.md — app/ (SEFB Degree Planner — WatchHouse Edition)

Last updated: 2026-06-02

This file provides guidance to Claude Code when working with the **`app/`** folder —
the redesigned multi-page SEFB UUM Degree Planner in the WatchHouse editorial aesthetic.

---

## Project overview

Five-page, zero-build, fully self-contained academic dashboard for UUM SEFB students.
No framework, no CDN, no server — open `app/index.html` in any browser to start.
Works offline and on GitHub Pages without modification.

**All edits to this redesign go inside `app/`.** The original `SEFB_Dashboard.html`
in the project root is the canonical curriculum source — do not confuse the two.
When curriculum data changes, edit `SEFB_Dashboard.html` first, then re-sync `app/js/data.js`.

Live site: `https://mukhrizizraf.github.io/sefb_planner_code/`
GitHub repo: `mukhrizizraf/sefb_planner_code` (contents of `app/` at repo root)

---

## File structure

```
app/
  index.html            Overview page (full-bleed campus hero, ring gauge, editorial split)
  planner.html          Semester Planner (Programme Setup top-left, Actions top-right)
  analytics.html        Analytics — GPA bar chart, sparkline, calculators
  audit.html            Graduation Checklist — component audit, badges
  settings.html         Settings / Help / About

  css/
    watchhouse.css      Single design-system stylesheet — all tokens, components, imagery,
                        brand lockup, layout, light/dark, responsive, print. No external imports.

  js/
    data.js             Verbatim GRADES + PROGRAMS (lines 1628–2327 of SEFB_Dashboard.html).
                        Re-extracted with correct UTF-8 — byte-identical to source.
                        DO NOT hand-edit; sync from the root canonical file.
    core-engine.js      State, persistence, prereq engine, GPA/CGPA,
                        passedCredits() + componentTotals() (audit correctness fix),
                        theming (light/dark), shared actions, modals, toast, renderAll().
    charts.js           CGPA ring gauge (canvas), per-semester GPA bar chart (canvas),
                        sparkline (SVG), animateNumber. Arc colour uses _ringAnimTarget
                        to avoid red flash mid-sweep animation.
    ui.js               SVG icon set, page chrome (initChrome), select renders,
                        renderAudit() (eligibility uses passedCredits only),
                        renderHeroStats, renderClassification, renderDegreeProgress,
                        renderMilestone, renderBadges, renderGpaTable, renderCharts,
                        renderAlerts, sessionToTerm().
    planner.js          renderSemesters(), buildAddDropdown(), drag-drop, course actions,
                        plannerSearch(), exportPDF().
    calculators.js      Standalone GPA + CGPA projection. analytics.html only.

  fonts/                Self-hosted OFL woff2 — Libre Caslon Text (400/400i/700) +
                        Hanken Grotesk (300/400/600/700). No CDN.

  images/
    sefb.png            SEFB UUM logo — topbar brand lockup (height:38px) + footer
    campus.png          Real SEFB building photo ("I ❤ SEFB") — Overview full-bleed hero
                        Rotated -1.6° + scale(1.12) in CSS to level the building sign.
    hero-banner.jpg     WatchHouse warm interior — editorial split on Overview
    focus-studio.jpg    Studio interior — image strip on Planner page
    house-midtown.jpg   Amber interior — Milestone dark card bg on Overview
    house-marsa.jpg     Outdoor terrace — Industrial Training split on Checklist page
    uum-pic1.jpg        UUM ambient backdrop (kept for future use)
```

---

## Branding

- **App name everywhere**: "SEFB Degree Planner" (not "WatchHouse")
- **Brand lockup**: `<a class="brand-lockup">` → `<img class="brand-logo">` (38px height) + `<span class="brand-mark">SEFB <em>Degree Planner</em></span>`
- **Nav labels**: Overview · Planner · Analytics · Checklist · Settings (CSS uppercase via tracking)
- **"Audit" tab** was renamed to **"Checklist"** — the HTML page is still `audit.html`, the `data-nav` attribute is still `"audit"`, only the visible label changed.

---

## Page layouts

### index.html (Overview)
1. Full-bleed campus hero (`campus.png`, -1.6° counter-rotation) with white overlay text + CTA buttons
2. Ring gauge (left) + Current Standing / stat cards (right) — shows "Your programme · X · change" link
3. Editorial split: `hero-banner.jpg` left + Malaysian student copy right
4. Achievement badge grid
5. Milestone dark card (`house-midtown.jpg` bg) + Degree Progress component bars

**Hero subtitle is neutral** — does NOT render `data-program-name` (avoids confusing "Bachelor of Risk Mgmt" default). Programme shown as labelled line inside the Standing panel.

### planner.html (Semester Planner)
1. Slim hero (heading only, no sub-text, no buttons)
2. **Top row (2-col)**:
   - Left (`span-7`): Programme Setup — `programSelect`, `trackSelect`, `pathSelect`, `langSelect`, `langSelectSpecific` in a 2-col `.planner-setup-grid` + context chips below
   - Right (`span-5`): Actions panel (Load Recommended, Export PDF, Reset Plan — full-width stacked buttons) + Find a Course search panel below it
3. `img-strip` (focus-studio.jpg)
4. Take Note alert panel
5. Semester Stack

### analytics.html (Analytics)
- GPA Trajectory bar chart + CGPA trend sparkline + GPA table
- GPA Calculator + CGPA Projection calculators
- Empty-state hint shown when no grades: `#semBarWrap.is-empty .empty-hint`

### audit.html (Graduation Checklist)
- Dark status card (eligibility uses `passedCredits()` only — see audit correctness below)
- Component progress rows (dual-bar: solid=passed, grey ghost=placed-ungraded)
- Industrial Training split-media (`house-marsa.jpg`)
- Academic Advisor card
- Achievement badges

### settings.html (Settings)
- Programme Setup selectors
- Appearance + Plan Actions panels
- Help & Support FAQ
- About dark card with `campus.png` background image

---

## Audit correctness (critical — 2026-06-02 fix)

**Graduation eligibility is based on PASSED credits only.**
A course only counts as "done" if it has a real, non-failing grade.

### Functions in core-engine.js

```js
// Placed (any course in plan, graded or not) — for planner progress displays
function plannedCredits()

// PASSED (graded with grade not in FAIL_GRADES) — used for graduation eligibility
function passedCredits()

// componentTotals() returns per-component object with THREE credit counts:
//   .done   — all placed credits
//   .passed — graded + non-failing credits (eligibility)
//   .planned — placed but no grade yet
function componentTotals()
```

### renderAudit() behaviour (ui.js)

- **Status card**: "Eligible to Graduate" only when EVERY component's `passed ≥ req`,
  total `passedCredits() ≥ p.total`, and `cgpa ≥ 2.00`
- **Status sub-line**: shows "X cr placed but not yet graded" when gap exists
- **Progress bar**: two segments — solid (passed), grey ghost (placed-ungraded)
- **Tags**: `Met` (amber) · `Grading pending` (italic, placed≥req but ungraded) · `In progress` · `Not started`
- **Value label**: "X / Y cr passed" — not "placed"

This fix is **also applied to `SEFB_Dashboard.html`** (the legacy single-page dashboard).

---

## Prerequisite engine (core-engine.js — isPrereqsMet)

Four checks in order:
1. **Course-code prereqs** — must appear in an earlier semester. B-cat English courses outside the chosen pathway are auto-exempted.
2. **Pass-grade enforcement** — prereq graded in `FAIL_GRADES = {C-, D+, D, F}` counts as not satisfied.
3. **Minimum credits** — `c.minCr` requires `creditsBefore(semester) >= c.minCr`.
4. **Semester offering** — `c.offer = "odd" | "even"` restricts placement to matching semesters.

Lock indicators in add-dropdown: `● Odd/Even sems only · ✕ Prereq failed · 🔒 generic`.

---

## Data layer (data.js)

Verbatim slice of `SEFB_Dashboard.html` lines 1628–2327.
Defines `GRADES` and `PROGRAMS.{BFIN, BBANK, BECONS, BRMI, BAGRO}`.

**Re-extraction script (PowerShell):**
```powershell
$src = [System.IO.File]::ReadAllLines('SEFB_Dashboard.html', [System.Text.Encoding]::UTF8)
$slice = $src[1627..2326]
$header = @('/* ===...=== */', '   data.js - SEFB curriculum data ...', '... */', '')
$out = $header + $slice
[System.IO.File]::WriteAllLines('app/js/data.js', $out, (New-Object System.Text.UTF8Encoding($false)))
```
Must use `[System.IO.File]` with explicit UTF-8 — PowerShell `Get-Content`/`Set-Content` corrupts Unicode.

Programme credit totals: BFIN 122 · BBANK 120 · BECONS 125 · BRMI 120 · BAGRO 125

---

## Charts (charts.js)

### CGPA ring gauge
- Canvas 440×440 logical px, `max-width:340px` CSS, HiDPI via `dpr + setTransform`.
- Arc colour uses `_ringAnimTarget` (not the mid-animation value) to prevent red flash during sweep.
- Dean's List tick at 3.67. Centre serif CGPA value. DOM labels: `#cgpaRingClass`, `#cgpaRingMotiv`.
- `animateRingGauge(target)` — easing RAF loop.

### GPA bar chart
- `drawSemBarChart(perSemData)` — amber bars for Dean's List sems (≥3.67), charcoal normal, red <2.00.
- `#semBarWrap.is-empty` → shows `.empty-hint` text, hides canvas.
- `redrawCharts()` — wired to resize (debounced 150ms) and theme toggle.

---

## Imagery CSS classes (watchhouse.css)

| Class | Purpose |
|---|---|
| `.full-hero` | Full-bleed viewport-wide hero with overlay gradients |
| `.full-hero-img` | Positioned/scaled background photo (`transform:rotate(-1.6deg) scale(1.12)`) |
| `.full-hero-content` | Text/CTA overlay, z-index:2 |
| `.split-media` | 2-col image+copy editorial block (`.reverse` to flip) |
| `.split-img` / `.split-copy` | Columns of split-media |
| `.img-strip` | Thin full-width image band with `.strip-cap` overlay |
| `.dark-card.has-img` | Dark card with image background (`img` + `::after` overlay + `.dc-body`) |
| `.figure` | Generic image container with hover zoom |
| `.brand-lockup` | Flex row: logo + brand-mark text |
| `.brand-logo` | `height:38px` — **must stay at this size** |
| `.planner-setup-grid` | 2-col grid for Programme Setup fields (Programme spans full width) |
| `.page-hero--slim` | Reduced-padding hero variant (planner page) |
| `.empty-hint` | Shown inside `#semBarWrap.is-empty` when no grade data |
| `.audit-fill.is-planned` | Grey ghost bar segment (placed but ungraded credits) |
| `.audit-row.is-pending-grade` | Italic tag for "Grading pending" state |

---

## Boot sequence (per page)

```js
loadState();      // core-engine.js — reads localStorage, applies theme
initChrome();     // ui.js — nav active, hydrate icons, wire theme toggle
renderAll();      // core-engine.js — safe() dispatch to all render fns
// page-specific:
gpaCalcRender(); cgpaCalcRender();  // analytics only
setTimeout(()=>drawSemBarChart(), 60);  // analytics only
```

---

## Shared state

```js
state = {
  programId: "BFIN",      // programme key — default from localStorage
  trackId:   "INV",
  plan:      {},           // { [semNum]: [{code, grade?}, …] }
  theme:     "light",      // "light" | "dark"
  pathId:    "L2",
  langId:    "MAN",
  extraSems: 0,
  semSession:{},
  lastSaved: timestamp,
  dismissedAlerts: [],
  alertsMuted: false
}
```

Key: `"sefb_planner_v2"` — shared with legacy `SEFB_Dashboard.html`.

---

## Editing guidelines

- **CSS** → `css/watchhouse.css` only.
- **Brand logo size** → `.brand-logo { height:38px }` — do not change without also changing footer logo (42px).
- **Page "Audit"** → file is `audit.html`, nav key is `"audit"`, visible label is "Checklist". Keep this consistent.
- **Audit eligibility** → always use `passedCredits()` / `.passed` from `componentTotals()`. Never use `.done` for eligibility — it counts ungraded placements.
- **Hero subtitle on Overview** → keep neutral text, not `data-program-name` (confuses first-time visitors).
- **Campus image rotation** → `transform:rotate(-1.6deg) scale(1.12)` on `.full-hero-img` — levels the building sign in `campus.png`.
- **New icons** → append to `ICONS` in `ui.js`; use `<span data-icon="name">` in HTML.
- **No external deps** — no CDN, no `import`/`require`. Must work by double-clicking `index.html`.
- **Custom confirm** → `showConfirm(msg, onOk)`. Never `confirm()`.
- **Curriculum edits** → edit `SEFB_Dashboard.html`, re-extract `data.js` with PowerShell UTF-8 script above.

---

## GitHub Pages deployment

Repo: `mukhrizizraf/sefb_planner_code`
The **contents of `app/`** (not the folder itself) are at the repo root.
Pages: Settings → Pages → main → / (root)
Live: `https://mukhrizizraf.github.io/sefb_planner_code/`

**After any edit session, re-upload all changed files.** The most commonly missed files:
- `css/watchhouse.css` (affects all layout + brand logo size)
- `images/` folder (new images won't appear if not uploaded)

Deployment guide: `build/GITHUB_GUIDE_APP.html` — step-by-step with gotchas.
