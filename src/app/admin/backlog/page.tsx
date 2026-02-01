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
import { Dropdown } from "@/components/common/Dropdown";

export default function BacklogPage() {
  const { isMaster, status, session } = useAdminMode();

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
  } = useBacklogPage(isMaster);

  if (status === "loading") {
    return (
      <AdminPageLayout title="Backlog">
        <LoadingState message="정보를 확인 중입니다..." />
      </AdminPageLayout>
    );
  }

  if (!session) {
    return (
      <AdminPageLayout title="Access Denied">
        <div className="py-20 text-center">
          <p className="text-lg">로그인이 필요한 페이지입니다.</p>
        </div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Backlog">
      <AdminAuthGuard isMaster={isMaster} />

      <AdminSummaryGrid items={summaryItems} columns={3} />

      <AdminActionBar>
        <div className="flex gap-2 ml-auto">
          {isMaster && (
            <Button
              variant="secondary"
              icon="trash"
              disabled={selection.selectionCount === 0}
              onClick={handlers.openDeleteModal}
            >
              선택 삭제 ({selection.selectionCount})
            </Button>
          )}
          <Dropdown
            width="w-[160px]"
            trigger={
              <Button variant="secondary" icon="chevronDown">
                필터: {handlers.currentFilterLabel}
              </Button>
            }
            items={[
              {
                label: "초기화(최신순)",
                onClick: () => handlers.handleFilterChange("latest"),
              },
              {
                label: "미구현",
                onClick: () => handlers.handleFilterChange("uncompleted"),
              },
              {
                label: "화면별",
                onClick: () => handlers.handleFilterChange("screen"),
              },
            ]}
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

      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlers.handlePageChange}
      />

      <BacklogEpicManager
        epics={epics}
        onAdd={isMaster ? (name) => handlers.addEpic(name) : undefined}
        onRemove={isMaster ? (id) => handlers.removeEpic(id) : undefined}
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
