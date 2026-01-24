import { create } from "zustand";
import { ProjectState } from "@/types/store/store";

export const useProjectStore = create<ProjectState>((set) => ({
  isEditModalOpen: false,
  selectedProject: null,

  deleteProject: async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return false;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("삭제되었습니다.");
        // 페이지 새로고침 대신 상태를 업데이트하거나 윈도우 새로고침
        window.location.reload();
        return true;
      }
    } catch (error) {
      console.error("삭제 실패:", error);
    }
    return false;
  },

  openEditModal: (project) =>
    set({ isEditModalOpen: true, selectedProject: project }),
  closeEditModal: () => set({ isEditModalOpen: false, selectedProject: null }),
}));
