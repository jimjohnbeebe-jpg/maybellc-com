# STATUS

**Last updated:** 2026-07-03

## Current state
The real "Maybe LLC Landing" mockup is imported and built out on
`content/mockup-import` (not yet merged): `index.html` and
`assets/css/styles.css` are a full rewrite — nav, hero, ventures
(RepairVector/Zephyrphoto/RescueRich), about, and footer, with real
copy and optimized brand/portfolio image assets. `site.webmanifest` and
`404.html` brand text updated to match ("Maybe LLC"). Mobile-first
breakpoints and `:focus-visible` states were added by hand — the source
export had neither. See PR for the full test checklist.

## Next action
Jim: browser-verify the PR for `content/mockup-import` (responsive
behavior, keyboard focus, asset quality, OG card) and merge.

## Open questions
- Hosting: scaffolded for GitHub Pages + custom domain (`CNAME` =
  `maybellc.com`), but GitHub Pages is not yet enabled in repo settings and
  DNS is not yet pointed — confirm with Jim before relying on it.
- Branch protection on `main` still deliberately off per `TODO.md` — revisit
  now that real content work has started.
