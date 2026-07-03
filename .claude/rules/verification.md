# Verification (Standing Rule)

## Two gates, never collapsed
1. **Self-verify** — the page loads cleanly with no console errors, HTML
   validates, links/anchors resolve, and any changed section renders as
   intended in at least one local check. Precondition to *commit*. NOT proof
   of correctness.
2. **Jim's browser verification** — precondition to *merge*. This closes a
   change, across the breakpoints and browsers that matter to him.

A clean HTML validation pass and no console errors are gate 1. They are never
gate 2.

## Source-dependency invariant (enforced on YOUR plans and YOUR status reports)

**Rule:** Every assertion of fact depends on an independently reproducible
source — a handle a third party could re-run or open to confirm it: a file
path+line, a command and its output, or a resolving URL. A named authority
("per the docs", "generally SEO best practice") is NOT a reproducible handle
on its own — cite the specific source (e.g. Google Search Central docs URL,
schema.org type page).

REQUIRE a handle before stating, for:
  (a) my own capabilities or tool availability
  (b) whether an action completed / a write landed / a branch merged
  (c) external facts — a hosting provider's behavior, a meta tag's actual
      effect, a schema.org property's validity
  (d) current external facts (e.g. "GitHub Pages supports X")

A claim with no reproducible source is not stated as fact. It is labeled
"inference" or "unverified" explicitly.

## A page that loads is not a page that works
Any change touching layout, styling, or interactivity is not complete on "it
loaded" alone. Check: responsive behavior at mobile/tablet/desktop widths,
keyboard navigation and focus states, alt text present on new images, no
layout shift from unset image dimensions.

Handoff for any UI change: (1) HTML validates, no console errors; (2) a
concise test checklist — what to open, what to resize/click/tab through,
expected visual result; (3) hand off. Do not declare it done.

## Do not self-drive a browser to verify
Jim is the browser-verification authority. Your deliverable is the checklist,
not a self-issued "looks good."

## Change closure
A change is done when Jim confirms it after testing — not before. Never write
"It's working now," "This should fix it," or "resolved." The closing
statement is a test checklist.

## The stop trigger
The feeling that the work is **done** is the moment to stop and hand off —
not a green light to push, merge, or close.

## SEO regression check (before any commit touching `<head>`, structured
data, or URLs)
- Title and meta description still present, unique, and within length
  (title ≤60 chars, description ≤160 chars).
- `canonical` link still correct.
- JSON-LD still valid (spot-check against
  https://validator.schema.org/ manually when the schema changed).
- `robots.txt` and `sitemap.xml` still consistent with any new/removed/renamed
  pages or anchors.
- No accidental `noindex` left over from local testing.
