# Design Spec — "Wall of Fame" Awards Section

Client: MECPL (Millennium Engineers & Contractors Pvt. Ltd.)
Page: `/awards` — https://mecpl.stealthbit.in/awards
Replaces: the "A mark of the work." section (tabs + 4-column card grid)
Audience: front-end developer / AI coding agent
Status: Ready for implementation

---

## 1. Context and problem

### 1.1 Current state (reviewed live, Oct 2026)

- Stack observed: Vite bundle, Tailwind utility classes, Lenis smooth scroll. Font: Montserrat throughout.
- Section structure: eyebrow "SELECTED RECOGNITIONS", H2 "A mark of the work.", tab bar (`Featured 8 · Safety 13 · Quality 19 · National & State 9 · All 41`), then a 4-column grid of tall cards (medallion logo, red category label, title + year, project, issuer).
- 41 awards in total: National & State 9, Safety 13, Quality 19. "Featured" (8) is a cross-category subset; "All" repeats everything.

### 1.2 Problems

1. Tabs hide most of the record. Users see 8 of 41 by default and the tabs feel like a filter UI, not a showcase.
2. "All" produces an 11-row grid of near-identical cards. Visually monotonous, very long scroll.
3. Featured/All overlap the real categories, so the same award appears under several tabs.
4. Content issues (fix regardless of design):
   - BAI awards render empty white medallions (missing logos).
   - CIDC / NSCI / PCERF images are reused across different years; there is no per-award photo.
   - The section subtitle says "Eight recognitions, presented by category" even when "All 41" is active.

### 1.3 Goal

A neat, minimalist, modern "wall of fame": the visitor stands inside a circular room. The wall is divided into one arc per category. The camera faces one arc; choosing another category rotates the camera to it; dragging spins the room freely. The whole record (41 awards) lives on one continuous surface, so no content is hidden behind tabs, but only one category is in focus at a time.

---

## 2. Concept

```
            TOP-DOWN VIEW (desktop: 18 columns × 20° = 360°)

                    NATIONAL & STATE (4 cols, 80°)
                     ┌──────────────────────┐   ← camera faces here on load
                 D ╱                          ╲ D
                 ╱                              ╲
   QUALITY      │             ▲                  │     SAFETY
   (8 cols,     │          ◉ camera              │     (6 cols,
    160°)       │     (sits 0.35R behind centre, │      120°)
                 ╲     looks at one arc)        ╱
                   ╲                          ╱
                     └──────────────────────┘
                     (Quality continues round the back)

   D = divider pilaster with the category name, at the start of each arc
   Clockwise order: National & State → Safety → Quality → back to start
```

- The wall is a cylinder. The viewer is near the centre, looking outward at the concave inner surface.
- Each category owns one contiguous arc. Arc width is proportional to its number of awards, so nothing is padded with empty space.
- A "divider" column (a pilaster with the category name set vertically) marks the start of each arc. It reads like signage in a gallery.
- Inside each arc, awards are plaques on a grid of 3 rows (desktop).

Mood: a quiet gallery at dusk. Dark charcoal room, warm off-white plaques, one soft light falling on the arc in front of the camera, edges fading into shadow. No textures, no gimmicks, no floor reflections; depth is shown only by perspective and light falloff.

---

## 3. Information architecture

### 3.1 Categories (wall order, clockwise)

| # | Key | Label | Count | Columns (3 rows) | Arc incl. divider |
|---|-----|-------|-------|------------------|-------------------|
| 1 | `national-state` | National & State | 9 | 3 | 4 cols = 80° |
| 2 | `safety` | Safety | 13 | 5 (2 empty slots) | 6 cols = 120° |
| 3 | `quality` | Quality | 19 | 7 (2 empty slots) | 8 cols = 160° |
| | | Total | 41 | 15 | 18 cols = 360° |

