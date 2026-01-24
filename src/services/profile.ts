import { DEFAULT_PROFILE, ProfileSettings } from "@/types/api/profile";
import { API_BASE_URL } from ".";

export async function getProfileSettings(): Promise<ProfileSettings> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/profile-settings`, {
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
