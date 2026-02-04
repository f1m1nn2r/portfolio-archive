import useSWR from "swr";
import { useState, useEffect } from "react";
import { ProfileFormData } from "@/types/admin";
import { showToast } from "@/lib/toast";
import {
  getProfileSettings,
  updateProfileSettings,
} from "@/services/profile/client";
import { MESSAGES } from "@/lib/constants/messages";
import { useAdmin } from "@/providers/AdminProvider";

export function useProfileForm() {
  const { isMaster } = useAdmin();

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
      showToast.success(MESSAGES.PROFILE.UPDATE_SUCCESS);
    } catch (error: any) {
      showToast.error(error.message || MESSAGES.ERROR.DEFAULT);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isMaster,
    formData,
    isFetching,
    isLoading,
    handleInputChange,
    handleSave,
  };
}
