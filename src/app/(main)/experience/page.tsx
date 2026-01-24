"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Experience } from "@/types/api/experience";
import { Project } from "@/types/api/project";
import { ProjectCard } from "@/components/admin/experience/ProjectCard";
import { ExperienceFilters } from "@/components/admin/experience/ExperienceFilters";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { PageLayout } from "@/components/common/PageLayout";
import { getExperiences } from "@/services";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const expData = await getExperiences();
        setExperiences(expData);

        const projRes = await fetch("/api/projects");
        const projData = await projRes.json();
        setAllProjects(projData.data || []);
        setProjects(projData.data || []);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 필터링
  useEffect(() => {
    let filtered = [...allProjects];

    // 회사별 필터: all이 아닐 때만 필터링 수행
    if (selectedCompany && selectedCompany !== "all") {
      filtered = filtered.filter(
        (p) => p.experience_id === Number(selectedCompany),
      );
    }

    // 연도별 필터: all이 아닐 때만 필터링 수행
    if (selectedYear && selectedYear !== "all") {
      filtered = filtered.filter((p) => p.year === Number(selectedYear));
    }

    setProjects(filtered);
  }, [selectedCompany, selectedYear, allProjects]);

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

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-12.5 pb-25 flex items-center justify-center">
        <p className="text-xl">로딩 중...</p>
      </main>
    );
  }

  // 선택된 회사가 all이면 가장 최근 경력을 보여주고
  // 특정 회사가 선택되면 해당 id와 일치하는 경력을 찾아서 보여줌
  const displayExperience =
    selectedCompany === "all"
      ? experiences[0]
      : experiences.find((exp) => String(exp.id) === selectedCompany);

  return (
    <PageLayout className="min-h-screen bg-white pt-12.5 pb-25">
      {/* 상단 이미지 영역 */}
      <section className="relative flex items-center justify-center mb-17.5">
        <Image
          src="/images/donut-graphic.png"
          width={650}
          height={650}
          alt="도넛"
          className="mix-blend-luminosity"
        />
      </section>

      {/* 경력 정보 */}
      <section className="max-w-7xl mx-auto px-4">
        {displayExperience && <ExperienceCard experience={displayExperience} />}
      </section>
      {/* 프로젝트 섹션 */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="flex gap-4 mb-10">
          <ExperienceFilters
            experiences={experiences}
            years={availableYears}
            onCompanyChange={setSelectedCompany}
            onYearChange={setSelectedYear}
          />
        </div>

        {/* 프로젝트 그리드 */}
        <div className="grid grid-cols-3 gap-7.5">
          {projects.length === 0 ? (
            <div className="col-span-3 text-center py-20 text-gray-555">
              등록된 프로젝트가 없습니다.
            </div>
          ) : (
            projects.map((project) => (
              /* actions를 넘기지 않으면 내부에서 기본 Learn more 버튼을 렌더링함 */
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </section>
    </PageLayout>
  );
}
