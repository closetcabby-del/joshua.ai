# Floating portfolio treatment — 2026-11-11

Josh requested an advanced motion/foreground treatment that feels suspended in air. The exact seven-project selection and existing native navigation are retained. Source base: 82316e767b1564dd88992e27dc6feb8feb60121a. GitHub review remains isolated under apps/joshs-ai-universe in PR 16; main/Pages and private business applications are not changed.

## Implementation

A detached navy glass navigation island, layered orbital lines and three decorative process tiles frame the portrait. Project cards use soft contact shadows, translucent surfaces and bounded pointer perspective (maximum 2.5 degrees per axis). About/contact sit on elevated surfaces. Native links remain ordinary links; the process tiles are noninteractive decoration hidden from assistive technology.

`components/air-motion.tsx` progressively enhances the homepage. Text is immediately readable; cards below the fold reveal once as they enter. Keyboard focus also makes a pending card visible. The pause toggle disables animations, transitions, pointer effects and pending reveals; the OS reduced-motion preference suppresses them automatically. Hover tilt is limited to fine mouse pointers. Hero animation pauses when offscreen or the document is hidden. Animation frames, observers, listeners and inline properties are cleaned up on pause, preference change or unmount. No new package, rendering engine, asset request, input collection or service integration is added. Existing videos and APIs are retained.

## Verification and limits

- Unit/API/static-render suite: 49 tests, including two tilt-boundary tests. A deliberate broken clamp made both new tests fail; the correct implementation was restored.
- TypeScript and full lint pass; the production Worker build is run during packaging.
- Managed Chrome: pause/resume switched the animation name to none and revealed every pending card; resuming restored ambient motion. Hero animation was observed paused after navigating to About.
- Native mouse movement produced a bounded matrix3d card tilt and moving light coordinates; leaving removed the inline values. All seven cases and return links worked at 1363 and 340 CSS pixels. No horizontal overflow was observed on those pages. Homepage also fit at 681 CSS pixels. Narrow sizes use browser zoom, not a physical device.
- The 340x234 CSS menu ended at y=219, remained scrollable, collapsed on navigation and restored toggle focus on Escape. A displaced-header defect found in initial QA was fixed by using fixed positioning and rechecked at desktop/narrow sizes.
- Prepared Playwright pause/reduced-motion/no-JavaScript tests are included. The full controlled browser suite, automated WCAG audit and actual OS reduced-motion emulation were not run. Chrome policy blocked DevTools emulation; it was dismissed without changing policy. Reduced-motion CSS and the media-query listener were reviewed. No physical-phone, Lighthouse or field-performance result is claimed.

## Existing dependency audit

The unchanged lockfile audit still reports 0 critical, 11 high, 15 moderate and 2 low affected package entries. There is no new dependency or clean-audit claim. Rechecked npm dependency ancestry and prior source triage in docs/FINAL_ACCEPTANCE.md: build/lint parsing includes brace-expansion/browserslist/js-yaml/source-map-js; Vite/editor and Miniflare/Sharp/Undici/ws are tool paths. Vinext inherits image-size/@vercel/og concerns. This fixed-content app has no upload, ImageResponse or arbitrary remote-image feature, and this change does not add one. OpenAI's optional live transport is not configured. These observations bound this presentation change; they do not establish exploitability or a complete security audit. Framework/toolchain upgrades remain deferred to a separately tested hosting change; review by 2026-11-18, and before introducing new image/renderer/network inputs. No forced remediation was applied.

The next design review should judge the motion in the live browser; a screenshot documents appearance but cannot demonstrate animation. Keep the seven-project scope and readable static fallback when revising effects.
