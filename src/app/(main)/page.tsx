import { getExperiencesFromDb } from "@/services/experience/server";
import { getProfileFromDb } from "@/features/admin/profile/server";
import HomeClient from "./HomeClient";

export default async function Home() {
  const [initialProfile, initialExperiences] = await Promise.all([
    getProfileFromDb(),
    getExperiencesFromDb(),
  ]);

  return (
    <HomeClient
      initialProfile={initialProfile}
      initialExperiences={initialExperiences}
    />
  );
}
