# Selected tools review

## Scope and baseline

Base: `319753ad2325511bf4f6f8be423298bf0553f590`, the accepted Jeff Electric focus commit. Baseline evidence is the accepted 31 unit/API and 26 browser results; the earlier user's independent unit/type/lint/build results remain separately attributed. Those accepted checks were not rerun for delivery. The results below are a new post-change run of this tooling candidate.

Candidate location: `/workspace/work/tool-adoption/repository/apps/joshs-ai-universe`.
Local branch: `improvement/selected-agent-tools`. No remote branch or PR was written. PR #15 is unchanged.

The candidate adds four selected skill folders, shared review references, source/license provenance, a browser CLI script and configuration, and an isolated browser-test server. All changes are confined to this application. Public product behavior, candidate records, root portfolio, Pages workflow and dependency lockfile are unchanged.

## Actual verification

| Check | Result |
| --- | --- |
| Clean dependency installation | `npm ci --ignore-scripts` passed; no dependency lifecycle scripts were enabled. |
| Unit/API | 31 passed, 3 files. |
| TypeScript | `npm run typecheck` passed. |
| ESLint | `npm run lint` passed. |
| Production build | `npm run build` passed, including its TypeScript phase. |
| Browser suite | 26 passed, zero failed, 32.7 seconds: 13 desktop Chromium and 13 mobile Chromium checks. |
| Occupied-port refusal | `PLAYWRIGHT_PORT=3000 npm run test:e2e` exited 1 before running tests because the old local server occupied that port. It did not reuse the listener. |
| Invalid-port refusal | `PLAYWRIGHT_PORT=bad npm run test:e2e -- --list` exited 1 with the explicit integer/range message. |
| Playwright CLI | `npm run browser -- ...` opened the production app on port 3101 using `.playwright/cli.config.json`, executed inspection code and captured viewport PNGs. |
| Width inspection through CLI | Home, Jeff Electric case, and evidence pages at 320, 390, 768 and 1440 pixels: all 12 assertions passed without horizontal document overflow. |
| Viewport screenshots | Captured and visually inspected 1440×1000 desktop and 390×844 mobile PNGs after fonts loaded. |
| Skills provenance | Selected instructions copied from pinned commits with licenses. Humanizer's only instruction-file modification is its frontmatter name alias. |

The full browser suite retains controlled cancellation (Clear, late overlapping completion, pending tab switch), recruiter analysis/Q&A/interview preparation, unknown evidence and injected claims, empty/error inputs, keyboard/mobile navigation, axe scans, reduced motion, manual video playback and dismissal, the real website preview and all five legacy redirects. No provider-backed AI or physical-device result is claimed.

CLI's first launch could not create the default home cache. Setting `XDG_CACHE_HOME` to a writable project cache resolved it without permission changes. A temporary executable-path configuration was used for diagnosis, then the checked-in portable bundled-Chromium configuration succeeded. Restricted-cache guidance is included in the adoption guide. This was an environment setup correction, not an application regression.

## Five axis review

- Correctness: the local tests start a separate production server and fail on existing listeners. Ports are validated before constructing a shell command. The CLI uses the existing locked Playwright version, with working commands verified against its help and runtime.
- Readability: one browser script and a small configuration change; no application abstraction or shared request-state change.
- Architecture: skills and CLI configuration are developer resources. No skill text, service client or new dependency enters the app's UI or recruiter runtime.
- Security: reviewed request/input/output boundaries and dependency audit. The app's existing bounded input/schema checks, allowlisted evidence and generic errors remain intact. No new credential, external connection, authentication flow or data collection was added. The separate Claude service was not run.
- Performance: no new browser-delivered assets or application network calls. No performance gain or field measurement is claimed.

Humanizer file review covered the adoption guide's introduction and three sections; none were skipped. It retained all 12 repository decisions, setup commands and service limitations. No first-person biography or business outcome was invented. The prior Humanizer and HyperFrames remain available; no HyperFrames render was performed in this cycle.

## Dependency findings and limits

`npm audit --json` reported **9 affected package entries: 1 high and 8 moderate; zero critical**. These are pre-existing in the unchanged lockfile, not introduced dependencies. The count is affected packages, not the number of individual advisory records.

`npm explain undici` shows `hyperframes@0.9.30` directly pins development dependency `undici@7.25.0`. Its advisory list includes TLS handling, proxy routing, cache behavior, WebSocket and response handling issues. The HyperFrames CLI has an external-download path that imports Undici's `Agent` and `fetch`, so development-tool exposure cannot be dismissed. The application request route does not import HyperFrames or this dependency. No remote-media download or new render was run in this cycle. The other affected chain is ESLint's TypeScript tooling and minimatch; the known glob amplification issue needs crafted glob inputs in tooling.

Remediation is deferred to a separately reviewed dependency change because the current tool is pinned to match its skill release, and npm's proposed automatic fix changes the HyperFrames release. Do not run `npm audit fix --force`. Review by **2026-11-11 America/Chicago**, and before any new remote-asset HyperFrames task: identify a fixed compatible release, inspect its changelog and dependency graph, update its matching skills, then verify composition lint, rendering and playback. The audit is not clean and this candidate is not a production-security approval.

No live integration or deployment was attempted. The external-service choices in the guide are possible future tasks, not delivered Jeff Electric integrations. Pause after this candidate for Josh's review.
