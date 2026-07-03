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
