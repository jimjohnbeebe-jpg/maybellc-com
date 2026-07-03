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

PR #2 (`feat/impeccable-design-pass` → `main`) was opened, browser-verified
by Jim, and merged. An `/impeccable` design pass added
`PRODUCT.md`/`DESIGN.md`/`.impeccable/` (register: brand, North Star "The
Night Shift"), ran `critique` (31/40, dual-agent, snapshot in
`.impeccable/critique/`), then implemented its full recommended
remediation:
- Typeset: replaced DM Sans/IBM Plex Sans/IBM Plex Mono (all on the skill's
  reflex-reject list) with Archivo/Public Sans/Fragment Mono.
- Audit: added tag chips to Zephyrphoto/RescueRich (previously only
  RepairVector had tags/flag/badge) and bumped nav-link padding to clear
  the 44px touch-target minimum.
- Clarify: added a "See the ventures" hero CTA.
- Adapt: added a mobile-visible inline "documentation verified" variant
  (the floating desktop badge disappeared entirely below 900px before).
- Harden: added a visually-hidden "(opens in new tab)" cue to all 6
  external links.
- Self-verified: W3C Nu HTML validator (0 errors/warnings), no browser
  console errors, keyboard focus states confirmed working. Live-viewport
  resizing for mobile/tablet screenshots was not reliable in this session's
  browser-automation environment (`resize_window` didn't change the
  rendered viewport) — the media-query logic was verified by code review
  instead; Jim's browser check should still cover real mobile/tablet
  breakpoints per `verification.md`.

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

PR #4 (`feat/impeccable-overdrive` → `main`) is **open, awaiting Jim's
browser verification**. An `/impeccable overdrive` motion pass (direction
"Boot sequence + work lamp", picked by Jim from three proposed options):
hero boot entrance, per-venture fault→signal→clear dot sweep with badge
stamp-in, pointer-tracked hero work lamp with lagging glow. CSS/JS only,
all progressive enhancement, full `prefers-reduced-motion` bail-out.
Self-verified (gate 1): zero console errors, sweep/lamp/badge visually
confirmed via browser automation, reduced-motion path confirmed for real
(the dev machine has it enabled OS-wide). Note for verification: Windows
"Animation effects" off ⇒ reduced motion ⇒ correctly no animation.

## Next action
Jim: browser-verify PR #4 against its test checklist, then merge. Also
still pending from last session: confirm HTTP→HTTPS redirect is active
(`curl -I http://maybellc.com/` should return a `301` to `https://`), and
revisit branch protection on `main` now that real content work has landed
(see `TODO.md` Repo settings).

## Open questions
- Branch protection on `main` still deliberately off per `TODO.md` — revisit
  now that real content work has started and the site is live.
- Why did the `/ultraplan` cloud session fail to push, and why did the first
  manual-import attempt only stage two deletions? Root-caused as a Claude
  Design "Send to Claude Code Web" limitation — see `docs/LESSONS.md`
  (2026-07-03 entry).
