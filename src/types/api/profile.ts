export interface ProfileSettings {
  id?: number;
  main_title: string;
  main_description: string;
  phone: string;
  email: string;
  resume_url: string;
  pdf_url: string;
  github_url: string;
  created_at?: string;
  updated_at?: string;
}

export const DEFAULT_PROFILE: Omit<ProfileSettings, "id"> = {
  main_title: "",
  main_description: "",
  phone: "",
  email: "",
  resume_url: "",
  pdf_url: "",
  github_url: "",
};