- Drop the Featured and All tabs. The wall shows everything. "Featured" becomes a flag (see 5.3).
- Order within each arc: year descending (newest first), column-major (fill top → bottom, then move to the next column to the right). Reading left → right, time runs backwards.
- Empty slots at the end of an arc stay empty (no placeholders). They sit at the oldest end, just before the next divider, which reads as natural breathing room.
- The column count is computed, never hard-coded (see 7.2), so adding awards stays safe.

### 3.2 Data model

Move awards into a single JSON/TS data file. One entry per award:

```ts
type AwardCategory = 'national-state' | 'safety' | 'quality';

interface Award {
  id: string;              // slug, e.g. "pcerf-silver-safety-2025-yoo-villa"
  category: AwardCategory;
  title: string;           // "PCERF – Silver Trophy for Safety"
  year: number;            // 2025
  issuer: string;          // "PCERF"
  project?: string;        // "Yoo Villa, Pune"
  note?: string;           // e.g. "Jury Recommendation"
  logo: string;            // issuer medallion, square, transparent PNG/WebP/SVG
  image?: string;          // photo of trophy/certificate (optional, used in detail view)
  featured?: boolean;      // replaces the old "Featured" tab
}

interface CategoryMeta {
  key: AwardCategory;
  label: string;           // "National & State"
  blurb: string;           // one line shown on the divider / in the HUD
}
```

Category blurbs (proposed copy, client to approve):
- National & State: "Industry honours from national and state bodies."
- Safety: "Recognised for safe worksites, year after year."
- Quality: "Structures judged on how well they are built."

Data issues to resolve before launch: logos for Builders' Association of India; one logo per issuer (not per award); real per-award photos if the client has them (optional; the design works with logos alone).

---

## 4. Page layout

The new section replaces the current tab + grid block. The hero, the stats strip ("41 / 13 / 19 / 09") and the closing CTA stay as they are.

```
┌──────────────────────────────────────────────────────────────┐
│  SELECTED RECOGNITIONS  (eyebrow, red)                        │
│  A wall of the work.     (H2)                                 │
│  Drag to explore, or choose a category.  (sub, muted)         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                 ░░  3D STAGE (the room)  ░░                   │
│        (curved wall, 3 rows of plaques, vignette)            │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  ◀   NATIONAL & STATE 9   ·   SAFETY 13   ·   QUALITY 19   ▶ │  ← category index
│      ───────────●──────────────────────────────────────      │  ← position track
│                                         View as list ↗       │
└──────────────────────────────────────────────────────────────┘
```

