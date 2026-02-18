"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { ProjectCard } from "@/components/admin/project/ProjectCard";
import { ExperienceFilters } from "@/components/admin/experience/ExperienceFilters";
import { ExperienceCard } from "@/components/domains/experience/ExperienceCard";
import { PageLayout } from "@/components/common/PageLayout";
import { useExperience } from "@/hooks/experience/useExperience";
import { useProjects } from "@/hooks/project/useProjects";
import { ExperienceClientProps } from "@/types/ui/experience";

export default function ExperienceClient({
  initialExperiences,
  initialProjects,
}: ExperienceClientProps) {
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const { experiences } = useExperience({ initialData: initialExperiences });
  const { projects, allProjects, loading } = useProjects({
    experienceId: selectedCompany,
    year: selectedYear,
    fallbackData: initialProjects,
  });

  const getAvailableYearsByCompany = useCallback(
    (companyId: string) => {
      const targetData =
        companyId === "all"
          ? allProjects
          : allProjects.filter((p) => String(p.experience_id) === companyId);

      const years = targetData
        .map((p) => p.year)
        .filter((y): y is number => typeof y === "number");

      return Array.from(new Set(years)).sort((a, b) => b - a);
    },
    [allProjects],
  );

  const availableYears = useMemo(
    () => getAvailableYearsByCompany(selectedCompany),
    [selectedCompany, getAvailableYearsByCompany],
  );

  const handleCompanyChange = useCallback(
    (companyId: string) => {
      setSelectedCompany(companyId);
      setSelectedYear((prevYear) => {
        if (prevYear === "all") return prevYear;

        const nextAvailableYears = getAvailableYearsByCompany(companyId);
        return nextAvailableYears.includes(Number(prevYear)) ? prevYear : "all";
      });
    },
    [getAvailableYearsByCompany],
  );

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

      <section className="max-w-7xl mx-auto">
        {displayExperience && <ExperienceCard experience={displayExperience} />}
      </section>

      <section className="max-w-7xl mx-auto mt-20">
        <ExperienceFilters
          experiences={experiences}
          years={availableYears}
          selectedCompany={selectedCompany}
          selectedYear={selectedYear}
          onCompanyChange={handleCompanyChange}
          onYearChange={setSelectedYear}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {loading ? (
            <div className="col-span-full text-center py-20 text-gray-555">
              작업물을 불러오는 중입니다.
            </div>
          ) : projects.length === 0 ? (
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
