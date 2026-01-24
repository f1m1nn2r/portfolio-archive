export interface Project {
  id?: number;
  experience_id: number;
  title: string;
  period: string;
  description: string;
  category?: string;
  year?: number;
  image_url?: string;
  project_url?: string;
  created_at?: string;
  updated_at?: string;
}

export type CreateProjectDto = Omit<
  Project,
  "id" | "created_at" | "updated_at"
>;
export type UpdateProjectDto = Partial<CreateProjectDto>;
