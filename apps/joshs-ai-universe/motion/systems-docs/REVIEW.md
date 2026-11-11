# Render review

Chosen storyline: one handoff travels through a growing diagram. Alternatives were a documentary note close-up and a before/proposed split screen; neither was built. Glass is the user's explicit material choice. No new stock or generated media, music service or voice model was used. Silent delivery follows the no-supplied-music fallback in HyperFrames references/sound.md; no sound is claimed to have been heard.

Measured: HyperFrames 0.9.30 full check, zero lint/runtime/layout/contrast errors or warnings, 55/55 sampled contrast checks, one intentional film_silent craft warning. Actual 1920 × 1080 / 30 fps master rendered 750 frames over 25 seconds; the web encode is H.264 1280 × 720 / 30 fps / 25 seconds with faststart and no audio. FFprobe metadata and full FFmpeg decode are logged.

Looked at: final settled beat and midpoint sheet, 360 px phone sheet, and four cut strips at ±.2 seconds. The inquiry becomes context, then a draft, then an authorized review and accepted next action. Each next tile joins the same growing path. Labels and right edges fit these sampled frames. The marker initially crossed copy; the final version places it on a rail below the tiles. Linked stylesheet root and pseudo-element stacking warnings were fixed before the final render.

Weakest aspect: five-node overview labels become small at phone-player width. The large primary line, native captions and full HTML transcript carry the meaning there. Actual phone playback, caption settings, controls and perceived pacing have not been observed; frame inspection does not establish those. Original public/intro.* remains unchanged and accessible on the homepage until supported playback review approves any replacement.

To rerender: run `node scripts/prepare-systems-motion.mjs`, then the pinned local HyperFrames CLI against outputs/systems-motion. That generated directory copies the unchanged local licensed fonts and GSAP plus the new source and is excluded from Git. Set HYPERFRAMES_BROWSER_PATH to an installed compatible Chromium when automatic browser discovery cannot install a headless shell. No dependency or browser installation is required for the verified render environment.

Studio authoring preview was started and reported http://localhost:4567/#project/systems-motion. It is a local editor endpoint, not an application preview or hosted delivery URL. The editable source can also be opened in the HyperFrames desktop app: https://hyperframes.studio/studio/download?os=linux&src=cli .
