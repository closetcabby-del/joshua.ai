import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import {
  candidate,
  approvedRecords,
  statusDescriptions,
} from "@/lib/knowledge";
export const metadata = { title: "Evidence library" };
export default function Evidence() {
  return (
    <div className="page-inner document-page">
      <Link className="back-link" href="/">
        <ArrowLeft size={15} />
        Back to the universe
      </Link>
      <span className="eyebrow">KNOW WHAT YOU’RE LOOKING AT</span>
      <h1>The evidence library.</h1>
      <p className="document-lead">
        A claim is useful when you can see what supports it. This library keeps
        the source, scope, and uncertainty in view.
      </p>
      <div className="evidence-callout">
        <ShieldCheck size={22} />
        <div>
          <h2>Public sources reviewed. Contributions need context.</h2>
          <p>
            The records below come from Joshua Ly’s existing public portfolio.
            Personal contributions remain self-reported. Formal employment,
            certifications, and commercial outcomes are not independently
            verified.
          </p>
        </div>
      </div>
      <section>
        <h2>How to read the labels</h2>
        <div className="status-list">
          {Object.entries(statusDescriptions).map(([s, d]) => (
            <article key={s}>
              <span className="evidence-badge">{s}</span>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="portfolio">
        <h2>Portfolio prototype</h2>
        <p>
          The website is a prototype built with AI coding assistance for Josh’s
          portfolio. Its implementation can be reviewed in the delivered source
          package. It is not independent proof of Josh’s prior professional
          work.
        </p>
        <Link className="subtle-link" href="/projects/recruiter-workspace">
          Review the case study
          <ArrowUpRight size={14} />
        </Link>
      </section>
      <section>
        <h2>Approved candidate records</h2>
        {approvedRecords.length ? (
          approvedRecords.map((r) => (
            <article key={r.id} id={r.id} className="record-card">
              <h3>{r.title}</h3>
              <span className="evidence-badge">{r.status}</span>
              <p>{r.claim}</p>
              {r.sources.map((s) => (
                <a key={s.url} href={s.url}>
                  {s.label} ↗
                </a>
              ))}
            </article>
          ))
        ) : (
          <p>
            There are no approved candidate records yet. Conceptual examples are
            excluded from the professional knowledge base.
          </p>
        )}
      </section>
      <section>
        <h2>Case-study status</h2>
        {candidate.projects.map((p) => (
          <article key={p.id} className="evidence-project-row">
            <Link href={`/projects/${p.slug}`}>
              {p.title}
              <ArrowUpRight size={14} />
            </Link>
            <span className="evidence-badge">{p.status}</span>
          </article>
        ))}
      </section>
      <section id="privacy">
        <h2>A little about privacy</h2>
        <p>
          Job descriptions and conversations are not stored by this application.
          Demo mode processes text on the application server without sending it
          to an AI provider. Nothing is saved to browser storage.
        </p>
        <p>
          When live AI is configured and approved records exist, your input and
          recent conversation context are sent to OpenAI to select relevant
          evidence. Interview questions come from a local role-topic library.
          API requests use{" "}
          <code>store: false</code>; provider retention and deployment-platform
          logs are governed by those services’ policies. Avoid pasting
          confidential or personal information.
        </p>
        <p>
          Rate limiting uses short-lived, hashed network identifiers. A shared
          rate limiter is required before enabling live AI in production.
          Clearing the tool resets its conversation context.
        </p>
      </section>
    </div>
  );
}
