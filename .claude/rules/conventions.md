# Conventions (Standing Rule)

## HTML
Semantic HTML5. One `<h1>` per page. Landmarks (`header`/`nav`/`main`/
`section`/`article`/`footer`). Every `<img>` has `alt` (empty `alt=""` only
for purely decorative images). Attributes double-quoted, lowercase tag/attr
names. `lang="en"` on `<html>`.

## CSS
Plain CSS (custom properties for the palette/spacing/typography scale once
the mockup defines them — do not invent tokens ahead of the design). Mobile-
first media queries. BEM-style class naming (`block__element--modifier`) to
keep the single stylesheet navigable without a preprocessor. No `!important`
except a documented, unavoidable third-party override.

## JavaScript
Vanilla JS, no framework. Progressive enhancement: the page's content and
navigation must work with JS disabled — JS only adds behavior (smooth scroll,
form handling, animations), never gates content visibility. `defer` on the
script tag; no inline event handlers in HTML.

## Images
Compressed before commit. `width`/`height` attributes set explicitly to
prevent layout shift. WebP preferred with a sensible fallback only if a real
compatibility need arises. Portfolio thumbnails live in
`assets/images/portfolio/`.

## Error handling & security
No client-side secrets, ever — this site has no backend. Any third-party
embed (analytics, forms) loaded via `<script>` gets a one-line note in the
plan on what it collects and why. Security headers (CSP, etc.) are set at the
hosting layer if the chosen host supports it — not something this repo's
static files can enforce on their own.

## Testing & linting
Before any commit: HTML validates (https://validator.w3.org/ or an
equivalent local tool), no console errors on load, and the SEO regression
checklist in `verification.md` passes for any `<head>`/structured-data change.

## Communication
Direct, technically precise, no filler. **Lead with the outcome:** verdict
first, evidence after — the first sentence answers "what happened" or "what
did you find"; supporting detail follows. State ambiguity + assumed reading
before proceeding. State multi-step plans first. Surface blockers, don't work
around them silently. Cite official docs, not aggregators or videos.

## Progress tracking
Tasks spanning multiple phases or >30 min: maintain `docs/PROGRESS.md`
(status, completed steps, resumption); update before switching tasks.
