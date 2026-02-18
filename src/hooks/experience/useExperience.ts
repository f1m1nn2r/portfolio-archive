import { useAppSWR } from "@/hooks/common/useAppSWR";
import {
  CreateExperienceDto,
  Experience,
  UpdateExperienceDto,
} from "@/types/api/experience";
import {
  createExperienceApi,
  deleteExperienceApi,
  getExperiences,
  updateExperienceApi,
} from "@/services/experience/client";
import { useCallback, useState } from "react";
import { showToast } from "@/lib/toast";
import { UseExperienceProps } from "@/types/admin";

export function useExperience({
  initialData,
  onSuccess,
}: UseExperienceProps = {}) {
  const {
    data: experiences,
    isLoading: isFetchLoading,
    mutate,
  } = useAppSWR<Experience[]>(
    "/api/experience",
    getExperiences,
    { fallbackData: initialData },
  );

  const [isActionLoading, setIsActionLoading] = useState(false);

  const saveExperience = useCallback(
    async (
      mode: "add" | "edit",
      id: number | undefined,
      data: CreateExperienceDto | UpdateExperienceDto,
    ) => {
      setIsActionLoading(true);

      try {
        if (mode === "edit" && id) {
          await updateExperienceApi(id, data as UpdateExperienceDto);
        } else {
          await createExperienceApi(data as CreateExperienceDto);
        }
        await mutate();
        showToast.save(mode === "edit" ? "edit" : "add");
        onSuccess?.();
        return true;
      } catch (error) {
        showToast.error(error instanceof Error ? error.message : "저장에 실패했습니다.");
        return false;
      } finally {
        setIsActionLoading(false);
      }
    },
    [mutate, onSuccess],
  );

  const deleteExperience = useCallback(
    async (id: number) => {
      try {
        await deleteExperienceApi(id);
        await mutate();
        showToast.delete();
        onSuccess?.();
        return true;
      } catch (error) {
        showToast.error(error instanceof Error ? error.message : "삭제에 실패했습니다.");
        return false;
      }
    },
    [mutate, onSuccess],
  );

  return {
    experiences: experiences || [],
    loading: isFetchLoading || isActionLoading,
    fetchExperiences: mutate,
    saveExperience,
    deleteExperience,
  };
}
