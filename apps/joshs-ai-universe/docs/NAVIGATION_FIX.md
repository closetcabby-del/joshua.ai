# Production navigation repair — 2026-11-11

Base: 6fe57dc28028bc4ee894182a1db3b88912110a84. Branch: improvement/reliable-navigation.

## Reproduction

The published owner-private Site rendered correctly and the video button opened its dialog. Clicking “Read the Jeff Electric case study” left the URL and homepage unchanged. The deployed link-BuYIV1eT.js chunk logged `TypeError: e is not a function` during startTransition and `[vinext] RSC prefetch setup error: TypeError: f is not a function`. Earlier development-preview checks did not expose this production failure.

## Repair

Use native anchors for all portfolio document and section navigation, retaining each href, accessible label, class, icon and menu-close handler. This bypasses the broken client Link navigation and prefetch path without a framework upgrade. Document changes now load through the browser, including history, fragment navigation and opening links in new tabs. The recruiter workspace remains interactive within /tools; its request/cancellation code and API are unchanged. Disable only the Next-specific anchor recommendation for application/component TSX, with an explicit production-compatibility comment. No dependency, audience, live AI, data or source-claim changes.

## Verification

Baseline and final: 31 unit/API tests pass. TypeScript, full ESLint and production build pass. Existing browser case/source journey already exercises the failing action and destination; this repair does not add implementation-mirroring unit tests. Full automated browser suite was not run: managed preview reported a competing Vinext process while its status was stopped. Final checks will use the published production Site itself, not development behavior. Browser results are reported separately after publication.

Review: native links preserve semantic keyboard access and the same reviewed destinations; no input, authentication or external data flow is added. Tradeoff: cross-page navigation performs a full document load. The existing owner-private previous saved version is the rollback point. Full accessibility/cancellation suite and genuine internal-workflow evidence remain open as previously documented.
