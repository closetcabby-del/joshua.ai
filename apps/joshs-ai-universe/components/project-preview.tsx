import {
  CalendarDays,
  Camera,
  ClipboardCheck,
  GraduationCap,
  ScanSearch,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { SelectedProject } from "@/lib/selected-projects";
const icons = {
  operations: Workflow,
  survey: Camera,
  homework: ClipboardCheck,
  leads: ScanSearch,
  academy: GraduationCap,
  pilates: CalendarDays,
  agents: Sparkles,
};
/** Editorial project cover, deliberately not a simulated application screenshot. */
export function ProjectPreview({ project }: { project: SelectedProject }) {
  const Icon = icons[project.icon];
  return (
    <div
      className={`pf-project-cover pf-cover-${project.icon}`}
      aria-hidden="true"
    >
      <Icon size={32} strokeWidth={1.5} />
      <span>{project.cover}</span>
      <small>{project.category}</small>
    </div>
  );
}
