import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { ProjectCard } from "@/components/admin/project/ProjectCard";
import { ExperienceFilters } from "@/components/admin/experience/ExperienceFilters";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { MESSAGES } from "@/lib/constants/messages";
import { useProjectManagement } from "@/hooks/project/useProjectManagement";
import { useAdminMode } from "@/hooks/common/useAdminMode";
import { usePagination } from "@/hooks/common/usePagination";
import { CommonPagination } from "@/components/common/Pagination";
import { ProjectModal } from "@/components/admin/project/ProjectModal";
import DeleteModal from "@/components/common/DeleteModal";

export function ProjectManagementSection() {
  const { isMaster } = useAdminMode();
  const {
    projects,
    experiences,
    availableYears,
    summaryItems,
    projectModal,
    deleteModal,
    handlers,
  } = useProjectManagement();

  const {
    currentData: paginatedProjects,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(projects, { itemsPerPage: 6 });

  return (
    <>
      <section className="mt-20">
        <AdminSummaryGrid items={summaryItems} />
        <h3 className="text-lg font-bold pb-5 mb-5 border-b border-gray-ddd mt-10">
          작업물 관리
        </h3>
        <ExperienceFilters
          experiences={experiences}
          years={availableYears}
          onCompanyChange={handlers.setCompany}
          onYearChange={(value: string) => handlers.setYear(value)}
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
          {paginatedProjects.length === 0 ? (
            <div className="col-span-3 text-center py-20 text-gray-555">
              {MESSAGES.PROJECT.EMPTY}
            </div>
          ) : (
            paginatedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isAdmin={isMaster}
                onDelete={() =>
                  project.id && handlers.openDeleteModal(project.id)
                }
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <CommonPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </section>

      <ProjectModal
        key={projectModal.data?.id || "new-project"}
        isOpen={projectModal.isOpen}
        onClose={projectModal.close}
        mode={projectModal.data ? "edit" : "add"}
        initialData={projectModal.data}
        experiences={experiences}
        onSave={handlers.saveProject}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onConfirm={deleteModal.onConfirm}
        title="작업물 삭제"
      />
    </>
  );
}
