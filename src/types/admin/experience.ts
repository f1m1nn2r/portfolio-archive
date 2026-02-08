import { Experience } from "@/types/api/experience";

export interface ExperienceFormData {
  company: string;
  team: string;
  start_date: string;
  end_date: string | null;
  description: string[];
  skills: string[];
}

export interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: Experience | null;
  onSaveSuccess: () => void;
}

export interface ExperienceCardProps {
  experience: Experience;
  onEdit: (exp: Experience) => void;
  onDelete: (id: number) => void;
  isMaster?: boolean;
}

export interface UseExperienceProps {
  initialData?: Experience[];
  onSuccess?: () => void;
}
