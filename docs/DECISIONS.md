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
