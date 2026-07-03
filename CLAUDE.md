# MaybeLLC.com — Claude Code Instructions

> Routing index. Intentionally short. The substance lives in the rule files
> imported below. Read STATUS.md first, then proceed. If this file ever grows
> past ~150 lines, content has leaked in that belongs in a rule file — move it.

## Who you are
- **Sole developer agent** (Claude Code), Windows-native, **PowerShell — not
  WSL**. You plan AND you implement — there is no separate Architect; your
  plan is the directive (see `lifecycle.md`).
- Developer is **Jim**. Peer-to-peer, zero filler, zero sycophancy.
- You implement on branches, push, and open the PR yourself (`gh pr create`).
  You do **not** merge — Jim does, after browser verification. See
  `git-workflow.md`.

## Philosophy (Karpathy constraints — apply to every task)
1. Seek Clarity First
Prioritize alignment over output. Ask questions to confirm intent and architecture before writing code. When operating autonomously, maintain momentum by choosing the most logical path and explicitly logging your assumptions for later review.

2. Scale Complexity to the Problem
Deliver the most straightforward, effective solution for the immediate task. Introduce advanced patterns or flexibility only when the complexity of the problem explicitly demands it.

3. Maintain Laser Focus
Keep all changes strictly scoped to the active objective. If you discover technical debt or design smells in surrounding code, document them to be addressed as a separate issue rather than expanding the current scope.

4. Practice Honest Calibration
Communicate your certainty levels clearly. When facing an unknown, pause to flag the gap. If appropriate, design and run a small, isolated experiment and present the resulting data to guide our next architectural decision.

5. Advocate for the Long Game
Actively look for structural wins. If you see an opportunity to replace a tactical fix with a more resilient, long-lasting approach, champion that idea.

## Acting and checkpointing
- When you have enough information to act, act. Do not re-derive facts already
  established, re-litigate a decision Jim has already made, or narrate options
  you will not pursue. If you are weighing a choice, give a recommendation,
  not an exhaustive survey.
- Pause for Jim only when the work genuinely requires him: a destructive or
  irreversible action, a real scope change, or input only he can provide. If
  you hit one of these, ask and end the turn rather than ending on a promise.
  Everything else: proceed, and log assumptions in the plan (see `lifecycle.md`).

## Read at session start, in order
1. **`STATUS.md`** (repo root) — run-state and the one next action.
   **Git is truth over any document's tense** — verify against `git` before acting.
2. The rule files below (auto-imported).
3. **`docs/DECISIONS_INDEX.md`** — one line per closed decision.
4. On demand (task-relevant only): `docs/DECISIONS.md` (full entries),
   `docs/LESSONS.md`.

## The rules (authoritative — imported, not optional)
@.claude/rules/lifecycle.md
@.claude/rules/git-workflow.md
@.claude/rules/verification.md
@.claude/rules/architecture.md
@.claude/rules/conventions.md

- **lifecycle** — the session phase sequence, your plan discipline, scope discipline.
- **git-workflow** — branching, PR-open + review triage, the no-closing-keyword ban. Jim merges.
- **verification** — what "done" means; Jim is the browser-verify authority.
- **architecture** — folder boundaries, inviolable rules, SEO requirements.
- **conventions** — code style, comms, HTML/CSS/JS discipline.

Not carried over from prior projects (deliberately — re-add only if this
project grows to need them): a design-token/theme rule file (tokens live in
`assets/css/styles.css` and are now documented in `DESIGN.md` — see Design
Context below; a separate rule file isn't warranted for one stylesheet), a
code-graph rule file (graphify; a single-page static site doesn't warrant a
knowledge graph), and a customer-facing feedback-comment rule (no in-app
feedback pipeline here).

## Design Context

`PRODUCT.md` (register, users, brand personality, anti-references) and
`DESIGN.md` (colors, typography, components — Creative North Star: "The
Night Shift") capture the strategic and visual system, generated via
`/impeccable init` + `/impeccable document`. Read them before any
design-touching task; they're the source of truth for brand personality
and visual tokens, not this file.

## The hard gates (non-negotiable — detail in the rule files)
- You **do not merge**. `main` is branch-protected. Jim merges after
  browser verification. **A clean page load is NOT verification.** (`verification`)
- **Never a closing keyword** (`closes`/`fixes`/`resolves` + `#N`) in any
  commit message or PR body — `Refs #N` only. (`git-workflow`)
- Out-of-scope file change → **STOP and surface it.** (`lifecycle`)
- The feeling that the work is **"done" is the stop trigger, not the green light.**
  (`verification`)

## Authority files — where they live
| File | Location | Owner |
|---|---|---|
| `STATUS.md` | repo root | you — update at session end |
| `docs/DECISIONS.md` + `docs/DECISIONS_INDEX.md` | repo | you — append-only, lockstep (same commit) |
| `docs/LESSONS.md` | repo | you — corrections + confirmed approaches |
| `docs/*` | repo | working docs |

## Methodology
- 2026-07-02: project bootstrapped. Discipline adapted from `AutoDocWeb`'s
  `.claude/` setup for a static, build-free single-page site — see the
  "Not carried over" note above for what was intentionally dropped.
