import { z } from "zod";

export const profileSchema = z.object({
  main_title: z.string().default(""),
  main_description: z.string().default(""),
  phone: z.string().default(""),
  email: z.string().email().default(""),
  resume_url: z.string().url().or(z.literal("")).default(""),
  pdf_url: z.string().default(""),
  github_url: z.string().default(""),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const profileForm: ProfileFormData = {
  main_title: "",
  main_description: "",
  phone: "",
  email: "",
  resume_url: "",
  pdf_url: "",
  github_url: "",
};
