import DeleteModal from "@/components/common/DeleteModal";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { ExperienceCard } from "@/components/admin/experience/ExperienceCard";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { ExperienceModal } from "@/components/admin/experience/ExperienceModal";
import { MESSAGES } from "@/lib/constants/messages";
import { useExperienceManagement } from "@/hooks/experience/useExperienceManagement";

export function ExperienceManagementSection() {
  const { experiences, summaryItems, isMaster, expModal, deleteModal } =
    useExperienceManagement();

  return (
    <>
      <section className="mt-10">
        <AdminSummaryGrid items={summaryItems} columns={2} />
        <h3 className="text-lg font-bold pb-5 mb-5 border-b border-gray-ddd mt-10">
          경력 관리
        </h3>

        <AdminActionBar>
          <Button
            variant="secondary"
            onClick={expModal.openAdd}
            disabled={!isMaster}
          >
            <Icon type="plus" size={16} />새 경력 추가
          </Button>
        </AdminActionBar>

        <div className="flex flex-col gap-6 mb-10">
          {experiences.length === 0 ? (
            <div className="text-center py-20 text-gray-555">
              {MESSAGES.EXPERIENCE.EMPTY}
            </div>
          ) : (
            experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                onEdit={expModal.openEdit}
                onDelete={() => exp.id && deleteModal.open(exp.id)}
                isMaster={isMaster}
              />
            ))
          )}
        </div>
      </section>

      <ExperienceModal
        key={expModal.selected?.id || "new-exp"}
        isOpen={expModal.isOpen}
        onClose={expModal.close}
        mode={expModal.mode}
        initialData={expModal.selected}
        onSaveSuccess={expModal.onSaveSuccess}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={deleteModal.confirm}
        title="경력 삭제"
        description={MESSAGES.EXPERIENCE.CONFIRM_DELETE}
      />
    </>
  );
}
