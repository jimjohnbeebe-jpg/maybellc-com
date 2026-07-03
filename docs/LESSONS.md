# Lessons

Corrections + confirmed approaches. Append-only.

## 2026-07-03 — Claude Design "Send to Claude Code Web" doesn't seed this
container
Confirmed on `content/mockup-import`: for a remote/cloud Claude Code
session, Claude Design's "Send to Claude Code Web" action did not deposit
any files into this container (searched the full filesystem, git log, and
this session's own transcript — nothing landed). It most likely opens a
separate session. The reliable path that worked: Jim attached the
exported project as a `.zip` directly in a normal chat reply, which
Claude Code received at a real `/root/.claude/uploads/<session>/...` path.
For future design-import sessions on this repo (or others), ask for a
direct chat-attached zip/export up front rather than relying on the
Design UI's "send to code" action.

## 2026-07-03 — Cloudflare proxy blocks GitHub Pages' own cert issuance
GitHub Pages' automatic Let's Encrypt certificate for a custom domain
requires DNS to resolve directly to GitHub's own IPs
(`185.199.108-111.153` / `2606:50c0:8000-8003::153`) so it can verify
ownership. If the domain's DNS is proxied through Cloudflare ("orange
cloud"), the apex resolves to Cloudflare's anycast IPs instead — GitHub's
verification never sees its own IPs and refuses to issue a cert
(`gh api .../pages` keeps returning `"The certificate does not exist yet"`
on any `https_enforced=true` attempt, indefinitely, with no error pointing
at the real cause).

**Fix:** switch the apex (and any subdomain pointed at GitHub Pages) to
"DNS only" (grey cloud) in Cloudflare. The site keeps serving over HTTPS
throughout via Cloudflare's own edge cert — no downtime — but GitHub can
now see its own IPs and issues its cert automatically, typically within
15 minutes to a couple hours. There is no manual "issue now" API; clearing
and re-setting the `cname` field via `gh api` did not speed it up.

**Symptom to watch for:** the DNS toggle can take several minutes to
actually propagate even though the Cloudflare dashboard shows it as
already changed — `nslookup` against multiple resolvers (8.8.8.8, 1.1.1.1)
kept returning the *same* Cloudflare IPs for a while after the toggle was
confirmed set. Don't assume the toggle failed; re-check DNS a few minutes
later before concluding something's wrong. Also expect a brief HTTP-only
window right after the DNS switches to GitHub's IPs but before GitHub's
cert is issued — Cloudflare's cert was terminating HTTPS before, and
nothing does until GitHub's own cert lands.

## 2026-07-03 — `mcp__claude-in-chrome__resize_window` didn't change the rendered viewport this session
Confirmed independently twice (once by an `/impeccable critique` Assessment
B sub-agent, once directly): calling `resize_window` to 390×844 reported
success, but every subsequent screenshot stayed at the original 1498×812
window size — text line-breaks and layout were identical before and after.
No error surfaced; the tool silently didn't take effect in this
environment. For future sessions needing mobile/tablet visual
verification on this machine: don't trust `resize_window` output at face
value — take a screenshot immediately after and compare pixel dimensions
before relying on it. If it's not actually resizing, verify responsive CSS
by reading the media-query breakpoints directly instead, and defer
real-device/breakpoint confirmation to Jim's browser-verification pass per
`verification.md` (which is the authority for that anyway, not a
self-driven browser check).

## 2026-07-03 — Overdrive means discernible; verify on the user's real machine profile
**Correction (Jim):** the first overdrive pass (PR #4) was "so subtle as
to be invisible" — a ~1s load entrance nobody sees, 9px dot flashes, and a
full reduced-motion bail-out that made the site fully static on any
Windows box with "Animation effects" off (including Jim's own). Two
lessons: (1) when a command's premise is *push past conventional limits*,
transient or low-amplitude motion fails the brief regardless of craft —
effects must be persistent (visible any second you look) or
high-amplitude, and the "wow test" is the acceptance bar, not validation
cleanliness. (2) A gating condition discovered during self-verify (the
dev machine reporting `prefers-reduced-motion: reduce`) is a *product
finding to surface immediately*, not a checklist footnote — it changed
who could see the feature at all, and burying it cost a full
build-verify-merge round trip.

## 2026-07-03 — A failed Pages deploy is silent; never re-run this workflow, dispatch it
PR #5's merge deploy failed with a transient GitHub-side error
("Deployment failed, try again later"). Two lessons. (1) **A failed
deploy is invisible from the browser** — GitHub Pages keeps serving the
previous build, so the site looks "broken" in whatever way the stale
build differs (here: the old reduced-motion-gated build read as "all
effects dead"). After every merge, confirm the Actions run went green
before judging the live site. (2) **Re-running the failed job can never
fix it** in this repo's single-job workflow: the re-run re-executes the
upload step, creating a second `github-pages` artifact in the same run,
and `actions/deploy-pages` hard-fails on the ambiguity. The correct
recovery is a fresh `workflow_dispatch` run (Actions tab → Run
workflow), which builds one clean artifact. Documented in README.md's
Deployment section.
