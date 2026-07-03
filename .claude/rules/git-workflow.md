# Git Workflow (Standing Rule)

## Push it yourself; never merge.
You push the finished branch and open the PR yourself (`gh pr create`). You
still **cannot merge**: `main` is branch-protected on GitHub (PR required),
and merge is Jim's after browser verification. Never push to or merge `main`
directly.

## HARD GATE — no closing keywords
**Never a closing keyword** — `close`/`closes`/`closed`/`fix`/`fixes`/`fixed`/
`resolve`/`resolves`/`resolved` followed by `#N` — **in any commit message or
PR body.** Use `Refs #N` / `Part of #N` only. `Closes` is reserved for a final
pass Jim explicitly authorizes. Reason: GitHub auto-closes the referenced
issue on merge whenever the keyword appears in a PR body OR any commit
message, and attributes the closure to whoever merges — that is never your
call to make.

## The flow
1. **Branch** off `main`: `git checkout main; git pull --ff-only;
   git checkout -b feat/<slug>` (or `fix/`, `refactor/`, `chore/`, `content/`
   for copy-only changes).
2. **Code** in scope only.
3. **Self-verify** — see `verification.md`. This is a precondition to commit.
   It is **not** verification of correctness.
4. **Commit locally** with a conventional prefix (`feat:`/`fix:`/`refactor:`/
   `chore:`/`docs:`/`content:`). Group commits logically. `Refs #N`, never a
   closing keyword.
5. **Push + open the PR.** `git push -u origin <branch>`, then `gh pr create`
   with a concise body: summary, plan/assumptions, and Jim's test checklist
   (what to open, what to click, expected result for each).
6. **Triage review feedback.** If CodeRabbit or another bot reviews the PR,
   read both the summary and inline comments (`gh pr view` / `gh api`).
   Treat bot review as advisory only — accept what's valid with a fix-pass on
   the same branch and re-push; decline with a stated reason on the thread.
   Never use an autofix/commit-suggestion button blindly.

## Who does what after you push
- **You** push, open the PR, and triage review feedback (fix-pass on the same
  branch, re-push).
- **Jim** browser-verifies against your test checklist, then merges the PR.
  Merge and issue-closure are his.

## Pre-flight (before branching)
`git fetch origin`, confirm current branch is `main`, working tree clean, and
`main` matches `origin/main`. If `STATUS.md` disagrees with git, **git is
truth** — correct `STATUS.md` first.
