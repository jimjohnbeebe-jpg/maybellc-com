---
name: Maybe LLC
description: Rational development, modern technology — a dark diagnostic-shop marketing site for a small veteran-owned portfolio company.
colors:
  garage-deepest: "#07090f"
  garage-body: "#0b0f1a"
  garage-panel: "#111827"
  torque-primary: "#2563eb"
  torque-accent: "#60a5fa"
  signal-amber: "#f59e0b"
  fault-red: "#ef4444"
  clear-green: "#22c55e"
  ink-primary: "#cbd5e1"
  ink-muted: "#94a3b8"
  ink-faint: "#64748b"
  ink-inverse: "#ffffff"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 2vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Fragment Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.1em"
rounded:
  chip: "9999px"
  card: "12px"
  pillar: "10px"
spacing:
  space-1: "0.5rem"
  space-2: "1rem"
  space-3: "1.5rem"
  space-4: "2.5rem"
  space-5: "4rem"
  space-6: "6rem"
components:
  nav-link:
    textColor: "{colors.ink-muted}"
    rounded: "5px"
    padding: "8px 10px"
  nav-link-hover:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
    textColor: "{colors.ink-inverse}"
  tag-chip:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.chip}"
    padding: "5px 11px"
  tag-chip-featured:
    backgroundColor: "rgba(37, 99, 235, 0.14)"
    textColor: "{colors.torque-accent}"
    rounded: "{rounded.chip}"
    padding: "5px 11px"
  flag-badge:
    backgroundColor: "rgba(37, 99, 235, 0.16)"
    textColor: "{colors.torque-accent}"
    rounded: "{rounded.chip}"
    padding: "3px 9px"
  pillar-card:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    rounded: "{rounded.pillar}"
    padding: "{spacing.space-3}"
  venture-frame:
    backgroundColor: "{colors.garage-panel}"
    rounded: "{rounded.card}"
---

# Design System: Maybe LLC

## 1. Overview

**Creative North Star: "The Night Shift"**

Maybe LLC's site is a quiet workshop after hours: near-black backgrounds,
one cool blue light left on, and the small disciplined details of people
who work with their hands as much as their heads. It doesn't perform
confidence with scale or spectacle — it earns it with restraint. The
diagnostic-shop vocabulary (traffic-light status dots, monospace part-number
labels, a fake-browser-chrome preview frame around each venture screenshot)
is load-bearing, not decorative: it exists because RepairVector's actual
product domain is automotive diagnostics, and the whole company's thesis is
"rational development, evidence over hype."

This system explicitly rejects the generic SaaS/AI-tool playbook: no
gradient-text headlines, no hero-metric-with-sparkline template, no
cream/sand "warm neutral" body background, no tiny uppercase eyebrow
stacked reflexively above every section, no identical icon-card grids, no
glassmorphism used for its own sake. Where numbers or eyebrow-shaped labels
appear (venture index `01/02/03`, the `eyebrow` class), they're load-bearing
sequence and category labels tied to the diagnostic motif, not scaffolding
applied by reflex.

**Key Characteristics:**
- Near-black, low-chroma dark shell — no light mode
- One brand accent (torque blue), used sparingly, never washed out
- Traffic-light status color (amber/red/green) reserved strictly for
  diagnostic/status meaning, never as general decoration
- Monospace for anything that reads as data: URLs, indices, category tags,
  timestamps
- Flat surfaces at rest; shadow appears only under floating overlay
  elements (the preview frame, the verification badge)

## 2. Colors

A near-black, desaturated-blue-leaning dark palette with one saturated
accent and three status colors borrowed directly from automotive
diagnostics (fault lamp, caution/signal lamp, all-clear).

### Primary
- **Torque Blue** (`#2563eb` / `torque-primary`): the brand accent —
  skip-link background, focus-visible outline base color family, primary
  link hover states. Used with intent, not as a wash.
- **Torque Blue Light** (`#60a5fa` / `torque-accent`): the accent's lighter
  step — eyebrow labels, featured-venture index numbers, hover states,
  `:focus-visible` outlines, the small "flag" and "featured tag" chips.

### Tertiary — Status Signals
- **Signal Amber** (`#f59e0b`): the middle status dot in the fake browser
  chrome bar — caution/in-progress, borrowed straight from a diagnostic
  scan tool's UI. Reserved for that one use.
