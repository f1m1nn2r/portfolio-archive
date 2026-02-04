import { Experience } from "@/types/api/experience";
import { ProfileSettings } from "@/types/api/profile";

export interface HomeClientProps {
  initialProfile: ProfileSettings;
  initialExperiences: Experience[];
}
