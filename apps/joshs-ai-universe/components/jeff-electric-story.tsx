import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./jeff-electric-story.module.css";

const capabilities = [
  {
    number: "01",
    title: "Frame the problem",
    text: "Work through the customer journey, the team’s handoffs, and what information gets lost. Give the build a business purpose.",
    example: "Jeff Electric: customer context, ownership, and the next action.",
    evidence: "jeff-problem-framing",
  },
  {
    number: "02",
    title: "Direct the AI",
    text: "Bring the business context and requirements into the work. Shape where AI assistance belongs and what it should hand back to a person.",
    example: "Jeff Electric: AI assistance built around the team’s workflow.",
    evidence: "jeff-ai-direction",
  },
  {
    number: "03",
    title: "Shape the solution",
    text: "Turn requirements into internal-tool prototypes and clearer workflows. Refine the tools around the work people need to do.",
    example:
      "Jeff Electric: lead workflows, internal tools, and company knowledge.",
    evidence: "jeff-workflow-building",
  },
  {
    number: "04",
    title: "Keep people in control",
    text: "Make the next decision and its owner explicit. Keep quotation, scheduling, and escalation decisions with the team.",
    example: "Jeff Electric: a human owner for consequential decisions.",
    evidence: "jeff-human-judgment",
  },
];

export function JeffElectricStory() {
  return (
    <section id="projects" className="projects-section section-anchor">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <span className="short-line" /> ONE BUSINESS. MY MAIN BODY OF WORK.
          </span>
          <h2>Jeff Electric.</h2>
          <p>The business behind the tools—and the reason to build them.</p>
        </div>
        <Link className="subtle-link" href="/evidence">
          Review the sources <ArrowUpRight size={14} />
        </Link>
      </div>
      <article className={styles["jeff-feature"]}>
        <div className={styles["jeff-feature-copy"]}>
          <span className="eyebrow">ACTIVE WORK / ELECTRICAL SERVICES</span>
          <h3>A real business to build for.</h3>
          <p>
            Calls, leads, quoting, jobs, documents, and follow-up each carry
            part of the customer’s story. The challenge is making the context,
            owner, and next action easier to see.
          </p>
          <p>
            My work brings business understanding and AI assistance together:
            map the workflow, shape requirements, build useful prototypes, and
            work through the human decisions around them.
          </p>
          <p className={styles["jeff-stage-note"]}>
            Public website, internal-tool prototypes, and workflow design. The
            broader operation is being developed in stages.
          </p>
          <div className="hero-actions">
            <Link
              className="primary-button"
              href="/projects/service-business-workflows"
            >
              Read the Jeff Electric story <ArrowUpRight size={16} />
            </Link>
            <a className="subtle-link" href="https://jeffelectric.online/">
              View public website <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <figure className={styles["jeff-preview"]}>
          <Image
            src="/jeff-electric-website.jpg"
            width={1348}
            height={926}
            sizes="(max-width: 760px) 100vw, 50vw"
            unoptimized
            alt="Jeff Electric’s public customer website, as shown in the reviewed portfolio"
          />
          <figcaption>
            Public website preview from the reviewed portfolio source.{" "}
            <a href="https://github.com/closetcabby-del/joshua.ai/blob/d70c684b6ae35263497cfe5eae43cf6c4fb966d0/assets/jeff-electric-live-preview.jpg">
              Inspect the source <ArrowUpRight size={12} />
            </a>
          </figcaption>
        </figure>
      </article>
      <div
        id="approach"
        className={`${styles["jeff-capabilities"]} section-anchor`}
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">HOW I USE AI</span>
            <h2>The thinking behind the build.</h2>
            <p>
              The tools are useful. The story is how I decide what to build and
              guide the work.
            </p>
          </div>
        </div>
        <div className={styles["jeff-capability-grid"]}>
          {capabilities.map((c) => (
            <article key={c.number} className={styles["jeff-capability"]}>
              <span className="eyebrow">{c.number}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <p className={styles["jeff-example"]}>{c.example}</p>
              <Link className="subtle-link" href={`/evidence#${c.evidence}`}>
                See the supporting account <ArrowUpRight size={13} />
              </Link>
            </article>
          ))}
        </div>
        <p className="projects-note">
          My contributions are described in the public case study. Sources
          distinguish that account, prototype work, and the public website
          artifact. Measured business impact is not yet established here.
        </p>
      </div>
    </section>
  );
}
