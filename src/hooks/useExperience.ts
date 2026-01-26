import useSWR from "swr";
import { useCallback } from "react";
import { Experience } from "@/types/api/experience";
import { getExperiences, deleteExperienceApi } from "@/services/experience";
import { showToast } from "@/utils/toast";

export function useExperience() {
  const {
    data: experiences,
    isLoading: loading,
    mutate,
  } = useSWR<Experience[]>("/api/experience", getExperiences);

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
      if (!confirm("정말 삭제하시겠습니까?")) return;

      try {
        await deleteExperienceApi(id);
        showToast.delete();
        mutate();
      } catch (error) {
        showToast.error("삭제에 실패했습니다.");
        console.error("삭제 실패:", error);
      }
    },
    [mutate],
  );

  return {
    experiences: experiences || [],
    loading,
    fetchExperiences: mutate,
    saveExperience,
    deleteExperience,
  };
}
