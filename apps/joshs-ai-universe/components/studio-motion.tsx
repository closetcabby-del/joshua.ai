"use client";
import { useRef, useState } from "react";
import { SystemsFilm } from "./systems-film";
import { useHydrated } from "@/lib/use-hydrated";

export function StudioMotion() {
  const ready = useHydrated();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        ref={trigger}
        disabled={!ready}
        className="studio-text-link"
        type="button"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        Watch the system story <span className="duration-label">25 sec</span>
        <span aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={dialog}
        className="studio-film-dialog"
        aria-label="System story motion graphic"
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <button
          type="button"
          className="film-close"
          aria-label="Close system story"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        {open && <SystemsFilm />}
      </dialog>
    </>
  );
}
