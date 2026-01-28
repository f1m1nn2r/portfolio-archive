"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ProjectCard } from "@/components/admin/experience/ProjectCard";
import { ExperienceFilters } from "@/components/admin/experience/ExperienceFilters";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { PageLayout } from "@/components/common/PageLayout";
import { useExperience } from "@/hooks/experience/useExperience";
import { useProjects } from "@/hooks/project/useProjects";

export default function ExperienceClient({
  initialExperiences,
  initialProjects,
}) {
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const { experiences } = useExperience(initialExperiences);
  const { projects, allProjects } = useProjects({
    experienceId: selectedCompany,
    year: selectedYear,
    fallbackData: initialProjects,
  });

  const availableYears = useMemo(() => {
    const targetData =
      selectedCompany === "all"
        ? allProjects
        : allProjects.filter(
            (p) => String(p.experience_id) === selectedCompany,
          );
    const years = targetData.map((p) => p.year).filter((y): y is number => !!y);
    return Array.from(new Set(years)).sort((a, b) => b - a);
  }, [selectedCompany, allProjects]);

  const displayExperience =
    selectedCompany === "all"
      ? experiences[0]
      : experiences.find((exp) => String(exp.id) === selectedCompany);

  return (
    <PageLayout className="min-h-screen bg-white pt-12.5 pb-25">
      <section className="relative flex items-center justify-center mb-17.5">
        <Image
          src="/images/donut-graphic.png"
          width={650}
          height={650}
          alt="도넛"
          className="mix-blend-luminosity"
        />
      </section>

      <section className="max-w-7xl mx-auto px-4">
        {displayExperience && <ExperienceCard experience={displayExperience} />}
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="flex gap-4 mb-10">
          <ExperienceFilters
            experiences={experiences}
            years={availableYears}
            onCompanyChange={setSelectedCompany}
            onYearChange={setSelectedYear}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-555">
              등록된 프로젝트가 없습니다.
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </section>
    </PageLayout>
  );
}
