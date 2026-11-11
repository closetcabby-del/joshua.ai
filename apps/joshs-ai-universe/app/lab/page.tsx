import { labConcepts, portfolioSource } from "@/lib/portfolio";
export const metadata = { title: "AI Lab | Joshua Ly" };
export default function Lab() {
  return (
    <div className="studio-lab">
      <a className="studio-back" href="/">
        ← Back to the portfolio
      </a>
      <header>
        <span className="studio-kicker">AI LAB / SMALLER EXPERIMENTS</span>
        <h1>
          A place to ask
          <br />
          <span>the next question.</span>
        </h1>
        <p>
          Selected projects and ideas in progress. Explore the working samples
          in selected work, and open an experiment below to understand its
          scope.
        </p>
        <a className="studio-button" href="/#projects">
          Explore the featured projects ↗
        </a>
      </header>
      <div className="lab-experiments">
        {labConcepts.map((concept, i) => (
          <article key={concept.name}>
            <span className="studio-kicker">
              0{i + 1} / {concept.tag}
            </span>
            <h2>{concept.question}</h2>
            <details>
              <summary>
                {concept.name} <span aria-hidden="true">+</span>
              </summary>
              <p>{concept.detail}</p>
              {concept.name === "Pilates with Moni" ? (
                <p>
                  Source: Josh’s selected AI-built project list. Public
                  demonstration pending.
                </p>
              ) : (
                <a
                  className="studio-text-link"
                  href={portfolioSource}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the original account ↗
                </a>
              )}
            </details>
          </article>
        ))}
      </div>
      <section className="lab-tool">
        <div>
          <span className="studio-kicker">AN INTERACTIVE DEMO</span>
          <h2>Ask about the portfolio.</h2>
          <p>
            The existing evidence-aware tools can help frame interview questions
            and explore the source records. They run in demonstration mode.
          </p>
        </div>
        <a className="studio-button" href="/tools">
          Open portfolio tools ↗
        </a>
      </section>
    </div>
  );
}
