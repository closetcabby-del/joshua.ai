import { ArrowUpRight } from "lucide-react";

const artifacts = [
  {
    name: "Customer website",
    stage: "Public artifact",
    detail:
      "Inspect the original screenshot and numbered observations. This is website evidence, not an internal operating-system demonstration.",
    href: "/projects/service-business-workflows#website-walkthrough",
    action: "Inspect the website artifact",
  },
  {
    name: "Internal tools and lead workflows",
    stage: "Prototype work",
    detail:
      "Described in my public account. A recorded end-to-end demonstration is not included yet.",
    href: "/evidence#jeff-workflow-building",
    action: "Read the workflow record",
  },
  {
    name: "Connected operating workflow",
    stage: "Developing",
    detail:
      "The design connects customer context and human decisions. Some integrations remain planned.",
    href: "/evidence#jeff-human-judgment",
    action: "Inspect the handoff design",
  },
];

export function CaseStatus() {
  return (
    <div className="case-status">
      {artifacts.map(({ name, stage, detail, href, action }) => (
        <article className="artifact-row" key={name}>
          <div>
            <span className="artifact-stage">{stage}</span>
            <h3>{name}</h3>
          </div>
          <p>{detail}</p>
          <a className="subtle-link" href={href}>
            {action}
            <ArrowUpRight size={15} />
          </a>
        </article>
      ))}
      <div className="case-results-note">
        <strong>What I can say about results</strong>
        <p>
          The work includes a public website artifact, prototypes and workflow
          design. Measured time savings, revenue gains and a complete end-to-end
          deployment are not established by the current sources.
        </p>
      </div>
    </div>
  );
}
