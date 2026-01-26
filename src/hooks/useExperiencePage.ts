import { useState, useMemo } from "react";
import { useExperience } from "@/hooks/useExperience";
import { useProjects } from "@/hooks/useProjects";
import { useProjectStore } from "@/store/useProjectStore";
import { calculateTotalExperience } from "@/utils/date";
import { Experience } from "@/types/api/experience";
import { AdminSummaryItem } from "@/types/admin/layout";

export function useExperiencePage() {
  // 필터 상태
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  // 데이터 데이터 로딩
  const { experiences, loading, fetchExperiences, deleteExperience } =
    useExperience();
  const { projects, allProjects, fetchProjects } = useProjects({
    experienceId: selectedCompany,
    year: selectedYear,
  });

  // 모달 관련 상태
  const { isEditModalOpen, closeEditModal, selectedProject } =
    useProjectStore();
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [expModalMode, setExpModalMode] = useState<"add" | "edit">("add");
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

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
        title: "총 경력",
        value: calculateTotalExperience(experiences),
        icon: "briefcase",
        bgColor: "bg-bg-purple",
      },
      {
        title: "등록된 회사 수",
        value: `${experiences.length}개`,
        icon: "building",
        bgColor: "bg-bg-blue",
      },
    ],
    [experiences],
  );

  // 핸들러 모음
  const handlers = {
    openAddExp: () => {
      setSelectedExperience(null);
      setExpModalMode("add");
      setIsExpModalOpen(true);
    },
    openEditExp: (exp: Experience) => {
      setSelectedExperience(exp);
      setExpModalMode("edit");
      setIsExpModalOpen(true);
    },
    onExpSaveSuccess: () => {
      setIsExpModalOpen(false);
      fetchExperiences();
    },
    openAddProject: () =>
      useProjectStore.setState({
        isEditModalOpen: true,
        selectedProject: null,
      }),
    onProjectSaveSuccess: () => {
      closeEditModal();
      fetchProjects();
    },
    setCompany: setSelectedCompany,
    setYear: setSelectedYear,
    closeExpModal: () => setIsExpModalOpen(false),
  };

  return {
    experiences,
    projects,
    loading,
    availableYears,
    summaryItems,
    expModal: {
      isOpen: isExpModalOpen,
      mode: expModalMode,
      data: selectedExperience,
    },
    projectModal: {
      isOpen: isEditModalOpen,
      data: selectedProject,
      close: closeEditModal,
    },
    deleteExperience,
    handlers,
  };
}
