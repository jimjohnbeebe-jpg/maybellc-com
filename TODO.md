# TODO

Tracks placeholder content/assets shipped in the initial scaffold, per the
"no placeholder without a matching TODO entry" rule in
`.claude/rules/architecture.md`.

## Content
- [x] Hero tagline (`index.html` `#top`) — real copy from the mockup.
- [x] About section copy (`index.html` `#about`).
- [x] Ventures/portfolio items (`index.html` `#ventures`) — RepairVector,
      Zephyrphoto, RescueRich, from the mockup.
- [x] Contact — direct `mailto:info@maybellc.com` in nav + footer (this
      design has no separate `#contact` section).

## Assets referenced but not yet created
- [x] `assets/images/favicon.ico` — generated from `maybe-logo.png`.
- [x] `assets/images/apple-touch-icon.png` — generated from `maybe-logo.png`.
- [x] `assets/images/icon-192.png`, `assets/images/icon-512.png`.
- [x] `assets/images/og-cover.jpg` — generated (logo + wordmark on brand
      background). First pass — swap for a custom-designed card if desired.
- [x] `assets/images/logo.webp` (JSON-LD `Organization.logo`).
- [x] Real portfolio thumbnails in `assets/images/portfolio/`.

## Design
- [x] Import the Claude Design mockup ("Maybe LLC Landing.dc.html");
      `assets/css/styles.css` now carries the real palette/typography
      (see `docs/DECISIONS.md` D-03).

## Hosting
- [ ] Enable GitHub Pages in repo settings (source: GitHub Actions, or
      `main` branch — decide once the workflow in `.github/workflows/` is
      confirmed working).
- [ ] Point `maybellc.com` DNS at GitHub Pages.

## Repo settings
- [ ] Enable branch protection on `main` (require PR before merge) once real
      content work starts — deliberately skipped at bootstrap since the repo
      was still empty scaffolding. `.claude/rules/git-workflow.md` assumes
      this is on; it isn't yet.