- **Fault Red** (`#ef4444`): the first status dot — fault/error state in
  the same browser-chrome vocabulary. Never used for anything but that
  status meaning (i.e. never as a generic "delete" or "error" red
  elsewhere without the same diagnostic framing).
- **Clear Green** (`#22c55e`): the third status dot — all-clear/verified.
  Also carries the "documentation verified" badge copy.

### Neutral
- **Garage Deepest** (`#07090f` / `garage-deepest`): alternate section
  background (`.section--alt`) and the footer — the darkest surface,
  used to separate bands of the single page without a border.
- **Garage Body** (`#0b0f1a` / `garage-body`): the page's base
  background and the sticky-nav overlay tint.
- **Garage Panel** (`#111827` / `garage-panel`): raised surface for the
  venture preview frame and its browser-chrome bar — one step lighter
  than the body, reads as a physical panel.
- **Panel Slate** (`#cbd5e1` / `ink-primary`): default body text on dark.
- **Panel Slate Muted** (`#94a3b8` / `ink-muted`): secondary text — nav
  links at rest, category labels, footer link/tagline text.
- **Panel Slate Faint** (`#64748b` / `ink-faint`): reserved third step in
  the text hierarchy. Declared in tokens but not yet used on the current
  single page — hold for a future tertiary-text need rather than
  introducing a fourth ad hoc gray.
- **Panel White** (`#ffffff` / `ink-inverse`): headings, nav brand
  wordmark, footer brand wordmark — the brightest text, used sparingly for
  emphasis rather than as the default body color.

### Named Rules
**The One Accent Rule.** Torque blue is the only saturated brand color.
It never competes with a second "brand" hue — Committed-strategy color use
means one color carries identity, everything else is neutral or diagnostic
status.

**The Status-Color Containment Rule.** Amber/red/green never leave the
diagnostic-chrome context (the three browser-bar dots, the verified
badge). They are not repurposed as generic UI success/warning/error colors
elsewhere on the page.

## 3. Typography

**Display Font:** Archivo (with `ui-sans-serif, system-ui, sans-serif`
fallback)
**Body Font:** Public Sans (with `ui-sans-serif, system-ui, sans-serif`
fallback)
**Label/Mono Font:** Fragment Mono (with `ui-monospace, SFMono-Regular,
Menlo, monospace` fallback)

**Character:** An engineered grotesque (Archivo) carries every heading and
brand mark with confident, slightly tight tracking — closer to a torque
spec plate than a marketing headline; a plain, unhyped humanist sans
(Public Sans, the US federal design system's typeface, chosen specifically
because it has no decorative agenda) carries body prose for readability; a
technical monospace (Fragment Mono) marks anything that reads as data or
metadata. The pairing is deliberate: it replaces the DM Sans / IBM Plex
trio (both flagged as training-data monoculture defaults during a
`/impeccable critique` pass) with a combination chosen via `brand.md`'s
font-selection procedure — three brand-voice words ("disciplined,
mechanical, unhyped"), a physical-object reference (a torque-spec plate,
a parts-catalog index card), then a genuine personality contrast (grotesque
display vs. humanist body) rather than two similar geometric sans-serifs.

### Hierarchy
- **Display** (700, `clamp(2.125rem, 5vw, 3.5rem)` / 34px→56px across
  breakpoints, line-height 1.1, letter-spacing -0.02em): the hero `<h1>`
  only. `text-wrap: balance` keeps the two-line headline even.
- **Headline** (700, `clamp(1.75rem, 3.5vw, 2.5rem)` / 28px→40px,
  line-height 1.12, letter-spacing -0.02em): section titles
  (`section__title`) and each venture's own title (`venture__title`,
  26px static).
- **Title** (500, `clamp(1.0625rem, 2vw, 1.75rem)` / 17px→28px,
  line-height 1.35, letter-spacing -0.01em): the About section's statement
  and each pillar's `h3`.
- **Body** (400, 16–17px, line-height 1.55–1.6, max 520–680px measure):
  hero lede, venture descriptions, pillar copy. Never runs past roughly
  65–75ch even at full width because containers cap at 520–680px.
- **Label** (400–500, 10–11px, letter-spacing 0.08–0.14em, uppercase, mono
  for data-shaped labels / Archivo for the eyebrow): category tags, tag
  chips, venture index numbers, footer labels, the `eyebrow` kicker.

