"use client";

import { useEffect, useRef, useState } from "react";
import {
  chapters,
  nodeIndexForKey,
  practicalOptions,
  processViews,
  systemNodes,
  type ProcessMode,
  type SystemNode,
} from "@/lib/systems-case";
import { SystemsFilm } from "@/components/systems-film";

type ScrollCraftApi = { destroy(): void };
type ScrollCraftWindow = Window & {
  ScrollCraft?: { mount(root: HTMLElement): ScrollCraftApi };
};

function NodeDetails({ node }: { node: SystemNode }) {
  return (
    <dl className="node-facts">
      <div>
        <dt>Business need</dt>
        <dd>{node.need}</dd>
      </div>
      <div>
        <dt>Input</dt>
        <dd>{node.input}</dd>
      </div>
      <div>
        <dt>Output</dt>
        <dd>{node.output}</dd>
      </div>
      <div>
        <dt>Josh’s contribution / design choice</dt>
        <dd>{node.contribution}</dd>
      </div>
      <div>
        <dt>Where AI helps</dt>
        <dd>{node.ai}</dd>
      </div>
      <div>
        <dt>Human review</dt>
        <dd>{node.review}</dd>
      </div>
      <div>
        <dt>Status and source</dt>
        <dd>
          {node.status}. <a href={node.source}>{node.evidence}</a>.
        </dd>
      </div>
      <div>
        <dt>Still to verify</dt>
        <dd>{node.gap}</dd>
      </div>
    </dl>
  );
}

