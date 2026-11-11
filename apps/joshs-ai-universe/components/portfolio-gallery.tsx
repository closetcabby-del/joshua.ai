import { ArrowUpRight } from "lucide-react";
import { selectedProjects } from "@/lib/selected-projects";
import { ProjectPreview } from "./project-preview";
export function PortfolioGallery() {
  return (
    <section id="projects" className="pf-work section-anchor">
      <div className="pf-container">
        <div className="pf-section-heading">
          <p className="pf-eyebrow">Selected work</p>
          <h2>Ideas made practical.</h2>
          <p>
            Seven projects built with AI. Explore the problem, my contribution
            and the practical choices behind each one.
          </p>
        </div>
        <div className="pf-project-grid">
          {selectedProjects.map((project, index) => (
            <article
              className={`pf-project-card ${index === 0 ? "pf-project-flagship" : ""}`}
              key={project.slug}
            >
              <a
                className="pf-project-image"
                href={`/projects/${project.slug}`}
                aria-label={`Explore ${project.name}`}
              >
                <ProjectPreview project={project} />
              </a>
              <div className="pf-project-copy">
                <span className="pf-project-type">{project.category}</span>
                <h3>
                  <a href={`/projects/${project.slug}`}>{project.name}</a>
                </h3>
                <p>{project.summary}</p>
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
