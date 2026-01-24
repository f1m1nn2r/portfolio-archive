import useSWR from "swr";
import { useCallback } from "react";
import { Experience } from "@/types/api/experience";
import { getExperiences, deleteExperienceApi } from "@/services/experience";

export function useExperience() {
  const {
    data: experiences,
    isLoading: loading,
    mutate,
  } = useSWR<Experience[]>("/api/experience", getExperiences);

  const deleteExperience = useCallback(
    async (id: number) => {
      if (!confirm("정말 삭제하시겠습니까?")) return;

      try {
        await deleteExperienceApi(id); // 서비스 호출
        alert("삭제되었습니다.");

        mutate();
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    },
    [mutate],
  );

  return {
    experiences: experiences || [],
    loading,
    fetchExperiences: mutate, // 필요 시 수동으로 갱신하게 해줌
    deleteExperience,
  };
}
