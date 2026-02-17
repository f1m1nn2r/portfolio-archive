"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { AdminTable } from "@/components/admin/table/AdminTable";
import { CommonPagination } from "@/components/common/Pagination";
import { Button } from "@/components/common/Button";
import { Backlog, BacklogEpicManager, useBacklogPage } from "@/features/admin/backlog";
import { Dropdown } from "@/components/common/Dropdown";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { DeleteButton } from "@/components/common/DeleteButton";
import { useAdmin } from "@/providers/AdminProvider";

export default function BacklogPage() {
  const { isMaster } = useAdmin();

  const {
    backlogData,
    summaryItems,
    page,
    totalPages,
    columns,
    selection,
    deleteModal,
    handlers,
    addBacklog,
  } = useBacklogPage(isMaster);

  return (
    <AdminPageLayout title="Backlog">
      <AdminSummaryGrid items={summaryItems} columns={3} />

      <AdminActionBar>
        <div className="ml-auto flex w-full flex-wrap justify-end gap-2 sm:w-auto">
          <DeleteButton
            disabled={selection.selectionCount === 0}
            onClick={handlers.openDeleteModal}
          />

          <Dropdown
            width="w-[160px]"
            trigger={
              <Button variant="secondary" icon="chevronDown">
                필터: {handlers.currentFilterLabel}
              </Button>
            }
            items={handlers.filterOptions.map((option) => ({
              label: option.label,
              onClick: () => handlers.handleFilterChange(option.key),
            }))}
          />
        </div>
      </AdminActionBar>

      <AdminTable<Backlog>
        columns={columns}
        data={backlogData}
        selectedIds={selection.selectedIds}
        showAddColumn={isMaster}
        onToggleSelect={(id) => selection.toggleSelect(String(id))}
        onToggleSelectAll={selection.toggleSelectAll}
        getItemId={(item) => String(item.id)}
        onAdd={isMaster ? addBacklog : undefined}
        rowClassName={(item, isSelected) => {
          const baseClass =
            "text-base transition-colors border-b border-gray-ddd";
          if (item.is_done) {
            return `bg-bg-light text-gray-400 hover:bg-bg-light`;
          }
          if (isSelected) {
            return `bg-blue-50/50 hover:bg-blue-50`;
          }

          return `${baseClass}`;
        }}
      />

      {/* 백로그 페이지네이션 */}
      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlers.handlePageChange}
      />

      {/* 백로그 에픽 관리 */}
      <BacklogEpicManager />

      {/* 공통 삭제 모달창 */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handlers.closeDeleteModal}
        onConfirm={() => handlers.confirmDelete()}
      />
    </AdminPageLayout>
  );
}
