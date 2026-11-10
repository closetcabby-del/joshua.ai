import Link from "next/link";
import { ArrowDown, ArrowUpRight, FileText, MoveUpRight } from "lucide-react";
import { candidate, approvedRecords } from "@/lib/knowledge";
import { liveEnabled } from "@/lib/rate-limit";
import { Workspace } from "@/components/workspace";
import { PortfolioIndex } from "@/components/portfolio-index";
import { IntroVideo } from "@/components/intro-video";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <>
      <div className="topbar">
        <span>THE INTERACTIVE PORTFOLIO OF JOSH</span>
        <a href="/evidence">
          <span className="status-dot" />
          Evidence, before assumptions
          <ArrowUpRight size={12} />
        </a>
      </div>
      <div className="page-inner">
        <section className="hero section-anchor" id="overview">
          <div className="hero-copy">
            <div className="hero-eyebrow">JOSH’S AI UNIVERSE</div>
            <h1>
              Get to know Josh.
              <br />
              <span>Start with the work.</span>
            </h1>
            <p className="hero-description">
              A working portfolio for recruiters and hiring teams. Bring a job
              description, explore the projects, and see what the evidence
              supports.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#workspace">
                Try the recruiter tools
                <ArrowUpRight size={17} />
              </a>
              <IntroVideo />
            </div>
            <div className="hero-reassurance">
              <span>Grounded in evidence. Honest about the gaps.</span>
            </div>
          </div>
          <PortfolioIndex />
        </section>
        <div className="context-strip">
          <span>AN OPEN INVITATION TO LOOK CLOSER</span>
          <span>No account needed.</span>
          <span>Questions welcome.</span>
          <a href="#workspace" aria-label="Go to recruiter workspace">
            <ArrowDown size={17} />
          </a>
        </div>
        <Workspace live={liveEnabled() && approvedRecords.length > 0} />
        <section id="projects" className="projects-section section-anchor">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="short-line" /> SELECTED EXPLORATIONS
              </span>
              <h2>Look inside the work.</h2>
              <p>Problems, decisions, and the details that matter.</p>
            </div>
            <Link className="subtle-link" href="/evidence">
              Browse evidence
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="project-grid">
            {candidate.projects
              .filter((p) => p.featured)
              .map((p) => (
                <Link
                  className="project-card"
                  href={`/projects/${p.slug}`}
                  key={p.id}
                >
                  <span className="project-row-number" aria-hidden="true">
                    {p.number}
                  </span>
                  <div className="project-info">
                    <div className="project-category">
                      <span>{p.category}</span>
                      <span
                        className={`evidence-badge ${p.status === "Prototype" ? "prototype" : ""}`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                    <div className="project-tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="case-link">
                      Read the case study
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <p className="projects-note">
            Labels describe the evidence status. Conceptual work is a discussion
            example; it does not establish completed delivery.
          </p>
        </section>
        <section id="about" className="about-section section-anchor">
          <div>
            <span className="eyebrow">
              <span className="short-line" /> THE PERSON BEHIND THE PORTFOLIO
            </span>
            <h2>
              Start with curiosity.
              <br />
              Follow the evidence.
            </h2>
            <p>{candidate.about}</p>
            <p>
              Explore the public project sources and ask how the work was done.
              Formal employment history and a résumé have not yet been supplied.
            </p>
            <a className="subtle-link" href="/evidence">
              What’s established so far
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="profile-panel">
            <span className="eyebrow">PROFILE AT A GLANCE</span>
            <h3>
              {candidate.name}
              <span className="profile-monogram" aria-hidden="true">
                J
              </span>
            </h3>
            <dl>
              <div>
                <dt>Professional experience</dt>
                <dd>
                  {candidate.experience.length
                    ? `${candidate.experience.length} records available`
                    : "See the self-reported public portfolio"}
                </dd>
              </div>
              <div>
                <dt>Technical capabilities</dt>
                <dd>Requirements, workflows, and prototypes</dd>
              </div>
              <div>
                <dt>Independent contributions</dt>
                <dd>Self-reported; review the sources</dd>
              </div>
              <div>
                <dt>Supporting evidence</dt>
                <dd>
                  <Link href="/evidence">
                    Review the evidence library
                    <ArrowUpRight size={12} />
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </section>
        {candidate.experience.length > 0 && (
          <section className="experience-section">
            <h2>Professional experience</h2>
            {candidate.experience.map((e) => (
              <article key={`${e.organization}-${e.title}`}>
                <h3>
                  {e.title} · {e.organization}
                </h3>
                <span>
                  {e.period} · {e.status}
                </span>
                <p>{e.description}</p>
              </article>
            ))}
          </section>
        )}
        <section id="contact" className="contact-section section-anchor">
          <div>
            <span className="eyebrow">THE NEXT STEP IS A CONVERSATION</span>
            <h2>Bring your questions.</h2>
            <p>Explore a role, challenge an idea, or ask what’s missing.</p>
          </div>
          <div className="contact-actions">
            <a className="primary-button" href="#workspace">
              Open the workspace
              <MoveUpRight size={16} />
            </a>
            {candidate.email ? (
              <a href={`mailto:${candidate.email}`} className="subtle-link">
                Contact Josh
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span className="contact-unavailable">
                Contact details awaiting approval
              </span>
            )}
            {candidate.resumeUrl ? (
              <a href={candidate.resumeUrl} className="subtle-link">
                <FileText size={14} />
                View résumé
              </a>
            ) : (
              <span className="contact-unavailable">
                <FileText size={13} />
                Résumé not yet provided
              </span>
            )}
          </div>
        </section>
        <footer>
          <span>Josh’s AI universe</span>
          <p>Built to make the conversation more useful.</p>
          <Link href="/evidence#privacy">
            Privacy & evidence
            <ArrowUpRight size={12} />
          </Link>
        </footer>
      </div>
    </>
  );
}
