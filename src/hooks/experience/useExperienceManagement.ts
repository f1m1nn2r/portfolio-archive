import { useState, useCallback, useMemo } from "react";
import { Experience } from "@/types/api/experience";
import { calculateTotalExperience } from "@/lib/date";
import { MESSAGES } from "@/lib/constants/messages";
import { showToast } from "@/lib/toast";
import { useExperience } from "./useExperience";
import { useModal } from "@/hooks/common/useModal";
import { useSummaryData } from "@/hooks/common/useSummaryData";
import { useAdmin } from "@/providers/AdminProvider";

export function useExperienceManagement() {
  const { isMaster } = useAdmin();
  const { experiences, fetchExperiences, deleteExperience, loading } =
    useExperience();

  // 모달 및 선택 상태
  const expModal = useModal<Experience>();
  const deleteModal = useModal<number>();
  const [expModalMode, setExpModalMode] = useState<"add" | "edit">("add");

  const { workExps } = useMemo(
    () => ({
      workExps: experiences.filter((e) => e.type === "WORK"),
    }),
    [experiences],
  );

  // 요약 정보 가공
  const summaryItems = useSummaryData([
    {
      label: "총 경력",
      getValue: () => calculateTotalExperience(workExps),
      icon: "briefcase",
      bgColor: "bg-bg-purple",
    },
    {
      label: "등록된 회사 수",
      getValue: () => `${workExps.length}개`,
      icon: "building",
      bgColor: "bg-bg-blue",
    },
  ]);

  // 핸들러 로직
  const openAddExp = useCallback(() => {
    if (!isMaster) return showToast.error(MESSAGES.AUTH.REQUIRED_ADMIN);
    setExpModalMode("add");
    expModal.open();
  }, [isMaster, expModal]);

  const openEditExp = useCallback(
    (exp: Experience) => {
      if (!isMaster) return showToast.error(MESSAGES.AUTH.REQUIRED_ADMIN);
      setExpModalMode("edit");
      expModal.open(exp);
    },
    [isMaster, expModal],
  );

  const confirmDelete = async () => {
    if (!isMaster || !deleteModal.data) return;
    const success = await deleteExperience(deleteModal.data);
    if (success) deleteModal.close();
  };

  return {
    // 데이터 및 권한
    experiences,
    loading,
    isMaster,
    summaryItems,

    // 수정/추가 모달 관련
    expModal: {
      isOpen: expModal.isOpen,
      mode: expModalMode,
      selected: expModal.data,
      openAdd: openAddExp,
      openEdit: openEditExp,
      close: expModal.close,
      onSaveSuccess: () => {
        expModal.close();
        fetchExperiences();
      },
    },

    // 삭제 모달 관련
    deleteModal: {
      isOpen: deleteModal.isOpen,
      open: (id: number) => {
        if (!isMaster) return showToast.error(MESSAGES.AUTH.REQUIRED_ADMIN);
        deleteModal.open(id);
      },
      close: deleteModal.close,
      confirm: confirmDelete,
    },
  };
}
