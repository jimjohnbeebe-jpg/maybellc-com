# MaybeLLC.com

Standalone single-page website for MaybeLLC — company info and a small
portfolio of projects.

## Stack

Plain HTML5, CSS, and vanilla JS. No framework, no build step. See
[`docs/DECISIONS.md`](docs/DECISIONS.md) (D-01) for why.

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
assets/images/           images, including portfolio/ thumbnails
docs/                     decisions + lessons log
.claude/                  Claude Code operating rules (not published — see workflow)
.github/workflows/        GitHub Pages deploy
```

See [`.claude/rules/architecture.md`](.claude/rules/architecture.md) for the
full folder map and SEO baseline, and [`TODO.md`](TODO.md) for what's still
placeholder content.

## Deploy

GitHub Pages, custom domain via `CNAME` (`maybellc.com`). The workflow in
`.github/workflows/deploy.yml` stages only the public files (`index.html`,
`404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME`,
`assets/`) — repo-internal docs (`.claude/`, `docs/`, `README.md`, etc.) are
never published. GitHub Pages is not yet enabled in repo settings and DNS is
not yet pointed — see `TODO.md`.

## Working on this repo

This project uses the same development discipline as other repos in this
workspace — see [`CLAUDE.md`](CLAUDE.md) and `.claude/rules/`: branch off
`main`, PR-only (no direct pushes to `main`), no closing keywords in commits,
Jim browser-verifies before merge.
