import { useState, useMemo, useCallback } from "react";
import { Experience } from "@/types/api/experience";
import { AdminSummaryItem } from "@/types/admin/layout";
import { calculateTotalExperience } from "@/lib/date";
import { MESSAGES } from "@/lib/constants/messages";
import { showToast } from "@/lib/toast";
import { useExperience } from "./useExperience";
import { useAdminMode } from "../common/useAdminMode";

export function useExperienceManagement() {
  const { isMaster } = useAdminMode();
  const { experiences, fetchExperiences, deleteExperience, loading } =
    useExperience();

  // 모달 및 선택 상태
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [expModalMode, setExpModalMode] = useState<"add" | "edit">("add");
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({
    isOpen: false,
    id: null,
  });

  // 요약 정보 가공
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

  // 핸들러 로직
  const openAddExp = useCallback(() => {
    if (!isMaster) return showToast.error(MESSAGES.AUTH.REQUIRED_ADMIN);
    setSelectedExperience(null);
    setExpModalMode("add");
    setIsExpModalOpen(true);
  }, [isMaster]);

  const openEditExp = useCallback(
    (exp: Experience) => {
      if (!isMaster) return showToast.error(MESSAGES.AUTH.REQUIRED_ADMIN);
      setSelectedExperience(exp);
      setExpModalMode("edit");
      setIsExpModalOpen(true);
    },
    [isMaster],
  );

  const confirmDelete = async () => {
    if (!isMaster || !deleteModal.id) return;
    const success = await deleteExperience(deleteModal.id);
    if (success) setDeleteModal({ isOpen: false, id: null });
  };

  return {
    // 데이터 및 권한
    experiences,
    loading,
    isMaster,
    summaryItems,

    // 수정/추가 모달 관련
    expModal: {
      isOpen: isExpModalOpen,
      mode: expModalMode,
      selected: selectedExperience,
      openAdd: openAddExp,
      openEdit: openEditExp,
      close: () => setIsExpModalOpen(false),
      onSaveSuccess: () => {
        setIsExpModalOpen(false);
        fetchExperiences();
      },
    },

    // 삭제 모달 관련
    deleteModal: {
      isOpen: deleteModal.isOpen,
      open: (id: number) => {
        if (!isMaster) return showToast.error(MESSAGES.AUTH.REQUIRED_ADMIN);
        setDeleteModal({ isOpen: true, id });
      },
      close: () => setDeleteModal({ isOpen: false, id: null }),
      confirm: confirmDelete,
    },
  };
}
