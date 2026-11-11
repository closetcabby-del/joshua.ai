/** An explanatory design, never a claim of a deployed Jeff Electric integration. */
export const chapters = [
  { id: "discover", label: "Discover", focus: "inquiry" },
  { id: "map", label: "Map", focus: "context" },
  { id: "design", label: "Design", focus: "assist" },
  { id: "build", label: "Build with AI", focus: "assist" },
  { id: "choose", label: "Choose the practical option", focus: "decision" },
  { id: "adopt", label: "Help people adopt it", focus: "action" },
] as const;

export type SystemNode = {
  id: string;
  label: string;
  owner: string;
  need: string;
  input: string;
  output: string;
  contribution: string;
  ai: string;
  review: string;
  status: string;
  evidence: string;
  source: string;
  gap: string;
};

export const systemNodes: readonly SystemNode[] = [
  {
    id: "inquiry",
    label: "Customer inquiry",
    owner: "Office / intake",
    need: "Understand what the customer needs before deciding the next step.",
    input: "An inquiry through a call or the public website.",
    output:
      "A proposed intake note with the concern, contact route and unanswered questions.",
    contribution:
      "Josh reports framing the gaps between first contact and the team's next action. This design makes those questions explicit.",
    ai: "Could help turn an approved note into a draft summary. This map does not connect to a phone system or collect customer data.",
    review:
      "A person checks what the customer actually said and confirms missing details.",
    status: "Proposed intake design; public website artifact exists",
    evidence: "Inspect the public website artifact",
    source: "/evidence#jeff-public-artifact",
    gap: "A redacted intake example and confirmation of Josh's specific contribution. The screenshot does not prove submission or routing works.",
  },
  {
    id: "context",
    label: "Shared context",
    owner: "Office / assigned owner",
    need: "Give the next person enough context to act without reconstructing the conversation.",
    input: "An approved intake note, open questions and an assigned owner.",
    output:
      "A proposed shared record with a next action and a place for updates.",
    contribution:
      "Josh describes exploring workflows and internal tools for service-business coordination. The record and ownership model shown here are a proposed design.",
    ai: "Could organize approved notes and flag missing fields; access and retention rules need agreement first.",
    review:
      "The assigned person confirms the record is accurate and that the handoff was accepted.",
    status: "Proposed handoff; workflow work is self-reported / prototype",
    evidence: "Read the workflow evidence record",
    source: "/evidence#jeff-workflow-building",
    gap: "A redacted record moving between real roles, with permissions and ownership demonstrated.",
  },
  {
    id: "assist",
    label: "AI assistance",
    owner: "AI drafts / person reviews",
    need: "Reduce the effort of reading context while keeping the source available.",
    input: "Approved context with usable content and permission to process it.",
    output: "A draft summary or suggested follow-up, linked to its source.",
    contribution:
      "Josh reports using AI to clarify requirements and build prototypes. This proposed step separates a draft from an approved decision.",
    ai: "Drafting, organizing and suggesting questions. No live AI call or business-system integration runs in this explanation.",
    review:
      "Check facts against the source. When usable content is missing, show that gap instead of inventing a summary.",
    status: "Conceptual assistance; AI use is self-reported",
    evidence: "Read the AI-direction evidence record",
    source: "/evidence#jeff-ai-direction",
    gap: "An authorized input/output example, the review decision and evidence of Josh's role. Historical release documentation is not a current workflow trace.",
  },
  {
    id: "decision",
    label: "Human decision",
    owner: "Authorized team member",
    need: "Make someone responsible for deciding what happens next.",
    input: "The source record, draft assistance and unresolved questions.",
    output: "A reviewed decision, named owner and clear next step.",
    contribution:
      "Josh describes keeping practical judgment with people. In this design, a draft cannot approve itself or trigger customer action.",
    ai: "Can suggest an option and explain the basis. A person decides whether it is appropriate.",
    review:
      "Confirm customer intent, operational constraints and authority before approving an action.",
    status: "Proposed review point; judgment approach is self-reported",
    evidence: "Read the human-judgment evidence record",
    source: "/evidence#jeff-human-judgment",
    gap: "An observed review and exception path, including who can approve and how corrections are recorded.",
  },
  {
    id: "action",
    label: "Next action",
    owner: "Named action owner",
    need: "Close the handoff and make the next responsibility visible.",
    input: "An approved decision and an accepted owner.",
    output: "A proposed follow-up task with status and a feedback route.",
    contribution:
      "Josh's reported focus is the gap between customer contact and action. The task, acknowledgement and feedback loop here explain the intended design.",
    ai: "Could draft a follow-up for review. No message is sent and no job is created by this page.",
    review:
      "The action owner accepts the task, checks the wording and reports completion or a blocker.",
    status: "Proposed action and adoption loop; outcome unverified",
    evidence: "Read the problem-framing evidence record",
    source: "/evidence#jeff-problem-framing",
    gap: "An authorized end-to-end trace and a measured baseline before making reliability or impact claims.",
  },
];

