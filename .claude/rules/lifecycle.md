# Session Lifecycle (Standing Rule)

Every session runs this loop: **Explore → Plan → Implement → Verify → Commit.**

## 1. Explore (orient)
- Read `STATUS.md`, then the rule files, then `docs/DECISIONS_INDEX.md`;
  open `docs/DECISIONS.md` and `docs/LESSONS.md` on demand when the task
  touches them.
- **Never trust a document's tense.** A `STATUS.md` line or handover calling
  work "done" or "pending" is a snapshot. Confirm against git (`git fetch`,
  `git status`, `git branch -vv`). If a doc and git disagree, **git is truth**
  — fix the doc first.

## 2. Plan (yours — the plan IS the directive)
- Before implementing, state a brief plan: the files you expect to touch, the
  success criteria, and how the change will be verified.
- **Source-dependency invariant — applies to your OWN plan.** Every
  external-fact claim in the plan (a library's API surface, a hosting
  provider's behavior, an SEO/schema requirement) needs a handle — a file
  read or a resolving doc URL — **before** implementation. A claim with no
  handle is labeled "unverified" and gets verified before code depends on it.
- **Plan approval:** non-trivial change (new page section, structural
  redesign, dependency addition) → present the plan and get a one-line
  go/no-go from Jim. Small fix or copy tweak → proceed, and log your
  assumptions in the plan section of the PR body.

## 3. Implement
- Implement only what the plan names. Surgical changes.

## 4. Verify
- See `verification.md`. A page that loads is not verification. Hand off a
  test checklist; you do not declare anything fixed.
- **Ground every progress claim.** Before reporting progress, audit each claim
  against a tool result from this session. Only report work you can point to
  evidence for; if something is not yet verified, say so explicitly. Report
  outcomes faithfully: if a check fails, say so with the output; if a step was
  skipped, say that; when something is done and verified, state it plainly
  without hedging.

## 5. Commit + push + scope check
- After the run, `git status` must show **only** the files in the plan's
  scope. Anything else → **STOP, do not commit, surface it.**
- Commit locally on the feature branch, push, then open the PR —
  `git-workflow.md`. You do not merge.

## 6. Session end
- Update `STATUS.md` to verified reality; fold that edit into the branch's scope.
- If a decision was made this session, append it to `docs/DECISIONS.md` **and**
  add its one-liner to `docs/DECISIONS_INDEX.md` in the same commit (lockstep).
- If Jim corrected you, or a non-obvious approach was confirmed, add a
  `docs/LESSONS.md` entry.

## Subagent posture
- **Allowed:** read-only research subagents and fresh-context verifier
  subagents (they read, search, and run checks — they do not edit files).
- **Not allowed:** subagents or background processes that edit files, and
  standing auto-run orchestration.
- **ANY file edit outside the declared plan scope → STOP, do not commit, surface it.**
