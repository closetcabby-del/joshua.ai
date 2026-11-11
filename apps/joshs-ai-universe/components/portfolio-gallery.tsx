import { portfolioProjects } from "@/lib/portfolio";
import { ProjectPreview } from "./project-preview";
import { PrototypeLauncher } from "./prototype-launcher";

export function PortfolioGallery() {
  return (
    <section
      id="projects"
      className="studio-section studio-gallery section-anchor"
    >
      <div className="studio-section-head">
        <div>
          <span className="studio-kicker">SELECTED SYSTEMS / 01—03</span>
          <h2>
            Explore the work.
            <br />
            <span>Inspect the thinking.</span>
          </h2>
        </div>
        <p>
          One business transformation.
          <br />
          Two working tools.
          <br />
          Different problems, the same practical approach.
        </p>
      </div>
      <div className="portfolio-grid">
        {portfolioProjects.map((project) => (
          <article
            className={`portfolio-card project-${project.accent}`}
            key={project.slug}
          >
            <a
              className="project-preview-link"
              href={`/projects/${project.slug}`}
              aria-label={`Explore ${project.shortName}`}
            >
              <ProjectPreview project={project} />
            </a>
            <div className="portfolio-card-copy">
              <div className="card-meta">
                <span>
                  {project.number} / {project.category}
                </span>
                <span>
                  {project.demo ? "Working prototype" : "Flagship case"}
                </span>
              </div>
              <h3>
                <a href={`/projects/${project.slug}`}>
                  {project.shortName} <span aria-hidden="true">↗</span>
                </a>
              </h3>
              <p>{project.summary}</p>
              <div className="project-card-actions">
                <a
                  href={`/projects/${project.slug}`}
                  className="studio-text-link"
                >
                  Explore the case <span aria-hidden="true">→</span>
                </a>
                {project.demo && (
                  <PrototypeLauncher
                    demo={project.demo}
                    title={project.shortName}
                    className="studio-button studio-button-small"
                  />
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
