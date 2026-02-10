import { useState } from "react";
import { Experience } from "@/types/api/experience";
import { ExperienceFormData } from "@/types/admin";
import { showToast } from "@/lib/toast";
import { MESSAGES } from "@/lib/constants/messages";
import { safeValidateCreateExperience } from "@/lib/validations/experience";

export function useExperienceForm(initialData?: Experience | null) {
  // 서버에 보낼 최종 폼 데이터 상태
  const [formData, setFormData] = useState<ExperienceFormData>(() => ({
    company: initialData?.company || "",
    team: initialData?.team || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || null,
    description: initialData?.description || [],
    skills: initialData?.skills || [],
    type: initialData?.type || "WORK",
  }));

  // DatePicker와 연동하기 위해 문자열이 아닌 'Date 객체'로 따로 관리
  const [startDate, setStartDate] = useState<Date | null>(
    initialData ? new Date(initialData.start_date) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialData?.end_date ? new Date(initialData.end_date) : null,
  );

  // 설명(Description)은 배열이지만, 입력창에서는 줄바꿈(\n) 텍스트로 보여주기 위해 별도 관리
  const [descriptionInput, setDescriptionInput] = useState(
    initialData?.description.join("\n") || "",
  );
  // 기술 스택 입력창에 타이핑 중인 텍스트
  const [skillInput, setSkillInput] = useState("");

  // Date 객체를 서버 전송용 문자열(YYYY-MM-DD)로 변환
  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    return date.toISOString().split("T")[0];
  };

  // 종료 날짜가 오늘보다 이전이면 '재직 완료'로 판단
  const isFinished = endDate ? endDate < new Date() : false;

  // 설명란 입력 시: 텍스트 상태 업데이트 + 배열로 변환하여 폼 데이터에 저장
  const syncDescription = (value: string) => {
    setDescriptionInput(value);
    setFormData((prev) => ({
      ...prev,
      description: value.split("\n").filter((line) => line.trim() !== ""),
    }));
  };

  // 시작 날짜 변경 시: Date 상태 업데이트 + 폼 데이터 문자열 동기화
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    setFormData((prev) => ({ ...prev, start_date: formatDate(date) || "" }));
  };

  // 종료 날짜 변경 시: Date 상태 업데이트 + 폼 데이터 문자열 동기화
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    setFormData((prev) => ({ ...prev, end_date: formatDate(date) }));
  };

  // 새로운 기술 추가 (중복 방지 및 공백 제거)
  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (skillInput.trim()) {
        addSkill(skillInput);
        setSkillInput("");
      }
    }
  };

  // 선택한 기술 제거
  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // 유효성 검사
  const validate = () => {
    const result = safeValidateCreateExperience(formData);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message;
      showToast.error(firstError || MESSAGES.VALIDATION.ALL_FIELDS);
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
    handleSkillKeyDown,
    removeSkill,
    validate,
  };
}
