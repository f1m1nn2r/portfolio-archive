import { useState } from "react";
import { Experience } from "@/types/api/experience";
import { ExperienceFormData } from "@/types/admin";
import { showToast } from "@/utils/toast";

export function useExperienceForm(initialData?: Experience | null) {
  // 1. 초기 상태 설정 (useEffect 대신 useState 초기값 함수 사용)
  const [formData, setFormData] = useState<ExperienceFormData>(() => ({
    company: initialData?.company || "",
    team: initialData?.team || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || null,
    description: initialData?.description || [],
    skills: initialData?.skills || [],
  }));

  const [startDate, setStartDate] = useState<Date | null>(
    initialData ? new Date(initialData.start_date) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialData?.end_date ? new Date(initialData.end_date) : null,
  );

  // 텍스트 영역용 로컬 상태
  const [descriptionInput, setDescriptionInput] = useState(
    initialData?.description.join("\n") || "",
  );
  const [skillInput, setSkillInput] = useState("");

  // 날짜 포맷팅 유틸
  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  // 재직 여부 계산
  const isFinished = endDate ? endDate < new Date() : false;

  // 폼 업데이트 핸들러 (descriptionInput 변경 시 동기화)
  const syncDescription = (value: string) => {
    setDescriptionInput(value);
    setFormData((prev) => ({
      ...prev,
      description: value.split("\n").filter((line) => line.trim() !== ""),
    }));
  };

  // 날짜 변경 핸들러
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    setFormData((prev) => ({ ...prev, start_date: formatDate(date) || "" }));
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    setFormData((prev) => ({ ...prev, end_date: formatDate(date) }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const validate = () => {
    if (!formData.company || !formData.team || !formData.start_date) {
      showToast.error("필수 항목을 입력해주세요.");
      return false;
    }
    return true;
  };

  return {
    formData,
    setFormData,
    startDate,
    setStartDate: handleStartDateChange,
    endDate,
    setEndDate: handleEndDateChange,
    descriptionInput,
    setDescriptionInput: syncDescription,
    skillInput,
    setSkillInput,
    isFinished,
    addSkill,
    removeSkill,
    validate,
  };
}
