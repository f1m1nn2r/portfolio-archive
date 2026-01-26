"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/admin/experience/ProjectCard";
import { ExperienceFilters } from "@/components/admin/experience/ExperienceFilters";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { PageLayout } from "@/components/common/PageLayout";
import { useExperience } from "@/hooks/useExperience";
import { useProjects } from "@/hooks/useProjects";

export default function ExperiencePage() {
  // 필터 상태 관리
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // 경력 데이터 (SWR)
  const { experiences, loading: expLoading } = useExperience();

  // 프로젝트 데이터 (SWR)
  // 훅 내부에서 selectedCompany, selectedYear가 바뀔 때마다 자동으로 데이터 관리
  const {
    projects,
    allProjects,
    loading: projLoading,
  } = useProjects({
    experienceId: selectedCompany,
    year: selectedYear,
  });

  // 선택 가능한 연도 리스트 계산 (전체 프로젝트 데이터를 기준으로 추출)
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

  // 로딩 상태 처리
  if (expLoading || projLoading) {
    return (
      <main className="min-h-screen bg-white pt-12.5 pb-25 flex items-center justify-center">
        <p className="text-xl font-medium">로딩 중...</p>
      </main>
    );
  }

  // 표시할 경력 카드 데이터 선택
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