- Section background: `#25292B` (the site's existing dark tone), full bleed. The room is dark; the dark section blends into it so the edges of the stage disappear.
- Section padding: 96px top / 80px bottom (desktop), 64 / 56 (mobile).
- Stage: full viewport width, height from the geometry tokens (see 7.1). Overflow hidden.
- Header (eyebrow/H2/sub): centred, existing type styles, but light-on-dark (H2 `#FFFFFF`, sub `rgba(255,255,255,.6)`).
- Category index and position track sit under the stage, centred, max-width 880px.

---

## 5. Visual design

### 5.1 Tokens

Reuse existing brand values; add only what's needed.

| Token | Value | Use |
|-------|-------|-----|
| `--wof-room` | `#25292B` | Section / room background |
| `--wof-room-deep` | `#1A1D1F` | Vignette edge |
| `--wof-plaque` | `#F1F0EC` | Plaque surface (matches current card tone) |
| `--wof-plaque-line` | `rgba(0,0,0,.08)` | Plaque inner hairline |
| `--wof-ink` | `#25292B` | Plaque title |
| `--wof-ink-muted` | `#7A7D80` | Project / issuer |
| `--wof-accent` | `#EC3338` | Brand red: labels, active state, featured mark |
| `--wof-divider-ink` | `rgba(255,255,255,.9)` | Divider text |
| `--wof-ease` | `cubic-bezier(.65,0,.35,1)` | Camera moves (easeInOutCubic) |
| `--wof-ease-out` | `cubic-bezier(.22,1,.36,1)` | Hover / UI (easeOutQuint) |
| Font | Montserrat | Weights 300/400/500/600 only |

### 5.2 Plaque (award tile)

Minimal, square-ish, centred. Much shorter than today's card, so 3 rows fit on screen.

```
┌──────────────────────────┐
│ •                    2025│  ← featured dot (red, 6px) · year (11px, 600, tracking .16em)
│                          │
│          ( logo )        │  ← 72px circle, white fill, 1px hairline ring, logo 70% inside
│                          │
│   PCERF – Silver Trophy  │  ← title 15px/1.3, weight 400, max 2 lines, clamp with ellipsis
│        for Safety        │
│     Yoo Villa, Pune      │  ← project 12px muted, 1 line, ellipsis
│                          │
│           PCERF          │  ← issuer 10px, 600, uppercase, tracking .18em, muted
└──────────────────────────┘
```

- Remove the year from the title string (it is now a separate field shown top-right).
- Remove the red category label from each plaque; the arc/divider already says it. Fewer repeated labels is most of what makes it look "neat".
- Surface: `--wof-plaque`, radius 2px, 1px inner hairline inset 8px (echoes the current double frame, lighter).
- No drop shadows on the wall itself. Depth comes from lighting (5.5).
- Hover/focus (desktop): plaque moves 24px toward the camera (`translateZ`), hairline becomes `--wof-accent`, cursor `pointer`. 220ms `--wof-ease-out`. Not applied during a drag.
- Empty slots: render nothing.

### 5.3 Featured

- `featured: true` → 6px red dot top-left of the plaque. Tooltip/aria: "Featured recognition".
- No separate tab. The current 8 featured items are spread across all three categories (3 / 3 / 2), so each arc gets a few marked highlights.

### 5.4 Category divider (pilaster)

- Width: 1 column. Same height as the wall. Transparent background with one 1px vertical line `rgba(255,255,255,.12)` at its centre.
- Content, rotated −90° (reads bottom → top), centred:
  - Category label, 28px desktop / 20px mobile, weight 300, uppercase, tracking .12em, `--wof-divider-ink`.
  - Count, same line, red: `SAFETY  13`.
- Under the rotated label (horizontal, at the wall's foot): the category blurb, 12px, max 160px wide, muted white. Desktop only.

### 5.5 Lighting and atmosphere

Light gives the depth. Keep it subtle.

- Per-element brightness by angle from the camera. For each wall element with angular offset φ from the camera direction (−180°…180°):
  - `light = clamp(cos(φ), 0, 1) ^ 1.6`
  - `filter: brightness(0.35 + 0.65 * light)`, `opacity: 0.25 + 0.75 * light`
  - Elements in front are fully lit; side walls fall off into the dark.
- Stage vignette: an absolutely positioned overlay above the 3D scene, `pointer-events: none`:
  `radial-gradient(ellipse 70% 85% at 50% 50%, transparent 55%, var(--wof-room-deep) 100%)`.
- Floor and ceiling: 80px linear gradients at the top and bottom of the stage (room → transparent) so the rows don't stop at a hard edge.
- No textures, particles, reflections or idle auto-rotation.

### 5.6 Category index (navigation under the stage)

- One button per category: `LABEL  count` (13px, 500, tracking .14em, uppercase). Separated by a 4px middle dot.
- States: default `rgba(255,255,255,.55)`; hover `#fff`; active `#fff` with a 2px red underline 24px wide, centred (matches the current nav's "Awards" underline).
- Active state follows the camera live: whichever arc contains the camera direction is active, during drags too.
- Prev/next chevron buttons (40px hit area, 1px white/20% circle) at both ends: rotate to the previous/next category.
- Position track: 1px line `rgba(255,255,255,.15)` split into three segments proportional to the arcs (80/120/160). Labels sit above it. A 8px red dot shows the camera angle and moves live. Clicking a point on the track rotates the camera there. It is a mini-map of the room.
- "View as list" text link (12px, underlined on hover), right-aligned under the track (see 9.3).

---

## 6. Interaction design

### 6.1 Summary

| Input | Behaviour |
|-------|-----------|
| Click category / chevron / track | Camera rotates along the shortest path to the centre of that arc |
| Drag (mouse / pen / touch, horizontal) | Room rotates with the pointer; release → inertia → soft snap to nearest column |
| Horizontal wheel / trackpad swipe (`deltaX`) | Rotates the room; snaps after 150ms idle |
| Vertical wheel / vertical touch swipe | Scrolls the page normally. Never hijacked |
| Click / Enter / Space on plaque | Opens the detail view |
| ← / → keys (stage focused) | Rotate one column, eased |
| Home / End | Previous / next category |
| Tab onto an off-screen plaque | Camera rotates to bring it to centre, then focus ring shows |

### 6.2 Category click → camera move

- Target angle = angular centre of the category's plaque columns (excluding the divider).
- Shortest path: `delta = ((target - current + 540) % 360) - 180`.
- Duration: `clamp(600ms + |delta| * 3ms, 700ms, 1300ms)`, easing `--wof-ease`.
- Optional "dolly": over the move, pull the camera back by 6% of R mid-way and return (sin curve on camera distance). It feels like turning your head. Skip it if it causes jank.
- A new click during an animation retargets from the current angle (no queueing, no jump).
- Update the URL: `?category=safety` using `history.replaceState` (no new history entry per click).

### 6.3 Drag

- Pointer Events on the stage. Use `setPointerCapture`. CSS on the stage: `touch-action: pan-y` (vertical swipes still scroll the page on touch) and `user-select: none`.
- Direct manipulation: the wall under the cursor tracks the pointer. Angle delta (degrees) = `−dx / R * (180/π) * dragFactor`, with `dragFactor = 1`. Dragging left moves the wall left (camera turns right).
- Click vs drag threshold: 6px total movement. Below it, it is a click on the plaque.
- Cursor: `grab`; `grabbing` while dragging.
- During a drag, disable hover effects and the plaque `pointer-events`.
- Release: velocity from the last ~80ms of samples. Inertia with exponential decay `v *= 0.94` per 16.67ms frame (normalise by frame time). When `|v| < 0.02°/frame`, spring-snap to the nearest column centre (critically damped, ~350ms). Cap release velocity at 2.5°/frame.
- The room loops forever (no ends); the angle is unbounded internally and normalised only for display logic.
- Lenis: in the stage's `wheel` handler, consume the event (`preventDefault` + `stopPropagation`) only when `|deltaX| > |deltaY|`. Vertical wheel events must pass through to Lenis untouched. Do not put `data-lenis-prevent` on the whole stage, because that kills page scrolling over it.

### 6.4 Plaque detail view

- Click a plaque: the plaque does its hover lift (if not already lifted), then a modal dialog opens. 280ms fade + 12px rise. The 3D scene dims to 30% behind a `rgba(26,29,31,.7)` backdrop with `backdrop-filter: blur(6px)`.
- Dialog (max-width 720px, `--wof-plaque` background, 2px radius):
  - Left (or top on mobile): award `image` if present, otherwise the logo large (160px) on white.
  - Right: category eyebrow (red), title (28px, 300), year, project, note, issuer.
  - Footer: "← Previous" / "Next →" within the same category (also ← / → keys). Changing award inside the dialog also rotates the camera behind it, so on close the visitor is looking at the last award seen.
- Close: × button, Esc, backdrop click. Return focus to the plaque.
- Deep link: `?category=quality&award=<id>` opens the dialog on load.
- Implement with native `<dialog>` + `showModal()` (focus trap, Esc, inert background built in).

### 6.5 Section entrance

- When the stage first reaches 35% visibility (IntersectionObserver): the camera starts 30° before the initial angle and settles in 1200ms `--wof-ease`; plaques fade from opacity 0 with a 20ms stagger by column distance from centre. Runs once.
- The stage is not pinned/sticky. The page scrolls normally past it.

---

## 7. Geometry and rendering

### 7.1 Responsive geometry tokens

| Breakpoint | Rows | Plaque W × H | Gap | Divider W | Camera offset `c` |
|------------|------|--------------|-----|-----------|-------------------|
| ≥ 1280px | 3 | 208 × 232 | 16 | = column pitch | 0.35 R |
| 1024–1279 | 3 | 188 × 216 | 14 | = pitch | 0.35 R |
| 768–1023 | 3 | 168 × 200 | 12 | = pitch | 0.30 R |
| < 768 | 2 | 150 × 196 | 12 | = pitch | 0.25 R |

- Short desktop viewports: if `stageHeight > 100svh − 220px`, scale all of the row's plaque metrics down uniformly (min 0.8×).
- Stage height = `rows × H + (rows − 1) × gap + 2 × 48px` (floor/ceiling fade).
- Mobile, 2 rows → columns: N&S 5, Safety 7, Quality 10, plus 3 dividers = 25 columns = 14.4° each. Same code, different `rows`.

### 7.2 Layout algorithm (run on load and on breakpoint change)

```
pitch = plaqueW + gap
columns = []
for category in order:
  columns.push({ type: 'divider', category })
  n = ceil(count(category) / rows)
  for i in 0..n-1: columns.push({ type: 'awards', category, items: slice(i*rows, (i+1)*rows) })
N        = columns.length
stepDeg  = 360 / N
R        = (N * pitch) / (2π)          // circumference = N × pitch
column k centre angle θk = k × stepDeg
category angular centre = mean θ of its award columns
```

Desktop check: N = 18, pitch 224 → R ≈ 642px, step 20°.

### 7.3 Rendering approach: CSS 3D transforms (not WebGL)

Why: ~60 DOM nodes is trivial. Text stays real, crisp, selectable, translatable, indexable and accessible. Pointer and focus handling come free. No three.js (~150 KB) and no canvas text rendering. WebGL would only be worth it for real lighting/materials, which this minimalist direction doesn't need.

Scene graph:

```html
<section class="wof" aria-labelledby="wof-title">
  <header>…eyebrow / h2#wof-title / sub…</header>

  <div class="wof-stage" tabindex="0" role="region"
       aria-roledescription="3D gallery" aria-label="Awards wall">
    <div class="wof-camera">          <!-- perspective container -->
      <div class="wof-ring">          <!-- rotated by JS -->
        <div class="wof-col wof-col--divider" style="--a:0deg">…</div>
        <div class="wof-col" style="--a:20deg">
          <button class="wof-plaque" data-id="…">…</button> ×rows
        </div>
        …
      </div>
    </div>
    <div class="wof-vignette" aria-hidden="true"></div>
  </div>

  <nav class="wof-index" aria-label="Award categories">…</nav>
  <div class="sr-only" aria-live="polite" id="wof-status"></div>
</section>
```

Transforms (camera sits `c` behind the cylinder centre; perspective chosen so the front column renders at 1:1):

```css
.wof-camera {
  position: absolute; inset: 0;
  perspective: calc(var(--R) + var(--c));     /* p = R + c */
  perspective-origin: 50% 50%;
}
.wof-ring {
  position: absolute; left: 50%; top: 50%;
  width: 0; height: 0;
  transform-style: preserve-3d;
  /* --rot is the camera angle in degrees, written by JS every frame */
  transform: translateZ(var(--R)) rotateY(calc(var(--rot) * -1deg));
}
.wof-col {
  position: absolute;
  width: var(--plaque-w);
  margin-left: calc(var(--plaque-w) / -2);
  top: calc(var(--stage-content-h) / -2);
  transform-style: preserve-3d;
  transform: rotateY(var(--a)) translateZ(calc(var(--R) * -1));  /* faces the centre */
  backface-visibility: hidden;
}
```

Why this works: in CSS, the viewer is at z = p in front of the z = 0 plane. Moving the ring centre to z = R puts the column at angle 0 at z = 0 (1:1 scale) and the viewer at distance R + c from it, i.e. `c` behind the centre. Check rotation direction during build: increasing `--rot` must turn the camera clockwise (to the right).

Culling (required): CSS 3D breaks badly for elements at or behind the viewer's plane (huge mirrored artefacts, Safari especially). Each frame, for every column, compute φ = normalised(θk − rot). If |φ| > 95°, add class `is-culled` (`opacity: 0; pointer-events: none`). Use `visibility: hidden` on dividers, but use opacity on plaques so they stay focusable (see 9.1). Test thresholds from 90° to 100° in Safari and pick the largest one that shows no artefacts.

### 7.4 Animation loop

- A single `requestAnimationFrame` loop runs only while something moves (animation, drag, inertia, snap). Stop it when idle.
- Per frame: write `--rot` on `.wof-ring`, and for each column write `--light` (0–1). Plaque CSS uses it: `filter: brightness(calc(.35 + .65 * var(--light))); opacity: calc(.25 + .75 * var(--light));`. ~18–25 style writes per frame; no layout reads inside the loop.
- `will-change: transform` on `.wof-ring` only.
- Measure (`getBoundingClientRect`, breakpoint) only on resize via `ResizeObserver`, debounced 100ms; then rebuild the geometry.
- Logos: `loading="lazy"`, `decoding="async"`, explicit width/height. Serve them at 2× of 72px (144px) WebP.
- Performance budget: 60 fps on a mid-range Android (Moto G-class) and on a 2019 MacBook Air at 1440px. No long tasks > 50ms during interaction. JS for the component ≤ 12 KB min+gzip, no new runtime dependencies.

### 7.5 Implementation constraints

- Use the site's existing framework and Tailwind setup. Keep the component self-contained: one component + one data file + one small CSS file (3D transforms and custom properties are clearer in plain CSS than in utilities).
- No three.js, GSAP or carousel libraries. Easing, inertia and spring are ~60 lines of hand-written code.
- Work with Lenis (no wheel-event conflicts; vertical scroll over the stage must reach Lenis).

---

## 8. States

### 8.1 Initial state

- Default camera angle: centre of `national-state` (newest and most prestigious awards: British Safety Council 2026, CIDC 2026). Configurable via a prop.
- `?category=` in the URL overrides it.

### 8.2 Loading

- Geometry renders immediately from data (no network). Logos fade in on load (200ms). Until a logo loads, the medallion shows the issuer's initials (e.g. "BAI") in 11px, 600, muted, which also covers missing logos.

### 8.3 Status announcements

After each settled move (not during drags), write to `#wof-status`: "Safety, 13 awards. Showing 2025 to 2019." Debounce 400ms.

---

## 9. Accessibility

### 9.1 Keyboard and focus

- Stage is focusable (`tabindex="0"`) with a visible 2px red focus ring (`outline-offset: 4px`). Arrow/Home/End as in 6.1.
- Plaques are real `<button>`s in DOM order (category → column → row), so Tab moves through them chronologically. On `focus`, if the plaque's column |φ| > 25°, animate the camera to that column (500ms) before or while showing the focus ring.
- Culled plaques use `opacity: 0`, not `display:none`/`visibility:hidden`, so they stay reachable and rotate into view when focused.
- Category buttons: `aria-pressed` reflects the active category. Chevrons: `aria-label="Previous category"` / `"Next category"`. Track: a `role="slider"` with `aria-valuemin=0 aria-valuemax=359 aria-valuenow`, `aria-valuetext="Safety"`, operable with arrow keys.
- Plaque accessible name: "PCERF – Silver Trophy for Safety, 2025, Yoo Villa, Pune, PCERF" (+ ", featured").

### 9.2 Reduced motion (`prefers-reduced-motion: reduce`)

- Keep the layout and the curve (static is fine), but:
  - Category changes and chevrons: 200ms crossfade (wall opacity 1 → 0, set angle, 0 → 1), no rotation.
  - Drag: works, but with no inertia (snap immediately on release, 150ms).
  - No entrance animation, no dolly, no hover lift (hairline colour change only).

### 9.3 List view / fallback

- "View as list" toggles a flat, accessible view in place of the stage: three `<h3>` category groups, each a `<ul>` of compact rows (`year · title · project · issuer`). Pure HTML, prints well, works without JS.
- The list view is also:
  - the server-rendered / no-JS content (progressive enhancement: the component mounts the 3D stage over it when JS runs), so all 41 awards are always crawlable;
  - the automatic fallback if `CSS.supports('transform-style','preserve-3d')` is false.
- Toggle label switches to "View as wall". Preference persists in `sessionStorage`.

### 9.4 Contrast

- Plaque text on `#F1F0EC`: title `#25292B` (≈13:1), muted `#7A7D80` (≈4.1:1; use `#6E7174` if a strict 4.5:1 is needed for 12px).
- Lighting dims side plaques by design; only the front ±25° must meet contrast. Interactive text in the index meets 4.5:1 on `#25292B`.

---

## 10. Content and copy

- Eyebrow: `SELECTED RECOGNITIONS` → `THE RECORD`
- H2: `A mark of the work.` (keep) or `A wall of the work.`
- Sub: `Drag to explore, or choose a category.` On touch devices: `Swipe to explore, or choose a category.`
- Remove "Eight recognitions, presented by category."
- Titles: strip the trailing `— YEAR` (year is its own field).

---

## 11. Acceptance criteria

1. All 41 awards are on one cylindrical wall in three arcs (National & State, Safety, Quality) with proportional arc widths and a labelled divider at the start of each.
2. Clicking a category rotates the camera along the shortest path to that arc's centre within 0.7–1.3s, eased, interruptible.
3. Mouse drag, touch swipe and horizontal trackpad rotate the room with direct manipulation, inertia and column snap; the loop is seamless at 0°/360°.
4. Vertical wheel and vertical touch swipes over the stage scroll the page.
5. The active category in the index and the dot on the position track follow the camera live, including during drags.
6. Plaques open an accessible detail dialog with prev/next inside the category; Esc closes it and focus returns to the plaque.
7. `?category=` and `?award=` deep links work.
8. Keyboard-only users can reach every award; focusing an off-screen plaque rotates it into view.
9. Reduced-motion and list-view behaviour match 9.2 and 9.3; with JS disabled, the list renders.
10. No visual artefacts at any angle in Chrome, Safari (macOS + iOS) and Firefox (culling verified).
11. 60 fps on the reference devices; no new runtime dependencies; component JS ≤ 12 KB gzip.
12. Layout matches the geometry tokens at 1440, 1280, 1024, 768, 390 and 360px widths.

## 12. QA checklist

- [ ] Rotate through 720° in both directions: no jump at the wrap point.
- [ ] Click a category mid-animation and mid-inertia: smooth retarget.
- [ ] Drag starting on a plaque does not open the dialog; a tap does.
- [ ] iOS Safari: vertical page scroll over the stage; horizontal swipe rotates; no rubber-band glitches.
- [ ] Resize desktop → mobile: geometry rebuilds (3 → 2 rows) and keeps the same active category.
- [ ] Lenis smooth scroll still works over and around the section.
- [ ] Screen reader (VoiceOver + NVDA): category buttons, plaques, live status, dialog all announced correctly.
- [ ] Missing logo shows initials; BAI awards have logos before launch.
- [ ] Lighthouse accessibility ≥ 95; no CLS from the stage (reserve height up front).

## 13. Out of scope / future

- Real per-award photography on the plaques (the design supports it via `image` in the dialog; plaques stay logo-based to keep the wall calm).
- Year filter or search (only worth adding if the record grows past ~80 awards; then add a 4-row desktop variant first).
- WebGL version with real lighting/materials.
