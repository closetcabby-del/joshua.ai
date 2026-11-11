# Interactive product studio portfolio — November 11, 2026

## Source comparison and preservation

GitHub main was d70c684b6ae35263497cfe5eae43cf6c4fb966d0, the older static portfolio with two embedded standalone work samples. The current owner-private Sites source was 47d5a94f5c8cb6a3c221e39d8fcff9b181939470. The redesign uses the newer Sites app, retaining the portrait, original introduction, 25-second captioned HyperFrames film, Scrollcraft /explore guide, genuine website artifact, evidence records and recruiter API/tools. GitHub main, Pages and existing PR15 are preserved. The current request explicitly authorizes the three-project direction, commit and private publication.

## Visitor experience

The homepage now introduces Joshua Ly and his practical BA/product/AI approach beside a working miniature system explorer. Three gallery cases cover Jeff Electric, BuildBrief and Sprint & Backlog Planner. Each case includes problem, reported contribution, decisions, Business/Technical architecture, demonstration, evidence limits and learning. Six selected Jeff Electric tools appear as expandable entries; Pilates with Moni is a labeled self-reported selection in the AI Lab. Subjective complexity scores are omitted.

The reusable explorer has six components per project, directed animated edges, meaningful mode-dependent details, decision rationale, input/output and permission boundaries, keyboard arrow/Home/End navigation, zoom/reset, background panning, flow pause, static text and reduced-motion styling. Original prototypes open in isolated, removable iframe dialogs and standalone tabs. No new dependency, analytics service, account system or business integration was added.

## Original work-sample provenance

Both HTML files were extracted unchanged from the embedded work samples in GitHub main's index.html at d70c684. They contain no fetch calls or live external services. Use fictional inputs. Iframes have scripts/forms/downloads/modals but no same-origin privilege. Browser draft storage falls back to session-only state in an isolated iframe; standalone behavior depends on browser storage availability. Scoped response headers allow only the demos to be framed and deny external connections.

| File                         | SHA-256                                                          |
| ---------------------------- | ---------------------------------------------------------------- |
| public/demos/buildbrief.html | 7934ffd3a3d17ee36cddf4ae14a59b4f52f24da755450d453d4134d223cdf20c |
| public/demos/planner.html    | bd80c30d9eed4ea507a7e80d81719777a6c0951049103d829638d8d5cbae260e |

## Verification performed

- Baseline: 40 tests in five files passed. Final: 45 unit/API/static-render tests in six files passed, including directed-edge integrity, full readable boundary content and exact original prototype hashes.
- TypeScript and complete ESLint passed. Existing cancellation/rate-limit/source logic remains covered by the preserved unit/API tests.
- Managed Chrome preview: homepage and three case routes; Business/Technical view changes; every Jeff Electric node; planner End-key selection; zoom/reset; pause flow; selected project disclosures; prototype launch/close and focus return; standalone launch.
- BuildBrief: fictional problem, audience and outcome; two features; Must/Should priorities; suggested scope; workflow and acceptance checks; validation of incomplete stories; scope approval; generated implementation prompt with the entered requirements.
- Planner: isolated embedded sample starts empty; created and saved one fictional ticket into an example sprint; record and count visible in table and board; session-only storage notice confirmed.
- Browser zoom produced actual CSS widths of 1363, 909, 681 and 340 pixels. Home, all three cases, lab, evidence and tools were inspected at 340 without document overflow; narrow menu open, Escape/focus and selected-work navigation worked. This is desktop-browser CSS-width testing, not physical-device testing.
- Original prototype files are preserved. Some CUA exact-label selectors failed on the prototypes; DOM-backed IDs and visible controls verified actual operation. One iframe click required a screenshot-grounded coordinate; keyboard Enter subsequently saved and switched views successfully.
- Prepared browser regression selectors were updated for the new homepage and restored project routes. The full Playwright and automated axe suites were not executed in this managed-browser flow; no automated accessibility pass is claimed.
- Native npm audit reports 0 critical, 11 high, 15 moderate and 2 low findings in the unchanged dependency tree. Dependency remediation remains a separate task; no new dependencies were introduced.

## Release and evidence limits

The architecture is explanatory; no operational CRM, scheduling, model, social-media or messaging connection runs here. Internal Jeff Electric functionality and the seven newly selected projects remain self-reported unless a reviewed artifact establishes a narrower capability. No personal authorship, revenue, time saving or adoption metric is independently established. A genuine redacted internal-workflow trace remains the highest-value evidence improvement.

Automatic approval review rejected copying an unverified screenshot binary into public GitHub. The safer GitHub source snapshot excludes newly introduced binary images rather than exposing them. Existing private Sites assets remain preserved. Do not claim that public GitHub is a byte-identical media mirror of the private Site.
