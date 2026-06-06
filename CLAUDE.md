# CLAUDE.md — app/ (SEFB Degree Planner — WatchHouse Edition)

Last updated: 2026-06-05

This file provides guidance to Claude Code when working with the **`app/`** folder —
the redesigned multi-page SEFB UUM Degree Planner in the WatchHouse editorial aesthetic.

---

## Project overview

Seven-page, zero-build, fully self-contained academic dashboard for UUM SEFB students.
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
  index.html            Overview (Dewan Muadzam Shah hero + 3 stat tiles, multi-zone ring + legend, library split, convocation milestone)
  planner.html          Semester Planner (Programme Setup + Actions; per-semester Dean's List button; category legend)
  analytics.html        CGPA Simulation — GPA bar chart, sparkline, calculators (file/data-nav still "analytics")
  audit.html            Graduation Checklist — component audit, badges (file/data-nav still "audit")
  courselist.html       Course List — searchable per-programme course table (NEW)
  help.html             Help — annotated screenshot tour (NEW)
  settings.html         Profile/Settings — selectors, appearance, plan actions, FAQ, About (NOT in nav; reached via Profile icon)

  css/
    watchhouse.css      Single design-system stylesheet — tokens, components, imagery, motion/texture polish,
                        brand lockup, layout, light/dark, responsive, print. No external imports.

  js/
    data.js             Verbatim GRADES + PROGRAMS (lines 1628–2327 of SEFB_Dashboard.html). UTF-8 byte-identical.
    core-engine.js      State, persistence, prereq engine, GPA/CGPA, passedCredits()+componentTotals(),
                        UUM_SESSIONS, CAT_LABEL, theming, shared actions (loadRecommended/resetPlan/
                        simulateDeansList), modals + focus-trap, toast(aria-live), renderAll() dispatch.
    charts.js           CGPA ring gauge (glow at First Class), per-semester GPA bar chart (draw-on grow
                        animation), sparkline, animateNumber.
    ui.js               ICONS, initChrome (+ initReveal/countUpOnReveal), selectors, renderAudit,
                        renderHeroStats/Tiles, renderClassification, renderDegreeProgress, renderMilestone,
                        renderBadges, renderGpaTable, renderCharts, renderAlerts, renderCatLegend, renderCourseList.
    planner.js          renderSemesters(), renderCatLegend caller, buildAddDropdown(), drag-drop (event-delegated),
                        course actions, plannerSearch(), exportPDF().
    calculators.js      Standalone GPA + CGPA projection. analytics.html only.

  fonts/                Self-hosted OFL woff2 — Libre Caslon Text (400/400i/700) + Hanken Grotesk (300/400/600/700).

  images/  (~2.6 MB — unused alternates were purged 2026-06-06; only referenced files + 3 -src masters kept)
    sefb.png            SEFB UUM logo — topbar (38px) + footer (42px)
    uum-hall.*          DEWAN MUADZAM SHAH (convention hall) — Overview hero. Subtle warm grade baked in +
                        light coffee CSS filter on .full-hero-img; --hero-rot:0deg; Ken-Burns zoom. Master = hero2-src.jpg
    study.*             UUM LIBRARY interior — Overview editorial split. Master = study-src.jpg
    convocation.*       UUM convocation (graduation hall) — Milestone card. Light warm tint via build/coffee_tone.py
                        (master = convocation-src.jpg). Card uses .mile (lighter overlay).
    focus-studio.*      Café/study interior — image strip on Planner (.webp + -opt.jpg)
    house-marsa.*       Terrace — Professional Practice split on Checklist (.webp + -opt.jpg)
    campus.webp / campus-fallback.jpg   SEFB building photo — Settings About card only
    help-step1..4.webp  Annotated tour screenshots (balloons + pins) — built by build/annotate_help.py (2x)
    *-src.jpg           hero2-src · study-src · convocation-src = uncompressed masters (kept for regen, not served)
```

**Build scripts (build/, run with `python`):** `optimize_images.py` (photos → webp + responsive + jpg
fallback), `annotate_help.py` (2x base screenshots → balloon/pin help-step images), `coffee_tone.py`
(convocation-src → espresso/latte duotone). All optional regen tools; the app ships the outputs.

---

## Branding

- **App name everywhere**: "SEFB Degree Planner" (not "WatchHouse")
- **Brand lockup**: `<a class="brand-lockup">` → `<img class="brand-logo">` (38px) + `<span class="brand-mark">SEFB <em>Degree Planner</em></span>`
- **Nav (topnav + drawer), in order**: Overview · Planner · CGPA Simulation · Graduation Checklist · Course List · Help.
  Right side (topbar-actions): theme toggle + Profile (person) icon. **Settings is NOT in the nav** —
  reached only via the Profile icon and footer.
- **Bottomnav (mobile)**: 5 core only (Overview · Planner · CGPA Simulation · Graduation Checklist · Settings);
  Course List & Help live in the drawer. `index.html` has no bottomnav (drawer only).
- **Label vs file/data-nav** (visible label changed, file & `data-nav` unchanged):
  - "CGPA Simulation" → `analytics.html`, data-nav `analytics`
  - "Graduation Checklist" → `audit.html`, data-nav `audit`
  - "Course List" → `courselist.html`, data-nav `courselist`
- Nav chrome (topnav/drawer/bottomnav/footer) is duplicated across all 7 HTML files — edit each when changing nav.
- **Footer** (identical on all 7): _Planner_ → Overview · Semester Planner · CGPA Simulation · Course List ·
  _Academic_ → Graduation Checklist · Help & Support (`help.html`) · _About_ → The Project (`settings.html#about`).
  Keep links relevant — no duplicate "Help & Support", Help points to `help.html` (not `settings.html#help`).

---

## Page layouts

### index.html (Overview)
1. Full-bleed **Dewan Muadzam Shah** hero (`uum-hall.*`, light coffee CSS filter, Ken-Burns zoom) with headline
   "See your path to graduation at a glance.", CTA buttons, + 3 **hero stat tiles** (5 Programmes / Courses Mapped / CGPA projection — `renderHeroTiles()`)
2. Ring gauge (left, **multi-zone arc + `.class-legend`**) + Current Standing / stat cards (right) — "Your programme · X · change" link
3. Editorial split: `study.*` UUM library interior + Malaysian student copy
4. Achievement badge grid
5. Milestone dark card (`.dark-card.has-img.mile`, `convocation.*` coffee photo) + Degree Progress bars

**Hero subtitle is neutral** — does NOT render `data-program-name`. Headline is fixed copy (Option 2 from hiccups v4).

### planner.html (Semester Planner)
1. Slim hero (heading only, no sub-text, no buttons)
2. **Top row (2-col)**:
   - Left (`span-7`): Programme Setup — `programSelect`, `trackSelect`, `pathSelect`, `langSelect`, `langSelectSpecific` in a 2-col `.planner-setup-grid` + context chips below
   - Right (`span-5`): Actions panel (Load Recommended, Export PDF, Reset Plan — full-width stacked buttons) + Find a Course search panel below it
3. `img-strip` (focus-studio.webp)
4. Semester Stack section — section head, **Component Colours** legend (`#catLegend`), then the **Take Note** alert panel (sits *between* the legend and Semester 1), then the semester cards (`#semesters`)

**Take Note panel** (`#takeNotePanel`, `renderAlerts` in ui.js): **always visible** (no `display:none` on `.take-note` except print). States: clean ("✓ No prerequisite or credit issues found."), active (list of `.alert` rows with dismiss ✕), muted ("Alerts muted — N issues hidden." + Unmute button). **Muted by default** (`state.alertsMuted` defaults `true`; Load Recommended & Reset Plan re-mute). Each course row also has a **Move…** dropdown (`moveCourse(fromSem, idx, toSem)`) beside the grade select for relocating a course without drag-drop. The retake-required alert self-suppresses once the same course code has a passing grade in a later semester (the RETAKE pill on the failed row stays — historical record).

### analytics.html (CGPA Simulation)
- GPA Trajectory bar chart (draw-on animation) + CGPA trend sparkline + GPA table
- GPA Calculator + CGPA Projection calculators
- Empty-state hint when no grades: `#semBarWrap.is-empty .empty-hint`

### audit.html (Graduation Checklist)
- Dark status card (eligibility uses `passedCredits()` only). Sub-line on eligibility shows the **degree
  classification** (CGPA ≥3.67 = "First Class Honours" — NOT "Dean's List"). Big `#auditCompletionPct` (count-up).
- Component progress rows (dual-bar: solid=passed, grey ghost=placed-ungraded)
- Professional Practice split-media (`house-marsa.*`), Academic Advisor card, badges

### courselist.html (Course List) — NEW
- Programme/track/path/lang selectors (shared `renderProgramSelect` etc.) + search box
- `renderCourseList()` (ui.js) builds the `.cl-table`: Code · Course (en+ms) · Cat colour badge · Cr · Prerequisites.
- **Filtering mirrors the Planner's `availableFor`**: D-cat limited to the chosen **track** (`state.trackId`) AND chosen
  language family — so the Specialization Track selector actually drives the table. F-cat shows an "Elective field · X"
  sub-label (`.cl-field`) to mirror the Planner's "choose ONE field" grouping. Search matches code/title/category/prereq.
- Consistency note: `plannerSearch` also hides non-selected language families (matches the add-course dropdown); the
  add-dropdown odd/even lock hints spell out the semesters ("Odd sems (1·3·5·7) only").

### help.html (Help) — NEW
- "Follow the arrows. No stress." screenshot tour: hero + "Do not skip this" callout + 4 step cards
  (`.help-step`, coloured top border) using `help-step1..4.webp` + a 🎉 Dean's-List bonus card.

### settings.html (Profile / Settings — not in nav)
- Programme Setup selectors · Appearance + Plan Actions · Help & Support FAQ
- About dark card (`campus` bg): blurb names **Prof. Dr. Soon Jan Jan first**, then Assoc. Prof. Dr. Mukhriz
  Izraf Azman Aziz (hiccups v4 Hiccup 1).

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
1. **Course-code prereqs** — must appear in an earlier semester. B-cat English courses outside the chosen pathway are auto-exempted. The prereq-scan loop does **not** `break` on first match — it keeps scanning so the **latest attempt wins** (a passing retake in a later semester overrides an earlier failed attempt).
2. **Pass-grade enforcement** — prereq graded in `FAIL_GRADES = {C-, D+, D, F}` counts as not satisfied.
3. **Minimum credits** — `c.minCr` requires `creditsBefore(semester) >= c.minCr`.
4. **Semester offering** — `c.offer = "odd" | "even"` restricts placement to matching semesters.

`c.all` (capstone/Industrial Training) requires nearly all other credits first: `creditsBefore >= p.total - c.cr - pathAdj`, where `pathAdj = {L3:3, EX:6}` accounts for the credits a shorter English pathway removes (otherwise IT locks on Path 3 / Exempted).

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

### Curriculum verification (audited 2026-06-05) — all green
- **`data.js` is byte-identical to `SEFB_Dashboard.html`** for all 5 programmes (course codes, credits, categories).
- Each programme's component `req` values sum exactly to its `total`. Grading scale matches the official UUM scale
  in `docs/Grading_system.txt` (A+/A=4.00 … F=0.00; C-/D+/D/F must repeat → `FAIL_GRADES`).
- ⚠️ **`build/SEFB_Curriculum.xlsx` is a STALE auto-generated subset** (fewer courses than current data.js) and is
  NOT used by the website. Regenerate with `python build/build_dashboard_xlsx.py` only if you need the Excel current.
  The canonical curriculum source is `SEFB_Dashboard.html`, NOT the xlsx.

---

## Charts (charts.js)

### CGPA ring gauge
- Canvas 440×440 logical px, HiDPI via `dpr + setTransform`. `animateRingGauge(target)` — easing RAF loop.
- **Arc is drawn in UUM classification ZONES** (`_drawRingGauge` loops `ZONES`), so as it animates up from 0 it
  **sweeps red → green → blue → gold** by the *current* value: Fail `#a8443a` (<2.0) · Lower 2nd `#3f7d5a`
  (2.0–2.99) · Upper 2nd `#3a6ea5` (3.0–3.66) · First Class `#b07a3f` (≥3.67). `_arcColor(cgpa,p)` returns the
  same hex (used for the leading-tip dot). These exact colours also appear in the **`.class-legend`** box under the
  ring on index.html. Per-zone glow; gold zone glows strongest. 3.67 tick. Labels `#cgpaRingClass`/`#cgpaRingMotiv`.
- **If you change a tier colour, change it in BOTH `_arcColor`/`ZONES` (charts.js) AND `.class-legend` (index.html).**

### GPA bar chart
- `drawSemBarChart(perSemData)` triggers a **grow-up draw-on animation** (`_animateBars` → `_drawBarsFrame(t)`,
  ease-out-cubic, value labels fade in after 70%). Amber bars ≥3.67, charcoal normal, red <2.00.
- `#semBarWrap.is-empty` → shows `.empty-hint`. `redrawCharts()` wired to resize (debounced) + theme toggle.

---

## Imagery CSS classes (watchhouse.css)

| Class | Purpose |
|---|---|
| `.full-hero` | Full-bleed viewport-wide hero with warm-brown overlay gradients |
| `.full-hero-img` | Background photo — **coffee `filter:sepia()…`**, Ken-Burns `@keyframes heroZoom`, `--hero-rot:0deg` (set inline on the section; no longer -1.6°) |
| `.hero-tiles` / `.hero-tile` | 3 stat tiles under the hero copy (`#heroProgrammes/#heroCourses/#heroCgpa`) |
| `.full-hero-content` | Text/CTA overlay, z-index:2 |
| `.dark-card.has-img.mile` | Milestone variant — lighter img opacity + warm-brown overlay (so convocation photo reads bright) |
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
initChrome();     // ui.js — nav active, hydrate icons, theme toggle; schedules initReveal() + countUpOnReveal()
renderAll();      // core-engine.js — safe() dispatch to all render fns (incl. renderCourseList, renderHeroTiles, renderCatLegend)
// page-specific:
gpaCalcRender(); cgpaCalcRender();  // analytics only
setTimeout(()=>drawSemBarChart(), 60);  // analytics only
```

`renderAll()` `safe()`-dispatches every render; each guards on its own DOM element, so a page only runs
what it has. Add new render fns to the dispatch array in core-engine.js `renderAll()`.

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
  fieldId:   "",           // chosen field elective (fFields programmes, e.g. BECONS); "" otherwise
  extraSems: 0,
  semSession:{},
  lastSaved: timestamp,
  dismissedAlerts: [],
  alertsMuted: false
}
```

Key: `"sefb_planner_v2"` — shared with legacy `SEFB_Dashboard.html`. `UUM_SESSIONS` (core-engine) runs **A241→A282** (A231/A232 removed).

---

## Field elective selector (fFields programmes — BECONS)

Programmes with `fFields` get a **"Field Elective" dropdown** (`renderFieldSelect()` in ui.js, mirrors
`renderTrackSelect`; `#fieldSelect`/`#fieldField` in planner/settings/courselist setup). The student picks the
field **first** (`state.fieldId`); it drives `availableFor`, the Course List F-cat filter, and **Load Recommended**
(`substituteFieldCourses(state.fieldId)` swaps the recommended plan's default-field slots for the chosen field's
courses). Tracks (BFIN/BBANK) work the same way via `state.trackId`. No two-step modal — field is
chosen in the toolbar like a track.

`substituteFieldCourses` is **prereq-aware**: it collects the F-cat slots by semester, then places each field
course (code order) into the earliest slot that comes **after** all its same-field prereqs — so a field with a
chain (e.g. BECONS Finance: BWFFK2033→BWFFK2043→…) never lands a course before its prereq. The BECONS recommended
plan slot distribution was tuned to `1@Sem3, 1@Sem4, 1@Sem5, 3@Sem6` and FREE3013 moved to Sem 3 so no semester
exceeds 20 cr (BEEZK3996 Academic Project is **6 cr**, not 3).

### Load Recommended confirm dialog (`showLoadConfirm` in core-engine.js)
Rich styled popup (not the plain `showConfirm`): amber `!` circle, "Load recommended plan?" title, warning
subtitle, and a dark inner box (`.cr-list`) listing the current Programme (`p.nameEn`), Track/Field, English
pathway, Foreign language, plus caveats (grades blank, loads may rebalance). Built dynamically from `state`; the
`.confirm-card.is-rich` class is added/removed in `confirmResolve`. Reuses the same `#confirmDialog`/`_confirmCallback`
plumbing as `showConfirm`.

## Dean's List simulator (core-engine.js)

`simulateDeansList(sem)` auto-fills a semester with top grades so students preview a best-case GPA in one click.
- Fills with an **A-/A mix** (both ≥3.67 ⇒ weighted GPA always ≥3.67 = guaranteed Dean's List). Sprinkles **one B+**
  for realism, kept only if the semester still clears 3.67. `_semGpa(items)` helper.
- **Academic rule**: Dean's List = per-**semester** GPA ≥ 3.67. CGPA ≥ 3.67 = **First Class Honours** (different thing).
- Rendered as a per-semester button (`.btn-deans.sem-head-deans`) **in each semester header** next to the session
  dropdown (planner.js `renderSemesters`, gated on `items.length`).

## Category colours (A–H)

`--cat-A … --cat-H` CSS vars (`:root` + a brighter dark-mode set). Used by the course-row bar (`.course-cat`),
the inline meta dot (`.cat-dot`), the Planner "Component Colours" legend (`renderCatLegend()` → `#catLegend`),
and the Course List badges (`.cl-cat`). `CAT_LABEL` lives in **core-engine.js** (do not re-declare in planner.js).

**Category NAMES are per-programme** — the same letter means different things across programmes (e.g. BECONS
**F = Field Elective, G = Free Elective, D = Foreign Language**). Always label categories with **`catName(cat, p)`**
(core-engine.js) which reads the programme's `components[].en`; the generic `CAT_LABEL` is only a fallback. Never
show `CAT_LABEL[cat]` directly in the UI.

## Editorial polish (motion · texture · depth)

- **Grain**: `body::before` SVG fractal-noise overlay (~4% opacity).
- **Scroll-reveal**: `initReveal()` (ui.js) adds `.reveal`→`.reveal-in` to below-fold `.section`/`.split-media`/
  `.help-step` blocks via IntersectionObserver. Above-fold blocks are left visible (no FOUC). Respects `prefers-reduced-motion`.
- **Count-up**: `countUpOnReveal()` animates `[data-countup]` numbers from 0 on first reveal (hero tiles, standing
  stat cards, audit %). Uses `animateNumber()`.
- **Hover lift** on `.bone-card/.panel/.help-step`; custom thin scrollbar; Ken-Burns hero zoom; coffee image tones.

## Accessibility

Focus-visible outlines on all controls; `.skip-link` per page (target `#main`); modal `role="dialog"`+focus-trap
(`_modalTrigger`/`_moveFocusToModal` in core-engine); toast `role=status aria-live`; `<label for>` + `aria-label`
on selects and dynamic grade selects; theme switch `aria-checked`. Responsive breakpoints: 920 (drawer), 768, 560, 480.

---

## Editing guidelines

- **CSS** → `css/watchhouse.css` only.
- **Brand logo size** → `.brand-logo { height:38px }` (footer 42px) — keep in sync.
- **File vs label** → `audit.html`=Graduation Checklist, `analytics.html`=CGPA Simulation, `courselist.html`=Course List.
  Keep filenames & `data-nav` unchanged; only visible labels differ.
- **Settings is not a nav item** — only the Profile icon + footer link to `settings.html`. Don't re-add it to the nav.
- **Audit eligibility** → always use `passedCredits()` / `.passed`. Eligibility sub-line shows **First Class Honours**
  for CGPA ≥3.67, never "Dean's List" (Dean's List = per-semester only).
- **Hero subtitle on Overview** → fixed copy, not `data-program-name`.
- **No `-1.6°` rotation** — the hero is the level UUM campus aerial; `.full-hero` sets `--hero-rot:0deg` inline.
  The hero's coffee look = `.full-hero-img { filter: sepia()… }`; milestone tone = `.dark-card.has-img.mile`.
- **Nav changes** touch all 7 HTML files (topnav/drawer/bottomnav/footer are duplicated). Add new render fns to
  `renderAll()` in core-engine.js. New icons → `ICONS` in ui.js, used via `<span data-icon="name">`.
- **No external deps**; **custom confirm** `showConfirm(msg, onOk)` never `confirm()`.
- **Curriculum edits** → edit `SEFB_Dashboard.html`, re-extract `data.js` with the PowerShell UTF-8 script above.
- **Before MAJOR changes** → zip a backup to `temporary/app_backup_<YYYY-MM-DD_HHmm>.zip` (`Compress-Archive`).

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
