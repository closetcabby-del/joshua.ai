import { ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "@/lib/portfolio";
import { ProjectPreview } from "./project-preview";
const descriptions = [
  "Mapping the customer journey and building practical tools for a service business.",
  "Turning an early idea into clear scope, requirements and a build-ready handoff.",
  "Organizing requests, priorities and unfinished work into a usable sprint plan.",
];
export function PortfolioGallery() {
  return (
    <section id="projects" className="pf-work section-anchor">
      <div className="pf-container">
        <div className="pf-section-heading">
          <p className="pf-eyebrow">Selected work</p>
          <h2>Ideas made practical.</h2>
          <p>Explore the problem, my contribution, and the work you can try.</p>
        </div>
        <div className="pf-project-grid">
          {portfolioProjects.map((project, index) => (
            <article className="pf-project-card" key={project.slug}>
              <a
                className="pf-project-image"
                href={`/projects/${project.slug}`}
                aria-label={`Explore ${project.shortName}`}
              >
                <ProjectPreview project={project} />
              </a>
              <div className="pf-project-copy">
                <span className="pf-project-type">
                  {index === 0 ? "Business workflows" : "Working prototype"}
                </span>
                <h3>
                  <a href={`/projects/${project.slug}`}>{project.shortName}</a>
                </h3>
                <p>{descriptions[index]}</p>
                <a className="pf-link" href={`/projects/${project.slug}`}>
                  View project <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
