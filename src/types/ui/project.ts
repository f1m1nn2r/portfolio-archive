import { Experience } from "@/types/api/experience";
import { Project } from "@/types/api/project";

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: Project | null;
  experiences: Experience[]; // 경력 목록
  onSave: (data: ProjectFormData) => Promise<boolean>;
}
export interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean; // 관리자 모드인지?
  onDelete?: (id: number) => void;
}

export interface ProjectFormData {
  experience_id: number;
  title: string;
  period: string;
  description: string;
  category: string;
  year: number;
  project_url: string;
  start_date: string;
  end_date: string;
}

export interface ProjectManagementSectionProps {
  projects: Project[];
  experiences: Experience[];
  years: number[];
  onAdd: () => void;
  onDelete: (type: "experience" | "project", id: number) => void;
  onFilterCompany: (company: string) => void;
  onFilterYear: (year: string) => void;
  isMaster: boolean;
}
