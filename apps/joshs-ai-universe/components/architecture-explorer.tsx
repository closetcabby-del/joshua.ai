"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { PortfolioProject } from "@/lib/portfolio";

export function ArchitectureExplorer({
  project,
  compact = false,
}: {
  project: PortfolioProject;
  compact?: boolean;
}) {
  const [view, setView] = useState<"business" | "technical">("business");
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [motion, setMotion] = useState(true);
  const [visible, setVisible] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);
  const canvas = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const drag = useRef<{
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);
  const marker = `arrow-${useId().replace(/:/g, "")}`;
  const node = project.nodes[selected];

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const measure = () => {
      const parent = element.getBoundingClientRect();
      const next = project.edges.map(([from, to]) => {
        const a =
          buttons.current[
            project.nodes.findIndex((n) => n.id === from)
          ]?.getBoundingClientRect();
        const b =
          buttons.current[
            project.nodes.findIndex((n) => n.id === to)
          ]?.getBoundingClientRect();
        if (!a || !b) return "";
        const sameRow = Math.abs(a.top - b.top) < 20;
        const right = b.left > a.left;
        const downward = b.top > a.top;
        const bend = downward ? 32 : -32;
        const x1 =
          (sameRow ? (right ? a.right : a.left) : a.left + a.width / 2) -
          parent.left;
        const y1 =
          (sameRow ? a.top + a.height / 2 : downward ? a.bottom : a.top) -
          parent.top;
        const x2 =
          (sameRow ? (right ? b.left : b.right) : b.left + b.width / 2) -
          parent.left;
        const y2 =
          (sameRow ? b.top + b.height / 2 : downward ? b.top : b.bottom) -
          parent.top;
        return sameRow
          ? `M ${x1} ${y1} L ${x2} ${y2}`
          : `M ${x1} ${y1} C ${x1} ${y1 + bend}, ${x2} ${y2 - bend}, ${x2} ${y2}`;
      });
      setPaths((previous) =>
        previous.join() === next.join() ? previous : next,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    buttons.current.forEach((button) => {
      if (button) observer.observe(button);
    });
    const intersection = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    intersection.observe(element);
    return () => {
      observer.disconnect();
      intersection.disconnect();
    };
  }, [project, zoom, view]);

  function select(index: number) {
    setSelected(index);
  }
  function resetView() {
    setZoom(1);
    if (viewport.current) {
      viewport.current.scrollLeft = 0;
      viewport.current.scrollTop = 0;
    }
  }

  return (
    <section
      className={`system-explorer ${compact ? "system-compact" : ""}`}
      aria-label={`${project.shortName} architecture explorer`}
    >
      <div className="system-topline">
        <span className="studio-kicker">
          {compact ? "INSIDE THE FLAGSHIP" : "INTERACTIVE ARCHITECTURE"}
        </span>
        <span className="system-live-label">
          {project.demo ? "Browser prototype" : "Explanatory design"}
        </span>
      </div>
      <div className="system-toolbar">
        <div className="view-switch" role="group" aria-label="Exploration mode">
          <button
            type="button"
            aria-pressed={view === "business"}
            onClick={() => setView("business")}
          >
            Business View
          </button>
          <button
            type="button"
            aria-pressed={view === "technical"}
            onClick={() => setView("technical")}
          >
            Technical View
          </button>
        </div>
        <div
          className="graph-controls"
          role="group"
          aria-label="Diagram controls"
        >
          <button
            type="button"
            aria-label="Zoom out"
            disabled={zoom <= 0.75}
            onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
          >
            −
          </button>
          <button
            type="button"
            aria-label="Reset diagram view"
            onClick={resetView}
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            aria-label="Zoom in"
            disabled={zoom >= 1.75}
            onClick={() => setZoom((z) => Math.min(1.75, z + 0.25))}
          >
            +
          </button>
        </div>
      </div>
      <p className="graph-instruction">
        Select a component. Follow a decision.
      </p>
      <div
        ref={viewport}
        className="architecture-viewport"
        role="region"
        aria-label="System diagram; scroll or drag the background to pan when zoomed"
        tabIndex={0}
        onPointerDown={(event) => {
          if (
            event.pointerType !== "mouse" ||
            event.button !== 0 ||
            (event.target as HTMLElement).closest("button")
          )
            return;
          drag.current = {
            x: event.clientX,
            y: event.clientY,
            left: event.currentTarget.scrollLeft,
            top: event.currentTarget.scrollTop,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current) {
            event.currentTarget.scrollLeft =
              drag.current.left - (event.clientX - drag.current.x);
            event.currentTarget.scrollTop =
              drag.current.top - (event.clientY - drag.current.y);
          }
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div
          ref={canvas}
          className={`architecture-canvas ${visible && motion ? "flow-running" : ""}`}
          style={{ width: `${zoom * 100}%` }}
        >
          <svg className="system-edges" aria-hidden="true">
            <defs>
              <marker
                id={marker}
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <path d="M0,0 L7,3.5 L0,7" fill="currentColor" />
              </marker>
            </defs>
            {paths.map((path, index) => (
              <path
                key={`${project.slug}-${index}`}
                d={path}
                className="system-edge"
                markerEnd={`url(#${marker})`}
              />
            ))}
          </svg>
          {project.nodes.map((item, index) => (
            <button
              type="button"
              key={item.id}
              ref={(button) => {
                buttons.current[index] = button;
              }}
              className="system-node"
              aria-pressed={selected === index}
              aria-controls={`${marker}-inspector`}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                let next = index;
                if (["ArrowRight", "ArrowDown"].includes(event.key))
                  next = (index + 1) % project.nodes.length;
                else if (["ArrowLeft", "ArrowUp"].includes(event.key))
                  next =
                    (index + project.nodes.length - 1) % project.nodes.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = project.nodes.length - 1;
                else return;
                event.preventDefault();
                select(next);
                buttons.current[next]?.focus();
              }}
            >
              <span className="system-node-kind">
                <i aria-hidden="true" />
                {item.kind}
              </span>
              <strong>
                {view === "business" ? item.label : item.technicalLabel}
              </strong>
              <span className="system-node-status">{item.status}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="system-bottombar">
        <span>Arrows move between components · Enter selects</span>
        <button
          type="button"
          aria-pressed={motion}
          onClick={() => setMotion((value) => !value)}
        >
          {motion ? "Pause flow" : "Animate flow"}
        </button>
      </div>
      <div
        id={`${marker}-inspector`}
        className="system-inspector"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="inspector-heading">
          <span>
            {String(selected + 1).padStart(2, "0")} /{" "}
            {String(project.nodes.length).padStart(2, "0")}
          </span>
          <h3>{view === "business" ? node.label : node.technicalLabel}</h3>
          <span className="stage-pill">{node.status}</span>
        </div>
        <p>{view === "business" ? node.business : node.technical}</p>
        <div className="node-decision">
          <strong>Why this choice</strong>
          <p>{node.why}</p>
        </div>
        {!compact && (
          <dl className="technical-facts">
            <div>
              <dt>{view === "business" ? "What comes in" : "Input / data"}</dt>
              <dd>{node.input}</dd>
            </div>
            <div>
              <dt>
                {view === "business" ? "What comes next" : "Output / state"}
              </dt>
              <dd>{node.output}</dd>
            </div>
            <div className="fact-boundary">
              <dt>
                {view === "business"
                  ? "Scope & limits"
                  : "Permissions & system boundary"}
              </dt>
              <dd>{node.boundary}</dd>
            </div>
          </dl>
        )}
      </div>
      {!compact && (
        <details className="architecture-text">
          <summary>Read the architecture as text</summary>
          <ol>
            {project.nodes.map((item) => (
              <li key={item.id}>
                <h4>
                  {item.label} <span>({item.status})</span>
                </h4>
                <p>{item.business}</p>
                <p>{item.technical}</p>
                <p>
                  <strong>Decision:</strong> {item.why}
                </p>
                <p>
                  <strong>Boundary:</strong> {item.boundary}
                </p>
              </li>
            ))}
          </ol>
          <p>
            Directed connections:{" "}
            {project.edges
              .map(
                ([a, b]) =>
                  `${project.nodes.find((n) => n.id === a)?.label} → ${project.nodes.find((n) => n.id === b)?.label}`,
              )
              .join("; ")}
            .
          </p>
        </details>
      )}
    </section>
  );
}
