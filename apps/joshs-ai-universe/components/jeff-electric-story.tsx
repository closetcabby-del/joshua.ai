import { ArrowUpRight } from "lucide-react";
import { CaseStatus } from "./case-status";

const decisions = [
  {
    title: "Start with the whole customer journey",
    detail:
      "A call is only the beginning. I mapped intake, quoting, jobs and follow-up so the design could carry customer context between them.",
    evidence: "jeff-problem-framing",
  },
  {
    title: "Give AI business context",
    detail:
      "I use the workflow and its requirements to direct AI-assisted building. The prototypes cover lead workflows, internal tools and company knowledge.",
    evidence: "jeff-workflow-building",
  },
  {
    title: "Make the human handoff explicit",
    detail:
      "The design keeps a person responsible for what to quote, schedule or escalate. Helping the team reach a decision is part of the work.",
    evidence: "jeff-human-judgment",
  },
];

export function JeffElectricStory() {
  return (
    <>
      <section id="projects" className="projects-section section-anchor">
        <div className="section-heading work-heading">
          <div>
            <span className="eyebrow">THE JEFF ELECTRIC CASE STUDY</span>
            <h2>
              The work between
              <br />
              the handoffs<span className="blue-period">.</span>
            </h2>
          </div>
          <p>
            A residential electrical business.
            <br />
            One customer journey across many moving parts.
          </p>
        </div>
        <div className="work-intro">
          <h3>
            Who needs to
            <br />
            do what next?
          </h3>
          <div>
            <p>
              Customer context lived across calls, leads, quoting, jobs,
              documents and follow-up. People had to piece together what was
              happening and who should act next.
            </p>
            <p className="case-role">
              My part: map the work, shape requirements, prototype tools with AI
              assistance, and work through the handoffs with people in mind.
            </p>
            <a
              className="subtle-link"
              href="/projects/service-business-workflows"
            >
              Read the full case study <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="workflow-context">
          <span className="eyebrow">THE DESIGN GOAL</span>
          <h3>Keep the customer’s story together.</h3>
          <p>
            From the first inquiry to follow-up, preserve the context and make
            the next owner clear.
          </p>
          <ol aria-label="Customer journey in the workflow design">
            <li>
              <span>01</span> Inquiry
            </li>
            <li>
              <span>02</span> Quote
            </li>
            <li>
              <span>03</span> Job
            </li>
            <li>
              <span>04</span> Follow-up
            </li>
          </ol>
          <small>
            Workflow design. The complete integration is still developing.
          </small>
        </div>
      </section>
      <section id="approach" className="approach-section section-anchor">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MY DECISIONS</span>
            <h2>
              How I approached
              <br />
              the work<span className="blue-period">.</span>
            </h2>
          </div>
          <p>
            My account of the work.
            <br />
            Each decision links to its supporting record.
          </p>
        </div>
        <ol className="approach-list">
          {decisions.map(({ title, detail, evidence }, i) => (
            <li key={title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
              <a
                href={`/evidence#${evidence}`}
                aria-label={`Supporting record: ${title}`}
              >
                <ArrowUpRight size={20} />
              </a>
            </li>
          ))}
        </ol>
      </section>
      <section id="status" className="case-status-section section-anchor">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WORK YOU CAN INSPECT</span>
            <h2>
              Where it stands<span className="blue-period">.</span>
            </h2>
          </div>
          <p>
            The artifacts, the developing work,
            <br />
            and what still needs to be demonstrated.
          </p>
        </div>
        <CaseStatus />
        <p className="projects-note">
          The design centers on customer context and an owner for the next
          decision. The remaining test is how well the handoffs work together in
          practice.
        </p>
      </section>
    </>
  );
}