### Named Rules
**The Mono-Means-Data Rule.** Monospace is reserved for anything that is,
or reads as, structured data: URLs, index numbers, category/tag labels,
timestamps, the copyright line. It never appears on prose or headlines.

## 4. Elevation

Flat by default. Surfaces sit at the same visual depth as their section
background; there is no ambient card-shadow system. Shadow is reserved
strictly for elements that visually float above the page: the venture
preview frame (a deep, wide, dark drop shadow that reads as "this frame is
lifted off the shop wall") and the verification badge that overlaps it (a
tighter shadow plus a blurred glass backdrop, appropriate here because it's
a genuinely floating overlay chip, not decorative glassmorphism on a flat
surface).

### Shadow Vocabulary
- **Frame Lift** (`box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)`):
  the venture preview frame — a wide, soft, dark shadow plus a 1px hairline
  to separate it from the near-black background it sits on.
- **Badge Float** (`box-shadow: 0 12px 30px rgba(0,0,0,0.4)`, paired with
  `backdrop-filter: blur(8px)` and a semi-opaque dark fill): the
  "documentation verified" badge that overlaps the frame's bottom-left
  corner — the one legitimate use of glass in the system, because the
  element genuinely floats above two surfaces at once.

### Named Rules
**The Flat-By-Default Rule.** Nothing gets a shadow just for being a card.
Pillars, tags, chips, and nav all sit flush with their background,
differentiated by a subtle fill (`rgba(255,255,255,0.03–0.06)`) or a 1px
`--border-on-dark` hairline, never a shadow. Shadow is reserved for
elements that are structurally, not just decoratively, "lifted."

## 5. Components

### Buttons / Links
There is no filled button in the current system — every call to action is
a text link with a trailing chevron icon, styled to feel like a confident
inline instruction rather than a boxed CTA.
- **Venture Link:** Archivo 600, 14px, white at rest, shifts to Torque
  Blue Light (`#60a5fa`) on hover; inline SVG chevron, `transition: color
  150ms`. Reused verbatim as the hero's "See the ventures" CTA
  (`.hero__cta`, same class plus a `margin-top` modifier) rather than
  inventing a second button style for the fold's next-action.
- **Nav Link:** Archivo 500, 13px, `panel-400` at rest → white text on a
  `rgba(255,255,255,0.06)` fill on hover, radius 5px, padding `12px 12px`
  (bumped from `8px 10px` to clear the 44px touch-target minimum).

### Chips / Tags
- **Tag Chip:** pill radius (9999px), `rgba(255,255,255,0.05)` fill,
  `panel-300` text, mono 10.5px uppercase, letter-spacing 0.08em.
- **Featured Tag Chip:** the first tag on the flagship venture only — same
  shape, Torque Blue Light text on a `rgba(37,99,235,0.14)` tint fill, to
  signal "this is the flagship" without a separate badge component.
- **Flag Badge:** pill radius, Torque Blue Light text on
  `rgba(37,99,235,0.16)` fill, mono 10px uppercase — the standalone
  "Flagship" marker in the venture meta row.
- **Verified Inline (mobile counterpart to the Badge Float overlay):** a
  plain-text mono label with a small clear-green status dot, sitting in
  the venture meta row below 900px, where the floating "documentation
  verified" badge (see Elevation) has no room to render without colliding
  with the stacked layout. Hidden again at ≥900px once the floating badge
  takes over, so the same trust signal survives at every viewport instead
  of just disappearing below the desktop breakpoint.

### Cards / Containers
- **Corner Style:** 12px (`--radius-card`) for the venture preview frame
  and floating badge; 10px for About pillars — a near-match, not
  identical, worth normalizing to one value if a new card-shaped component
  is added later.
