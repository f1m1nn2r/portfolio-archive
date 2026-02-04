import { z } from "zod";
import { MESSAGES } from "@/lib/constants/messages";

export const contactSchema = z.object({
  from: z.string().email(MESSAGES.CONTACT.VALIDATION.EMAIL),
  nameCompany: z.string().min(2, MESSAGES.CONTACT.VALIDATION.NAME),
  message: z.string().min(10, MESSAGES.CONTACT.VALIDATION.MESSAGE),
});

export type ContactFormData = z.infer<typeof contactSchema>;
