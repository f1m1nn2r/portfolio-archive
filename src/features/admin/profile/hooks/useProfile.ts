import { useState, useEffect } from "react";
import { getProfileSettings } from "../api/client";
import { useAppSWR } from "@/hooks/common/useAppSWR";
import {
  profileSchema,
  ProfileFormData,
  profileForm,
} from "@/lib/schemas/profile.schemas";
import { showToast } from "@/lib/toast";

export function useProfile() {
  // useAppSWR로 교체
  const {
    data: initialData,
    isLoading: isFetching,
    updateItem,
  } = useAppSWR<ProfileFormData>("/api/profile-settings", getProfileSettings);

  // 기존 폼 상태 하드코딩 -> zod 스키마에서 뽑아오는 방식으로 변경
  const [formData, setFormData] = useState(profileForm);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // 상태 업데이트
  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      showToast.error(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    await updateItem("", formData);
    setIsLoading(false);
  };

  return {
    formData,
    isFetching,
    isLoading,
    handleInputChange,
    handleSave,
  };
}
