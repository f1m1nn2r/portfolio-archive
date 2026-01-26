import { useState, useEffect } from "react";
import { ProfileFormData } from "@/types/admin";
import { getProfileSettings } from "@/services";
import { showToast } from "@/utils/toast";

export function useProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>({
    main_title: "",
    main_description: "",
    phone: "",
    email: "",
    resume_url: "",
    pdf_url: "",
    github_url: "",
  });

  const [isLoading, setIsLoading] = useState(false); // 저장 중 상태
  const [isFetching, setIsFetching] = useState(true); // 데이터 로딩 상태

  // 초기 데이터 패칭
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfileSettings();
        setFormData(data);
      } catch (error) {
        showToast.error("데이터를 불러오는데 실패했습니다.");
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfileData();
  }, []);

  // 공통 입력 핸들러
  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 저장 처리
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/profile-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("저장 실패");

      showToast.success("프로필 정보가 수정되었습니다.");
    } catch (error) {
      showToast.error("저장에 실패했습니다.");
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
