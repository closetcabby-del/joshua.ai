import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  MapPin,
  Search,
  Layers3,
  Wrench,
} from "lucide-react";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { IntroVideo } from "@/components/intro-video";
import { candidate } from "@/lib/knowledge";
const methodSteps = [
  {
    Icon: Search,
    title: "Understand the problem",
    copy: "Talk through the current process, find the gaps, and make the next responsibility clear.",
  },
  {
    Icon: Layers3,
    title: "Choose a practical solution",
    copy: "Start with what the business already has. Add automation or custom software where it earns its place.",
  },
  {
    Icon: Wrench,
    title: "Build with the people using it",
    copy: "Prototype, check the result against the requirements, and use feedback to decide what to improve.",
  },
];
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="pf-home">
      <section className="pf-hero" aria-label="Introduction">
        <div className="pf-hero-content pf-container">
          <div className="pf-avatar">
            <Image
              src="/joshua-ly-portrait.jpg"
              width={120}
              height={120}
              unoptimized
              priority
              alt="Joshua Ly"
            />
          </div>
          <p className="pf-role">
            Business Analyst <span>·</span> Product Owner <span>·</span> AI
            Solutions
          </p>
          <h1>
            Joshua <span>Ly</span>
          </h1>
          <p className="pf-tagline">
            I help businesses work better.
            <br />I use AI to build practical solutions.
          </p>
          <div className="pf-meta">
            <span>
              <MapPin size={15} aria-hidden="true" /> Houston area, Texas
            </span>
            <span className="pf-available">
              <i aria-hidden="true" />
              Open to opportunities
            </span>
          </div>
          <div className="pf-actions">
            <a className="pf-button" href="#projects">
              Explore my work <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a className="pf-button pf-button-ghost" href="#contact">
              Get in touch <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <a
            href="/projects/service-business-workflows"
            className="pf-hero-featured"
          >
            Start with Jeff Electric{" "}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <a
          className="pf-scroll"
          href="#projects"
          aria-label="Scroll to selected projects"
        >
          <ArrowDown size={22} aria-hidden="true" />
        </a>
      </section>
      <PortfolioGallery />
      <section className="pf-about section-anchor" id="about">
        <div className="pf-container pf-about-grid">
          <div>
            <p className="pf-eyebrow">About Josh</p>
            <h2>
              I start with how
              <br />
              the work gets done.
            </h2>
            <p>
              I’m a Business Analyst and Product Owner who likes turning a
              complicated business problem into something people can actually
              use.
            </p>
            <p>
              I use AI to help explore ideas, write and refine requirements, and
              build prototypes. I care about the tradeoffs: what the team needs,
              what it will cost, and who will maintain it.
            </p>
            <p>
              Jeff Electric is where much of that thinking becomes hands-on
              work—from customer intake and operational handoffs to internal
              tools and team adoption.
            </p>
            <a className="pf-link" href="/projects/service-business-workflows">
              See how that looks at Jeff Electric{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="pf-method">
            <h3>How I approach a project</h3>
            {methodSteps.map(({ Icon, title, copy }) => (
              <article key={title}>
                <span>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h4>{title}</h4>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="pf-contact section-anchor" id="contact">
        <div className="pf-container">
          <p className="pf-eyebrow">Let’s connect</p>
          <h2>
            Have something
            <br />
            worth working on?
          </h2>
          <p>
            I’m interested in AI solutions, product ownership and business
            transformation work. Let’s talk about the problem you’re trying to
            solve.
          </p>
          <div className="pf-actions">
            <a className="pf-button" href={`mailto:${candidate.email}`}>
              <Mail size={17} aria-hidden="true" />
              Email Josh
            </a>
            <a
              className="pf-button pf-button-ghost"
              href="https://www.linkedin.com/in/joshua-ly/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <a className="pf-email" href={`mailto:${candidate.email}`}>
            {candidate.email}
          </a>
        </div>
      </section>
      <footer className="pf-footer">
        <div className="pf-container">
          <a href="/">Josh’s AI Universe</a>
          <div>
            <a href="/lab">More experiments</a>
            <a href="/evidence">Project sources</a>
            <a href="/tools">Portfolio tools · Demo</a>
            <IntroVideo />
          </div>
          <p>© 2026 Joshua Ly</p>
        </div>
      </footer>
    </div>
  );
}
