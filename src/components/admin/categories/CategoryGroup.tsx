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
      <div className="flex items-center justify-between p-5 bg-bg-light">
        {status.editingId === parent.id ? (
          // 수정 모드
          <div className="flex gap-2 flex-1 mr-4">
            <input
              autoFocus
              className="flex-1 p-1 px-2 border rounded outline-none bg-white"
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
              className={disabledStyles}
            >
              저장
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setters.setEditingId(null)}
              className={disabledStyles}
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
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setters.setAddingParentId(parent.id)}
            disabled={!isMaster}
            className={disabledStyles}
          >
            추가
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => handlers.openEdit(parent)}
            disabled={!isMaster}
            className={disabledStyles}
          >
            수정
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={() => handlers.openDelete(parent.id)}
            disabled={!isMaster}
            className={disabledStyles}
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
          <div className="p-4 bg-gray-50 flex gap-2 border-t border-gray-eee">
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
              className="whitespace-nowrap"
            >
              저장
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setters.setAddingParentId(null)}
              className="whitespace-nowrap"
            >
              취소
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
