"use client";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { FormSection, FormField } from "@/components/common/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectModalProps } from "@/types/ui/project";
import { useProjectForm } from "@/hooks/project/useProjectForm";

export function ProjectModal({
  isOpen,
  onClose,
  mode,
  initialData,
  experiences,
  onSave,
}: ProjectModalProps) {
  const {
    formData,
    startDate,
    endDate,
    handleDateChange,
    handleChange,
    validate,
    saving,
    setSaving,
  } = useProjectForm(initialData);

  const inputStyles =
    "w-full p-5 border border-gray-ddd rounded-lg text-base outline-none focus:border-gray-555 transition-colors";

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);

    // 전송할 데이터 가공
    const payload = {
      ...formData,
      year: startDate ? startDate.getFullYear() : 0,
    };
    delete (payload as any).period;

    // mode는 initialData.id가 있으면 "edit", 없으면 "add"로 판별
    const mode = initialData?.id ? "edit" : "add";

    // 부모로부터 받은 onSave(saveProject)를 호출
    const success = await onSave(mode, initialData?.id, payload);

    setSaving(false);

    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[1200px] max-h-[90vh] flex flex-col overflow-hidden shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-7.5 border-b border-gray-100">
          <h2 className="text-2xl font-semibold">
            {mode === "edit" ? "작업물 수정" : "작업물 추가"}
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
            <FormField label="소속 경력" required>
              <Select
                value={String(formData.experience_id)}
                onValueChange={(value) =>
                  handleChange("experience_id", Number(value))
                }
              >
                <SelectTrigger className="w-full px-6 py-7 border border-gray-ddd rounded-lg text-base">
                  <SelectValue placeholder="경력을 선택하세요" />
                  <Icon type="solidDownArrowAlt" size={12} />
                </SelectTrigger>
                <SelectContent>
                  {experiences.map((exp) => (
                    <SelectItem key={exp.id} value={String(exp.id)}>
                      {exp.company} - {exp.team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="프로젝트명" required>
                <input
                  className={inputStyles}
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </FormField>
              <FormField label="작업 기간" required>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date | null) =>
                        handleDateChange("start", date)
                      }
                      dateFormat="yyyy.MM.dd"
                      placeholderText="시작일"
                      className={inputStyles}
                    />
                  </div>
                  <span className="text-gray-400">~</span>
                  <div className="relative flex-1">
                    <DatePicker
                      selected={endDate}
                      onChange={(date: Date | null) =>
                        handleDateChange("end", date)
                      }
                      dateFormat="yyyy.MM.dd"
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate || undefined}
                      placeholderText="종료일(진행 중일 경우 비워두기)"
                      className={inputStyles}
                    />
                  </div>
                </div>
              </FormField>
            </div>

            <FormField label="프로젝트 설명">
              <textarea
                className={`${inputStyles} min-h-[120px] resize-y`}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </FormField>
          </FormSection>

          <FormSection title="추가 정보">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="카테고리">
                <input
                  className={inputStyles}
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                />
              </FormField>
              <FormField label="연도">
                <input
                  type="number"
                  className={inputStyles}
                  value={formData.year}
                  onChange={(e) => handleChange("year", Number(e.target.value))}
                />
              </FormField>
              <FormField label="프로젝트 URL">
                <input
                  type="url"
                  className={inputStyles}
                  value={formData.project_url}
                  onChange={(e) => handleChange("project_url", e.target.value)}
                />
              </FormField>
            </div>
          </FormSection>
        </div>

        {/* 풋터 */}
        <div className="px-10 py-6 border-t border-gray-light bg-bg-light/50 flex justify-end gap-2">
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
}
