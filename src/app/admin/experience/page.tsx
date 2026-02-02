"use client";

import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { ExperienceModal } from "@/components/admin/experience/ExperienceModal";
import { ProjectModal } from "@/components/admin/experience/ProjectModal";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { ExperienceCard } from "@/components/admin/experience/ExperienceCard";
import { LoadingState } from "@/components/common/LoadingState";
import { ExperienceFilters } from "@/components/admin/experience/ExperienceFilters";
import { ProjectCard } from "@/components/admin/experience/ProjectCard";
import { useExperiencePage } from "@/hooks/experience/useExperiencePage";
import DeleteModal from "@/components/common/DeleteModal";
import { useAdminMode } from "@/hooks/common/useAdminMode";
import { AdminAuthGuard } from "@/components/admin/common/AdminAuthGuard";

export default function ExperiencePage() {
  const { isMaster } = useAdminMode();
  const {
    experiences,
    projects,
    availableYears,
    summaryItems,
    expModal,
    projectModal,
    deleteModal,
    handlers,
  } = useExperiencePage();

  return (
    <AdminPageLayout title="Experience">
      <AdminSummaryGrid items={summaryItems} columns={3} />
      {/* 경력 관리 섹션 */}
      <section className="mt-10">
        <h3 className="text-lg font-bold pb-5 mb-5 border-b border-gray-ddd">
          경력 관리
        </h3>
        <AdminActionBar>
          <Button
            variant="secondary"
            onClick={handlers.openAddExp}
            disabled={!isMaster}
            className={!isMaster ? "opacity-50 cursor-not-allowed" : ""}
          >
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
                onEdit={handlers.openEditExp}
                onDelete={() => {
                  if (exp.id) {
                    handlers.openDeleteModal("experience", exp.id);
                  }
                }}
                isMaster={isMaster}
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
          onCompanyChange={handlers.setCompany}
          onYearChange={handlers.setYear}
        />

        <AdminActionBar>
          <Button
            variant="secondary"
            onClick={handlers.openAddProject}
            disabled={!isMaster}
            className={!isMaster ? "opacity-50 cursor-not-allowed" : ""}
          >
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
              <ProjectCard
                key={project.id}
                project={project}
                isAdmin={isMaster}
                onDelete={(id) => handlers.openDeleteModal("project", id)}
              />
            ))
          )}
        </div>
      </section>
      {/* 모달 관리 (Key 패턴 적용) */}
      <ExperienceModal
        key={expModal.data?.id || "new-exp"}
        isOpen={expModal.isOpen}
        onClose={handlers.closeExpModal}
        mode={expModal.mode}
        initialData={expModal.data}
        onSaveSuccess={handlers.onExpSaveSuccess}
      />
      <ProjectModal
        key={projectModal.data?.id || "new-project"}
        isOpen={projectModal.isOpen}
        onClose={projectModal.close}
        mode={projectModal.data ? "edit" : "add"}
        initialData={projectModal.data}
        experiences={experiences}
        onSaveSuccess={handlers.onProjectSaveSuccess}
      />
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onConfirm={deleteModal.onConfirm}
        title={deleteModal.type === "experience" ? "경력 삭제" : "작업물 삭제"}
        description={`선택한 경력을 정말 삭제하시겠습니까?`}
      />
    </AdminPageLayout>
  );
}
