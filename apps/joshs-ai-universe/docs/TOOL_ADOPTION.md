# Selected agent tools

The selected tools support development of Josh's Jeff Electric portfolio. They do not establish that any external service is integrated with Jeff Electric. The application keeps its accepted charcoal and Manrope design, evidence labels, recruiter tools and manual video.

## Decisions

| Repository | What it provides | Application here |
| --- | --- | --- |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | HTML-based video authoring and rendering | Current approved cycle: retain v0.9.30 and the original intro; render a separate conceptual five-step film. See INTERACTIVE_SYSTEMS_CYCLE.md. |
| [googleworkspace/cli](https://github.com/googleworkspace/cli) | Workspace APIs, structured CLI output and agent skills | Useful for a future approved internal documents or Sheets workflow. Not installed or connected: the public portfolio needs no Workspace access. Existing connected tools remain the preferred access path when sufficient. The README says this is not an officially supported Google product. |
| [apify/apify-mcp-server](https://github.com/apify/apify-mcp-server) | Hosted or local MCP access to web-data Actors | Potential business research tool. Not connected, and no Actors were run. Authenticated access and Actor usage costs need a defined research task. |
| [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft) | Immersive, scroll-driven website design | Current approval supersedes the earlier deferral. The unchanged pinned flow engine now supports /explore, with teardown and static/reduced-motion fallbacks. MIT license retained. See scrollcraft/builds/jeff-systems/BRIEF.md. |
| [blader/humanizer](https://github.com/blader/humanizer) | Prose editing with claim preservation | Installed as `humanizer-blader`; applied to this guide in file mode. The existing hannsxpeter Humanizer is retained separately. No recruiter qualification or outcome was added. |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Engineering workflows and quality checks | Installed only `code-review-and-quality` and `security-and-hardening`, with their local references, shared review checklists and license. Applied to this candidate's review and dependency audit. |
| [expo/skills](https://github.com/expo/skills) | Expo, React Native and EAS guidance | Deferred until a native mobile product is requested. The portfolio remains Next.js. |
| [supabase/agent-skills](https://github.com/supabase/agent-skills) | Database, auth, storage and Postgres guidance | Deferred until the application needs persistent records or accounts. No database or Supabase project was created. |
| [stripe/ai](https://github.com/stripe/ai) | Stripe integration skills and current API guidance | Deferred: the portfolio has no payment flow. No Stripe account, checkout or payment credential is needed. The README deprecates several older agent packages; do not install those as a starting point. |
| [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) | Browser control through CLI commands and skills | Installed its skill and references. Use `npm run browser -- ...`, backed by the already locked Playwright dependency. No global installation or added npm dependency. |
| [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) | Claude-powered security review and PR comments | Reviewed, not activated. It requires an Anthropic credential and a GitHub workflow. No Claude scan is claimed and no workflow or PR-comment automation was added. The upstream README warns about prompt injection in untrusted PRs. |
| [every-app/open-seo](https://github.com/every-app/open-seo) | SEO research, rankings, backlinks and site audits through an app/MCP | Useful for a future Jeff Electric growth task. Not installed, hosted or connected. SEO data requires a DataForSEO key and usage charges. The draft portfolio keeps `noindex`. |

`TOOL_ADOPTION_MANIFEST.json` records immutable review commits, installed paths and licenses. These are project-local skill files; installation here does not register a global ChatGPT plugin or guarantee automatic discovery in another chat.

## Browser workflow

Build once, then run the regression suite:

```bash
npm ci --ignore-scripts
npm run build
npm run test:e2e
```

Browser tests start this checkout's production server on port 3100 and refuse an existing listener. Choose a different unused port when needed:

```bash
PLAYWRIGHT_PORT=3200 npm run test:e2e
```

The explicit port is restricted to an integer between 1024 and 65535. Development on port 3000 can continue independently. Do not point QA at an unrelated server to make a check pass.

For interactive investigation, start the same build in another terminal and open a named CLI session:

```bash
npm run start -- --port 3100
npm run browser -- -s=jeff-review open http://localhost:3100
npm run browser -- -s=jeff-review snapshot
npm run browser -- -s=jeff-review resize 390 844
npm run browser -- -s=jeff-review screenshot --filename=work/mobile-viewport.png
npm run browser -- -s=jeff-review close
```

Create `work/` before capturing files. `.playwright/cli.config.json` selects bundled headless Chromium. Install it once with `npx --no-install playwright install chromium` if absent. In restricted workspaces, set `PLAYWRIGHT_BROWSERS_PATH` and `XDG_CACHE_HOME` to writable locations. The browser skill documents keyboard controls, reduced motion, console/network inspection and tracing. The checked-in test suite remains the repeatable regression source; CLI exploration supplements it. Screenshots may capture entered data, so use public/demo inputs and keep traces and browser state out of commits.

## Review boundaries

The app has one public JSON POST route. Recruiter input and conversation history are untrusted; public evidence is allowlisted; optional model output is schema-validated and mapped back to approved records. The model receives no authority to write files, browse private business records or execute tools. Secrets belong in environment configuration. Existing production live-mode prerequisites remain unchanged.

This cycle adds developer guidance and fixes QA server isolation. It does not change the recruiter request state, candidate evidence, site visuals or video. External integrations need their own concrete business task, scoped access and verification before being described as working.

The Addy review covers correctness, readability, architecture, security and performance. Native dependency audit results and any limits belong in `TOOL_ADOPTION_REVIEW.md`. Reading an upstream security checklist is not equivalent to running the Claude service or certifying the application secure.
