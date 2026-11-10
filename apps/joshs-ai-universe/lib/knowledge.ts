import { z } from "zod";
import raw from "@/content/candidate.json";
export const evidenceStatus = z.enum([
  "Verified",
  "Reported but not independently verified",
  "Prototype",
  "Conceptual",
  "Not established",
]);
const safeUrl = z
  .string()
  .refine(
    (v) => /^https:\/\/[^\s]+$/.test(v) || /^\/(?!\/)[^\s]*$/.test(v),
    "Use HTTPS or an internal path",
  );
const recordSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(1),
    claim: z.string().min(1),
    status: evidenceStatus,
    approved: z.boolean(),
    kind: z
      .enum(["experience", "skill", "project", "contribution", "artifact"])
      .optional(),
    projectSlug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .optional(),
    tags: z.array(z.string()),
    sources: z.array(z.object({ label: z.string(), url: safeUrl })),
  })
  .refine(
    (r) => r.status !== "Verified" || r.sources.length > 0,
    "Verified records need a source",
  );
const projectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  status: evidenceStatus,
  number: z.string(),
  featured: z.boolean().default(true),
  summary: z.string(),
  tags: z.array(z.string()),
  problem: z.string(),
  contribution: z.string(),
  solution: z.string(),
  architecture: z.string(),
  testing: z.string(),
  outcomes: z.string(),
  limitations: z.string(),
  repoUrl: safeUrl.nullable(),
  demoUrl: safeUrl.nullable(),
  artifact: safeUrl.nullable(),
});
export const candidateSchema = z
  .object({
    name: z.string(),
    headline: z.string(),
    intro: z.string(),
    about: z.string().optional(),
    profileStatus: z.string(),
    email: z.email().nullable(),
    resumeUrl: safeUrl.nullable(),
    githubUrl: safeUrl.nullable(),
    experience: z.array(
      z.object({
        title: z.string(),
        organization: z.string(),
        period: z.string(),
        description: z.string(),
        status: evidenceStatus,
      }),
    ),
    records: z.array(recordSchema),
    projects: z.array(projectSchema),
  })
  .refine(
    (data) =>
      new Set(data.records.map((r) => r.id)).size === data.records.length,
    "Evidence record IDs must be unique",
  )
  .refine(
    (data) =>
      new Set(data.projects.map((p) => p.slug)).size === data.projects.length,
    "Project slugs must be unique",
  );
export const candidate = candidateSchema.parse(raw);
export type EvidenceRecord = z.infer<typeof recordSchema>;
export const approvedRecords = candidate.records.filter((r) => r.approved);
export const statusDescriptions = {
  Verified:
    "A claim with supporting source material. Review the source and its scope.",
  "Reported but not independently verified":
    "A self-reported claim awaiting independent confirmation.",
  Prototype:
    "An experimental implementation. Production use and business impact are not implied.",
  Conceptual:
    "A proposed design or discussion example. No implementation is claimed.",
  "Not established":
    "The available material does not support this qualification.",
};
