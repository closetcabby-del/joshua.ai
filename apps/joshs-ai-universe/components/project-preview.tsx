import type { PortfolioProject } from "@/lib/portfolio";

export function ProjectPreview({ project }: { project: PortfolioProject }) {
  return (
    <div
      className={`project-preview preview-${project.accent}`}
      aria-hidden="true"
    >
      {project.number === "01" ? (
        <>
          <div className="preview-context">
            <span className="preview-dot" />
            CUSTOMER CONTEXT<strong>One story. A clear next step.</strong>
            <div className="preview-flow">
              <span>Intake</span>
              <i>→</i>
              <span>Review</span>
              <i>→</i>
              <span>Action</span>
            </div>
          </div>
          <div className="preview-floating">
            <span>HUMAN DECISION</span>
            <strong>Review before action.</strong>
            <div className="preview-meter">
              <i />
            </div>
          </div>
        </>
      ) : project.demo === "buildbrief" ? (
        <div className="preview-paper">
          <div>
            <span>BUILD / BRIEF</span>
            <span>01 — DISCOVERY</span>
          </div>
          <h4>
            Think first.
            <br />
            Build better.
          </h4>
          <p>The problem → Scope → Acceptance criteria</p>
          <div className="preview-lines">
            <i />
            <i />
            <i />
          </div>
          <span className="preview-cta">Prepare the handoff ↗</span>
        </div>
      ) : (
        <div className="preview-planner">
          <div>
            <strong>Iteration / 01</strong>
            <span>Illustrative view</span>
          </div>
          <div className="preview-columns">
            {["To discuss", "This sprint", "Reviewed"].map((name, i) => (
              <div key={name}>
                <span>{name}</span>
                <article>
                  <i className={`mini-priority p${i}`} />
                  <strong>
                    {
                      [
                        "Clarify the request",
                        "Make the work visible",
                        "Capture the decision",
                      ][i]
                    }
                  </strong>
                  <small>Fictional example</small>
                </article>
                {i === 0 && <article className="ghost-ticket" />}
              </div>
            ))}
          </div>
        </div>
      )}
      <span className="preview-caption">
        {project.number === "01"
          ? "Workflow illustration · inspect the actual artifact in the case"
          : "Interface illustration · launch the original prototype below"}
      </span>
    </div>
  );
}
