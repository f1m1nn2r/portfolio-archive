import { Project } from "@/types/api/project";

export interface ProjectState {
  deleteProject: (id: number) => Promise<boolean>;
  isEditModalOpen: boolean;
  selectedProject: Project | null;
  openEditModal: (project: Project) => void;
  closeEditModal: () => void;
}
