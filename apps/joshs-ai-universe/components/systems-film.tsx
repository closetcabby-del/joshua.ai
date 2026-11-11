"use client";
import { useRef, useState } from "react";

export function SystemsFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="systems-film">
      <div>
        <span className="eyebrow">A CONCEPTUAL EXPLANATION · 25 SECONDS</span>
        <h3>From inquiry to next action.</h3>
        <p>
          A proposed information flow with AI assistance and a human decision.
          This animation does not show a working business integration.
        </p>
      </div>
      <video
        ref={video}
        controls
        playsInline
        preload="metadata"
        poster="/systems-flow-poster.jpg"
        aria-label="Conceptual information flow: inquiry, shared context, AI assistance, human decision, next action"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setError(true)}
      >
        <source src="/systems-flow.mp4" type="video/mp4" />
        <track
          kind="captions"
          src="/systems-flow.vtt"
          srcLang="en"
          label="English"
          default
        />
        Your browser cannot play this video. The transcript below explains the
        full sequence.
      </video>
      <div className="film-controls">
        <button
          type="button"
          onClick={() => {
            const player = video.current;
            if (!player) return;
            if (playing) player.pause();
            else void player.play().catch(() => setError(true));
          }}
        >
          {playing ? "Pause explanation" : "Play explanation"}
        </button>
        <button
          type="button"
          onClick={() => {
            const player = video.current;
            if (player) {
              player.currentTime = 0;
              void player.play().catch(() => setError(true));
            }
          }}
        >
          Replay from start
        </button>
      </div>
      {error && (
        <p role="alert">
          Video playback is unavailable. Read the transcript below or use the
          original introduction on the homepage.
        </p>
      )}
      <details>
        <summary>Read the animation transcript</summary>
        <ol>
          <li>
            Customer inquiry: capture the concern and the questions still to
            ask.
          </li>
          <li>
            Shared context: place approved information with a named owner.
          </li>
          <li>
            AI assistance: prepare a draft from usable context; leave missing
            content explicit.
          </li>
          <li>Human decision: review the source and approve the next step.</li>
          <li>
            Next action: the assigned person accepts the handoff and reports a
            blocker or completion.
          </li>
        </ol>
        <p>
          Conceptual design. No customer records, live AI requests, messages or
          jobs are processed by this animation.
        </p>
      </details>
    </figure>
  );
}
