import { z } from "zod";
import { approvedRecords, type EvidenceRecord } from "./knowledge";
export const requestSchema = z
  .object({
    tool: z.enum(["analyze", "assistant", "interview"]),
    input: z
      .string()
      .trim()
      .min(10, "Add at least 10 characters so there is enough context.")
      .max(8000, "Keep the text under 8,000 characters."),
    history: z
      .array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string().max(2000),
        }),
      )
      .max(6)
      .default([]),
  })
  .strict();
export type ToolName = z.infer<typeof requestSchema>["tool"];
export type RecruiterResult = {
  mode: "demo" | "live";
  title: string;
  summary: string;
  items: {
    title: string;
    status: string;
    text: string;
    evidenceIds: string[];
  }[];
  questions: string[];
  sources: EvidenceRecord[];
};
export const topics = [
  {
    re: /\b(ai|llm|openai|agent|generative|rag)\b/i,
    label: "AI systems and agent design",
    question:
      "Walk me through an AI workflow you designed. Where did you need a person to make the decision?",
  },
  {
    re: /\b(automat\w*|workflow|integration|process)\b/i,
    label: "Automation and workflow design",
    question:
      "How would you decide whether this workflow needs AI, a rules-based automation, or a process change?",
  },
  {
    re: /\b(python|typescript|javascript|react|next\.?js|software|engineer|code)\b/i,
    label: "Software engineering",
    question:
      "Which parts of a project did you implement yourself, which used coding assistance, and how did you verify the result?",
  },
  {
    re: /\b(stakeholder|business|analys\w*|consult\w*|discovery|requirements)\b/i,
    label: "Discovery and business analysis",
    question:
      "Describe how you would turn a vague stakeholder request into testable requirements. What would you ask first?",
  },
  {
    re: /\b(test\w*|quality|evaluat\w*|safety|secur\w*|guardrail)\b/i,
    label: "Testing and evaluation",
    question:
      "What would you test before allowing an AI system to take an action that affects a customer?",
  },
  {
    re: /\b(production|deploy\w*|cloud|aws|azure|scale|kubernetes|docker)\b/i,
    label: "Production delivery",
    question:
      "What evidence can you share of operating a deployed system, including monitoring, failures, and your own responsibilities?",
  },
];
export function questionsFor(input: string) {
  const matched = topics.filter((t) => t.re.test(input)).map((t) => t.question);
  return [
    ...new Set([
      ...matched,
      "Choose one project and explain the problem, your contribution, the tradeoffs, and what you would change.",
      "Which requirements of this role would be new to you, and how would you approach that learning?",
    ]),
  ].slice(0, 6);
}
export function demoResult(
  tool: ToolName,
  input: string,
  records: EvidenceRecord[] = approvedRecords,
): RecruiterResult {
  const normalizedInput = ` ${input.toLowerCase().replace(/[^a-z0-9]+/g, " ")} `;
  const relevant = records.filter((r) =>
    r.tags.some((t) => {
      const tag = t
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
      return tag.length > 0 && normalizedInput.includes(` ${tag} `);
    }),
  );
  const detected = topics.filter((t) => t.re.test(input));
  const items: RecruiterResult["items"] = relevant.map((r) => ({
    title: r.title,
    status: r.status,
    text: r.claim,
    evidenceIds: [r.id],
  }));
  if (tool === "analyze") {
    for (const topic of detected) {
      if (!relevant.some((r) => topic.re.test(r.tags.join(" "))))
        items.push({
          title: topic.label,
          status: "Not established",
          text: "No approved candidate evidence currently establishes this requirement. Ask for a specific example and supporting work.",
          evidenceIds: [],
        });
    }
  }
  if (!items.length)
    items.push({
      title: "Candidate evidence needed",
      status: "Not established",
      text: "No reviewed records support an answer to this specific question. Project examples do not establish employment history, certifications, seniority, or independently verified personal contributions.",
      evidenceIds: [],
    });
  return {
    mode: "demo",
    title:
      tool === "analyze"
        ? "A starting point for the conversation"
        : tool === "interview"
          ? "Questions worth asking"
          : "What the evidence can tell you",
    summary:
      tool === "interview"
        ? "These interview prompts are selected locally from the role topics you entered. They do not imply Josh has these qualifications."
        : relevant.length
          ? "This local demonstration uses keyword overlap to find records. It does not evaluate overall fit or infer qualifications."
          : "This local demonstration found no supporting record for the question. Public project material cannot establish qualifications that are absent from the sources.",
    items,
    questions: questionsFor(input),
    sources: relevant,
  };
}
// The model selects record IDs only. Candidate claims and statuses are always copied
// from the approved knowledge base, never generated from recruiter-provided text.
export const selectionSchema = z
  .object({ recordIds: z.array(z.string()).max(8) })
  .strict();
export function groundedLiveResult(
  tool: ToolName,
  input: string,
  ids: string[],
  records: EvidenceRecord[] = approvedRecords,
): RecruiterResult {
  const unique = [...new Set(ids)];
  if (unique.some((id) => !records.some((r) => r.id === id)))
    throw new Error("Unknown evidence reference");
  const selected = records.filter((r) => unique.includes(r.id));
  const base = demoResult(tool, input, []);
  return {
    ...base,
    mode: "live",
    title:
      tool === "interview"
        ? "An evidence-led interview plan"
        : "Evidence for your review",
    summary:
      "AI selected the relevant approved records below. Claims and evidence labels are quoted directly from the knowledge base. Partial matches, transferable skills, and gaps still need your review.",
    items: selected.length
      ? selected.map((r) => ({
          title: r.title,
          status: r.status,
          text: r.claim,
          evidenceIds: [r.id],
        }))
      : base.items,
    sources: selected,
  };
}
