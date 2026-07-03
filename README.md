# MaybeLLC.com

Standalone single-page website for Maybe LLC — company info and a portfolio
of three ventures (RepairVector, Zephyrphoto, RescueRich). Live at
**https://maybellc.com**.

## Stack

Plain HTML5, CSS, and vanilla JS. No framework, no build step, no
third-party requests at runtime (fonts are self-hosted under
`assets/fonts/`, SIL OFL 1.1). See [`docs/DECISIONS.md`](docs/DECISIONS.md)
(D-01) for why.

The page's motion system ("The Living Garage" — terminal boot takeover,
canvas hero scene, CRT power-ons, HUD scroll rail) is entirely progressive
enhancement injected by `assets/js/main.js`; with JS disabled the page is
fully static and complete. The visual system is documented in
[`DESIGN.md`](DESIGN.md); motion runs on every machine by design (see
D-06 in `docs/DECISIONS.md`).

## Local preview

Any static file server works, e.g.:

```
npx serve .
```

## Structure

```
index.html               the page
404.html                 not-found page
robots.txt / sitemap.xml / site.webmanifest / CNAME   SEO + hosting metadata
assets/css/              styles.css
assets/js/               main.js
assets/fonts/            self-hosted woff2 fonts + OFL.txt license
assets/images/           images, including portfolio/ thumbnails
docs/                     decisions + lessons log
.claude/                  Claude Code operating rules (not published — see workflow)
.github/workflows/        GitHub Pages deploy
```

See [`.claude/rules/architecture.md`](.claude/rules/architecture.md) for the
full folder map and SEO baseline, and [`TODO.md`](TODO.md) for what's still
placeholder content.

## Deployment

**Platform: GitHub Pages** (build source: GitHub Actions), live since
2026-07-03.

- **How it deploys:** every push to `main` triggers
  `.github/workflows/deploy.yml`, which stages only the public files
  (`index.html`, `404.html`, `robots.txt`, `sitemap.xml`,
  `site.webmanifest`, `CNAME`, `assets/`) into an artifact and deploys it
  via `actions/deploy-pages`. Repo-internal docs (`.claude/`, `docs/`,
  `README.md`, `STATUS.md`, `TODO.md`, `PRODUCT.md`, `DESIGN.md`) are never
  published.
- **Custom domain:** `maybellc.com`, pinned by the `CNAME` file. DNS is
  managed at Cloudflare with the apex record set to "DNS only"
  (grey-cloud) — proxying through Cloudflare blocked GitHub's certificate
  issuance. TLS is GitHub's own certificate with HTTPS enforced.
- **Manual deploy:** the workflow also supports `workflow_dispatch`
  (Actions tab → "Deploy to GitHub Pages" → Run workflow), useful if a
  deploy fails transiently.
- **Known gotcha:** a failed Pages deploy is silent from the browser — the
  site keeps serving the previous build. After merging, check the Actions
  run went green. If it failed, **dispatch a fresh run**; re-running the
  failed job uploads a duplicate `github-pages` artifact into the same run
  and `deploy-pages` refuses it (single-job workflow). See
  `docs/LESSONS.md` (2026-07-03).

## Working on this repo

This project uses the same development discipline as other repos in this
workspace — see [`CLAUDE.md`](CLAUDE.md) and `.claude/rules/`: branch off
`main`, PR-only (no direct pushes to `main`), no closing keywords in commits,
Jim browser-verifies before merge.
