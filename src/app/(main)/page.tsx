import { getExperiences } from "@/services/experience/client";
import { getProfileFromDb } from "@/services/profile/server";
import HomeClient from "./HomeClient";

export default async function Home() {
  const [initialProfile, initialExperiences] = await Promise.all([
    getProfileFromDb(),
    getExperiences(),
  ]);

  return (
    <HomeClient
      initialProfile={initialProfile}
      initialExperiences={initialExperiences}
    />
  );
}
