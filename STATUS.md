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

PR #5 carried, beyond the motion rewrite: a tuning pass (sub-2s boot, 50%
subtler grid, motes removed, beam 14s/half-bright — Jim's review), an
`/impeccable polish` pass (power-on armed post-boot, beam core
palette-aligned, DESIGN.md §7 Motion added), and CodeRabbit triage
(2 findings: canvas pointer-events, wipe/removal desync — both fixed,
replies on threads).

**Merge/deploy incident (2026-07-03, resolved):** PR #5's Pages deploy
failed with a transient GitHub-side error, leaving the live site serving
the stale PR #4 build — static on machines with the Windows
reduced-motion flag, so it looked like "all effects broke." A job re-run
also fails structurally (duplicate `github-pages` artifact in the
single-job workflow); a fresh `workflow_dispatch` run deployed cleanly.
See `docs/LESSONS.md` (2026-07-03, deploy entry). The merge also landed
while two just-pushed commits were on the branch; they were re-raised as
PR #6.

PR #6 (`feat/overdrive-spectacular` → `main`, launch-quality pass) was
**merged by Jim 2026-07-03 ~14:18 UTC and deployed successfully**: fonts
self-hosted (latin woff2 under `assets/fonts/`, OFL.txt, preloads; zero
third-party requests — TODO.md item closed), tooling references scrubbed
from all served files, `color-scheme` meta, og:image dimensions/alt,
JSON-LD description. W3C Nu: 0 errors/0 warnings. Verified live:
maybellc.com serves the full build, fonts 200 from first-party,
**Jim browser-tested and passed the site**.

A "Proudly veteran owned" footer strip (label + USMC and USAF logos,
`assets/images/veteran/`) shipped on `main` in commit `60c4ad9` — it
predates this STATUS entry but was never recorded here. Jim is copying
this pattern (plus backlinks to this page) to the other MaybeLLC.com
sites via a separate per-project prompt.

PR #8 (`feat/footer-us-flag` → `main`) was **merged by Jim 2026-07-03,
deployed, and browser-tested**: adds a US flag to the veteran badge row, left
of the USMC/USAF logos. The flag is a self-authored exact-spec SVG
(`assets/images/veteran/us-flag.svg`, EO 10834 geometry, official Old
Glory digital colors, ~3 KB) — SVG over webp because a flat-color flag
is vector's ideal case; no CSS change (the existing
`.site-footer__badges img` 40px rule covers it). Self-verified: W3C Nu
0 errors/0 warnings on both `index.html` and the SVG, local render
check of the footer passed.

## Project state: COMPLETE (dormant)
The site is live, verified, and feature-complete as of 2026-07-03,
including the footer US flag (PR #8, merged/deployed/tested same day).
Deployment platform and process are documented in `README.md`
(Deployment section).

Jim is rolling the veteran footer pattern out to the other venture
sites via a per-project directive (drafted 2026-07-03, stored in his
Obsidian vault): each site copies the three images from this repo's
`assets/images/veteran/` and adds a crawlable backlink to
https://maybellc.com/ .

## Next action
None — project dormant. If re-opened, run the session-start sequence
(STATUS → rules → DECISIONS_INDEX) as usual; the leftover niceties live
in `TODO.md` (branch protection revisit, HTTP→HTTPS redirect spot-check,
deploy-failure notification idea).

## Open questions
- Branch protection on `main` still deliberately off per `TODO.md` — revisit
  now that real content work has started and the site is live.
- Why did the `/ultraplan` cloud session fail to push, and why did the first
  manual-import attempt only stage two deletions? Root-caused as a Claude
  Design "Send to Claude Code Web" limitation — see `docs/LESSONS.md`
  (2026-07-03 entry).
