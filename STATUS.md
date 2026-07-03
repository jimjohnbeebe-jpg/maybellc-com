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

PR #4 (`feat/impeccable-overdrive` → `main`) was merged by Jim on
2026-07-03 and deployed — but **rejected in practice**: its motion was
invisible on his machine (Windows performance preset sets the
reduced-motion flag, which PR #4's code honored by showing the static
page) and too subtle even when enabled. Jim's directive: effects must be
discernible on every machine, no settings dependence, spectacular not
restrained. See `docs/LESSONS.md` (2026-07-03) and D-06.

PR #5 (`feat/overdrive-spectacular` → `main`) was **merged by Jim
2026-07-03 ~13:47 UTC** at commit `4a4d065` (CodeRabbit triage). Full
replacement of the PR #4 motion ("All of it" direction, Jim's pick):
once-per-session terminal boot takeover, persistent "Living Garage"
canvas hero (parallax grid drift, 14s scan-beam, cursor lamp), 3D tilt +
glare + CRT power-on + persistent corner brackets on venture frames,
right-edge HUD scroll telemetry. No reduced-motion bail-out (D-06).
CSS/JS only; no-JS page unchanged.

**Merge/deploy incident (2026-07-03):** the merge's Pages deploy failed
with a transient GitHub-side error ("Deployment failed, try again
later"), leaving the live site serving the stale PR #4 build — which is
static on machines with the Windows reduced-motion flag, so it looked
like "all effects broke." Re-run triggered. Separately, the merge landed
while two just-pushed commits (`f206b57` launch-quality pass, `5989260`
docs) were on the branch — they missed the merge and were re-raised as a
follow-up PR (same branch, new PR) for Jim to merge.
Self-verified (gate 1): boot/scene/tilt/power-ons/HUD confirmed in
Chrome, zero console errors; a tab-throttling bug in the boot typing was
found and fixed (time-based typing + hard cap) during iteration.

The same PR also carries: a tuning pass (sub-2s boot, 50% subtler grid,
motes removed, beam 14s/half-bright — Jim's review), an `/impeccable
polish` pass (power-on armed post-boot, beam core palette-aligned,
DESIGN.md §7 Motion added), CodeRabbit triage (2 findings: canvas
pointer-events, wipe/removal desync — both fixed, replies on threads),
and a launch-quality pass: **fonts self-hosted** (latin woff2 under
`assets/fonts/`, OFL.txt, preloads; zero third-party requests now —
TODO.md item closed), tooling references scrubbed from all served files,
`color-scheme` meta, og:image dimensions/alt, JSON-LD description.
W3C Nu: 0 errors/0 warnings. All 5 font faces verified loading
first-party in ~10ms.

## Next action
Jim: browser-verify PR #5 against its test checklist, then merge. Also
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
