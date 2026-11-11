# Support verification and private candidate

## Source provenance

Restored Sites base `96b51ea32aa6c65f4fb5fbb28d3f57ca591b9328` through the supported source-opening workflow. The implementation agent supplied the exact UTF-8 delta to `c3d146409745f2e045fd130369dd7aa461751857` through the existing delivery Page. Verified patch SHA-256: `b451868b0dc6d0871d54406a647c54c08eb7fa616903ef8474b0082b5c30801e`; 108919 bytes; no binary changes. Applied cleanly to the stated base. Local support branch: `improvement/finish-support`.

The transferred candidate adds the real website artifact inspection, transcript, direct case contact and evidence/acceptance documents. Support changes fix a short-viewport navigation defect and apply the existing anchor offset to the new walkthrough. API, workspace cancellation logic, five evidence records and existing media bytes are unchanged from the base.

## Actual checks in this executor

- Baseline: 31 unit/API tests passed. Candidate: 31 unit/API tests passed. Full lint, TypeScript and Worker build passed; logs are in `verification/support/`.
- Managed Chrome rendered the four main routes. Each route also reloaded with one main h1. Browser results are in `verification/support/browser-results.json`.
- All four routes fit five actual CSS viewport widths: 1363, 1239, 1090, 779 and 340 pixels. Client width equaled scroll width in all 20 checks. Widths used ordinary browser zoom, not device emulation or physical phones. These are not the prepared suite's exact 320/390/768/1024/1440 widths.
- Home → case → website source record → back → home → optional tools worked. Five source records remain. Existing old-slug bookmarks reached the Jeff Electric case, and two unknown routes rendered the missing-page experience. HTTP status codes were not independently measured.
- Empty tool input was blocked by browser required validation. Example analysis, unknown-qualification refusal, Clear reset, keyboard tab selection and interview preparation worked.
- Existing video loaded at 1280 pixels and played after manual activation. No autoplay. English caption track and both transcript disclosures are present. Escape closed the dialog, removed the video, and returned focus to its trigger.
- At a 340 × 234 CSS viewport, Escape closed the menu and restored toggle focus. A discovered menu overflow was fixed with bounded height and internal scrolling; the last contact link was reached by native scroll/click, closed the menu and navigated to #contact. Contact hrefs were inspected without sending mail.
- No application-origin errors appeared in the final sampled browser log. Extension-origin messages were excluded.

## Limits that remain open

The prepared browser suite was not executed by a separate browser runner. Its controlled network interception and late-completion race scenarios are retained, but are not supported by the permitted browser interface used here. The added short-viewport regression is prepared, not an executed result. Manual checks are not a claim that all automated cases passed.

No new automated axe scan, screen-reader review, reduced-motion preference-emulation, physical-device or WebKit result is claimed. Existing reduced-motion rules were preserved. A shell HTTP integration attempt could not connect to the managed preview's browser-side loopback; it was not retried through a network bypass.

The unchanged dependency lockfile retains the candidate audit totals: 0 critical, 11 high, 15 moderate and 2 low affected entries. Existing scoped deferrals remain in SITES_MIGRATION.md; public launch requires further review. No clean audit or new dependency remediation is claimed.

## Acceptance and publication scope

Gate A is verified by current manual rendering. Gate B remains blocked on a genuine implementation trace; the recovered release notes narrow the request in EVIDENCE_RESEARCH.md. Gate C is partial: current manual/browser-width/media checks passed, but full controlled browser and automated accessibility verification remain open. The source and private publishing capabilities are available here, resolving the implementation agent's packaging blocker. The supported workflow records the final exact pushed commit/archive and native private deployment result; it does not make the project publicly launch-ready.

Keep the existing owner-only audience and disabled live AI. GitHub main/Pages/PR #15 are unchanged. Roll back to the prior saved Sites version `appgprj_6af3c5e9f9ac8191997bb19195d898d0~appgver_e97f9a9c5c3881918948d6452f7cdc34` if needed. No schema, customer-data or external integration mutations are involved.
