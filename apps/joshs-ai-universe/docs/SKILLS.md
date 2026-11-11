# Skill provenance

Humanizer: https://github.com/hannsxpeter/humanizer (MIT, v1.3.1), installed project-locally at `.agents/skills/humanizer`. Read SKILL.md and the tell-pattern, restraint, and text-hygiene references. Applied generic voice mode, light review, with no invented personal voice. See `CONTENT-REVIEW.md` for the copy and meaning review.

HyperFrames: https://github.com/heygen-com/hyperframes, official release v0.9.30 (Apache-2.0). The required `npx hyperframes skills update` was attempted. It failed first on network proxy configuration, then because it chose unavailable home-directory destinations. The matching official release was cloned into the scratch directory and its core skills copied into `.agents/skills/` instead. Read `/hyperframes`, `/hyperframes-cli`, and `/hyperframes-registry`, plus composition, runtime, motion, launch, check, preview/render, browser, and review references. The application itself remains ordinary Next.js; HyperFrames is only used to author and render video.

The official `kinetic-center-build` registry component was searched, installed, and inspected. The final scenes use a simpler static-markup implementation for editable typography rather than its script-generated word elements. Its upstream component remains available for reference with its MIT license header.

Telemetry was disabled during rendering. No usage feedback or project files were published to a public feedback channel.

## Selected tool adoption

The screenshot-based tool review is in `TOOL_ADOPTION.md`, with immutable sources and licenses in `TOOL_ADOPTION_MANIFEST.json`. Added project-local skills: Addy's `code-review-and-quality` and `security-and-hardening`, Microsoft's `playwright-cli`, and `blader/humanizer` under the explicit alias `humanizer-blader`. The earlier hannsxpeter Humanizer and version-matched HyperFrames skills remain intact. No global plugin registration or external service connection is implied.
