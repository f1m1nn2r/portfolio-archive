import { Experience } from "@/types/api/experience";
import { ProfileSettings } from "@/features/admin/profile";

export interface HomeClientProps {
  initialProfile: ProfileSettings;
  initialExperiences: Experience[];
}
