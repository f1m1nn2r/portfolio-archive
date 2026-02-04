import { useState } from "react";
import { Project } from "@/types/api/project";
import { ProjectFormData } from "@/types/ui/project";
import { format } from "date-fns";
import { showToast } from "@/lib/toast";

export function useProjectForm(initialData?: Project | null) {
  const [formData, setFormData] = useState<ProjectFormData>(() => ({
    experience_id: initialData?.experience_id || 0,
    title: initialData?.title || "",
    period: initialData?.period || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    year: initialData?.year ?? new Date().getFullYear(),
    project_url: initialData?.project_url || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || "",
  }));

  const [startDate, setStartDate] = useState<Date | null>(
    initialData?.start_date ? new Date(initialData.start_date) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialData?.end_date ? new Date(initialData.end_date) : null,
  );

  const handleDateChange = (type: "start" | "end", date: Date | null) => {
    if (type === "start") {
      setStartDate(date);
      handleChange("start_date", date ? format(date, "yyyy.MM.dd") : "");
    } else {
      setEndDate(date);
      handleChange("end_date", date ? format(date, "yyyy.MM.dd") : "");
    }
  };

  const [saving, setSaving] = useState(false);

  const handleChange = <K extends keyof ProjectFormData>(
    name: K,
    value: ProjectFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.experience_id || !formData.title || !formData.start_date) {
      showToast.error("필수 항목을 입력해주세요.");
      return false;
    }
    return true;
  };

  return {
    formData,
    startDate,
    endDate,
    handleDateChange,
    setFormData,
    handleChange,
    validate,
    saving,
    setSaving,
  };
}
