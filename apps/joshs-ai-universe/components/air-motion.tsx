"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Workflow, Layers3, UsersRound } from "lucide-react";
import { useHydrated } from "@/lib/use-hydrated";
import { getCardTilt } from "@/lib/card-tilt";

/** Progressive enhancement: all content and native links work without this layer. */
export function AirMotion() {
  const scene = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const ready = useHydrated();
  useEffect(() => {
    const home = scene.current?.closest<HTMLElement>(".pf-home");
    if (!home) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cards = Array.from(
      home.querySelectorAll<HTMLElement>(".pf-project-card"),
    );
    const reveals = Array.from(
      home.querySelectorAll<HTMLElement>("[data-air-reveal]"),
    );
    let dispose = () => {};
    const configure = () => {
      dispose();
      const active = !paused && !preference.matches;
      home.dataset.airMotion = active ? "on" : "off";
      if (!active) return;
      const cleanups: (() => void)[] = [];
      if (typeof IntersectionObserver !== "undefined") {
        let heroVisible = true;
        const updateAmbient = () => {
          home.dataset.airAmbient =
            heroVisible && !document.hidden ? "on" : "off";
        };
        const heroObserver = new IntersectionObserver(([entry]) => {
          heroVisible = entry.isIntersecting;
          updateAmbient();
        });
        if (scene.current) heroObserver.observe(scene.current);
        document.addEventListener("visibilitychange", updateAmbient);
        updateAmbient();
        cleanups.push(() => {
          heroObserver.disconnect();
          document.removeEventListener("visibilitychange", updateAmbient);
          delete home.dataset.airAmbient;
        });
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                (entry.target as HTMLElement).dataset.airEntered = "true";
                observer.unobserve(entry.target);
              }
            }
          },
          { threshold: 0.08 },
        );
        // Never hide content already on screen or reached via a deep link.
        for (const element of reveals) {
          if (element.getBoundingClientRect().top > window.innerHeight) {
            element.dataset.airEntered = "false";
            observer.observe(element);
          }
        }
        cleanups.push(() => {
          observer.disconnect();
          for (const element of reveals) delete element.dataset.airEntered;
        });
      }
      if (pointer.matches) {
        for (const card of cards) {
          let frame = 0;
          let bounds: DOMRect | null = null;
          const enter = () => {
            bounds = card.getBoundingClientRect();
          };
          const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            if (!bounds) bounds = card.getBoundingClientRect();
            cancelAnimationFrame(frame);
            const tilt = getCardTilt(event.clientX, event.clientY, bounds);
            frame = requestAnimationFrame(() => {
              card.style.setProperty("--air-rx", `${tilt.x}deg`);
              card.style.setProperty("--air-ry", `${tilt.y}deg`);
              card.style.setProperty("--air-light-x", `${tilt.lightX}%`);
              card.style.setProperty("--air-light-y", `${tilt.lightY}%`);
            });
          };
          const reset = () => {
            cancelAnimationFrame(frame);
            bounds = null;
            for (const name of [
              "--air-rx",
              "--air-ry",
              "--air-light-x",
              "--air-light-y",
            ])
              card.style.removeProperty(name);
          };
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", reset);
          cleanups.push(() => {
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", reset);
            reset();
          });
        }
      }
      dispose = () => {
        for (const cleanup of cleanups) cleanup();
      };
    };
    configure();
    preference.addEventListener("change", configure);
    pointer.addEventListener("change", configure);
    return () => {
      dispose();
      preference.removeEventListener("change", configure);
      pointer.removeEventListener("change", configure);
      delete home.dataset.airMotion;
    };
  }, [paused]);
  return (
    <>
      <div ref={scene} className="air-scene" aria-hidden="true">
        <div className="air-halo air-halo-blue" />
        <div className="air-halo air-halo-cyan" />
        <div className="air-orbit air-orbit-outer">
          <i />
        </div>
        <div className="air-orbit air-orbit-inner">
          <i />
        </div>
        <div className="air-grid" />
        <div className="air-shard air-shard-discover">
          <span className="air-shard-icon">
            <Workflow size={21} />
          </span>
          <span>
            <small>01 / Understand</small>Find the real problem.
          </span>
          <div className="air-shard-lines">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="air-shard air-shard-build">
          <span className="air-shard-icon">
            <Layers3 size={21} />
          </span>
          <span>
            <small>02 / Build</small>Make something useful.
          </span>
          <div className="air-shard-stack">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="air-shard air-shard-adopt">
          <span className="air-shard-icon">
            <UsersRound size={19} />
          </span>
          <span>
            <small>03 / Adopt</small>Build with the team.
          </span>
        </div>
        <span className="air-star air-star-one" />
        <span className="air-star air-star-two" />
        <span className="air-star air-star-three" />
      </div>
      <button
        className="air-motion-toggle"
        type="button"
        disabled={!ready}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? (
          <Play size={13} aria-hidden="true" />
        ) : (
          <Pause size={13} aria-hidden="true" />
        )}
        {paused ? "Resume motion" : "Pause motion"}
      </button>
    </>
  );
}
