"use client";
import { useRef, useState } from "react";
import { useHydrated } from "@/lib/use-hydrated";

export function PrototypeLauncher({
  demo,
  title,
  className = "studio-button",
}: {
  demo: "buildbrief" | "planner";
  title: string;
  className?: string;
}) {
  const ready = useHydrated();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={className}
        ref={trigger}
        disabled={!ready}
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        Launch prototype <span aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={dialog}
        className="prototype-dialog"
        aria-label={`${title} prototype`}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="prototype-bar">
          <div>
            <strong>{title}</strong>
            <span>Standalone work sample · use fictional information</span>
          </div>
          <div>
            <a
              href={`/demos/${demo}.html`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open standalone ↗
            </a>
            <button
              type="button"
              aria-label="Close prototype"
              onClick={() => dialog.current?.close()}
            >
              ×
            </button>
          </div>
        </div>
        <p className="prototype-notice">
          Browser-only prototype. No live business integration. In this isolated
          preview, drafts stay in the session; use the prototype’s exports to
          keep a copy.
        </p>
        {open && (
          <iframe
            src={`/demos/${demo}.html`}
            title={`${title} working prototype`}
            sandbox="allow-scripts allow-forms allow-downloads allow-modals"
            className="prototype-frame"
          />
        )}
      </dialog>
    </>
  );
}
