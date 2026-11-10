import Link from "next/link";
import { ArrowDown, ArrowUpRight, FileText, MoveUpRight } from "lucide-react";
import { candidate, approvedRecords } from "@/lib/knowledge";
import { liveEnabled } from "@/lib/rate-limit";
import { Workspace } from "@/components/workspace";
import { PortfolioIndex } from "@/components/portfolio-index";
import { JeffElectricStory } from "@/components/jeff-electric-story";
import { IntroVideo } from "@/components/intro-video";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <>
      <div className="topbar">
        <span>JOSHUA LY / BUILDING WITH AI</span>
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
              I use AI to build
              <br />
              <span>for a real business.</span>
            </h1>
            <p className="hero-description">
              Jeff Electric is my main body of work: using AI to help turn
              business problems into useful tools, clearer workflows, and a more
              connected operation.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#projects">
                Explore the Jeff Electric work
                <ArrowUpRight size={17} />
              </a>
              <IntroVideo />
            </div>
            <div className="hero-reassurance">
              <span>
                Business understanding. AI direction. Hands-on building.
              </span>
            </div>
          </div>
          <PortfolioIndex />
        </section>
        <div className="context-strip">
          <span>ONE BUSINESS. A GROWING BODY OF WORK.</span>
          <span>Jeff Electric.</span>
          <span>Built around the team.</span>
          <a href="#workspace" aria-label="Go to recruiter workspace">
            <ArrowDown size={17} />
          </a>
        </div>
        <JeffElectricStory />
        <Workspace live={liveEnabled() && approvedRecords.length > 0} />
        <section id="about" className="about-section section-anchor">
          <div>
            <span className="eyebrow">
              <span className="short-line" /> THE PERSON GUIDING THE WORK
            </span>
            <h2>
              Business context.
              <br />
              AI as a building tool.
            </h2>
            <p>{candidate.about}</p>
            <p>
              The question I want this work to answer: how can I use AI to build
              something useful for the people running a business? Explore the
              Jeff Electric case study, then ask me about the decisions behind
              it.
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
                <dt>Business context</dt>
                <dd>Jeff Electric · residential electrical services</dd>
              </div>
              <div>
                <dt>What I bring</dt>
                <dd>Business framing, AI direction, and solution building</dd>
              </div>
              <div>
                <dt>My role</dt>
                <dd>
                  Shape requirements, prototype tools, and design handoffs
                </dd>
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
            <p>
              Ask how I used AI, what I built, or what I would do differently.
            </p>
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
