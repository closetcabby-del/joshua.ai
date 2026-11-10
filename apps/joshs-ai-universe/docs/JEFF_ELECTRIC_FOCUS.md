# Jeff Electric focus — 2026-11-10

## Objective and authorized scope

Josh selected Jeff Electric as his only portfolio story. The application should explain how he uses AI to create solutions for a business, rather than lead with a catalogue of tools. Keep the existing Manrope design, recruiter tools, request cancellation, input/privacy controls, and manual/captioned intro video.

## Acceptance criteria

- Jeff Electric is the only featured project, case study, and candidate-evidence context.
- The homepage leads with the business and makes four capabilities concrete: problem framing, AI direction, solution building, and human decision boundaries.
- A real public website artifact supports the story. Its preview is labeled as the reviewed source snapshot, not a fresh production capture.
- All candidate records link to Jeff Electric source material. Self-reports, prototypes, and verified artifact existence retain their distinct labels; no new employment facts, performance metrics, or completed integrations are invented.
- The five retired project routes redirect to the Jeff Electric case study. Unknown routes still return 404.
- Existing recruiter tools, cancellation, accessibility, mobile navigation, and video playback remain subject to regression checks.

## Evidence and implementation

Content is limited to Josh's current direction and the Jeff Electric case study in the existing public portfolio at `d70c684b6ae35263497cfe5eae43cf6c4fb966d0`. The website preview is copied byte-for-byte from that commit's `assets/jeff-electric-live-preview.jpg`. No private customer records or business credentials are used.

The five active records all point to `service-business-workflows`. Unrelated BuildBrief, planner, recruiter-workspace, and conceptual showcases are removed from the active catalog. Their old URLs use explicit redirects. The standalone public portfolio at the repository root remains unchanged.

The new story component renders on the server, uses static capability data with stable keys, explicit image dimensions and local CSS modules, and adds no client effects or network dependencies. Existing request-state machinery is unchanged. The React review found no new hooks, waterfalls, or mutable server-request state.

## Verification status

31 unit/API tests, TypeScript, ESLint, and the production build passed after the content/routing changes. Browser readiness was attempted in the review environment; Chromium still cannot launch under the current socket restrictions. A separate isolated QA checkout of commit `319753ad2325511bf4f6f8be423298bf0553f590` then passed all 26 desktop/mobile Chromium checks in 32.0 seconds. Supplemental inspection found no overflow in 12 page/width combinations (three pages at 320, 390, 768, and 1440 pixels); all five redirects returned 308, the unknown route returned 404, and the website image loaded with the source-matching blob SHA. Current viewport screenshots, the actual browser log, and the read-only QA report are in `docs/verification/jeff-electric-focus/`. The QA checkout remained clean. Older cycle-1 screenshots are historical and do not depict this new layout.

Live AI and deployment remain unconfigured; this is a draft source change, not a release. The existing process-introduction video is retained, so no new HyperFrames render is claimed.
