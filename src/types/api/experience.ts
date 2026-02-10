export type {
  CreateExperienceDto,
  UpdateExperienceDto,
} from "@/lib/validations/experience";

export interface Experience {
  id?: number;
  company: string;
  team: string;
  start_date: string;
  end_date: string | null;
  description: string[];
  skills: string[];
  is_finished: boolean;
  created_at?: string;
  updated_at?: string;
  type?: "WORK" | "PROJECT";
}
