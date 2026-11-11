# Original portfolio design reset — November 11, 2026

Josh rejected the prior systems-laboratory presentation as unclear, overengineered and ugly. He selected https://josh986.github.io/joshua-ly-portfolio/ as the design reference and approved resetting the presentation while retaining working functionality.

## Reference and scope

Reviewed Josh986/joshua-ly-portfolio through GitHub and its actual live browser rendering. The reference uses a centered portrait/name, navy hero, blue/cyan accents, network background, conventional navigation and readable white sections. The original public hero-bg.jpg is reused unchanged as public/portfolio-hero-bg.jpg; its Git blob SHA is 1d0052af23022cf9782a20f1e23be54bbaf4e2cd. The supplied current portrait remains unchanged; CSS frames it. The reference repository is read-only through the current connection and was not modified. Old resume statistics, employment claims and the simulated contact form were not imported.

Current canonical source was Sites commit fac6f8384507e162994e7d56ca3d527e9cddae21. Native get_site now reports the existing Site audience as public; preserve that current state and use the normal save/deploy workflow. Do not reuse the previous owner-private assumption or change sharing.

## Implemented experience

- Homepage: personal introduction, three genuine project previews, concise About, direct email and LinkedIn. No homepage system explorer, mode switch, demo modal or technical dashboard.
- Four navigation destinations: Projects, About, LinkedIn and Contact. Internal links remain native anchors; the mobile toggle retains Escape/focus handling and hydration readiness.
- Three project stories: plain project names, problem, contribution, approach, working artifact/demo and lesson. Architecture, scope notes and detailed media are optional native expanders. Existing URLs and the original HTML demo bytes remain unchanged.
- Actual previews: reviewed public Jeff Electric website snapshot; current BuildBrief standalone screen with the previously created fictional service-request example; empty standalone Sprint Planner board. The images show real interfaces, with captions distinguishing a fictional example and empty demonstration data. No customer, employee or private business records are included.
- Preserved /explore, /lab, /evidence, /tools, recruiter API/cancellation behavior, source records, both original videos/captions and project demo launches. No new dependency, integration, account flow, form backend or tracking was added.

## Verification and limits

Baseline and post-change unit/API/static-render runs each passed 45 tests in six files. TypeScript and ESLint passed. The final supported Worker build is part of packaging.

Managed Chrome preview verified homepage/project navigation, all three preview images loading, BuildBrief and planner launches, Escape closing/removing the iframe, optional architecture opening and measuring correctly, Business/Technical selection, component inspection and End-key navigation. At an actual 340 CSS-pixel width, home, all three cases, lab, evidence and tools fit without document overflow; mobile navigation opened, Escape restored focus, and Contact reached its anchor. These are desktop-browser CSS-width checks, not physical-device tests.

Prepared browser selectors were updated for the new homepage, simpler project names, navigation and optional screenshot walkthrough. The full Playwright and automated axe suites were not executed in this managed-browser flow. Native npm audit of the unchanged lockfile reports 0 critical, 11 high, 15 moderate and 2 low findings. No dependency remediation or new business-impact metric is claimed.

Prior source-snapshot media exclusions remain documented in GITHUB_SOURCE_SCOPE.md in the GitHub app. The current three new preview/background assets have been visually reviewed as public, non-sensitive material; include them only through the approved native repository workflow. Preserve GitHub main/Pages and PR15.
