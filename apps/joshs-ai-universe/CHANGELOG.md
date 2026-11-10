# Changelog

## 2026-11-10 — Supervised public-evidence cycle (ready for review)

- Established a baseline from commit 185185c: 25 unit/API tests, 14 browser tests, five responsive widths, no home accessibility violations.
- Created a supervised improvement branch and persistent scorecard/backlog instructions.
- Reviewed the existing public closetcabby-del/joshua.ai portfolio at immutable commit d70c684b6ae35263497cfe5eae43cf6c4fb966d0. The existing main/Pages site is not a deployment target for this application.
- Added five public-source records, three featured case studies, immutable source citations, and publicly listed contact/profile details. Self-reported work, prototypes, and artifact existence remain distinct.
- Deferred: broader matching/AI improvements until the user reviews this cycle. No deployment, merge, purchase, permission expansion, or live configuration change is authorized.

- Reproduced the supervisor-reported Clear bug using controlled deferred API responses. Two checks failed before the fix; the tab-switch control passed. Clear now cancels and invalidates pending work, resets all tool state, permits a fresh request, and prevents old completions from overwriting or stopping it.
- Fixed paid → AI substring matching; guarded unique evidence IDs and project routes.
- Our final checks: 31 unit/API tests, 24 browser tests, TypeScript, lint, and local production build passed. Existing video retained; HyperFrames lint passed, and playback passed on both browser profiles.
- Supervisor independently reported prior-ZIP npm install/tests/typecheck/build results; those are recorded separately in QUALITY_SCORECARD.md.
- No deployment, merge, purchase, permission expansion, or live configuration change. Next cycle requires user review.
