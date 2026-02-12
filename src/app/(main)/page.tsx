import { getExperiencesFromDb } from "@/services/experience/server";
import { getProfileFromDb } from "@/services/profile/server";
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
