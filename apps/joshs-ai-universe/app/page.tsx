import Image from "next/image";
import { ArchitectureExplorer } from "@/components/architecture-explorer";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { StudioMotion } from "@/components/studio-motion";
import { IntroVideo } from "@/components/intro-video";
import { portfolioProjects } from "@/lib/portfolio";
import { candidate } from "@/lib/knowledge";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div className="studio-home">
      <section className="studio-hero">
        <div className="studio-hero-copy">
          <div className="identity-line">
            <Image
              src="/joshua-ly-portrait.jpg"
              width={64}
              height={64}
              unoptimized
              priority
              alt="Joshua Ly"
            />
            <div>
              <strong>Joshua Ly</strong>
              <span>Business analysis · Product thinking · AI systems</span>
            </div>
          </div>
          <h1>
            Turning messy work
            <br />
            into <span>useful systems.</span>
          </h1>
          <p>
            I work through the business problem, shape the solution, and build
            with AI. The goal is something people can use—and a cost the
            business can sustain.
          </p>
          <div className="studio-hero-actions">
            <a
              href="/projects/service-business-workflows"
              className="studio-button"
            >
              Explore Jeff Electric <span aria-hidden="true">↗</span>
            </a>
            <a href="#projects" className="studio-text-link">
              See the three projects <span aria-hidden="true">↓</span>
            </a>
          </div>
          <StudioMotion />
          <div className="hero-footnote">
            <span>Understand the work.</span>
            <span>Make the decisions clear.</span>
            <span>Build what helps.</span>
          </div>
        </div>
        <div className="studio-hero-system">
          <ArchitectureExplorer project={portfolioProjects[0]} compact />
          <a
            className="system-case-link"
            href="/projects/service-business-workflows#architecture"
          >
            <span>JEFF ELECTRIC / EXPLORE THE FULL CASE</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <PortfolioGallery />
      <section
        id="approach"
        className="studio-section approach-studio section-anchor"
      >
        <div className="studio-section-head">
          <div>
            <span className="studio-kicker">HOW I THINK</span>
            <h2>
              The right tool starts
              <br />
              with a <span>better question.</span>
            </h2>
          </div>
          <p>
            I’m interested in the space between a vague request and a system
            that makes the work clearer.
          </p>
        </div>
        <div className="approach-rows">
          {[
            [
              "01",
              "Find the actual problem",
              "Who is doing the work? What gets missed? What would make the next action easier?",
            ],
            [
              "02",
              "Choose the practical option",
              "Start with existing capabilities. Add automation or custom code when the requirement justifies the extra maintenance.",
            ],
            [
              "03",
              "Build, test, learn",
              "Use AI to move from requirements to a prototype. Check the result against the brief, then bring it back to the people using it.",
            ],
          ].map(([n, title, copy]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <a className="studio-text-link" href="/explore">
          Follow the Jeff Electric design decisions{" "}
          <span aria-hidden="true">→</span>
        </a>
      </section>
      <section
        id="about"
        className="studio-section studio-about section-anchor"
      >
        <figure className="about-portrait">
          <div className="portrait-frame">
            <Image
              src="/joshua-ly-portrait.jpg"
              width={1206}
              height={1281}
              sizes="(max-width:760px) 90vw, 400px"
              unoptimized
              alt="Joshua Ly smiling in a navy blazer and white shirt"
            />
          </div>
          <figcaption>Joshua Ly / The person behind the work</figcaption>
        </figure>
        <div>
          <span className="studio-kicker">ABOUT JOSH</span>
          <h2>
            I like the part
            <br />
            where the problem
            <br />
            <span>starts to make sense.</span>
          </h2>
          <p>
            My work brings business analysis and product ownership together with
            hands-on building with AI. I map the work, shape requirements, try
            solutions and work through the tradeoffs.
          </p>
          <p>
            Jeff Electric is my flagship story. BuildBrief and the planner show
            how I turn that way of thinking into tools other people can try.
          </p>
          <p>
            I’m interested in business analysis, product ownership and AI
            solutions work where understanding the business matters as much as
            building the interface.
          </p>
          <a className="studio-text-link" href="/lab">
            Visit the AI Lab <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section
        id="contact"
        className="studio-section studio-contact section-anchor"
      >
        <span className="studio-kicker">LET’S TALK ABOUT THE WORK</span>
        <div>
          <h2>
            What needs to
            <br />
            <span>work better?</span>
          </h2>
          <div>
            <p>
              Have a role, a business problem or a system you’d like to discuss?
              I’d like to hear about it.
            </p>
            <a className="studio-button" href={`mailto:${candidate.email}`}>
              Talk with Josh <span aria-hidden="true">↗</span>
            </a>
            <a className="contact-email" href={`mailto:${candidate.email}`}>
              {candidate.email}
            </a>
          </div>
        </div>
      </section>
      <footer className="studio-footer">
        <a href="/">Josh’s AI Universe</a>
        <span>Business context. Practical systems.</span>
        <a href="/evidence">Sources & privacy</a>
        <a href="/tools">Portfolio tools · Demo</a>
        <IntroVideo />
      </footer>
    </div>
  );
}
