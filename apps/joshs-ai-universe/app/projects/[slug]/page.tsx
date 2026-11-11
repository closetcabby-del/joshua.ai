import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "@/components/project-preview";
import { getSelectedProject, selectedProjects } from "@/lib/selected-projects";
import { candidate } from "@/lib/knowledge";
export function generateStaticParams() {
  return selectedProjects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getSelectedProject(slug);
  return {
    title: project?.name ?? "Project not found",
    description: project?.summary,
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getSelectedProject(slug);
  if (!project) notFound();
  const next =
    selectedProjects[
      (selectedProjects.indexOf(project) + 1) % selectedProjects.length
    ];
  return (
    <div className="pf-case pf-container">
      <a className="pf-back" href="/#projects">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to projects
      </a>
      <header className="pf-case-header">
        <div>
          <p className="pf-eyebrow">{project.category}</p>
          <h1>{project.name}</h1>
          <p className="pf-case-headline">{project.summary}</p>
          <p className="pf-case-status">
            Built with AI assistance · Project overview
          </p>
        </div>
        <ProjectPreview project={project} />
      </header>
      <section
        className="pf-case-overview"
        aria-label="Problem and contribution"
      >
        <div>
          <h2>The problem</h2>
          <p>{project.problem}</p>
        </div>
        <div>
          <h2>My contribution</h2>
          <p>{project.contribution}</p>
        </div>
      </section>
      <section className="pf-case-approach">
        <p className="pf-eyebrow">Practical decisions</p>
        <h2>How I approached it</h2>
        {project.approach.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
      <section className="pf-case-demo">
        <p className="pf-eyebrow">Scope and evidence</p>
        <h2>What this page demonstrates</h2>
        <p>{project.scope}</p>
        <p className="pf-demo-note">
          Contribution descriptions are my account of the work. The cover is an
          editorial illustration, not an application screenshot. No performance
          metrics or business outcomes are claimed.
        </p>
        {project.icon === "operations" && (
          <a className="pf-link" href="/explore">
            Explore the workflow and adoption walkthrough{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </section>
      <section className="pf-case-learning">
        <h2>What I would validate next</h2>
        <p>{project.next}</p>
      </section>
      <div className="pf-case-end">
        <a className="pf-button" href={`mailto:${candidate.email}`}>
          Talk about this project <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a className="pf-link" href={`/projects/${next.slug}`}>
          Next: {next.name} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
