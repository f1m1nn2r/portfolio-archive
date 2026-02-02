"use client";

import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { useCategories } from "@/hooks/categories/useCategories";
import { CategoryGroup } from "@/components/admin/categories/CategoryGroup";
import { LoadingState } from "@/components/common/LoadingState";
import { showToast } from "@/utils/toast";
import DeleteModal from "@/components/common/DeleteModal";

export default function CategoriesPage() {
  const {
    categories,
    loading,
    summary,
    summaryItems,
    state,
    setters,
    handlers,
    isMaster,
  } = useCategories();

  const inputStyles =
    "w-full p-5 py-2 border border-gray-ddd rounded-md text-sm outline-none focus:border-gray-555 transition-colors bg-white";

  if (loading) {
    return (
      <AdminPageLayout title="Profile Settings">
        <LoadingState message="카테고리 데이터를 불러오는 중..." />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Categories">
      <AdminSummaryGrid items={summaryItems} />

      <div className="mt-8">
        <h3 className="text-lg font-bold pb-5 border-b border-gray-ddd mb-7.5">
          전체 카테고리({summary.totalCount})
        </h3>

        <div className="flex flex-col gap-10">
          {/* 1차 카테고리 그룹들을 순회하며 렌더링 */}
          {categories.map((parent) => (
            <CategoryGroup
              key={parent.id}
              parent={parent}
              status={state}
              setters={setters}
              handlers={handlers}
              inputStyles={inputStyles}
              isMaster={isMaster}
            />
          ))}

          {/* 새 1차 카테고리 추가 폼 */}
          <div className="flex gap-2 bg-bg-light p-5 border border-gray-ddd rounded-lg">
            <input
              placeholder="새 1차 카테고리 이름을 입력하세요."
              className={inputStyles}
              value={state.newParentName}
              onChange={(e) => setters.setNewParentName(e.target.value)}
              disabled={!isMaster}
            />
            <Button
              variant="secondary"
              size="md"
              className={
                !isMaster
                  ? "opacity-50 cursor-not-allowed "
                  : "whitespace-nowrap"
              }
              onClick={handlers.handleAddParent}
              disabled={!isMaster}
            >
              <Icon type="plus" size={16} /> 새 카테고리 추가
            </Button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={state.isDeleteModalOpen}
        onClose={() => setters.setIsDeleteModalOpen(false)}
        onConfirm={
          isMaster
            ? handlers.handleDelete
            : () => showToast.error("권한이 없습니다.")
        }
        title="카테고리 삭제"
        description="정말 삭제하시겠습니까? 1차 카테고리 삭제 시 하위 항목도 모두 삭제됩니다."
      />
    </AdminPageLayout>
  );
}
