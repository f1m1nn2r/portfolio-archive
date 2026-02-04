"use client";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { ExperienceModalProps } from "@/types/admin/experience";
import { useExperienceForm } from "@/hooks/experience/useExperienceForm";
import { FormSection, FormField } from "@/components/common/form";
import { useExperience } from "@/hooks/experience/useExperience";
import { showToast } from "@/lib/toast";
import { MESSAGES } from "@/lib/constants/messages";

export const ExperienceModal = ({
  isOpen,
  onClose,
  mode,
  initialData,
  onSaveSuccess,
}: ExperienceModalProps) => {
  const [saving, setSaving] = useState(false);

  const {
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
    validate,
  } = useExperienceForm(initialData);

  const { saveExperience, deleteExperience } = useExperience();

  // 스킬 추가 (Enter)
  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      addSkill(skillInput);
      setSkillInput("");
    }
  };

  // 저장
  const handleSave = async () => {
    if (!validate()) return;

    try {
      setSaving(true);

      // 훅에 전달할 최신 데이터 구성
      const dataToSend = {
        ...formData,
        is_finished: isFinished,
      };

      const success = await saveExperience(mode, initialData?.id, dataToSend);

      if (success) {
        showToast.success(
          mode === "edit"
            ? MESSAGES.COMMON.EDIT_SUCCESS
            : MESSAGES.COMMON.ADD_SUCCESS,
        );
        onSaveSuccess();
      } else {
        throw new Error("저장 실패");
      }
    } catch (error) {
      console.error("저장 실패:", error);
      showToast.error(MESSAGES.ERROR.SAVE_FAILED);
    } finally {
      setSaving(false);
    }
  };

  // 삭제
  const handleDelete = async () => {
    if (!initialData?.id) return;

    await deleteExperience(initialData.id);
    onSaveSuccess();
  };

  if (!isOpen) return null;

  const inputStyles =
    "w-full p-5 border border-gray-ddd rounded-lg text-base outline-none focus:border-gray-555 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[1200px] max-h-[90vh] flex flex-col overflow-hidden shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-7.5 border-b border-gray-100">
          <h2 className="text-2xl font-semibold">
            {mode === "edit" ? "경력 수정" : "경력 추가"}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <Icon type="x" size={36} />
          </button>
        </div>

        {/* 폼 영역 */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12.5">
          <FormSection title="기본 정보" isFirst>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="회사명" required>
                <input
                  type="text"
                  placeholder="주식회사 아이스크림 에듀"
                  className={inputStyles}
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </FormField>
              <FormField label="직책/역할" required>
                <input
                  type="text"
                  placeholder="전략기획팀/사원"
                  className={inputStyles}
                  value={formData.team}
                  onChange={(e) =>
                    setFormData({ ...formData, team: e.target.value })
                  }
                />
              </FormField>
            </div>
            <FormField label="업무 설명 (한 줄씩 입력)">
              <textarea
                rows={5}
                placeholder="업무 내용을 한 줄씩 입력해주세요."
                className={`${inputStyles} resize-none`}
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
            </FormField>
          </FormSection>

          <FormSection title="근무 기간">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="시작일" required>
                <div className="relative">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    dateFormat="yyyy년 MM월"
                    showMonthYearPicker
                    placeholderText="근무 시작일 선택"
                    className={`${inputStyles} cursor-pointer`}
                  />
                  <Icon
                    type="calendarAlt"
                    size={18}
                    className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </FormField>
              <FormField label="종료일">
                <div className="relative">
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    dateFormat="yyyy년 MM월"
                    showMonthYearPicker
                    placeholderText="근무 종료일 선택"
                    minDate={startDate || undefined}
                    className={`${inputStyles} cursor-pointer`}
                    isClearable
                  />
                  <Icon
                    type="calendarAlt"
                    size={18}
                    className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </FormField>
            </div>
          </FormSection>

          <FormSection title="기술 스택">
            <FormField label="사용 기술">
              <div className="w-full p-5 border border-gray-ddd rounded-lg flex flex-wrap gap-2 items-center min-h-[50px] focus-within:border-gray-555 transition-colors">
                {formData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-bg-light border border-gray-ddd text-gray-700 gap-1 px-2 py-1"
                  >
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:opacity-70"
                    >
                      <Icon type="x" size={16} />
                    </button>
                    {skill}
                  </Badge>
                ))}
                <input
                  type="text"
                  placeholder="+ Add Skills (입력 후 Enter)"
                  className="text-sm outline-none text-gray-555 flex-1 min-w-[200px] py-1 bg-transparent"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                />
              </div>
            </FormField>
          </FormSection>
        </div>

        {/* 풋터 */}
        <div className="px-10 py-6 border-t border-gray-light bg-bg-light/50 flex justify-end gap-2">
          {mode === "edit" && (
            <Button variant="danger" size="md" onClick={handleDelete}>
              <Icon type="trash" size={16} /> 삭제
            </Button>
          )}
          <Button variant="secondary" size="md" onClick={onClose}>
            <Icon type="x" size={16} /> 취소
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={handleSave}
            disabled={saving}
          >
            <Icon type="save" size={16} />
            {saving ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>
    </div>
  );
};
