import { Experience } from "@/types/api/experience";
import { Project } from "@/types/api/project";

export interface ExperienceFiltersProps {
  experiences: Experience[]; // 부모로부터 받은 경력(회사) 목록
  years: number[]; // 부모로부터 받은 계산된 연도 목록
  onCompanyChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

export interface ExperienceClientProps {
  initialExperiences: Experience[];
  initialProjects: Project[];
}
