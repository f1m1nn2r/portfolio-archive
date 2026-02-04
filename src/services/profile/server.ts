import { DEFAULT_PROFILE, ProfileSettings } from "@/types/api/profile";
import { createClient } from "@/lib/supabase/server";
import { TABLES } from "@/lib/constants/tables";

export async function getProfileFromDb(): Promise<ProfileSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(TABLES.PROFILE_SETTINGS)
      .select("*")
      .maybeSingle();

    if (error) throw error;
    return data || (DEFAULT_PROFILE as ProfileSettings);
  } catch (error) {
    console.error("DB 프로필 조회 실패:", error);
    return DEFAULT_PROFILE as ProfileSettings;
  }
}
