import { useAppSWR } from "@/hooks/common/useAppSWR";
import { Experience } from "@/types/api/experience";
import { getExperiences } from "@/services/experience/client";
import { useCallback } from "react";

export function useExperience(fallbackData?: Experience[]) {
  // 공통 훅 사용 (경력 데이터는 보통 배열 형태이므로 T를 Experience[]로 설정)
  const {
    data: experiences,
    isLoading: loading,
    mutate,
    createItem,
    updateItem,
    deleteItem,
  } = useAppSWR<Experience[], Partial<Experience>, Partial<Experience>>(
    "/api/experience",
    getExperiences,
    { fallbackData },
  );

  // 저장 로직 (추가/수정 통합)
  const saveExperience = useCallback(
    async (
      mode: "add" | "edit",
      id: number | undefined,
      data: Partial<Experience>,
    ) => {
      if (mode === "edit") {
        if (!id) return false;
        const result = await updateItem(id, data);
        return !!result;
      } else {
        const result = await createItem(data);
        return !!result;
      }
    },
    [updateItem, createItem],
  );

  // 삭제 로직
  const deleteExperience = useCallback(
    async (id: number) => {
      return await deleteItem(id);
    },
    [deleteItem],
  );

  return {
    experiences: experiences || [],
    loading,
    fetchExperiences: mutate, // 기존 이름 유지
    saveExperience,
    deleteExperience,
  };
}
