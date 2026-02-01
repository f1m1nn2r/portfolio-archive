import useSWR from "swr";
import { useState, useEffect } from "react";
import { ProfileFormData } from "@/types/admin";
import { showToast } from "@/utils/toast";
import {
  getProfileSettings,
  updateProfileSettings,
} from "@/services/profile/client";

export function useProfileForm() {
  const {
    data: initialData,
    isLoading: isFetching,
    mutate,
  } = useSWR<ProfileFormData>("/api/profile-settings", getProfileSettings);

  const [formData, setFormData] = useState<ProfileFormData>({
    main_title: "",
    main_description: "",
    phone: "",
    email: "",
    resume_url: "",
    pdf_url: "",
    github_url: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfileSettings(formData);

      await mutate();
      showToast.success("프로필 정보가 수정되었습니다.");
    } catch (error: any) {
      showToast.error(error.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isFetching,
    isLoading,
    handleInputChange,
    handleSave,
  };
}
