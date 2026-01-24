"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { ExperienceModal } from "@/components/admin/experience/ExperienceModal";
import { ProjectModal } from "@/components/admin/experience/ProjectModal";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { Experience } from "@/types/api/experience";
import { ExperienceCard } from "@/components/admin/experience/ExperienceCard";
import { useExperience } from "@/hooks/useExperience";
import { calculateTotalExperience } from "@/utils/date";
import { AdminSummaryItem } from "@/types/admin/layout";
import { LoadingState } from "@/components/common/LoadingState";
import { ExperienceFilters } from "@/components/admin/experience/ExperienceFilters";
import { useProjects } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/admin/experience/ProjectCard";
import { useProjectStore } from "@/store/useProjectStore";

export default function ExperiencePage() {
  // 필터 상태 (SWR 키로 활용됨)
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  // 데이터 데이터 로딩 (SWR 훅)
  const { experiences, loading, fetchExperiences, deleteExperience } =
    useExperience();

  // 필터를 인자로 전달하여 SWR이 자동으로 필터링된 데이터를 가져오게 함
  const { projects, allProjects, fetchProjects } = useProjects({
    experienceId: selectedCompany,
    year: selectedYear,
  });

  // 프로젝트/경력 모달 관련 상태
  const { isEditModalOpen, closeEditModal, selectedProject } =
    useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  // 필터 연도 계산 (allProjects 기반)
  const availableYears = useMemo(() => {
    const targetProjects =
      selectedCompany === "all" || !selectedCompany
        ? allProjects
        : allProjects.filter(
            (p) => String(p.experience_id) === selectedCompany,
          );

    const years = targetProjects
      .map((p) => p.year)
      .filter((y): y is number => !!y);
    return Array.from(new Set(years)).sort((a, b) => b - a);
  }, [selectedCompany, allProjects]);

  // ------------------ 핸들러

  // 경력 모달 열기
  const openAddModal = () => {
    setSelectedExperience(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const openEditModalForExp = (exp: Experience) => {
    setSelectedExperience(exp);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // 저장 성공 시 SWR mutate 호출
  const handleSaveSuccess = () => {
    setIsModalOpen(false);
    fetchExperiences(); // SWR mutate
  };

  const handleProjectSaveSuccess = () => {
    closeEditModal();
    fetchProjects(); // SWR mutate
  };

  // 프로젝트 추가 모달 열기 (Zustand)
  const openAddProjectModal = () => {
    useProjectStore.setState({ isEditModalOpen: true, selectedProject: null });
  };

  // 요약 정보 계산
  const summaryItems: AdminSummaryItem[] = useMemo(
    () => [
      {
        title: "총 경력",
        value: calculateTotalExperience(experiences),
        icon: "briefcase",
        bgColor: "bg-bg-purple",
      },
      {
        title: "등록된 회사 수",
        value: `${experiences.length}개`,
        icon: "building",
        bgColor: "bg-bg-blue",
      },
    ],
    [experiences],
  );

  if (loading) {
    return (
      <AdminPageLayout title="Experience">
        <LoadingState message="경력을 불러오는 중..." />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Experience">
      <AdminSummaryGrid items={summaryItems} />

      {/* 경력 관리 섹션 */}
      <section className="mt-10">
        <h3 className="text-lg font-bold pb-5 mb-5 border-b border-gray-ddd">
          경력 관리
        </h3>
        <AdminActionBar>
          <Button variant="secondary" onClick={openAddModal}>
            <Icon type="plus" size={16} />새 경력 추가
          </Button>
        </AdminActionBar>

        <div className="flex flex-col gap-6 mb-10">
          {experiences.length === 0 ? (
            <div className="text-center py-20 text-gray-555">
              등록된 경력이 없습니다.
            </div>
          ) : (
            experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                onEdit={openEditModalForExp}
                onDelete={deleteExperience}
              />
            ))
          )}
        </div>
      </section>

      {/* 작업물 관리 섹션 */}
      <section className="mt-20">
        <h3 className="text-lg font-bold pb-5 mb-5 border-b border-gray-ddd">
          작업물 관리
        </h3>
        <ExperienceFilters
          experiences={experiences}
          years={availableYears}
          onCompanyChange={setSelectedCompany}
          onYearChange={setSelectedYear}
        />

        <AdminActionBar>
          <Button variant="secondary" onClick={openAddProjectModal}>
            <Icon type="plus" size={16} />새 작업물 추가
          </Button>
        </AdminActionBar>

        <div className="grid grid-cols-3 gap-7.5">
          {projects.length === 0 ? (
            <div className="col-span-3 text-center py-20 text-gray-555">
              등록된 작업물이 없습니다.
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} isAdmin={true} />
            ))
          )}
        </div>
      </section>

      {/* 모달 */}
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedExperience}
        onSaveSuccess={handleSaveSuccess}
      />
      <ProjectModal
        key={selectedProject?.id || "new-project"}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        mode={selectedProject ? "edit" : "add"}
        initialData={selectedProject}
        experiences={experiences}
        onSaveSuccess={handleProjectSaveSuccess}
      />
    </AdminPageLayout>
  );
}
