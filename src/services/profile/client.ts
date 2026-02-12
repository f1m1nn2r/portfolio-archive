import { DEFAULT_PROFILE, ProfileSettings } from "@/types/api/profile";
import { ProfileFormData } from "@/types/admin";

export async function getProfileSettings(): Promise<ProfileSettings> {
  try {
    const res = await fetch("/api/profile-settings", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("프로필 로드 실패");

    const json = await res.json();
    return json.data || json || DEFAULT_PROFILE;
  } catch (error) {
    console.error("API 프로필 조회 실패:", error);
    return DEFAULT_PROFILE as ProfileSettings;
  }
}

export const updateProfileSettings = async (formData: ProfileFormData) => {
  const response = await fetch("/api/profile-settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "저장에 실패했습니다.");
  }

  return response.json();
};
