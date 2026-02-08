import { useAppSWR } from "@/hooks/common/useAppSWR";
import { Experience } from "@/types/api/experience";
import { getExperiences } from "@/services/experience/client";
import { useCallback, useState } from "react";
import { showToast } from "@/lib/toast";
import { MESSAGES } from "@/lib/constants/messages";
import { UseExperienceProps } from "@/types/admin";

export function useExperience({
  initialData,
  onSuccess,
}: UseExperienceProps = {}) {
  const {
    data: experiences,
    isLoading: isFetchLoading,
    mutate,
    saveItem: baseSaveItem,
    deleteItem: baseDeleteItem,
  } = useAppSWR<Experience[], Partial<Experience>, Partial<Experience>>(
    "/api/experience",
    getExperiences,
    { fallbackData: initialData },
  );

  const [isActionLoading, setIsActionLoading] = useState(false);

  const saveExperience = useCallback(
    async (mode: "add" | "edit", id: number | undefined, data: any) => {
      try {
        setIsActionLoading(true);
        const result = await baseSaveItem(
          mode === "edit" ? id : undefined,
          data,
        );

        if (result) {
          showToast.success(
            mode === "edit"
              ? MESSAGES.COMMON.EDIT_SUCCESS
              : MESSAGES.COMMON.ADD_SUCCESS,
          );
          onSuccess?.();
          return true;
        }
      } catch (e) {
        showToast.error(MESSAGES.ERROR.SAVE_FAILED);
      } finally {
        setIsActionLoading(false);
      }
      return false;
    },
    [baseSaveItem, onSuccess],
  );

  const deleteExperience = useCallback(
    async (id: number) => {
      const success = await baseDeleteItem(id);
      if (success) {
        onSuccess?.();
      }
      return success;
    },
    [baseDeleteItem, onSuccess],
  );

  return {
    experiences: experiences || [],
    loading: isFetchLoading || isActionLoading,
    fetchExperiences: mutate,
    saveExperience,
    deleteExperience,
  };
}
