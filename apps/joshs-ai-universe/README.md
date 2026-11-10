# Josh’s AI universe

An interactive recruiter portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Zod, and an optional server-side OpenAI integration. Includes an editable evidence library, three recruiter tools, case studies, and an actual HyperFrames intro video.

## Run the website

Requires Node.js 22+.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. No account or API key is needed for the demonstration. For a production build, use `npm run build` followed by `npm start`.

## What works without external accounts

- Responsive homepage with a recruiter workspace, keyboard-accessible tabs, mobile navigation, project gallery, and profile.
- Job-description topic extraction, explicit missing-evidence results, and relevant interview prompts.
- A question interface that returns matching approved records and states when nothing supports an answer.
- Case studies and evidence explanations with separate prototype and conceptual labels.
- A manually played 15-second intro with an optimized MP4, static poster, and text captions. No automatic playback, including for reduced-motion users.

Demo mode is deterministic keyword matching and question selection, not live generative AI. It is labeled throughout. It should not be interpreted as a complete job-fit assessment.

## Candidate content

Edit `content/candidate.json`, then rebuild. This is a code-reviewed content workflow, not a browser admin console. All information in this file is intended to be public: do not add private workplace or client materials.

The reviewed public `closetcabby-del/joshua.ai` portfolio supplies Joshua Ly’s name, public contact address, self-reported practice, and three featured project descriptions. Records cite immutable source commit d70c684b6ae35263497cfe5eae43cf6c4fb966d0. Prototypes and reported contributions remain explicitly qualified. Formal employment chronology, credentials, a résumé, and independent authorship evidence are still missing. Original conceptual templates remain unfeatured. This application is separate from that existing main/Pages site.

To add an approved candidate record, use this shape (replace the example with actual authorized evidence):

```json
{
  "id": "public-workflow-artifact",
  "title": "Title of a supported contribution",
  "claim": "An exact, limited claim supported by the source.",
  "status": "Reported but not independently verified",
  "approved": false,
  "tags": ["workflow", "automation"],
  "sources": [
    { "label": "Public source", "url": "https://example.org/real-artifact" }
  ]
}
```

Set `approved: true` only after reviewing the wording, public source, confidentiality, and attribution. `Verified` requires at least one source. Source existence and authority require human review: the schema checks the shape, not whether an external claim is true. Use all five labels accurately: Verified; Reported but not independently verified; Prototype; Conceptual; Not established. Add actual employment history under `experience`; use `email`, `resumeUrl`, and `githubUrl` when available. Link only HTTPS URLs or internal paths.

## Optional live AI

1. Add approved candidate records with sources.
2. Set `OPENAI_API_KEY`, `OPENAI_MODEL` (default `gpt-5-mini`), and `ENABLE_LIVE_AI=true` server-side.
3. Set `APP_ORIGIN` to the exact website origin (no trailing slash).
4. For production, configure `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and a long random `RATE_LIMIT_SECRET`. The app refuses to enable production live AI without these controls.

The model selects evidence IDs through Responses API structured output. The server rejects unknown IDs and copies factual claims and status labels from approved records. It never asks the model to invent biographical prose or numerical match scores. Relevant interview questions are selected locally. Prototype evidence remains prototype evidence. Transferability and partial matches are review tasks for the recruiter, not claims of established qualifications.

This deliberately constrained implementation prioritizes auditable claims over open-ended generation. It does not browse, execute tools, ingest arbitrary websites, or perform semantic scoring. Live selection has not been exercised against a real provider in this environment because no API key was available.

## Privacy, cost, and abuse controls

Recruiter text stays in page memory and the request; the app has no conversation database, analytics, local storage, or request-body logging. Demo mode never calls OpenAI. Live requests send the input and up to six recent messages to OpenAI with `store: false`; platform and provider logs/retention follow their policies. See `/evidence#privacy`.

Requests are limited to 8 per 10 minutes per hashed network identifier, 8,000 input characters, 40 KB streamed body, and six history entries. Remote limiter failures stop inference. OpenAI requests have a 20-second timeout, no retries, and a maximum of 1,800 output tokens. Set provider project spending limits separately to bound total spend across clients. On Vercel the limiter uses Vercel’s trusted forwarded IP header; elsewhere configure a trusted proxy that replaces `x-real-ip` (do not allow direct untrusted clients to set it). The in-memory development/demo limiter is process-local and not a global production quota.

Origin checking, Zod validation, escaped React text, restricted link schemes, security response headers, untrusted-data separation, fixed evidence status, and no model-generated candidate claims reduce the prompt-injection surface. User text can still influence which real approved records the model selects; relevance always needs review. Do not treat output as an automatic hiring decision.

## Validate

```bash
npm run typecheck
npm run lint
npm test
npx playwright install chromium
npm run build
npm run test:e2e
```

Playwright launches the production server on port 3000 when one is not running. Stop any development server before production E2E validation. The suite covers desktop and mobile recruiter flows, evidence gaps, prompt injection, keyboard controls, reduced motion, video playback, and automated WCAG checks. See `docs/VALIDATION.md` for actual results and limits.

## Motion source and render

`motion/` contains an official HyperFrames 0.9.30 project, six editable HTML scenes, local GSAP, and local Inter fonts. `public/intro.mp4` is the web encode; the full-resolution delivery MP4 is included in the delivery outputs. FFmpeg and Chrome are needed only to re-render, not to run the website.

```bash
npx hyperframes check --dir motion --json
npx hyperframes preview --dir motion --background
npx hyperframes render --dir motion --quality delivery -o intro-master.mp4
ffmpeg -i intro-master.mp4 -vf scale=1280:720 -c:v libx264 -crf 25 -preset slow -pix_fmt yuv420p -movflags +faststart -an public/intro.mp4
```

Restricted environments can set `HYPERFRAMES_CACHE_DIR`, `npm_config_cache`, and `PLAYWRIGHT_BROWSERS_PATH` to writable directories. Network proxies may need `NODE_USE_ENV_PROXY=1`. Do not change the CLI version without reviewing its matching skills. See `motion/REVIEW.md` and `docs/SKILLS.md`.

## Deployment

The project is ready to import into Vercel as a Next.js application. `vercel.json` pins the build and API duration. Keep demonstration mode on until candidate content and configuration have been reviewed. Add the environment values in Vercel’s project settings and rebuild. Review external logging, per-project budget limits, the live evidence selection, and the site’s privacy language before public launch.

The connected Vercel account returned HTTP 403 for its configured team; team authorization is required before inspecting a deployment target. No public deployment or public URL was created. The delivery includes a local Git history and a source archive. Search indexing is intentionally disabled in `app/layout.tsx` until the profile is ready. Remove that robots restriction as part of an approved public launch.

## Supervised improvement review

Read `AGENTS.md`, `QUALITY_SCORECARD.md`, `IMPROVEMENT_BACKLOG.md`, and `CHANGELOG.md` before changing this application. Complete one verified cycle and pause for user review. Do not deploy, merge, expand permissions, purchase services, or alter live configuration. The review branch adds this app under `apps/joshs-ai-universe`; existing root Pages files and workflows are preserved. No production release is implied by the draft PR.
