import { notFound } from "next/navigation";
import { ArchitectureExplorer } from "@/components/architecture-explorer";
import { PrototypeLauncher } from "@/components/prototype-launcher";
import { ProjectPreview } from "@/components/project-preview";
import { WebsiteWalkthrough } from "@/components/website-walkthrough";
import { SystemsFilm } from "@/components/systems-film";
import {
  getPortfolioProject,
  portfolioProjects,
  portfolioSource,
  flagshipProjects,
} from "@/lib/portfolio";
import { candidate } from "@/lib/knowledge";
export function generateStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: getPortfolioProject(slug)?.shortName ?? "Project not found" };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();
  return (
    <div className="studio-case">
      <a className="studio-back" href="/#projects">
        ← Back to selected work
      </a>
      <header className="studio-case-hero">
        <div>
          <span className="studio-kicker">
            {project.number} / {project.category}
          </span>
          <p className="case-project-name">{project.shortName}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="case-primary-actions">
            <a className="studio-button" href="#architecture">
              Explore the architecture <span aria-hidden="true">↓</span>
            </a>
            {project.demo && (
              <PrototypeLauncher
                demo={project.demo}
                title={project.shortName}
                className="studio-button studio-button-outline"
              />
            )}
          </div>
          <span className="case-stage">{project.status}</span>
        </div>
        <ProjectPreview project={project} />
      </header>
      <nav className="case-jump-nav" aria-label="Case study sections">
        <a href="#problem">The problem</a>
        <a href="#contribution">My contribution</a>
        <a href="#architecture">Architecture</a>
        <a href="#demonstration">
          {project.demo ? "Working prototype" : "Walkthrough"}
        </a>
        <a href="#evidence">Evidence & limits</a>
      </nav>
      <div className="case-context-grid">
        <section id="problem" className="section-anchor">
          <span className="studio-kicker">THE ORIGINAL PROBLEM</span>
          <h2>What needed to change?</h2>
          <p>{project.problem}</p>
        </section>
        <section id="contribution" className="section-anchor">
          <span className="studio-kicker">MY CONTRIBUTION</span>
          <h2>Where I did the thinking.</h2>
          <p>{project.contribution}</p>
          <details className="source-disclosure">
            <summary>Source and contribution scope</summary>
            <p>
              The project description is Josh’s account. The linked original
              portfolio and included artifacts support inspection; they do not
              independently establish every contribution or business outcome.
            </p>
            <a href={portfolioSource} target="_blank" rel="noopener noreferrer">
              Review the immutable portfolio source ↗
            </a>
          </details>
        </section>
      </div>
      <section className="case-decisions">
        <span className="studio-kicker">APPROACH & DESIGN DECISIONS</span>
        <div>
          <article>
            <h2>Start with the work.</h2>
            <p>{project.approach}</p>
          </article>
          <article>
            <h2>Choose the tradeoff.</h2>
            <p>{project.tradeoff}</p>
          </article>
        </div>
      </section>
      {project.number === "01" && (
        <section className="flagship-projects">
          <span className="studio-kicker">
            INSIDE THE FLAGSHIP / SELECTED AI-BUILT PROJECTS
          </span>
          <h2>Six ways into the business.</h2>
          <p>
            Josh selected these tools and agents as examples of his work with
            AI. Open each one to see its purpose and evidence boundary. Private
            operational systems remain separate from this portfolio.
          </p>
          <div className="flagship-project-list">
            {flagshipProjects.map((item) => (
              <details key={item.name}>
                <summary>{item.name}</summary>
                <p>{item.purpose}</p>
                <p>
                  <strong>Evidence boundary:</strong> {item.boundary}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}
      <section
        id="architecture"
        className="studio-section case-architecture section-anchor"
      >
        <div className="studio-section-head">
          <div>
            <span className="studio-kicker">TAKE THE SYSTEM APART</span>
            <h2>
              One system.
              <br />
              <span>Two ways to understand it.</span>
            </h2>
          </div>
          <p>
            Business View explains the work and decisions. Technical View shows
            data, components and boundaries.
          </p>
        </div>
        <ArchitectureExplorer project={project} />
      </section>
      <section
        id="demonstration"
        className="studio-section case-demonstration section-anchor"
      >
        <span className="studio-kicker">
          {project.demo ? "TRY THE ORIGINAL TOOL" : "INSPECT THE ARTIFACTS"}
        </span>
        <h2>
          {project.demo
            ? "Don’t just read the case. Try it."
            : "The work you can inspect."}
        </h2>
        {project.demo ? (
          <>
            <p>
              {project.demo === "buildbrief"
                ? "Take a fictional idea through the guided steps and inspect the handoff it produces."
                : "Start with the empty sample. Add a fictional request, change its stage, and explore its planning views."}
            </p>
            <PrototypeLauncher demo={project.demo} title={project.shortName} />
            <a
              className="studio-text-link"
              href={`/demos/${project.demo}.html`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open standalone in a new tab ↗
            </a>
            <p className="demo-boundary">
              Original browser-only work sample extracted from the public
              portfolio. No live customer records, external AI calls or shared
              team backend.
            </p>
          </>
        ) : (
          <>
            <WebsiteWalkthrough />
            <div className="case-motion">
              <SystemsFilm />
            </div>
            <a className="studio-text-link" href="/explore">
              Explore the detailed process and adoption guide →
            </a>
          </>
        )}
      </section>
      <section
        id="evidence"
        className="studio-section case-evidence section-anchor"
      >
        <div>
          <span className="studio-kicker">CAPABILITIES & LIMITATIONS</span>
          <h2>
            Know what
            <br />
            <span>you’re looking at.</span>
          </h2>
          <a
            className="studio-text-link"
            href={portfolioSource}
            target="_blank"
            rel="noopener noreferrer"
          >
            Inspect the original source ↗
          </a>
        </div>
        <div>
          <h3>Available to inspect</h3>
          <ul>
            {project.capabilities.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <h3>The boundary</h3>
          <ul>
            {project.limitations.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="studio-section case-learning">
        <span className="studio-kicker">LESSONS & NEXT IMPROVEMENTS</span>
        <h2>{project.lesson}</h2>
        <p>
          <strong>The next useful test:</strong> {project.next}
        </p>
      </section>
      <div className="case-end">
        <a className="studio-back" href="/#projects">
          ← Explore another project
        </a>
        <a className="studio-button" href={`mailto:${candidate.email}`}>
          Talk about the work ↗
        </a>
      </div>
    </div>
  );
}
