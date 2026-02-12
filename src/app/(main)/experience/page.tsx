import { getExperiencesFromDb } from "@/services/experience/server";
import { getProjectsFromDb } from "@/services/project/server";
import ExperienceClient from "./ExperienceClient";

export default async function ExperiencePage() {
  const [initialExperiences, initialProjects] = await Promise.all([
    getExperiencesFromDb(),
    getProjectsFromDb({ experienceId: "all", year: "all" }),
  ]);

  return (
    <ExperienceClient
      initialExperiences={initialExperiences}
      initialProjects={initialProjects}
    />
  );
}
