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
- [x] Enable GitHub Pages in repo settings (source: GitHub Actions).
- [x] Point `maybellc.com` DNS at GitHub Pages — required switching the
      Cloudflare apex record from proxied (orange cloud) to "DNS only"
      (grey cloud) so GitHub could verify the domain and issue its own
      cert; Cloudflare's proxy IPs were masking the real A/AAAA records.
- [x] GitHub's TLS certificate issued and approved (expires 2026-09-30);
      `https_enforced` is on.
- [ ] Spot-check next session that `http://maybellc.com/` actually 301s to
      `https://` — enforcement was just turned on and hadn't visibly taken
      effect on GitHub's edge yet as of 2026-07-03.

## Repo settings
- [ ] Enable branch protection on `main` (require PR before merge) once real
      content work starts — deliberately skipped at bootstrap since the repo
      was still empty scaffolding. `.claude/rules/git-workflow.md` assumes
      this is on; it isn't yet.

## Performance / privacy
- [x] Self-host the three Google Fonts (Archivo, Public Sans, Fragment
      Mono) instead of loading from
      `fonts.googleapis.com`/`fonts.gstatic.com`. **Done 2026-07-03 on
      PR #5's launch-quality pass:** latin-subset woff2 files under
      `assets/fonts/` (Archivo as one variable file covering 500–700,
      only weights actually used), `@font-face` with `font-display:
      swap`, preloads in `index.html`, OFL 1.1 license text included
      (`assets/fonts/OFL.txt`). No third-party connections remain.

## Deploy observability
- [ ] Consider a deploy-failure notification (e.g. a GitHub Actions
      failure email/Slack notification, or a lightweight uptime/content
      check) — 2026-07-03 showed a failed Pages deploy is silent and the
      site quietly serves the stale build (see docs/LESSONS.md).
