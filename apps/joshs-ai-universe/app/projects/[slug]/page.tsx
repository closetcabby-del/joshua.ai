import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { candidate } from "@/lib/knowledge";
export function generateStaticParams() {
  return candidate.projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      candidate.projects.find((p) => p.slug === slug)?.title ||
      "Project not found",
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = candidate.projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <div className="page-inner document-page">
      <Link className="back-link" href="/#projects">
        <ArrowLeft size={15} />
        Back to selected explorations
      </Link>
      <span className="eyebrow">
        CASE STUDY / {p.number} / {p.category}
      </span>
      <h1>{p.title}.</h1>
      <span className="evidence-badge prototype">{p.status}</span>
      <p className="document-lead">{p.summary}</p>
      <div className="case-tags">
        {p.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      {[
        ["The problem", p.problem],
        ["Role and contributions", p.contribution],
        ["The approach", p.solution],
        ["Architecture and technology", p.architecture],
        ["Testing evidence", p.testing],
        ["Outcomes", p.outcomes],
        ["Limits and open questions", p.limitations],
      ].map(([title, text]) => (
        <section key={title}>
          <span className="short-line" />
          <h2>{title}</h2>
          <p>{text}</p>
        </section>
      ))}
      <div className="case-actions">
        {p.demoUrl && (
          <Link className="primary-button" href={p.demoUrl}>
            Explore the prototype
            <ArrowUpRight size={15} />
          </Link>
        )}
        {p.repoUrl && (
          <a className="subtle-link" href={p.repoUrl}>
            View repository
            <ArrowUpRight size={14} />
          </a>
        )}
        {p.artifact && (
          <Link className="subtle-link" href={p.artifact}>
            Review evidence
            <ArrowUpRight size={14} />
          </Link>
        )}
        <p>{p.repoUrl ? "" : "A public repository has not been provided."}</p>
      </div>
    </div>
  );
}
