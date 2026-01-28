import { useState } from "react";
import { Project } from "@/types/api/project";
import { ProjectFormData } from "@/types/ui/project";

export function useProjectForm(initialData?: Project | null) {
  const [formData, setFormData] = useState<ProjectFormData>(() => ({
    experience_id: initialData?.experience_id || 0,
    title: initialData?.title || "",
    period: initialData?.period || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    year: initialData?.year ?? new Date().getFullYear(),
    project_url: initialData?.project_url || "",
  }));

  const [saving, setSaving] = useState(false);

  const handleChange = <K extends keyof ProjectFormData>(
    name: K,
    value: ProjectFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.experience_id || !formData.title || !formData.period) {
      alert("필수 항목을 입력해주세요.");
      return false;
    }
    return true;
  };

  return {
    formData,
    setFormData,
    handleChange,
    validate,
    saving,
    setSaving,
  };
}
