# STATUS

**Last updated:** 2026-07-03

## Current state
maybellc.com is **live**. The real "Maybe LLC Landing" mockup is imported
and built out: `index.html` and `assets/css/styles.css` are a full rewrite —
nav, hero, ventures (RepairVector/Zephyrphoto/RescueRich), about, and
footer, with real copy and optimized brand/portfolio image assets.
`site.webmanifest` and `404.html` brand text updated to match ("Maybe LLC").
Mobile-first breakpoints and `:focus-visible` states were added by hand —
the source export had neither.

PR #1 (`content/mockup-import` → `main`) was opened, browser-verified by
Jim, reviewed by CodeRabbit (lazy-loading + footer contrast fixed; Google
Fonts self-hosting declined for a follow-up — see `TODO.md`), and merged.

**Hosting is fully live as of 2026-07-03:**
- GitHub Pages enabled (build source: GitHub Actions, via
  `.github/workflows/deploy.yml`), deploying successfully on every push to
  `main`.
- Custom domain `maybellc.com` configured; DNS (via Cloudflare, switched to
  "DNS only" / grey-cloud on the apex record so GitHub could verify
  ownership and issue its own cert — proxying through Cloudflare's anycast
  IPs was blocking Let's Encrypt issuance).
- GitHub's own TLS certificate is issued and approved (expires 2026-09-30),
  and `https_enforced` is on (HTTP → HTTPS redirect). The redirect header
  hadn't visibly kicked in yet at last check — expected to finish
  propagating on GitHub's edge shortly; worth a spot-check next session.

## Next action
Next session: confirm HTTP→HTTPS redirect is active
(`curl -I http://maybellc.com/` should return a `301` to `https://`), then
revisit branch protection on `main` now that real content work has landed
(see `TODO.md` Repo settings).

## Open questions
- Branch protection on `main` still deliberately off per `TODO.md` — revisit
  now that real content work has started and the site is live.
- Why did the `/ultraplan` cloud session fail to push, and why did the first
  manual-import attempt only stage two deletions? Root-caused as a Claude
  Design "Send to Claude Code Web" limitation — see `docs/LESSONS.md`
  (2026-07-03 entry).
