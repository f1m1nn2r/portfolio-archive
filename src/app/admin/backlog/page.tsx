// src/app/admin/backlog/page.tsx
"use client";

import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { AdminTable } from "@/components/admin/table/AdminTable";
import { CommonPagination } from "@/components/common/Pagination";
import { LoadingState } from "@/components/common/LoadingState";
import { Button } from "@/components/common/Button";
import { Backlog } from "@/types/admin";
import { useBacklogPage } from "@/hooks/backlog/useBacklogPage";
import { BacklogEpicManager } from "@/components/admin/backlog/BacklogEpicManager";
import DeleteModal from "@/components/common/DeleteModal";

export default function BacklogPage() {
  const {
    backlogData,
    loading,
    page,
    totalPages,
    columns,
    epics,
    summaryItems,
    selection,
    deleteModal,
    handlers,
    addBacklog,
  } = useBacklogPage();

  if (loading) {
    return (
      <AdminPageLayout title="Backlog">
        <LoadingState message="백로그를 불러오는 중..." />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Backlog">
      <AdminSummaryGrid items={summaryItems} columns={3} />

      <AdminActionBar>
        <div className="flex gap-2 ml-auto">
          <Button
            variant="secondary"
            icon="trash"
            disabled={selection.selectionCount === 0}
            onClick={handlers.openDeleteModal}
          >
            선택 삭제 ({selection.selectionCount})
          </Button>
          <Button variant="secondary" icon="chevronDown">
            필터
          </Button>
        </div>
      </AdminActionBar>

      <AdminTable<Backlog>
        columns={columns}
        data={backlogData}
        selectedIds={selection.selectedIds}
        onToggleSelect={(id) => selection.toggleSelect(String(id))}
        onToggleSelectAll={selection.toggleSelectAll}
        getItemId={(item) => String(item.id)}
        onAdd={addBacklog}
      />

      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlers.handlePageChange}
      />

      <BacklogEpicManager
        epics={epics}
        onAdd={(name) => handlers.addEpic(name)}
        onRemove={(id) => handlers.removeEpic(id)}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handlers.closeDeleteModal}
        onConfirm={handlers.confirmDelete}
      />
    </AdminPageLayout>
  );
}
