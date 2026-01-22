import { useState, useEffect } from "react";
import { Experience } from "@/types/api/experience";
import { ExperienceFormData } from "@/types/admin";

export function useExperienceForm(initialData?: Experience | null) {
  const [formData, setFormData] = useState<ExperienceFormData>({
    company: "",
    team: "",
    start_date: "",
    end_date: null,
    description: [],
    skills: [],
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  // 날짜 포맷팅
  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 재직 여부 계산
  const isFinished = endDate ? endDate < new Date() : false;

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company,
        team: initialData.team,
        start_date: initialData.start_date,
        end_date: initialData.end_date,
        description: initialData.description,
        skills: initialData.skills,
      });
      setDescriptionInput(initialData.description.join("\n"));
      setStartDate(new Date(initialData.start_date));
      setEndDate(initialData.end_date ? new Date(initialData.end_date) : null);
    } else {
      resetForm();
    }
  }, [initialData]);

  // description 업데이트
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      description: descriptionInput
        .split("\n")
        .filter((line) => line.trim() !== ""),
    }));
  }, [descriptionInput]);

  // 날짜 변경 시 formData 업데이트
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      start_date: formatDate(startDate) || "",
      end_date: formatDate(endDate),
    }));
  }, [startDate, endDate]);

  // 스킬 추가
  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  // 스킬 삭제
  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      company: "",
      team: "",
      start_date: "",
      end_date: null,
      description: [],
      skills: [],
    });
    setDescriptionInput("");
    setSkillInput("");
    setStartDate(null);
    setEndDate(null);
  };

  // 유효성 검증
  const validate = () => {
    if (!formData.company || !formData.team || !formData.start_date) {
      alert("필수 항목을 입력해주세요.");
      return false;
    }
    return true;
  };

  return {
    formData,
    setFormData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    descriptionInput,
    setDescriptionInput,
    skillInput,
    setSkillInput,
    isFinished,
    addSkill,
    removeSkill,
    resetForm,
    validate,
  };
}