export function SystemsExplorer() {
  const root = useRef<HTMLDivElement>(null);
  const nodeButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const [chapter, setChapter] = useState<string>("discover");
  const [selected, setSelected] = useState(0);
  const [mode, setMode] = useState<ProcessMode>("proposed");
  const [option, setOption] = useState<string>("native");
  const [resetMessage, setResetMessage] = useState("");
  const currentNode = systemNodes[selected];
  const comparison =
    practicalOptions.find((item) => item.id === option) ?? practicalOptions[0];
  const process = processViews[mode];
  const focusNode =
    chapters.find((item) => item.id === chapter)?.focus ?? "inquiry";

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    // The upstream engine is vendored unchanged. Mount once and release its observers/rAF on exit.
    let api: ScrollCraftApi | undefined;
    let disposed = false;
    const script = document.createElement("script");
    script.src = "/vendor/scrollcraft/scrollcraft.js";
    script.async = true;
    script.onload = () => {
      if (disposed || matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      api = (window as ScrollCraftWindow).ScrollCraft?.mount(element);
      if (api) element.classList.add("motion-ready");
    };
    document.head.append(script);
    const onPreference = () => {
      // A changed preference takes effect immediately; a reload can opt motion back in.
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        api?.destroy();
        api = undefined;
        element.classList.remove("motion-ready");
      }
    };
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", onPreference);
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) setChapter(entry.target.id);
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
      );
      element
        .querySelectorAll("[data-chapter]")
        .forEach((section) => observer?.observe(section));
    }
    return () => {
      disposed = true;
      api?.destroy();
      observer?.disconnect();
      script.remove();
      preference.removeEventListener("change", onPreference);
    };
  }, []);

  function reset() {
    setSelected(0);
    setMode("proposed");
    setOption("native");
    setResetMessage(
      "Exploration reset: Customer inquiry, Proposed design, Native features.",
    );
  }

  return (
    <div ref={root} className="systems-experience">
      <nav className="chapter-nav" aria-label="Explore chapters">
        <div className="chapter-links">
          {chapters.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={chapter === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="handoff-trace" aria-hidden="true">
          {systemNodes.map((node) => (
            <span
              key={node.id}
              className={focusNode === node.id ? "trace-active" : undefined}
            >
              {node.label}
            </span>
          ))}
        </div>
      </nav>

      <section
        id="discover"
        data-chapter
        data-sc-act="flow"
        className="explore-chapter section-anchor"
      >
        <div className="chapter-heading" data-sc-in>
          <span className="eyebrow">DISCOVER</span>
          <h2>
            Start with the gap
            <br />
            <span>in the work.</span>
          </h2>
        </div>
        <div className="chapter-copy">
          <p className="explore-lead">
            A customer makes contact. Someone needs enough context to decide
            what happens next.
          </p>
          <p>
            Josh describes working through the gaps between those moments at
            Jeff Electric. His account informs this case; an observed workflow
            and measured outcomes are still needed.
          </p>
        </div>
        <div className="discovery-grid">
          <div>
            <h3>People before software</h3>
            <p>
              Ask the office, the person receiving the handoff and the person
              responsible for follow-up what they need to act.
            </p>
          </div>
          <div>
            <h3>Constraints shape the design</h3>
            <p>
              Budget, existing tools, data access and the time people can spend
              learning all matter. Confirm them before building.
            </p>
          </div>
          <div>
            <h3>A testable requirement</h3>
            <p>
              Proposed: a receiving owner can see the customer concern, missing
              details and next responsibility. Incomplete context stays visibly
              incomplete.
            </p>
          </div>
        </div>
        <a className="subtle-link" href="/evidence#jeff-problem-framing">
          Josh’s reported problem-framing work →
        </a>
      </section>

      <section
        id="map"
        data-chapter
        data-sc-act="flow"
        className="explore-chapter section-anchor"
      >
        <div className="chapter-heading" data-sc-in>
          <span className="eyebrow">MAP</span>
          <h2>
            Make the handoff
            <br />
            <span>someone’s job.</span>
          </h2>
        </div>
        <fieldset className="process-switch">
          <legend>Compare process views</legend>
          {(["reported", "proposed"] as const).map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="process-view"
                value={value}
                checked={mode === value}
                onChange={() => {
                  setMode(value);
                  setResetMessage("");
                }}
              />
              {processViews[value].label}
            </label>
          ))}
        </fieldset>
        <div className="process-view" aria-live="polite" aria-atomic="true">
          <h3>{process.label}</h3>
          <p>{process.summary}</p>
          <ol>
            {process.steps.map((step, index) => (
              <li key={step}>
                <strong>{step}</strong>
                <span>{process.owners[index]}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="context-note">
          The proposed sequence adds ownership and review. It does not establish
          that the reported process has already changed.
        </p>
        <details>
          <summary>Read both process views as text</summary>
          {Object.values(processViews).map((view) => (
            <section className="option-text" key={view.label}>
              <h3>{view.label}</h3>
              <p>{view.summary}</p>
              <ol>
                {view.steps.map((step, index) => (
                  <li key={step}>
                    {step}. {view.owners[index]}.
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </details>
      </section>

      <section
        id="design"
        data-chapter
        data-sc-act="flow"
        className="explore-chapter section-anchor"
      >
        <div className="chapter-heading" data-sc-in>
          <span className="eyebrow">DESIGN</span>
          <h2>
            Follow the information.
            <br />
            <span>Inspect the decisions.</span>
          </h2>
        </div>
        <p className="chapter-copy">
          An explanatory architecture for the Jeff Electric problem. Tool
          categories show where work could live; they do not claim working
          integrations.
        </p>
        <div className="architecture-scene">
          <div className="scene-caption">
            <span>Proposed architecture</span>
            <span>Office → shared record → assistance → approval → task</span>
          </div>
          <div
            className="architecture-nodes"
            role="group"
            aria-label="Workflow components"
            aria-describedby="node-keyboard-help"
          >
            <svg
              className="architecture-connector"
              viewBox="0 0 1000 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M 50 30 H 950" />
              <path
                className="connector-progress"
                d="M 50 30 H 950"
                pathLength="1"
              />
            </svg>
            {systemNodes.map((node, index) => (
              <button
                key={node.id}
                ref={(button) => {
                  nodeButtons.current[index] = button;
                }}
                type="button"
                aria-pressed={selected === index}
                aria-controls="node-inspector"
                onClick={() => {
                  setSelected(index);
                  setResetMessage("");
                }}
                onKeyDown={(event) => {
                  if (
                    ![
                      "ArrowRight",
                      "ArrowLeft",
                      "ArrowDown",
                      "ArrowUp",
                      "Home",
                      "End",
                    ].includes(event.key)
                  )
                    return;
                  event.preventDefault();
                  const next = nodeIndexForKey(index, event.key);
                  setSelected(next);
                  nodeButtons.current[next]?.focus();
                  setResetMessage("");
                }}
              >
                <span className="node-step" aria-hidden="true">
                  {index + 1}
                </span>
                <strong>{node.label}</strong>
                <span>{node.owner}</span>
              </button>
            ))}
          </div>
          <p id="node-keyboard-help" className="keyboard-help">
            Select a component. Use Tab, Enter or Space; arrow keys move between
            components. Home and End select the first and last.
          </p>
        </div>
        <div id="node-inspector" className="node-inspector">
          <p className="selection-announcement" role="status">
            Selected: {currentNode.label}
          </p>
          <h3>{currentNode.label}</h3>
          <NodeDetails node={currentNode} />
        </div>
        <details className="all-component-details">
          <summary>Read every component as text</summary>
          {systemNodes.map((node) => (
            <section key={node.id}>
              <h3>{node.label}</h3>
              <NodeDetails node={node} />
            </section>
          ))}
        </details>
      </section>

      <section
        id="build"
        data-chapter
        data-sc-act="flow"
        className="explore-chapter section-anchor"
      >
        <div className="chapter-heading" data-sc-in>
          <span className="eyebrow">BUILD WITH AI</span>
          <h2>
            Give AI a brief.
            <br />
            <span>Keep the review.</span>
          </h2>
        </div>
        <p className="chapter-copy">
          Josh reports using AI to clarify needs and build prototypes. Here is
          an illustrative build loop for the handoff above. It is not a
          historical prompt log or proof of a deployed workflow.
        </p>
        <ol className="build-loop">
          <li>
            <h3>Write the requirement</h3>
            <p>
              “Show only records with usable AI content in the summary view.
              Keep missing content visible as a separate state.”
            </p>
            <span>
              Illustrative instruction, informed by a documented filter issue.
            </span>
          </li>
          <li>
            <h3>Build a small prototype</h3>
            <p>
              Separate a source note, an AI draft and a person’s decision. Make
              missing content and permission limits explicit.
            </p>
          </li>
          <li>
            <h3>Review and test</h3>
            <p>
              Try empty content, a failed response and a correction. Compare the
              result with the requirement and check it with the person using it.
            </p>
          </li>
          <li>
            <h3>Refine the rule</h3>
            <p>
              Record what failed, adjust the instruction or logic, and retest
              the affected path before extending it.
            </p>
          </li>
        </ol>
        <aside className="source-context">
          <h3>The evidence behind the example</h3>
          <p>
            Historical September 19 Hub release notes describe an AI-summary
            filter including records without usable AI content, followed by
            refinement. They establish a documented issue, not current behavior
            or Josh’s individual authorship. A redacted demonstration and his
            specific contribution remain to verify.
          </p>
          <a href="/evidence#jeff-ai-direction">
            Read the scope of the AI evidence →
          </a>
        </aside>
        <SystemsFilm />
      </section>

      <section
        id="choose"
        data-chapter
        data-sc-act="flow"
        className="explore-chapter section-anchor"
      >
        <div className="chapter-heading" data-sc-in>
          <span className="eyebrow">CHOOSE THE PRACTICAL OPTION</span>
          <h2>
            Fit the solution
            <br />
            <span>to the constraint.</span>
          </h2>
        </div>
        <p className="chapter-copy">
          Illustrative decision framework. These are questions Josh would bring
          to a project, not a completed Jeff Electric vendor comparison, quote
          or savings calculation.
        </p>
        <fieldset className="option-switch">
          <legend>Inspect an option</legend>
          {practicalOptions.map((item) => (
            <label key={item.id}>
              <input
                type="radio"
                name="practical-option"
                checked={option === item.id}
                onChange={() => {
                  setOption(item.id);
                  setResetMessage("");
                }}
              />
              {item.label}
            </label>
          ))}
        </fieldset>
        <div className="option-detail" aria-live="polite" aria-atomic="true">
          <h3>{comparison.label}</h3>
          <p className="explore-lead">{comparison.reason}</p>
          <dl className="node-facts">
            <div>
              <dt>Implementation effort</dt>
              <dd>{comparison.effort}</dd>
            </div>
            <div>
              <dt>Cost drivers</dt>
              <dd>{comparison.cost}</dd>
            </div>
            <div>
              <dt>Reliability</dt>
              <dd>{comparison.reliability}</dd>
            </div>
            <div>
              <dt>Maintenance</dt>
              <dd>{comparison.maintenance}</dd>
            </div>
            <div>
              <dt>Decision boundary</dt>
              <dd>{comparison.boundary}</dd>
            </div>
          </dl>
        </div>
        <details>
          <summary>Read all three options as text</summary>
          {practicalOptions.map((item) => (
            <section className="option-text" key={item.id}>
              <h3>{item.label}</h3>
              <p>{item.reason}</p>
              <p>{item.effort}</p>
              <p>{item.cost}</p>
              <p>{item.reliability}</p>
              <p>{item.maintenance}</p>
              <p>{item.boundary}</p>
            </section>
          ))}
        </details>
      </section>

      <section
        id="adopt"
        data-chapter
        data-sc-act="flow"
        className="explore-chapter section-anchor"
      >
        <div className="chapter-heading" data-sc-in>
          <span className="eyebrow">HELP PEOPLE ADOPT IT</span>
          <h2>
            Build for the people
            <br />
            <span>who will use it.</span>
          </h2>
        </div>
        <p className="chapter-copy">
          Proposed adoption approach. Josh’s reported work supports his interest
          in practical workflows and human judgment. A completed rollout,
          training program and measured adoption are not established by the
          portfolio evidence.
        </p>
        <div className="adoption-plan">
          <h3>Start with one handoff</h3>
          <ol>
            <li>
              <strong>Agree on roles.</strong> Name the process owner, reviewer
              and person responsible for support.
            </li>
            <li>
              <strong>Practice together.</strong> Use a safe example to rehearse
              normal work, missing information and a correction.
            </li>
            <li>
              <strong>Run a limited pilot.</strong> Keep the existing manual
              path available and agree on what would stop rollout.
            </li>
            <li>
              <strong>Listen and refine.</strong> Ask where people get stuck,
              review failures and assign each change an owner.
            </li>
          </ol>
        </div>
        <div className="explore-ending">
          <p>Have a process that needs this kind of thinking?</p>
          <a className="primary-button" href="/#contact">
            Talk with Josh →
          </a>
          <a
            className="subtle-link"
            href="/projects/service-business-workflows"
          >
            Inspect the Jeff Electric case and sources →
          </a>
          <button type="button" className="reset-exploration" onClick={reset}>
            Reset exploration
          </button>
          <p role="status">{resetMessage}</p>
        </div>
      </section>
    </div>
  );
}
