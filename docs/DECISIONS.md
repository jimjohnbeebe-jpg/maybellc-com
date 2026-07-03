# Decisions

Full entries, append-only. One-liners mirrored to `DECISIONS_INDEX.md` in the
same commit.

## D-01 — Static HTML/CSS/JS, no framework/build step (2026-07-02)
**Context:** New standalone single-page site for MaybeLLC.com — a small
portfolio plus company info, sourced from a Claude Design mockup.
**Decision:** Plain HTML5/CSS/vanilla JS, no bundler, no framework.
**Why:** Smallest possible surface for a single page; a design mockup
translates directly to markup without a build pipeline in the way; fastest
path to host anywhere.
**Alternatives considered:** Next.js static export (rejected — unnecessary
tooling weight for one page), Astro (rejected — no content-collection or
multi-page need to justify it).

## D-02 — GitHub Pages + custom domain as default hosting target (2026-07-02)
**Context:** Repo needed a deploy target to scaffold `.github/workflows/`
and a `CNAME` file against.
**Decision:** Default to GitHub Pages, custom domain `maybellc.com` via
`CNAME`.
**Why:** Free, zero-maintenance for a static site, integrates with the
`main`-branch-protected PR workflow already in place.
**Status:** Scaffolded only — GitHub Pages is not yet enabled in repo
settings, and DNS is not yet pointed at GitHub. Confirm with Jim before
treating this as live.

## D-03 — Ported a focused token subset, not the full design-system file (2026-07-03)
**Context:** The Claude Design export's `colors_and_type.css` is a
multi-hundred-line design system (light + dark semantic roles, a full
type-utility-class layer) built for a bigger, multi-surface product.
`assets/css/styles.css` only needs to style one dark single-page site.
**Decision:** Hand-picked the tokens this page actually uses (garage/
torque/signal/fault/clear color scale, panel text scale, the three font
stacks, radius) into `:root`, and translated every inline `style="..."`
attribute in the export into named BEM classes instead of keeping the
export's inline-style-per-element markup.
**Why:** A single page doesn't need a multi-surface token system, and
inline-style soup is unmaintainable and reads as an unedited tool export.
**Also in this change:** the mockup export ships zero `@media` queries and
no `:focus-visible` states — both were authored from scratch for this
build (mobile-first breakpoints; visible focus rings on every interactive
element) since `architecture.md` requires both as baseline, not follow-up.
Brand name corrected from the scaffold's placeholder "MaybeLLC" to "Maybe
LLC" (two words) throughout, matching the actual design.

## D-04 — Replaced DM Sans/IBM Plex Sans/IBM Plex Mono with Archivo/Public Sans/Fragment Mono (2026-07-03)
**Context:** An `/impeccable critique` pass (dual-agent, score 31/40)
flagged that all three shipped fonts are named verbatim on the `impeccable`
skill's own `brand.md` reflex-reject list — training-data monoculture
defaults that undercut the brand's stated "disciplined, rational,
understated, not-generic-AI-tool" positioning. The bundled anti-slop
detector didn't catch it (its CLI scan only parses the `<link>` tag in
`index.html` and misses fonts declared via CSS custom properties in a
separate file), but the brand-specific human review did.
**Decision:** Ran `brand.md`'s font-selection procedure (three brand-voice
words → physical-object reference → catalog browse → cross-check against
the original reflex) and landed on Archivo (display/headline, an engineered
grotesque), Public Sans (body, the US federal design system's deliberately
unhyped typeface), and Fragment Mono (labels/data). Same weight scale and
`clamp()` sizes carried over from `DESIGN.md` — only the family names
changed.
**Why:** Keeps the existing type scale/hierarchy (no redesign needed) while
removing the single most identifiable "an AI generated this" tell on the
page.
**Also in this change (same `/impeccable` remediation pass):** added tag
chips to Zephyrphoto/RescueRich so all three venture cards read as
complete-but-tiered rather than two of three looking unfinished; bumped
`.site-nav__links a` padding from `8px 10px` to `12px 12px` to clear the
44px touch-target guideline; added a hero "See the ventures" CTA; added a
mobile-visible inline "documentation verified" variant (the floating
desktop badge previously vanished outright below 900px); added a
visually-hidden "(opens in new tab)" cue to all 6 external links via a new
`.sr-only` utility class.

## D-05 — Overdrive motion direction: boot sequence + work lamp (2026-07-03)
**Context:** `/impeccable overdrive index.html` — the page had zero motion
beyond a 150ms hover transition. Three directions were proposed
(diagnostic boot sequence; cursor work-lamp hero; CSS scroll-driven scan
rail), plus a combined option.
**Decision:** Jim picked the combined **boot sequence + work lamp**: WAAPI
hero entrance, per-venture fault→signal→clear browser-dot self-test with
badge stamp-in, and a pointer-tracked hero grid mask with lagging
torque-blue glow.
**Why:** The sweep makes the motion carry the brand argument (evidence,
then verdict) rather than decorate; the lamp extends the "night shift"
scene literally. The scroll-driven scan rail was rejected for partial
browser support (no Firefox without a flag).
**Constraints honored:** progressive enhancement only (no-JS page
unchanged), full `prefers-reduced-motion` bail-out in both JS and CSS,
transform/opacity/mask-position only, self-stopping rAF loop.
