"use client";

import { CategoryItem } from "@/components/admin/categories/CategoryItem";
import { Button } from "@/components/common/Button";
import { useAdmin } from "@/providers/AdminProvider";

export function CategoryGroup({
  parent,
  status,
  setters,
  handlers,
  inputStyles,
}: any) {
  const { isMaster } = useAdmin();
  const disabledStyles = !isMaster ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div className="border rounded-lg overflow-hidden border-gray-ddd bg-white">
      {/* 1차 카테고리 헤더 */}
      <div className="flex flex-col gap-3 bg-bg-light p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        {status.editingId === parent.id ? (
          // 수정 모드
          <div className="flex w-full min-w-0 flex-col gap-2 sm:mr-4 sm:flex-1 sm:flex-row">
            <input
              autoFocus
              className="min-w-0 flex-1 rounded border bg-white p-1 px-2 outline-none"
              value={status.editName}
              onChange={(e) => setters.setEditName(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handlers.handleUpdate(parent.id)
              }
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => handlers.handleUpdate(parent.id)}
              disabled={!isMaster}
              className={`whitespace-nowrap sm:w-auto ${disabledStyles}`}
            >
              저장
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setters.setEditingId(null)}
              className={`whitespace-nowrap sm:w-auto ${disabledStyles}`}
            >
              취소
            </Button>
          </div>
        ) : (
          // 일반 모드
          <span className="text-lg font-medium">
            {parent.name}
            <span className="text-base ml-1 ">({parent.postCount || 0})</span>
          </span>
        )}

        {/* 1차 카테고리 액션 버튼 */}
        <div className="grid w-full grid-cols-3 gap-2 sm:w-auto sm:flex">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setters.setAddingParentId(parent.id)}
            disabled={!isMaster}
            className={`w-full whitespace-nowrap sm:w-auto ${disabledStyles}`}
          >
            추가
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => handlers.openEdit(parent)}
            disabled={!isMaster}
            className={`w-full whitespace-nowrap sm:w-auto ${disabledStyles}`}
          >
            수정
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={() => handlers.openDelete(parent.id)}
            disabled={!isMaster}
            className={`w-full whitespace-nowrap sm:w-auto ${disabledStyles}`}
          >
            삭제
          </Button>
        </div>
      </div>

      {/* 2차 카테고리 목록 */}
      <div className="divide-y divide-gray-eee">
        {parent.children?.map((sub: any) => (
          <CategoryItem
            key={sub.id}
            category={sub}
            isEditing={status.editingId === sub.id}
            editName={status.editName}
            onEditChange={setters.setEditName}
            onUpdate={handlers.handleUpdate}
            onCancel={() => setters.setEditingId(null)}
            onOpenEdit={handlers.openEdit}
            onOpenDelete={handlers.openDelete}
            isMaster={isMaster}
          />
        ))}

        {/* 2차 추가 인라인 폼: 관리자이고 추가 모드일 때만 표시 */}
        {isMaster && status.addingParentId === parent.id && (
          <div className="flex flex-col gap-2 border-t border-gray-eee bg-gray-50 p-4 sm:flex-row">
            <input
              autoFocus
              placeholder="새 2차 카테고리 이름"
              className={`${inputStyles} flex-1`}
              value={status.newSubName}
              onChange={(e) => setters.setNewSubName(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handlers.handleAddSub(parent.id)
              }
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handlers.handleAddSub(parent.id)}
              className="w-full whitespace-nowrap sm:w-auto"
            >
              저장
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setters.setAddingParentId(null)}
              className="w-full whitespace-nowrap sm:w-auto"
            >
              취소
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
