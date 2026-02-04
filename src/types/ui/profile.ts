import { ProfileFormData } from "@/types/admin";

export interface ProfileIntroSectionProps {
  data: Pick<ProfileFormData, "main_title" | "main_description">;
  onChange: (key: keyof ProfileFormData, value: string) => void;
  disabled: boolean;
}

export interface ProfileContactSectionProps {
  data: Pick<ProfileFormData, "phone" | "email">;
  onChange: (key: keyof ProfileFormData, value: string) => void;
  disabled: boolean;
}

export interface ProfileLinkSectionProps {
  data: Pick<ProfileFormData, "resume_url" | "pdf_url" | "github_url">;
  onChange: (key: keyof ProfileFormData, value: string) => void;
  disabled: boolean;
}