- **Background:** `garage-panel` (#111827) for the venture frame;
  `rgba(255,255,255,0.03)` translucent fill over the section background
  for About pillars.
- **Shadow Strategy:** see Elevation — the venture frame gets Frame Lift,
  pillars get none.
- **Border:** 1px `--border-on-dark` (`rgba(255,255,255,0.08)`) on About
  pillars and the browser-chrome bar's bottom edge; no border on the
  frame itself (the shadow's 1px inset stands in for one).
- **Internal Padding:** `--space-3` (1.5rem) on pillars.

### Navigation
Sticky header, `rgba(11,15,26,0.82)` translucent fill over
`saturate(150%) blur(14px)` backdrop-filter, 1px bottom hairline. Brand
mark is the logo + wordmark in white Archivo 700; links sit right-aligned,
`panel-400` at rest, white-on-tint on hover/focus. No mobile hamburger in
the current build — the link list is short enough to stay inline at every
breakpoint.

### Signature Component: Browser-Chrome Preview Frame
Every venture entry gets a fake browser window around its screenshot: a
`garage-panel` header bar with three status dots (fault/signal/clear) and
a mono-font URL, `12px` rounded corners, `Frame Lift` shadow. This is the
system's most distinctive pattern — it turns a plain screenshot into
"proof of a real, live, running product" and ties every venture back to
the diagnostic-tooling metaphor even when the venture itself (Zephyrphoto,
RescueRich) has nothing to do with automotive repair.

## 6. Do's and Don'ts

### Do:
- **Do** keep torque blue as the only saturated brand hue (The One Accent
  Rule) — new accents should be status-diagnostic colors, not a second
  brand color.
- **Do** reserve monospace for anything data-shaped: URLs, indices, tags,
  timestamps (The Mono-Means-Data Rule).
- **Do** keep new cards/chips flat at rest; add a fill tint or hairline
  border instead of a shadow (The Flat-By-Default Rule).
- **Do** keep the browser-chrome preview frame pattern for any new
  venture/portfolio entry — it's the signature component, not a one-off.
- **Do** cap prose measure around 65–75ch (already enforced by the
  520–680px content-container widths).

### Don't:
- **Don't** introduce gradient text, the hero-metric-with-sparkline
  template, or a cream/sand/beige body background — explicit AI-slop
  anti-references from PRODUCT.md.
- **Don't** stack a tiny uppercase tracked eyebrow above every section
  reflexively — the existing `eyebrow` class is a deliberate, sparing use
  (two instances total), not a per-section default.
- **Don't** repurpose fault-red / signal-amber / clear-green as generic
  UI error/warning/success colors outside the diagnostic-chrome context
  (The Status-Color Containment Rule).
- **Don't** add a filled, boxed CTA button — the system's voice is
  confident inline text links with a chevron, not a button-heavy SaaS
  layout.
- **Don't** use `border-left`/`border-right` as a colored accent stripe on
  any card, list item, or callout — full borders, fills, or the existing
  leading-index-number pattern instead.

## 7. Motion (added 2026-07-03, PR #5 — "The Living Garage")

The page is no longer static: motion is part of the diagnostic-instrument
identity, and per **D-06** it runs on every machine — there is **no
`prefers-reduced-motion` bail-out** (the Windows performance preset
pollutes that flag; only the smooth-scroll override remains gated). All
motion chrome is injected by `assets/js/main.js`; the no-JS page stays
fully static.

### Vocabulary
- **Terminal boot takeover** (once per tab session, `sessionStorage`):
  full-screen mono self-test types out in under 2s, then a clip-path wipe
  reveals the page. Any key or click skips it.
- **Living Garage hero scene** (canvas, replaces the static CSS grid when
  JS runs): three parallax blueprint grid layers drifting, a torque-blue
  scan-beam sweeping every ~14s at low intensity, and a cursor lamp on
  fine pointers. Pauses off-screen and on hidden tabs.
- **CRT power-on** (once per frame, on scroll-into-view): the venture
  screenshot snaps on like a monitor, scanlines fade, status dots run
  fault → signal → clear, corner brackets draw in **and persist** as
  diagnostic chrome, badge stamps in.
- **3D tilt + glare** (fine pointers): frames rotate up to ~6–8° toward
  the cursor with a glare streak (`--glare-x`/`--glare-o`).
- **HUD scan rail** (≥900px): fixed right-edge scroll telemetry — mono
  section label + percent.

### Named rules
- **The Ease Rule.** `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint) is
  the house curve. No bounce, no elastic.
- **The Once Rule.** One-shot moments (boot, power-ons) fire exactly once
  per session/entry; ambient motion (scene, HUD) is the only motion that
  loops.
- **The Injection Rule.** Motion chrome (`.boot`, `.hud`,
  `.frame-bracket`, `.crt-lines`, `.hero__scene`) exists only when JS
  creates it — never in `index.html`.

### Z-index scale
`nav 50 → hud 60 → boot 90 → skip-link 100`. New layers slot into this
scale; no arbitrary values.