export type ProcessMode = "reported" | "proposed";
export const processViews = {
  reported: {
    label: "Reported current state",
    summary:
      "Josh describes customer context spread across places and handoffs that can be missed. This is his account; an observed baseline is still needed.",
    steps: [
      "Customer makes contact",
      "Context needs to be gathered",
      "Next responsibility can be unclear",
    ],
    owners: [
      "Customer → office",
      "Office → next person (to verify)",
      "Action owner (to verify)",
    ],
  },
  proposed: {
    label: "Proposed design",
    summary:
      "Keep an approved context record, name the receiving owner and require human review before the next action. This is an explanatory design, not a live integration.",
    steps: [
      "Capture the concern and missing details",
      "Share context with a named owner",
      "Review, accept and track the next action",
    ],
    owners: [
      "Office owns intake",
      "Receiving owner accepts handoff",
      "Authorized person approves; action owner follows up",
    ],
  },
} as const;

export const practicalOptions = [
  {
    id: "native",
    label: "Native features",
    reason:
      "Start here when the existing tool can cover the requirement with configuration.",
    effort:
      "Configure fields, views and permissions; test with the people doing the work.",
    cost: "Plan limits, seats, setup time and training. Confirm current terms before choosing.",
    reliability:
      "Fewer moving parts; verify that the native feature handles missing data and exceptions.",
    maintenance:
      "An internal owner maintains settings and reviews vendor changes.",
    boundary:
      "Move on when the required handoff or review cannot be represented safely.",
  },
  {
    id: "automation",
    label: "Automation",
    reason:
      "Consider a connector when a stable, repetitive handoff crosses tools.",
    effort:
      "Map fields, authenticate narrowly and design retries, duplicate protection and alerts.",
    cost: "Task volume, connector plans, setup and ongoing monitoring.",
    reliability:
      "Test timeouts, retries, partial failures and the manual recovery path.",
    maintenance:
      "A named owner monitors failures, credential expiry and upstream changes.",
    boundary:
      "Avoid automating a process whose rules or owner are still unclear.",
  },
  {
    id: "custom",
    label: "Custom code",
    reason:
      "Consider a small custom surface when a specific workflow cannot fit existing features.",
    effort:
      "Define scope, implement access controls, test and document support responsibilities.",
    cost: "Build time, hosting, security review, support and later changes.",
    reliability:
      "Needs monitoring, backup/recovery and regression checks for the full workflow.",
    maintenance:
      "Someone must own dependencies, operations and future changes.",
    boundary:
      "Choose it only when the extra control justifies that continuing responsibility.",
  },
] as const;

export function nodeIndexForKey(
  index: number,
  key: string,
  length = systemNodes.length,
): number {
  if (length < 1) return 0;
  const current = Math.max(0, Math.min(index, length - 1));
  if (key === "Home") return 0;
  if (key === "End") return length - 1;
  if (key === "ArrowRight" || key === "ArrowDown")
    return (current + 1) % length;
  if (key === "ArrowLeft" || key === "ArrowUp")
    return (current + length - 1) % length;
  return current;
}
