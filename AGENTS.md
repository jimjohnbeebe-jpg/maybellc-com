# MaybeLLC.com

Static, build-free single-page site (portfolio + company info) for
maybellc.com.

## Quick start

| Command | Purpose |
|---|---|
| `npx serve .` (or any static file server) | Local preview |
| `.claude/rules/*` | **Authoritative** conventions, git workflow, verification |

Prefer the existing `.claude/rules/` directory for detailed guidance — this
file only holds what an agent would likely miss without help.

## Git workflow

- Branch off `main`: `feat/*` / `fix/*` / `refactor/*` / `chore/*` / `content/*`
- **Never push to or merge `main`** — it's branch-protected. Jim merges after
  browser verification.
- Push with `git push -u origin <branch>`, then `gh pr create`.

## Verification gates

1. HTML validates, no console errors on load — precondition to **commit**
2. Jim is the browser-verify authority — never self-drive a browser to verify
3. No build/test runner — this is plain HTML/CSS/JS

## Architecture orientation

- Single page: `index.html`. No framework, no bundler.
- SEO-critical files at repo root: `robots.txt`, `sitemap.xml`,
  `site.webmanifest`, `CNAME` (pins the GitHub Pages custom domain).
- Deploy: GitHub Pages via `.github/workflows/`.
- See `.claude/rules/architecture.md` for the full folder map and SEO
  baseline every page must ship with.
