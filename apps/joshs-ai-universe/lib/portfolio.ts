export type PortfolioNode = {
  id: string;
  label: string;
  technicalLabel: string;
  kind: "Person" | "Application" | "Data" | "AI assistance" | "Decision";
  status: "Artifact" | "Prototype" | "Design" | "External";
  business: string;
  technical: string;
  input: string;
  output: string;
  why: string;
  boundary: string;
};
export type PortfolioProject = {
  slug: string;
  shortName: string;
  title: string;
  number: string;
  category: string;
  status: string;
  accent: string;
  summary: string;
  problem: string;
  contribution: string;
  approach: string;
  tradeoff: string;
  capabilities: string[];
  limitations: string[];
  lesson: string;
  next: string;
  demo?: "buildbrief" | "planner";
  nodes: PortfolioNode[];
  edges: [string, string][];
};

export const portfolioSource =
  "https://github.com/closetcabby-del/joshua.ai/blob/d70c684b6ae35263497cfe5eae43cf6c4fb966d0/index.html";

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "service-business-workflows",
    shortName: "Jeff Electric",
    number: "01",
    title: "The work between the handoffs.",
    category: "Business transformation",
    status: "Artifacts, prototypes & evolving design",
    accent: "blue",
    summary:
      "A service business. Many moving parts. One question: who needs to do what next?",
    problem:
      "Customer context can get scattered across calls, leads, estimates, jobs and follow-up. The next person has to reconstruct the story before acting.",
    contribution:
      "I mapped the customer journey and operating model, shaped requirements, prototyped internal tools with AI assistance, and worked through where people need to review and decide. This is my account of the work, supported by the linked portfolio records.",
    approach:
      "Start with a handoff people recognize. Identify its input, receiving owner and missing information. Then decide whether an existing feature, a small tool or an integration can make that handoff clearer.",
    tradeoff:
      "Keep consequential decisions with the team. AI can help interpret a note; it should not become the source of truth or approve its own suggested action.",
    capabilities: [
      "Inspect the authentic public website artifact",
      "Explore the customer-context and ownership design",
      "Compare native features, automation and custom development",
    ],
    limitations: [
      "The map is an explanatory design, not a connected operational system.",
      "Internal-tool work is self-reported or prototyped; a redacted end-to-end workflow trace is still needed.",
      "No time-saved, revenue or adoption metric is established.",
    ],
    lesson:
      "A useful automation starts with a clear owner and a clear next action. Connecting tools does not resolve an unclear process.",
    next: "Demonstrate one redacted intake-to-handoff example, including a missing-information case and the receiving person’s review.",
    nodes: [
      {
        id: "inquiry",
        label: "Customer inquiry",
        technicalLabel: "Intake channels",
        kind: "Person",
        status: "Artifact",
        business:
          "A customer describes what they need. Capture the concern without asking them to diagnose it.",
        technical:
          "The reviewed website image shows call and estimate actions. Phone/form routing is not connected to this explorer.",
        input: "Customer concern and contact route",
        output: "An intake note and unanswered questions",
        why: "Begin with the customer’s language, not the software’s fields.",
        boundary:
          "A website screenshot establishes the visible interface; it does not prove submission, routing or authorship.",
      },
      {
        id: "context",
        label: "Keep the context",
        technicalLabel: "Customer / lead record",
        kind: "Data",
        status: "Design",
        business:
          "Keep the customer’s story with the next responsibility so the team does not have to piece it together again.",
        technical:
          "Proposed shared customer/lead state with source notes, next action and a named owner. No database connection runs here.",
        input: "Reviewed intake note",
        output: "Structured context and an owner",
        why: "A shared record gives the handoff something concrete to travel with.",
        boundary:
          "Record permissions, deduplication and persistence require implementation and verification.",
      },
      {
        id: "review",
        label: "A person decides",
        technicalLabel: "Approval boundary",
        kind: "Decision",
        status: "Design",
        business:
          "An authorized person reviews the source, resolves gaps and decides what should happen next.",
        technical:
          "Proposed human approval between draft assistance and an operational action. A draft has no execution authority.",
        input: "Source context, AI draft and open questions",
        output: "Reviewed decision and assigned action",
        why: "Keep responsibility visible when a decision affects a customer.",
        boundary:
          "The actual approval roles, audit trail and exception path are not demonstrated by this map.",
      },
      {
        id: "assist",
        label: "AI helps prepare",
        technicalLabel: "Drafting / interpretation",
        kind: "AI assistance",
        status: "Design",
        business:
          "Use usable context to prepare a summary or a useful follow-up question. Keep missing information explicit.",
        technical:
          "Conceptual AI step consuming approved context and returning a draft linked to its source. No model API is called.",
        input: "Authorized notes with usable content",
        output: "Draft summary or suggested questions",
        why: "Reduce reading effort while keeping the original evidence available.",
        boundary:
          "Missing context must not become an invented answer; a person reviews the draft.",
      },
      {
        id: "job",
        label: "Make work actionable",
        technicalLabel: "Scheduling / job handoff",
        kind: "Application",
        status: "Prototype",
        business:
          "Give the next person enough information to schedule or carry out the work, with a route for reporting a blocker.",
        technical:
          "Reported internal-tool prototypes and proposed job/scheduling handoffs. No live field-service integration is represented.",
        input: "Approved scope and accepted ownership",
        output: "Job instructions or an agreed next task",
        why: "An assignment is only useful when the receiving person can act on it.",
        boundary:
          "Real scheduling, permissions and customer communications remain outside this demo.",
      },
      {
        id: "feedback",
        label: "Close the loop",
        technicalLabel: "Status / feedback",
        kind: "Person",
        status: "Design",
        business:
          "Check whether the handoff worked. Use questions, corrections and team feedback to improve the process.",
        technical:
          "Proposed acknowledgement, status updates and exception feedback. Adoption and reliability have not been measured.",
        input: "Completion, exception or employee feedback",
        output: "An updated record or a reviewed improvement",
        why: "End-user feedback should change what gets built next.",
        boundary:
          "A completed rollout or measured operational outcome is not claimed.",
      },
    ],
    edges: [
      ["inquiry", "context"],
      ["context", "review"],
      ["context", "assist"],
      ["assist", "review"],
      ["review", "job"],
      ["job", "feedback"],
    ],
  },
  {
    slug: "buildbrief",
    shortName: "BuildBrief",
    number: "02",
    title: "A better starting point for the build.",
    category: "Requirements into a product",
    status: "Working browser prototype",
    accent: "orange",
    demo: "buildbrief",
    summary:
      "Turn a rough software idea into a structured brief a builder can actually work from.",
    problem:
      "An idea can sound clear until someone tries to build it. Scope, workflows, constraints and acceptance criteria are often missing from the first prompt.",
    contribution:
      "I turned BA and Product Owner thinking into a guided experience: clarify the need, choose scope, describe the workflow and define what would count as done. The included prototype is inspectable; my contribution is described in the original portfolio.",
    approach:
      "Keep the questions approachable, but preserve a structured model underneath. The output should carry the decisions forward instead of making the next builder reconstruct them from a chat.",
    tradeoff:
      "A browser-only prototype keeps the experience easy to try. It can structure a brief without needing an AI API, accounts or a backend; it cannot independently validate the business need or build the application.",
    capabilities: [
      "Launch the original standalone BuildBrief prototype",
      "Work through guided requirements and scope",
      "Inspect the generated implementation handoff",
    ],
    limitations: [
      "Browser-local work sample, with no shared backend or team synchronization.",
      "The prototype structures user input; it does not autonomously build or validate software.",
      "Use fictional input. Export a copy when you want to retain your work.",
    ],
    lesson:
      "The valuable artifact is the structured brief. A polished prompt is useful only if it carries clear decisions and testable requirements.",
    next: "Test the generated brief with a builder and trace any misunderstanding back to a missing question or acceptance criterion.",
    nodes: [
      {
        id: "idea",
        label: "Start with an idea",
        technicalLabel: "Guided input",
        kind: "Person",
        status: "Prototype",
        business:
          "Explain the problem and who it affects in ordinary language.",
        technical:
          "Local HTML form controls capture a project idea. The prototype does not send that input to an AI provider.",
        input: "Problem, audience and desired outcome",
        output: "An initial project draft",
        why: "Let people begin without knowing formal requirements terminology.",
        boundary:
          "The user supplies the facts; the application does not independently verify them.",
      },
      {
        id: "questions",
        label: "Ask useful questions",
        technicalLabel: "Step / draft state",
        kind: "Application",
        status: "Prototype",
        business:
          "Work through scope, workflow and constraints a step at a time.",
        technical:
          "Client-side JavaScript manages the current step and project draft; browser storage is used when available.",
        input: "Answers and scope choices",
        output: "Structured project state",
        why: "Small decisions are easier to review than one enormous unstructured prompt.",
        boundary:
          "There is no multi-user concurrency or server-side persistence.",
      },
      {
        id: "scope",
        label: "Make the choices",
        technicalLabel: "Scope & acceptance model",
        kind: "Decision",
        status: "Prototype",
        business:
          "Choose what matters now, what stays out and what a successful result must do.",
        technical:
          "The prototype collects scope, user stories, acceptance criteria and platform/data/security choices into a local requirements model.",
        input: "Workflow and priority choices",
        output: "Requirements and explicit exclusions",
        why: "Give the builder boundaries, not just a list of desired features.",
        boundary:
          "A completed form does not establish feasibility, regulatory compliance or a validated business case.",
      },
      {
        id: "draft",
        label: "Keep one brief",
        technicalLabel: "Browser draft",
        kind: "Data",
        status: "Prototype",
        business:
          "Keep the decisions together as the idea becomes more specific.",
        technical:
          "A local draft can be saved in browser storage. Storage availability depends on the browser and the launch context.",
        input: "The current project model",
        output: "A retained local draft when available",
        why: "Maintain one coherent starting point instead of scattering decisions across messages.",
        boundary:
          "Browser storage is not an account, backup system or secure document store.",
      },
      {
        id: "handoff",
        label: "Prepare the handoff",
        technicalLabel: "Implementation brief",
        kind: "Application",
        status: "Prototype",
        business:
          "Package the problem, scope, requirements and checks for the next builder.",
        technical:
          "The standalone prototype generates an implementation handoff from the captured state and exposes copy/export controls.",
        input: "Reviewed requirements model",
        output: "A portable implementation brief",
        why: "Make the decisions usable outside the original conversation.",
        boundary:
          "Generating a brief does not execute code or deploy an application.",
      },
      {
        id: "builder",
        label: "Build and verify",
        technicalLabel: "External delivery loop",
        kind: "Person",
        status: "External",
        business:
          "A builder uses the brief, and a person checks the result against the agreed criteria.",
        technical:
          "The coding tool, implementation and acceptance review are outside the included prototype.",
        input: "Implementation brief and acceptance criteria",
        output: "A separately built and reviewed solution",
        why: "Keep specification, implementation and acceptance as distinct responsibilities.",
        boundary:
          "No autonomous developer, QA agent or closed-loop integration is running here.",
      },
    ],
    edges: [
      ["idea", "questions"],
      ["questions", "scope"],
      ["scope", "handoff"],
      ["questions", "draft"],
      ["draft", "handoff"],
      ["handoff", "builder"],
    ],
  },
  {
    slug: "sprint-backlog-planner",
    shortName: "Sprint & Backlog Planner",
    number: "03",
    title: "Make the next planning conversation clearer.",
    category: "Work into a shared plan",
    status: "Working standalone sample",
    accent: "purple",
    demo: "planner",
    summary:
      "Capture requests, choose priorities and keep unfinished work visible across iterations.",
    problem:
      "Small teams can lose priorities and unfinished work across spreadsheets and recurring planning conversations. A board alone does not explain what should happen next.",
    contribution:
      "I shaped the planning workflow and interface, added sprint selection and carryover behavior, and developed a portable way to capture and share a planning session. The original portfolio includes the generalized working sample.",
    approach:
      "Make work visible in board, table and sprint views. Keep prioritization and commitment with people, and give them a portable record of the planning session.",
    tradeoff:
      "A standalone file is simple to try and share. It avoids an infrastructure commitment, but shared synchronization and a production permission model require separate work.",
    capabilities: [
      "Launch the original generalized, empty planner",
      "Create and organize work in planning views",
      "Use the prototype’s portable export and snapshot controls",
    ],
    limitations: [
      "Starts with no business records; sprint dates are example iterations.",
      "Local sample, without live Microsoft Lists or shared-team synchronization.",
      "Use Save File or exports to retain a portable copy.",
    ],
    lesson:
      "Carryover should be a conscious decision, not work disappearing between planning meetings.",
    next: "Observe a small planning session and test whether priorities, carryover and ownership remain clear to every participant.",
    nodes: [
      {
        id: "request",
        label: "Capture the request",
        technicalLabel: "Ticket input",
        kind: "Person",
        status: "Prototype",
        business:
          "Give a request a title, summary and enough context for a planning discussion.",
        technical:
          "The local HTML sample accepts ticket fields and notes through its editor. It begins with an empty dataset.",
        input: "A fictional request and its context",
        output: "A local ticket",
        why: "Make the work concrete before asking people to prioritize it.",
        boundary: "No employer, employee or customer records are preloaded.",
      },
      {
        id: "backlog",
        label: "See the work",
        technicalLabel: "Local data adapter",
        kind: "Data",
        status: "Prototype",
        business:
          "Bring the work into one place so priorities and status can be compared.",
        technical:
          "The standalone adapter keeps ticket rows in browser memory, with browser-draft storage when available.",
        input: "Ticket records",
        output: "Local backlog state",
        why: "Keep the source state separate from how the board or table presents it.",
        boundary:
          "This portable sample has no shared database or multi-user conflict handling.",
      },
      {
        id: "prioritize",
        label: "Choose what matters",
        technicalLabel: "Priority / stage fields",
        kind: "Decision",
        status: "Prototype",
        business:
          "Decide priority and stage together instead of letting a tool pretend to make the business decision.",
        technical:
          "The interface edits the local priority, urgency, stage and sprint values used by its views.",
        input: "Backlog and human priorities",
        output: "A reviewed ordering and work state",
        why: "Software can show the tradeoff; people still decide which work matters.",
        boundary:
          "The sample does not measure business value or assign priority with an AI model.",
      },
      {
        id: "sprint",
        label: "Plan an iteration",
        technicalLabel: "Sprint / calendar views",
        kind: "Application",
        status: "Prototype",
        business: "Look at the chosen work in the context of an iteration.",
        technical:
          "Client-side views filter the same local ticket state by example sprint iterations.",
        input: "Selected tickets and iteration",
        output: "A visible sprint plan",
        why: "Use one set of records across multiple planning views.",
        boundary:
          "Example dates are not a live team calendar or a capacity forecast.",
      },
      {
        id: "review",
        label: "Review and carry over",
        technicalLabel: "Status / carryover logic",
        kind: "Person",
        status: "Prototype",
        business:
          "Complete work or deliberately decide what needs another iteration.",
        technical:
          "The standalone sample includes sprint selection and carryover behavior around its local ticket state.",
        input: "Current work status",
        output: "Reviewed completion or carryover",
        why: "Keep unfinished work visible instead of silently losing it.",
        boundary:
          "Human review is still needed; no production approval workflow is connected.",
      },
      {
        id: "snapshot",
        label: "Keep a useful record",
        technicalLabel: "CSV / portable HTML",
        kind: "Application",
        status: "Prototype",
        business:
          "Take a portable version into the next planning conversation.",
        technical:
          "Export controls produce browser-generated files and portable snapshots. Import/export remains local to the sample.",
        input: "Current local backlog",
        output: "A downloaded planning artifact",
        why: "Make the plan usable beyond a single browser session.",
        boundary:
          "A snapshot is not shared synchronization, a secure backup service or an enterprise audit trail.",
      },
    ],
    edges: [
      ["request", "backlog"],
      ["backlog", "prioritize"],
      ["prioritize", "sprint"],
      ["sprint", "review"],
      ["review", "snapshot"],
      ["review", "backlog"],
    ],
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export const labConcepts = [
  {
    name: "Pilates with Moni",
    tag: "Selected AI-built project · self-reported",
    question: "How can a digital experience support a personal service?",
    detail:
      "Josh selected Pilates with Moni as an example of his AI-assisted building. A public implementation trace and demonstration have not been reviewed for this portfolio, so no booking, payment, coaching or live integration capability is claimed here.",
  },
  {
    name: "Business Discovery AI",
    tag: "Discovery concept",
    question: "What would a useful business model remember?",
    detail:
      "An adaptive interview that organizes people, processes, systems and gaps into a durable model. The public portfolio describes a product/UX prototype; no persistent discovery service is connected here.",
  },
  {
    name: "Private Meeting Historian",
    tag: "Architecture / specification",
    question: "What changed between the meetings?",
    detail:
      "Reconcile transcripts, decisions and commitments into a canonical record, then compare across time. This is an architecture concept. No recordings, private meeting content or live memory system are loaded.",
  },
  {
    name: "Agent / GPT / Plugin Factory",
    tag: "Prototype / partial",
    question: "How do you keep a growing set of agents accountable?",
    detail:
      "Role boundaries, source hierarchies, tool permissions and evaluation packages. The public account describes reusable patterns, not a complete autonomous deployment factory.",
  },
];

export const flagshipProjects = [
  {
    name: "Daily Operations Hub",
    purpose:
      "Bring the next action, its owner and the job context into an operational workspace.",
    boundary:
      "Josh’s reported AI-built internal tool. A redacted live workflow and its permissions still need to be inspected before this portfolio can establish production behavior.",
  },
  {
    name: "EV Guided Site Survey Suite",
    purpose:
      "Guide the collection of site details and photos before an EV charger estimate.",
    boundary:
      "Selected by Josh as AI-built work. The private survey and its delivery integrations are not connected to this public demonstration.",
  },
  {
    name: "Homework Hub",
    purpose:
      "Make assignments, submitted work and review responsibilities easier to follow.",
    boundary:
      "Selected internal project; no employee assignments or private submissions are exposed. Approval and notification reliability are not established here.",
  },
  {
    name: "Facebook Lead Discovery Agent",
    purpose:
      "Explore how relevant local inquiries can become a reviewable lead-discovery digest.",
    boundary:
      "Selected agent project. This portfolio does not search Facebook, contact prospects or demonstrate a current scheduled integration.",
  },
  {
    name: "Service Academy",
    purpose:
      "Support learning with a focused, repeatable question-and-review experience.",
    boundary:
      "Selected AI-built learning tool. Employee progress and measured adoption are not exposed or claimed.",
  },
  {
    name: "AI Agents & Skills",
    purpose:
      "Package business context, role boundaries and repeatable instructions into reusable AI assistance.",
    boundary:
      "Selected collection of agent and skill work. Each tool’s permissions and actual integration status require separate verification.",
  },
];
