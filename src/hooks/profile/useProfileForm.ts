import { useState, useEffect } from "react";
import useSWR from "swr"; // 추가
import { ProfileFormData } from "@/types/admin";
import { getProfileSettings } from "@/services";
import { showToast } from "@/utils/toast";

export function useProfileForm() {
  // SWR로 프로필 데이터를 전역 관리
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

  // SWR에서 데이터가 로드되거나 변경될 때만 로컬 폼 상태 업데이트
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/profile-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "비밀번호가 틀렸거나 저장에 실패했습니다.",
        );
      }

      await mutate();

      showToast.success("프로필 정보가 수정되었습니다.");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";

      showToast.error(errorMessage);
      console.error("Save error:", error);
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
