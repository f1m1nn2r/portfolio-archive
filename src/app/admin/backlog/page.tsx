"use client";

import DeleteModal from "@/components/common/DeleteModal";
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
import { useAdminMode } from "@/hooks/common/useAdminMode";
import { AdminAuthGuard } from "@/components/admin/common/AdminAuthGuard";

export default function BacklogPage() {
  const { isMaster, adminPassword, setAdminPassword } = useAdminMode();

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
  } = useBacklogPage(adminPassword, isMaster);

  if (loading) {
    return (
      <AdminPageLayout title="Backlog">
        <LoadingState message="백로그를 불러오는 중..." />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Backlog">
      <AdminAuthGuard
        isMaster={isMaster}
        password={adminPassword}
        onPasswordChange={setAdminPassword}
      />

      <AdminSummaryGrid items={summaryItems} columns={3} />

      <AdminActionBar>
        <div className="flex gap-2 ml-auto">
          {isMaster && (
            <Button
              variant="secondary"
              icon="trash"
              disabled={selection.selectionCount === 0 || !adminPassword}
              onClick={handlers.openDeleteModal}
            >
              선택 삭제 ({selection.selectionCount})
            </Button>
          )}
          <Button variant="secondary" icon="chevronDown">
            필터
          </Button>
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
      />

      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlers.handlePageChange}
      />

      <BacklogEpicManager
        epics={epics}
        onAdd={
          isMaster ? (name) => handlers.addEpic(name, adminPassword) : undefined
        }
        onRemove={
          isMaster ? (id) => handlers.removeEpic(id, adminPassword) : undefined
        }
        isMaster={isMaster}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handlers.closeDeleteModal}
        onConfirm={() => handlers.confirmDelete()}
      />
    </AdminPageLayout>
  );
}
