import { SystemsExplorer } from "@/components/systems-explorer";
import "./systems.css";

export const metadata = {
  title: "Explore how I build | Joshua Ly",
  description:
    "A Jeff Electric systems case: discovery, process mapping, architecture, building with AI, practical choices and adoption. Evidence and proposals are distinguished.",
};

export default function Explore() {
  return (
    <div className="page-inner explore-page">
      <a className="back-link" href="/">
        ← Back to Josh’s portfolio
      </a>
      <header className="explore-intro">
        <span className="eyebrow">JOSHUA LY / JEFF ELECTRIC</span>
        <h1>
          Business problems.
          <br />
          <span>Practical systems.</span>
        </h1>
        <p>
          I bring a business analyst and product owner’s approach to building
          with AI: understand the work, make the decisions clear and choose what
          people can use.
        </p>
        <p className="context-note">
          This is the approach I want to bring to business analysis, product
          ownership and AI consulting. The Jeff Electric experience is
          self-reported; the workflow below is a proposed design.
        </p>
        <a className="primary-button" href="#discover">
          Explore how I build ↓
        </a>
        <a className="subtle-link" href="/projects/service-business-workflows">
          Read the Jeff Electric case study →
        </a>
      </header>
      <SystemsExplorer />
    </div>
  );
}
