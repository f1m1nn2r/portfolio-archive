import { getProjects } from "@/services/project/client";
import { getExperiences } from "@/services/experience/client";
import ExperienceClient from "./ExperienceClient";

export default async function ExperiencePage() {
  const [initialExperiences, initialProjects] = await Promise.all([
    getExperiences(),
    getProjects({ experienceId: "all", year: "all" }),
  ]);

  return (
    <ExperienceClient
      initialExperiences={initialExperiences}
      initialProjects={initialProjects}
    />
  );
}
