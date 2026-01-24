"use client";

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
import { useProjectForm } from "@/hooks/useProjectForm"; // 만든 훅 임포트

export function ProjectModal({
  isOpen,
  onClose,
  mode,
  initialData,
  experiences,
  onSaveSuccess,
}: ProjectModalProps) {
  // 커스텀 훅 사용
  const { formData, handleChange, validate, saving, setSaving } =
    useProjectForm(initialData);

  const inputStyles =
    "w-full p-5 border border-gray-ddd rounded-lg text-base outline-none focus:border-gray-555 transition-colors";

  // 저장 로직 (훅의 validate와 handleChange 활용)
  const handleSave = async () => {
    if (!validate()) return;

    try {
      setSaving(true);
      const url =
        mode === "edit" ? `/api/projects/${initialData?.id}` : "/api/projects";
      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok || result.success) {
        alert(mode === "edit" ? "수정되었습니다." : "추가되었습니다.");
        onSaveSuccess();
      } else {
        throw new Error(result.error || "저장 실패");
      }
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  // 삭제 로직 (기본 구조 유지)
  const handleDelete = async () => {
    if (!initialData?.id || !confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/projects/${initialData.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("삭제되었습니다.");
        onSaveSuccess();
      }
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
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
                <input
                  placeholder="2024.01-2024.12"
                  className={inputStyles}
                  value={formData.period}
                  onChange={(e) => handleChange("period", e.target.value)}
                />
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
}
