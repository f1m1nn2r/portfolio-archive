import { useState, useMemo } from "react";
import { useProjects } from "@/hooks/project/useProjects";
import { useProjectStore } from "@/store/useProjectStore";
import { AdminSummaryItem } from "@/types/admin/layout";
import { showToast } from "@/lib/toast";
import { useExperience } from "../experience/useExperience";
import { MESSAGES } from "@/lib/constants/messages";
import { Project } from "@/types/api/project";
import { useAdmin } from "@/providers/AdminProvider";

export function useProjectManagement() {
  const { isMaster } = useAdmin();

  // 필터 상태
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  // 데이터 로딩
  const { experiences } = useExperience();
  const { projects, allProjects, saveProject, deleteProject } = useProjects({
    experienceId: selectedCompany,
    year: selectedYear,
  });

  // 모달 관련 상태
  const { isEditModalOpen, closeEditModal, selectedProject } =
    useProjectStore();

  // 삭제 모달 상태
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  // 연도 계산 로직
  const availableYears = useMemo(() => {
    const targetProjects =
      selectedCompany === "all" || !selectedCompany
        ? allProjects
        : allProjects.filter(
            (p) => String(p.experience_id) === selectedCompany,
          );

    return Array.from(
      new Set(targetProjects.map((p) => p.year).filter(Boolean)),
    ).sort((a, b) => (b as number) - (a as number)) as number[];
  }, [selectedCompany, allProjects]);

  // 요약 정보 계산
  const summaryItems: AdminSummaryItem[] = useMemo(
    () => [
      {
        title: "총 작업물",
        value: `${allProjects.length}개`,
        icon: "task",
        bgColor: "bg-[#FDF0EE]",
      },
    ],
    [allProjects],
  );

  // 핸들러 모음
  const handlers = {
    openAddProject: () => {
      if (!isMaster) return showToast.error(MESSAGES.AUTH.REQUIRED_ADMIN);
      useProjectStore.setState({
        isEditModalOpen: true,
        selectedProject: null,
      });
    },
    saveProject: async (data: Project) => {
      const mode = selectedProject ? "edit" : "add";
      const success = await saveProject(mode, data);
      if (success) {
        closeEditModal();
      }
      return success;
    },
    setCompany: setSelectedCompany,
    setYear: setSelectedYear,
    openDeleteModal: (id: number) => {
      if (!isMaster) {
        showToast.error(MESSAGES.AUTH.REQUIRED_ADMIN);
        return;
      }
      setDeleteModal({ isOpen: true, id });
    },
    confirmDelete: async () => {
      if (!isMaster || !deleteModal.id) return;

      const success = await deleteProject(deleteModal.id);
      if (success) {
        setDeleteModal({ isOpen: false, id: null });
      }
    },
    closeDeleteModal: () => setDeleteModal({ isOpen: false, id: null }),
  };

  return {
    projects,
    loading: projects.length === 0 && allProjects.length > 0, // 로딩 상태 개선
    experiences, // Project 필터링을 위해 필요
    availableYears,
    summaryItems,
    projectModal: {
      isOpen: isEditModalOpen,
      data: selectedProject,
      close: closeEditModal,
    },
    deleteModal: {
      ...deleteModal,
      onConfirm: handlers.confirmDelete,
      onClose: handlers.closeDeleteModal,
    },
    handlers,
  };
}
