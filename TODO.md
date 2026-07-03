# TODO

Tracks placeholder content/assets shipped in the initial scaffold, per the
"no placeholder without a matching TODO entry" rule in
`.claude/rules/architecture.md`.

## Content
- [ ] Hero tagline (`index.html` `#top`) — real copy from Jim/mockup.
- [ ] About section copy (`index.html` `#about`).
- [ ] Portfolio items (`index.html` `#portfolio`) — real projects, one
      `<li class="portfolio__item">` per project, replacing the single
      placeholder entry.
- [ ] Contact section copy/details (`index.html` `#contact`).

## Assets referenced but not yet created
- [ ] `assets/images/favicon.ico`
- [ ] `assets/images/apple-touch-icon.png`
- [ ] `assets/images/icon-192.png`, `assets/images/icon-512.png` (referenced by `site.webmanifest`)
- [ ] `assets/images/og-cover.jpg` (Open Graph / Twitter Card image, 1200×630)
- [ ] `assets/images/logo.png` (referenced by the Organization JSON-LD in `index.html`)
- [ ] Real portfolio thumbnails in `assets/images/portfolio/` (currently one `placeholder.svg`)

## Design
- [ ] Import the Claude Design mockup once Jim links it; replace the
      placeholder palette/typography in `assets/css/styles.css`
      (`:root` custom properties) with the mockup's values.

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
