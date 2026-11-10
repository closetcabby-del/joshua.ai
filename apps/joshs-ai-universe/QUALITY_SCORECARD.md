# Quality scorecard — supervised cycle 1

Scores are reviewer judgments from 1–10, not measured hiring/business outcomes. Baseline: local commit `185185c`. No human 20-second or 60-second usability study was performed.

| Area                       | Before | After | Evidence and limit                                                                                                                                                                        |
| -------------------------- | -----: | ----: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First impression / design  |      7 |     7 | User-selected Manrope/charcoal design preserved; no visual rebranding.                                                                                                                    |
| Recruiter clarity          |      5 |     7 | Joshua Ly, public contact, public project descriptions, and explicit source labels replace placeholders.                                                                                  |
| Job-description usefulness |      3 |     5 | Same example: source links 0 → 6; gaps are still heuristic and not a complete requirement-level comparison.                                                                               |
| Evidence-aware Q&A         |      3 |     6 | Five reviewed records; unknown qualifications still produce an explicit gap. Self-reports remain qualified.                                                                               |
| Interview questions        |      5 |     5 | Existing local role-topic library preserved. Live generative questions are deferred.                                                                                                      |
| Navigation / interactions  |      8 |     8 | Keyboard tabs and mobile navigation pass.                                                                                                                                                 |
| Mobile responsiveness      |      8 |     8 | No overflow at 320, 390, 768, 1024, or 1440 pixels.                                                                                                                                       |
| Accessibility              |      8 |     8 | Automated home/evidence WCAG scans pass on both profiles. Manual assistive-technology audit not performed.                                                                                |
| Performance                |      7 |     7 | Local baseline DOMContentLoaded 27–39 ms and TTFB 8–14 ms. Content-cycle observations 30–155 ms and 12–124 ms include a cold first request; no field-performance improvement is claimed.  |
| Security / reliability     |      7 |     8 | Clear race reproduced and fixed; late completions fenced; unique evidence IDs/routes enforced; whole-word matching regression covered.                                                    |
| Candidate evidence         |      2 |     6 | 0 → 5 reviewed records and three featured public-source projects. Only artifact existence is Verified; personal contributions and professional history are not independently established. |

## Our actual tests

| Check                                      | Baseline                                                 | Final cycle                                                                                    |
| ------------------------------------------ | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Unit/API tests                             | 25 passed / 3 files                                      | 31 passed / 3 files                                                                            |
| Desktop/mobile browser tests               | 14 passed                                                | 24 passed                                                                                      |
| Clear delayed-response reproduction        | Not in baseline suite                                    | Before fix: 2 failures, tab-switch control passed. After fix: 3 scenarios × 2 profiles passed. |
| TypeScript / lint / local production build | Previously passing, baseline unit/browser rerun recorded | Passed                                                                                         |
| Automated accessibility                    | Zero home violations in recorded inspection              | Home/evidence checks passed on desktop/mobile                                                  |
| HyperFrames                                | Existing validated video retained                        | Composition lint: 0 errors/warnings; 15-second MP4 playback passed on both profiles            |

Test evidence and screenshots: `docs/verification/baseline/` and `docs/verification/cycle-1/`. Local timings are observations, not field benchmarks. The initial new input-error test had an ambiguous label selector; it was corrected. Later alert checks were scoped to the workspace to exclude Next.js’s route announcer. These were test-harness defects, separate from the reproduced Clear application bug.

## Independent supervisor report — separate evidence

The supervisor reported independently running `npm ci`, the prior clean-app ZIP’s 25 unit/API tests, TypeScript, and production build successfully, and confirming included Humanizer/HyperFrames provenance. The supervisor reported that their browser runner could not launch because `socket()` was restricted. Those are supervisor-reported checks of the earlier ZIP, not our post-cycle results or independent verification of this new revision.

## Review gate and next improvement

Stop after this cycle. Highest-impact remaining defect: keyword matching does not reliably distinguish directly supported requirements, transferable experience, partial evidence, and absent qualifications. Proposed next cycle: implement explicit relationship labels and requirement coverage, preserve evidence status, and add positive/negative role-matching tests. Await supervisor review before implementation.
