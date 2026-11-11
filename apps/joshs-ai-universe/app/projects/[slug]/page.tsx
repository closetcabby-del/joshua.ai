import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
const caseCopy: Record<string, { headline: string; contribution: string }> = {
  "service-business-workflows": {
    headline: "Making the next step clearer for a service business.",
    contribution:
      "I mapped workflows and requirements, used AI to prototype internal tools, and worked through where the team needs to review information and decide what happens next.",
  },
  buildbrief: {
    headline: "A clearer brief before the build.",
    contribution:
      "I turned my BA and Product Owner approach into a guided tool for defining a problem, choosing scope and preparing a clear implementation brief.",
  },
  "sprint-backlog-planner": {
    headline: "A practical plan for the next sprint.",
    contribution:
      "I shaped the planning workflow and built a portable sample for capturing requests, setting priorities and keeping unfinished work visible.",
  },
};
export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
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
  const copy = caseCopy[slug];
  return (
    <div className="pf-case pf-container">
      <a className="pf-back" href="/#projects">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to projects
      </a>
      <header className="pf-case-header">
        <div>
          <p className="pf-eyebrow">{project.category}</p>
          <h1>{project.shortName}</h1>
          <p className="pf-case-headline">{copy.headline}</p>
          <div className="pf-actions">
            {project.demo ? (
              <PrototypeLauncher
                demo={project.demo}
                title={project.shortName}
                className="pf-button"
              />
            ) : (
              <a className="pf-button" href="#demonstration">
                See the work <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
            <a className="pf-link" href="#overview">
              Read the story
            </a>
          </div>
          <p className="pf-case-status">{project.status}</p>
        </div>
        <ProjectPreview project={project} />
      </header>
      <section id="overview" className="pf-case-overview section-anchor">
        <article id="problem" className="section-anchor">
          <p className="pf-eyebrow">The problem</p>
          <h2>What needed to change?</h2>
          <p>{project.problem}</p>
        </article>
        <article id="contribution" className="section-anchor">
          <p className="pf-eyebrow">My contribution</p>
          <h2>What I brought to it.</h2>
          <p>{copy.contribution}</p>
        </article>
      </section>
      <section className="pf-case-approach">
        <p className="pf-eyebrow">The approach</p>
        <h2>
          {project.number === "01"
            ? "Start with a handoff people recognize."
            : "Keep the first version useful."}
        </h2>
        <p>{project.approach}</p>
        <p>{project.tradeoff}</p>
      </section>
      <section id="demonstration" className="pf-case-demo section-anchor">
        <p className="pf-eyebrow">
          {project.demo ? "Try it yourself" : "A visible part of the work"}
        </p>
        <h2>
          {project.demo
            ? "Open the working prototype."
            : "The customer’s first step."}
        </h2>
        {project.demo ? (
          <>
            <p>
              {project.demo === "buildbrief"
                ? "Take a fictional idea through the questions, choose the first version, and generate a handoff with acceptance checks."
                : "Add a fictional request, set its stage and priority, and explore the board, table and sprint views."}
            </p>
            <div className="pf-actions">
              <PrototypeLauncher
                demo={project.demo}
                title={project.shortName}
                className="pf-button"
              />
              <a
                className="pf-link"
                href={`/demos/${project.demo}.html`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open standalone <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <p className="pf-demo-note">
              Browser-only work sample. Use fictional information and export
              anything you want to keep. No live business integrations are
              connected.
            </p>
          </>
        ) : (
          <>
            <p>
              The public website gives customers a place to describe their
              concern and a clear route to contact the business.
            </p>
            <figure
              id="public-website-preview"
              className="pf-artifact section-anchor"
            >
              <Image
                src="/jeff-electric-website.jpg"
                alt="Jeff Electric’s public website snapshot showing its customer introduction, team photograph and contact actions."
                width={1348}
                height={926}
                sizes="(max-width:760px) 94vw, 1050px"
                unoptimized
              />
              <figcaption>
                Public website snapshot from the original portfolio.{" "}
                <a
                  href="https://github.com/closetcabby-del/joshua.ai/blob/d70c684b6ae35263497cfe5eae43cf6c4fb966d0/assets/jeff-electric-live-preview.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source
                </a>
                .
              </figcaption>
            </figure>
            <a className="pf-link" href="/explore">
              Explore the workflow and adoption walkthrough{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </>
        )}
      </section>
      {project.number === "01" && (
        <section className="pf-case-related">
          <p className="pf-eyebrow">More of my work at Jeff Electric</p>
          <h2>Tools built around the team’s work.</h2>
          <p>
            My selected AI-assisted projects cover daily operations, site
            surveys, learning and reusable business guidance.
          </p>
          <div>
            {flagshipProjects.map((item) => (
              <article key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.purpose}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section
        className="pf-case-details"
        aria-label="Optional project details"
      >
        <p className="pf-eyebrow">Want to go deeper?</p>
        <details id="architecture" className="section-anchor">
          <summary>Explore the architecture</summary>
          <p>
            Switch between the business workflow and the technical components.
            Select a node to read its purpose, design decision and scope.
          </p>
          <ArchitectureExplorer project={project} />
        </details>
        <details id="evidence" className="section-anchor">
          <summary>Project notes, capabilities & sources</summary>
          <p>
            These descriptions are my account of the work. The included
            artifacts establish what you can inspect or try; no measured
            business results are claimed.
          </p>
          <h3>Available to inspect</h3>
          <ul>
            {project.capabilities.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <h3>Current scope</h3>
          <ul>
            {project.limitations.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <a
            className="pf-link"
            href={portfolioSource}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the original portfolio source{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </details>
        {project.number === "01" && (
          <>
            <details>
              <summary>Watch the workflow concept · 25 seconds</summary>
              <SystemsFilm />
            </details>
            <details>
              <summary>Read the website screenshot walkthrough</summary>
              <WebsiteWalkthrough />
            </details>
          </>
        )}
      </section>
      <section className="pf-case-learning">
        <p className="pf-eyebrow">What I learned</p>
        <h2>{project.lesson}</h2>
        <p>
          <strong>What I would test next:</strong> {project.next}
        </p>
      </section>
      <div className="pf-case-end">
        <a className="pf-back" href="/#projects">
          <ArrowLeft size={16} aria-hidden="true" />
          Explore another project
        </a>
        <a className="pf-button" href={`mailto:${candidate.email}`}>
          Talk about the work <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
