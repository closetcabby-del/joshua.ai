"use client";
import { useRef, useState } from "react";
import { Play, X } from "lucide-react";
export function IntroVideo() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        className="text-button intro-trigger"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        <span className="play-icon">
          <Play size={11} fill="currentColor" />
        </span>
        Watch the idea<span className="muted">15 sec</span>
      </button>
      <dialog
        ref={dialog}
        className="video-dialog"
        aria-label="The idea behind Josh’s AI universe"
        onClose={() => setOpen(false)}
      >
        <div className="dialog-top">
          <span>The idea behind the universe</span>
          <button
            aria-label="Close video"
            onClick={() => dialog.current?.close()}
          >
            <X size={22} />
          </button>
        </div>
        {open && (
          <video
            controls
            playsInline
            preload="metadata"
            poster="/intro-poster.jpg"
            aria-label="Josh's AI universe introduction"
          >
            <source src="/intro.mp4" type="video/mp4" />
            <track
              kind="captions"
              src="/intro.vtt"
              srcLang="en"
              label="English"
              default
            />
            Your browser cannot play this video.
          </video>
        )}
        <p>
          Business problem → AI discovery → solution design → agent-assisted
          execution → verified outcome.
        </p>
      </dialog>
    </>
  );
}
