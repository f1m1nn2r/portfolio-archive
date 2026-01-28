import { create } from "zustand";
import { ProjectState } from "@/types/store/store";

export const useProjectStore = create<ProjectState>((set) => ({
  isEditModalOpen: false,
  selectedProject: null,

  openEditModal: (project) =>
    set({ isEditModalOpen: true, selectedProject: project }),

  closeEditModal: () => set({ isEditModalOpen: false, selectedProject: null }),
}));
