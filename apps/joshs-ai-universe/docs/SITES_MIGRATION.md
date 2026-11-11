# Sites hosting adaptation

Source: tested local candidate `1dd6834abc8fabe05c52a00c591efee2e2262957`, received through the existing delivery page. Bundle SHA-256: `3293377388c13cafe2878e037c50a020f82664d827242664e64493fa1ba4becc`.

Josh asked the implementation chat to deploy, selected Sites for compatibility assessment, and accepted an isolated Sites adaptation. The supervising chat took over because the implementation executor lacks publishing helpers and preview infrastructure. This is a separate owner-private Site, not a replacement of GitHub main, Pages, or PR #15.

## Approach

Retain the App Router source, content, local fonts, images, video/captions, redirects, evidence boundaries, recruiter API and cancellation behavior. Add the supported Sites Vinext/Cloudflare build integration, Worker entry, source identity, and pinned framework dependencies from the supplied starter. Existing app package versions are retained where possible. Unused starter UI and database examples are excluded. No connectors, database, external service, live AI key, new video render, or public audience is enabled.

A fresh starter bootstrap initially rejected the modified dependency manifest. The exact starter inputs were restored for supported bootstrap; after it completed, the application dependency manifest was restored. The helper selected its documented npm fallback because the image-pinned pnpm was unavailable. Subsequent application dependency installation disables lifecycle scripts. No package-manager or network restrictions were bypassed.

## Validation

Current adaptation checks passed: 31 unit/API tests, TypeScript, and a production Worker build. The browser rendered the full Jeff Electric homepage and successfully submitted the job-description example, returning only Jeff Electric evidence. Browser control then timed out during further inspection, including an Emulation.setFocusEmulationEnabled timeout; the preview was stopped. The full 26-check browser baseline was not rerun on Sites. No physical-device or live-provider test is claimed. App, components, content, public assets, recruiter logic, API, and rate-limit source were byte-compared to the candidate and remain unchanged. Worker and browser types are imported separately to avoid changing global Response.json typing. Logs are in docs/verification/sites/. Original candidate results (31 unit/API and 26 browser checks) are historical baseline evidence and do not prove Sites compatibility. Live provider behavior remains unverified and disabled.

## Dependency triage

The first audit of the supplied starter reported 2 critical package entries. Updated Next.js to 16.4.6 and aligned React, React DOM and react-server-dom-webpack at patched 19.2.9 (GHSA-xqc2-xf4c-x3h3; GHSA-2464-fhr4-w9xw). Rebuilt and reran unit/type checks afterward. The final lockfile audit reports 0 critical, 11 high, 15 moderate and 2 low entries; no clean audit is claimed.

High entries are triaged for this owner-private deployment: brace-expansion, browserslist, js-yaml and source-map-js are build/lint parsing paths receiving repository-owned inputs; Vite/editor and Miniflare/ws/Sharp/Undici are local build/preview paths. HyperFrames/Undici remains a separate development renderer, unused in this task and not part of the app request path. Vinext's image-size is used by metadata-route build analysis; the app has no dynamic metadata image or ImageResponse route and its single image is a committed, unoptimized JPEG. No user image upload or arbitrary-image feature is enabled. These deferrals are specific to this private, fixed-content app and require review before public release, a new renderer task, image processing or framework upgrades. Review date: 2026-11-11 America/Chicago.

No pricing or permanent-free-hosting guarantee is claimed. Source publication uses the native Sites helper and exact pushed commit/archive.
