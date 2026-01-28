import useSWR from "swr";
import { useCallback } from "react";
import { Experience } from "@/types/api/experience";
import { getExperiences, deleteExperienceApi } from "@/services/experience";
import { showToast } from "@/utils/toast";

export function useExperience(fallbackData?: Experience[]) {
  const {
    data: experiences,
    isLoading: loading,
    mutate,
  } = useSWR<Experience[]>("/api/experience", getExperiences, {
    fallbackData,
  });

  const saveExperience = async (
    mode: "add" | "edit",
    id: number | undefined,
    data: any,
  ) => {
    const url = mode === "edit" ? `/api/experience/${id}` : "/api/experience";
    const method = mode === "edit" ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      await mutate();
      return true;
    }
    return false;
  };

  const deleteExperience = useCallback(
    async (id: number) => {
      try {
        await deleteExperienceApi(id);
        showToast.delete();
        mutate();
        return true;
      } catch (error) {
        showToast.error("삭제에 실패했습니다.");
        console.error("삭제 실패:", error);
        return false;
      }
    },
    [mutate],
  );

  return {
    experiences: experiences || fallbackData || [],
    loading,
    fetchExperiences: mutate,
    saveExperience,
    deleteExperience,
  };
}
