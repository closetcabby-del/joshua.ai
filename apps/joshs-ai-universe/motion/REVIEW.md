# Motion review

A 15-second process introduction, six scenes, 1920×1080 at 30 fps. Charcoal surfaces and self-hosted Manrope sans-serif typography match the website. The story is business problem → AI discovery → solution design → agent-assisted execution → verified outcome, followed by the Josh’s AI universe wordmark. “Verified outcome” is a process goal, not a claim about Josh’s career or the conceptual case studies.

The film uses restrained typography, masked entrances, a finite progress trace, large sans-serif stage numbers, and a rounded J badge. Decorative AI imagery was removed. No footage, music, voiceover, random particles, background drift, or scientific-fiction imagery. The registry typography component was inspected; static scene markup was chosen for straightforward editing. Alternative screenshot-demo and narrated treatments were not built because the request was a short conceptual brand introduction.

Final HyperFrames check: lint/runtime/layout/contrast/craft all passed, no errors or warnings. The render produced 450 frames. FFprobe confirmed H.264, 1920×1080, 30 fps, 15.000 s. The optimized web encode decoded completely in FFmpeg, and browser playback advanced in desktop and mobile Chromium.

The beat sheet, phone sheet, seam frames, and decoded output were visually reviewed. The weakest aspect is the density of supporting annotations at phone size; the large headlines carry the story, and the player has controls and text captions. A longer version could give supporting text more screen time. No warnings were waived. No audio exists or was heard.

The composition can be edited using `npx hyperframes preview --dir motion --background` or in the HyperFrames desktop app: https://hyperframes.studio/studio/download?os=linux&src=cli. Its Edit with Framey action opens the desktop app. The source is ordinary HTML, local GSAP, and local font files. The final revision removes serif and italic typography.
