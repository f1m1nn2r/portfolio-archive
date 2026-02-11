import { z } from "zod";
import { MESSAGES } from "@/lib/constants/messages";

// 스키마 정의
const ExperienceSchema = z.object({
  company: z.string().min(1, MESSAGES.PROJECT.VALIDATION.COMPANY_REQUIRED),
  team: z.string().min(1, MESSAGES.PROJECT.VALIDATION.TEAM_REQUIRED),
  start_date: z
    .string()
    .min(1, MESSAGES.PROJECT.VALIDATION.START_DATE_REQUIRED),
  end_date: z.string().nullable().default(null),
  description: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  is_finished: z.boolean().default(false),
  type: z.enum(["WORK", "PROJECT"]).default("WORK"),
});

// 생성용 (모든 필드 필수)
export const CreateExperienceSchema = ExperienceSchema;

// 수정용 (모든 필드 optional)
export const UpdateExperienceSchema = ExperienceSchema.partial();

// 타입 추출
export type CreateExperienceDto = z.infer<typeof CreateExperienceSchema>;
export type UpdateExperienceDto = z.infer<typeof UpdateExperienceSchema>;

// 검증 함수
export function validateCreateExperience(data: unknown): CreateExperienceDto {
  return CreateExperienceSchema.parse(data);
}

export function validateUpdateExperience(data: unknown): UpdateExperienceDto {
  return UpdateExperienceSchema.parse(data);
}

// 안전한 검증 (에러를 던지지 않음)
export function safeValidateCreateExperience(data: unknown) {
  return CreateExperienceSchema.safeParse(data);
}

export function safeValidateUpdateExperience(data: unknown) {
  return UpdateExperienceSchema.safeParse(data);
}
