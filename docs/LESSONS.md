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
