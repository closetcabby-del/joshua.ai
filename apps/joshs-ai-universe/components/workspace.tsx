"use client";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  LoaderCircle,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import type { RecruiterResult, ToolName } from "@/lib/recruiter";
const tools = [
  {
    id: "analyze" as const,
    label: "Analyze a job description",
  },
  { id: "assistant" as const, label: "Ask about Josh" },
  { id: "interview" as const, label: "Prepare an interview" },
];
const samples: Record<ToolName, string> = {
  analyze:
    "We are hiring an AI Solutions Consultant to lead stakeholder discovery, translate business requirements into AI workflows, build prototypes using Python or TypeScript, and evaluate systems before production deployment.",
  assistant: "How has Josh used AI to build solutions for Jeff Electric?",
  interview:
    "AI Solutions Consultant: stakeholder discovery, workflow automation, agent design, and evaluation.",
};
const descriptions: Record<
  ToolName,
  {
    title: string;
    detail: string;
    label: string;
    placeholder: string;
    cta: string;
  }
> = {
  analyze: {
    title: "Your role. The relevant evidence.",
    detail:
      "Paste a job description to explore supported strengths, open questions, and what to ask next.",
    label: "Job description",
    placeholder: "Paste the job description here…",
    cta: "Explore the fit",
  },
  assistant: {
    title: "Skip the résumé guessing game.",
    detail:
      "Ask how Josh approaches AI, business problems, and the Jeff Electric work. Answers stay close to the available evidence.",
    label: "Your question",
    placeholder: "What would you like to know about Josh?",
    cta: "Ask a question",
  },
  interview: {
    title: "Make the conversation count.",
    detail:
      "Tell us about the role. Get questions that explore decisions, contributions, and the evidence behind them.",
    label: "Target role and priorities",
    placeholder:
      "e.g. AI Solutions Consultant — discovery, automation, and agent design",
    cta: "Build interview questions",
  },
};
export function Workspace({ live }: { live: boolean }) {
  const [tool, setTool] = useState<ToolName>("analyze");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<RecruiterResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const abort = useRef<AbortController | null>(null);
  const requestGeneration = useRef(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const d = descriptions[tool];
  function resetWorkspace() {
    requestGeneration.current += 1;
    abort.current?.abort();
    abort.current = null;
    setBusy(false);
    setInput("");
    setResult(null);
    setError("");
    setHistory([]);
    setCopied(false);
  }
  function changeTool(next: ToolName) {
    resetWorkspace();
    setTool(next);
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    setCopied(false);
    setBusy(true);
    setResult(null);
    const controller = new AbortController();
    const generation = ++requestGeneration.current;
    abort.current = controller;
    const isCurrent = () =>
      generation === requestGeneration.current && !controller.signal.aborted;
    try {
      const response = await fetch("/api/recruiter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool,
          input,
          history: tool === "assistant" ? history.slice(-6) : [],
        }),
        signal: controller.signal,
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Please try again.");
      if (!isCurrent()) return;
      setResult(body);
      if (tool === "assistant")
        setHistory((h) =>
          [
            ...h,
            { role: "user" as const, content: input.slice(0, 2000) },
            {
              role: "assistant" as const,
              content: body.items
                .map((i: { text: string }) => i.text)
                .join("\n")
                .slice(0, 2000),
            },
          ].slice(-6),
        );
      requestAnimationFrame(() => {
        if (isCurrent()) resultRef.current?.focus();
      });
    } catch (err) {
      if (!isCurrent()) return;
      setError(
        err instanceof Error
          ? err.message
          : "The connection was interrupted. Please try again.",
      );
    } finally {
      if (isCurrent()) setBusy(false);
      if (abort.current === controller) abort.current = null;
    }
  }
  async function copy() {
    if (!result) return;
    const generation = requestGeneration.current;
    try {
      await navigator.clipboard.writeText(
        [
          result.title,
          result.summary,
          ...result.items.map((i) => `${i.title} (${i.status}): ${i.text}`),
          ...result.questions,
          ...result.sources.flatMap((s) =>
            s.sources.map((a) => `${a.label}: ${a.url}`),
          ),
        ].join("\n\n"),
      );
      if (generation === requestGeneration.current) setCopied(true);
    } catch {
      if (generation !== requestGeneration.current) return;
      setError(
        "Copy is unavailable in this browser. You can select the results and copy them.",
      );
    }
  }
  return (
    <section id="workspace" className="workspace-section section-anchor">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <span className="short-line" /> THE RECRUITER WORKSPACE
          </span>
          <h2>Bring a role into the conversation.</h2>
        </div>
        <span className="no-signup">
          <Check size={14} /> Explore the evidence behind the work.
        </span>
      </div>
      <div className="workspace-card">
        <div className="tool-tabs" role="tablist" aria-label="Recruiter tools">
          {tools.map((t) => (
            <button
              key={t.id}
              type="button"
              id={`tab-${t.id}`}
              role="tab"
              aria-selected={tool === t.id}
              aria-controls="tool-panel"
              tabIndex={tool === t.id ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const n =
                    tools[
                      (tools.findIndex((x) => x.id === tool) +
                        (e.key === "ArrowRight" ? 1 : 2)) %
                        3
                    ];
                  changeTool(n.id);
                  document.getElementById(`tab-${n.id}`)?.focus();
                }
              }}
              onClick={() => changeTool(t.id)}
            >
              {t.label}
              {tool === t.id && <span className="tab-dot" />}
            </button>
          ))}
        </div>
        <div
          className="tool-panel"
          role="tabpanel"
          id="tool-panel"
          aria-labelledby={`tab-${tool}`}
        >
          <div className="tool-main">
            <div className="tool-title-row">
              <div>
                <h3>{d.title}</h3>
                <p>{d.detail}</p>
              </div>
              <span className="demo-badge">
                <span />
                {live ? "AI available" : "Demo mode"}
              </span>
            </div>
            {tool === "assistant" && history.length > 0 && (
              <div
                className="conversation-history"
                aria-label="Recent conversation"
              >
                {history.map((message, i) => (
                  <div key={i}>
                    <span>
                      {message.role === "user" ? "You" : "Evidence assistant"}
                    </span>
                    <p>{message.content}</p>
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={submit}>
              {tool === "assistant" && (
                <div
                  className="suggested-questions"
                  aria-label="Suggested questions"
                >
                  {[
                    "How does Josh use AI at Jeff Electric?",
                    "What should I ask in an interview?",
                    "What did Josh contribute at Jeff Electric?",
                  ].map((q) => (
                    <button key={q} type="button" onClick={() => setInput(q)}>
                      {q}
                      <ArrowUpRight size={11} />
                    </button>
                  ))}
                </div>
              )}
              <div className="input-label">
                <label htmlFor="recruiter-input">{d.label}</label>
                <button
                  type="button"
                  className="sample-button"
                  onClick={() => setInput(samples[tool])}
                >
                  Try an example
                </button>
              </div>
              <textarea
                id="recruiter-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                minLength={10}
                maxLength={8000}
                required
                rows={5}
                placeholder={d.placeholder}
                aria-describedby="input-help"
              />
              <div className="input-bottom">
                <span>{input.length.toLocaleString()} / 8,000</span>
                {input && (
                  <button type="button" onClick={resetWorkspace}>
                    <RotateCcw size={12} />
                    Clear
                  </button>
                )}
              </div>
              <div className="tool-submit">
                <p id="input-help">
                  <ShieldCheck size={14} />
                  {live
                    ? "Sent to OpenAI for processing. Not saved by this app."
                    : "Processed locally by this app. No conversation is saved."}
                </p>
                <button
                  className="primary-button"
                  disabled={busy}
                  type="submit"
                >
                  {busy ? (
                    <>
                      <LoaderCircle className="spin" size={17} />
                      Reviewing…
                    </>
                  ) : (
                    <>
                      {d.cta}
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}
          </div>
          <aside className="tool-aside">
            <div className="aside-icon">
              <span aria-hidden="true">A note</span>
            </div>
            <h4>
              Clarity over a<br />
              match score.
            </h4>
            <p>
              See what’s supported, what’s transferable, and what needs a closer
              look.
            </p>
            <ul>
              <li>
                <Check size={14} />
                Evidence linked when available
              </li>
              <li>
                <Check size={14} />
                Gaps called out clearly
              </li>
              <li>
                <Check size={14} />
                Better interview questions
              </li>
            </ul>
            <a href="/evidence">
              How evidence works <ArrowUpRight size={13} />
            </a>
          </aside>
        </div>
        {result && (
          <div
            className="results"
            tabIndex={-1}
            ref={resultRef}
            aria-live="polite"
          >
            <div className="result-heading">
              <div>
                <span className="eyebrow">
                  {result.mode === "demo"
                    ? "LOCAL DEMONSTRATION"
                    : "AI-SELECTED EVIDENCE"}
                </span>
                <h3>{result.title}</h3>
              </div>
              <button className="copy-button" onClick={copy}>
                {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
                {copied ? "Copied" : "Copy results"}
              </button>
            </div>
            <p>{result.summary}</p>
            <div className="result-items">
              {result.items.map((item, i) => (
                <article key={i}>
                  <div>
                    <h4>{item.title}</h4>
                    <span className="evidence-badge">{item.status}</span>
                  </div>
                  <p>{item.text}</p>
                  {item.evidenceIds.map((id) => (
                    <a key={id} href={`/evidence#${id}`}>
                      Review evidence: {id} <ArrowUpRight size={12} />
                    </a>
                  ))}
                </article>
              ))}
            </div>
            <h4 className="questions-title">Take these into the interview</h4>
            <ol className="question-list">
              {result.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
            {result.sources.length > 0 && (
              <div className="result-sources">
                <h4>Supporting records</h4>
                {result.sources.map((s) => (
                  <div key={s.id}>
                    <a href={`/evidence#${s.id}`}>{s.title}</a>
                    {s.sources.map((a) => (
                      <a href={a.url} key={a.url}>
                        {a.label} ↗
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <p className="workspace-footnote">
        <span className="status-dot" />{" "}
        {live
          ? "AI selection is available for approved candidate records."
          : "Local demo using reviewed public sources. Self-reported contributions are labeled."}{" "}
        <a href="/evidence">
          See the evidence status <ArrowUpRight size={12} />
        </a>
      </p>
    </section>
  );
}
