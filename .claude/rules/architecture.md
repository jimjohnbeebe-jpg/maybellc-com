# Architecture (Standing Rule)

## What MaybeLLC.com is
A standalone, build-free, single-page marketing site: a small portfolio of
projects plus company information. Static HTML/CSS/JS — no framework, no
bundler, no server runtime. Designed to be hosted anywhere that serves static
files (GitHub Pages by default; see `.github/workflows/`).

The visual design originates from a Claude Design mockup (linked separately
by Jim) and gets translated into the HTML/CSS here — this repo is the source
of truth for the shipped site, not the mockup.

## Folder boundaries
```
index.html               the single page (all sections, semantic HTML5)
404.html                 not-found page (also doubles as GitHub Pages SPA fallback if ever needed)
robots.txt                crawler directives
sitemap.xml               single-URL sitemap (extend if the page grows anchors/sections worth indexing separately)
site.webmanifest          PWA/icon manifest
CNAME                     custom domain pin for GitHub Pages (maybellc.com)
assets/
  css/                    styles.css (or split further only if it grows unwieldy)
  js/                     main.js (progressive enhancement only — page must work with JS disabled for content/SEO)
  images/                 optimized images; portfolio/ subfolder for project thumbnails
  fonts/                  self-hosted font files, if any (prefer system font stack first)
docs/                     DECISIONS.md, DECISIONS_INDEX.md, LESSONS.md
.github/workflows/        deploy automation
```
Surgical changes — touch the file the plan names, not its neighbors.

## Inviolable rules
1. **No build step.** If a task seems to need one (a bundler, a framework),
   that's a scope change — surface it to Jim before adding it.
2. **No secrets in the client.** This is a static marketing site; it should
   never need server-side credentials. If a form or integration needs one,
   that's a scope change — surface it.
3. **Semantic HTML first.** One `<h1>` per page, logical heading order,
   landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`),
   `alt` text on every `<img>`.
4. **No dependency without justification.** Prefer plain CSS/JS; a CDN
   library needs a stated reason and a note on what happens if the CDN is
   down (self-host if the site would break without it).
5. **No placeholder copy shipped without a matching `TODO.md`/issue entry** —
   lorem ipsum or "coming soon" sections don't merge silently.
6. **Performance budget.** Images compressed and sized to their rendered
   dimensions (`width`/`height` attributes set to prevent layout shift);
   prefer WebP/AVIF with a fallback only if analytics show a real need;
   `font-display: swap` on any web font.
7. **Accessibility is not optional.** Color contrast, focus states, keyboard
   navigability, and `alt` text are part of "done," not a follow-up pass.

## SEO baseline (every page ships with)
- Unique `<title>` and `<meta name="description">`.
- `<link rel="canonical">` pointing at the production URL.
- Open Graph + Twitter Card meta tags (`og:title`, `og:description`,
  `og:image`, `og:url`, `twitter:card`).
- JSON-LD structured data (`Organization` at minimum; extend per section as
  content is added — e.g. `CreativeWork`/`Project` entries for the portfolio).
- `robots.txt` and `sitemap.xml` kept in sync with the shipped URL(s).
- Mobile-first responsive layout (single page, but must pass a mobile
  usability check).

## Deployment
GitHub Pages, custom domain via `CNAME` (`maybellc.com`), deployed by the
workflow in `.github/workflows/`. Static files only — Pages serves the repo
(or the built output of a no-op build) directly. DNS for the custom domain is
configured outside this repo (Jim's registrar/DNS provider).
