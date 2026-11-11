/** Josh's approved showcase. Keep these seven projects in the user's order. */
export type SelectedProject = {
  slug: string;
  name: string;
  category: string;
  cover: string;
  icon:
    | "operations"
    | "survey"
    | "homework"
    | "leads"
    | "academy"
    | "pilates"
    | "agents";
  summary: string;
  problem: string;
  contribution: string;
  approach: string[];
  scope: string;
  next: string;
};

export const selectedProjects: SelectedProject[] = [
  {
    slug: "jeff-electric-daily-operations-hub",
    name: "Jeff Electric Daily Operations Hub",
    category: "Business operations",
    icon: "operations",
    cover: "Make the next step clear.",
    summary:
      "Bringing customer context, daily work and operational handoffs into one workspace.",
    problem:
      "A service business needs more than a list of jobs. The team needs to know what happens next, who owns it and what information is missing.",
    contribution:
      "I mapped the operational workflow, defined requirements and used AI-assisted development to build an internal workspace around the team's day-to-day work.",
    approach: [
      "Organize the experience around My Day, customers, leads, jobs and notifications, so people can find the work they need to act on.",
      "Make next actions, owners and due dates explicit. Keep job instructions and documentation distinct from office-owned estimates, approvals and invoicing.",
      "Use feedback from the people doing the work to refine the workflow before adding more automation.",
    ],
    scope:
      "An existing internal application is listed in the connected project inventory. This public page describes the project without exposing customer or employee records. Current permissions, end-to-end reliability and adoption outcomes have not been independently verified here.",
    next: "Validate the complete lead-to-billing handoff with the team, including missing documentation, reassignment and notification failures.",
  },
  {
    slug: "ev-guided-site-survey-suite",
    name: "EV Guided Site Survey Suite",
    category: "Guided customer intake",
    icon: "survey",
    cover: "Better information before the visit.",
    summary:
      "Guided questions and photos that help an electrician understand an EV charger installation.",
    problem:
      "An EV charger request can arrive without the panel, location and route details needed to prepare for a useful site assessment.",
    contribution:
      "I shaped a guided residential survey around the information the electrician needs and used AI to help build the step-by-step experience.",
    approach: [
      "Break a technical information request into focused camera and question steps that a customer can understand.",
      "Collect panel, proposed charger location and route context in a consistent survey packet.",
      "Keep electrician review in the process. Customer photos support assessment; they do not replace professional judgment.",
    ],
    scope:
      "The connected project inventory confirms an existing guided photo-survey application. This case is an overview, not an electrical assessment or a live submission form. Delivery integrations and the complete submission-to-review journey have not been tested as part of this portfolio update.",
    next: "Test question clarity, mobile photo capture and incomplete submissions with representative users before measuring any reduction in follow-up.",
  },
  {
    slug: "jeff-electric-homework-hub",
    name: "Jeff Electric Homework Hub",
    category: "Team accountability",
    icon: "homework",
    cover: "From assignment to review.",
    summary:
      "A focused place for team assignments, deadlines, submissions and completion review.",
    problem:
      "A verbal assignment is easy to lose track of when its deadline, owner and definition of done are unclear.",
    contribution:
      "I translated team assignment needs into a small internal product and used AI-assisted development to prototype assignment, submission and review flows.",
    approach: [
      "Give an assignment a named owner, a deadline and clear instructions instead of relying on a message alone.",
      "Separate submitting work from reviewing completion, with employee views focused on their own assignments.",
      "Explore voice-assisted assignment capture while retaining editable fields and human review.",
    ],
    scope:
      "An existing Homework Hub is confirmed by the project inventory. Employee records are not reproduced here. Voice capture, email delivery and approval permissions need verification; this page does not claim those paths are fully reliable.",
    next: "Test who can assign, submit and approve work, then verify notification delivery and recovery when voice input fails.",
  },
  {
    slug: "facebook-lead-discovery-agent",
    name: "Facebook Lead Discovery Agent",
    category: "Lead discovery automation",
    icon: "leads",
    cover: "Find signals worth reviewing.",
    summary:
      "An agent workflow for surfacing potentially relevant local requests in a reviewable digest.",
    problem:
      "Finding relevant local service requests across Facebook groups takes repeated searching and judgment about whether a post is actually a good fit.",
    contribution:
      "I defined the search criteria, review cadence and digest format for an AI-assisted lead discovery workflow.",
    approach: [
      "Focus discovery on relevant locations and service requests, keeping the original source available for review.",
      "Package potential opportunities into a digest rather than treating every match as a qualified customer.",
      "Keep a person responsible for deciding whether and how to respond. Discovery is separate from customer outreach.",
    ],
    scope:
      "This account of the agent is based on Josh's description. A current execution log, Facebook connection and scheduled delivery have not been verified here. The portfolio does not search Facebook, contact leads or run a background agent.",
    next: "Review a redacted run for relevance, duplicates, stale posts and delivery failures before making claims about lead quality or time saved.",
  },
  {
    slug: "jeff-electric-service-academy",
    name: "Jeff Electric Service Academy",
    category: "Learning and adoption",
    icon: "academy",
    cover: "Make practice part of the day.",
    summary:
      "Focused residential service learning, call practice and quick reference for the team.",
    problem:
      "Useful service knowledge needs to be easy to practice and retrieve during a busy working day.",
    contribution:
      "I organized service knowledge into a lightweight learning product and used AI-assisted development to create a focused practice experience.",
    approach: [
      "Use short questions and practical service scenarios to make learning approachable.",
      "Keep reference material close to the practice so the tool supports the work as well as training.",
      "Use prepared knowledge where it meets the need, avoiding the cost and complexity of a live AI API for every interaction.",
    ],
    scope:
      "The connected inventory confirms an internal service-training application using pre-built knowledge with no AI API. It was built with AI assistance; that does not mean every feature runs on AI. Employee progress and training outcomes are not published or measured here.",
    next: "Validate content with experienced technicians and gather feedback on which questions and references are useful on the job.",
  },
  {
    slug: "pilates-with-moni",
    name: "Pilates with Moni",
    category: "Client experience",
    icon: "pilates",
    cover: "A more personal practice.",
    summary:
      "A Pilates product exploring booking, session replay and a personal coaching experience.",
    problem:
      "A personal service needs a clear client journey, from arranging a session to returning to coaching material afterward.",
    contribution:
      "I used AI-assisted development to explore a Pilates client workspace that connects the service experience with the instructor's workflow.",
    approach: [
      "Design around the client journey rather than presenting disconnected booking and content features.",
      "Keep session access and personal coaching material understandable for a nontechnical audience.",
      "Separate the product experience from integrations that still need configuration and verification.",
    ],
    scope:
      "The project inventory describes this as a development version for booking, session replay and personal coaching, with integrations pending. This portfolio does not expose client information or claim live payments, booking delivery or production readiness.",
    next: "Verify the booking lifecycle, access boundaries and external integrations before opening the service to clients.",
  },
  {
    slug: "jeff-electric-ai-agents-and-skills",
    name: "Jeff Electric AI Agents & Skills",
    category: "Reusable AI workflows",
    icon: "agents",
    cover: "Give AI the business context.",
    summary:
      "Reusable roles, instructions and business context for more consistent AI-assisted work.",
    problem:
      "An AI conversation is less useful when the business context, source material and decision boundaries have to be explained from scratch every time.",
    contribution:
      "I shaped reusable agent roles and skills around Jeff Electric's operational, financial, marketing and solution-building needs.",
    approach: [
      "Give each role a specific purpose, relevant context and a clear definition of useful output.",
      "Turn recurring tasks into reusable instructions, with source material and human review where needed.",
      "Choose a skill, an existing tool or a custom integration according to the actual task and maintenance cost.",
    ],
    scope:
      "The roles and skills are described by Josh. They do not establish that every role has live system access or can act autonomously. Private instructions, credentials and business records are not included. Integrations and permissions need separate verification.",
    next: "Evaluate each reusable workflow against a concrete task, inspect its sources and check how it handles missing information and requests for approval.",
  },
];

export function getSelectedProject(slug: string) {
  return selectedProjects.find((project) => project.slug === slug);
}
