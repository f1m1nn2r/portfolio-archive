// 1차 카테고리
import { CategoryItem } from "@/components/admin/categories/CategoryItem";
import { Button } from "@/components/common/Button";

export function CategoryGroup({
  parent,
  status,
  setters,
  handlers,
  inputStyles,
}: any) {
  return (
    <div className="border rounded-lg overflow-hidden border-gray-ddd bg-white">
      {/* 1차 카테고리 헤더 */}
      <div className="flex items-center justify-between p-5 bg-bg-light">
        {status.editingId === parent.id ? (
          <div className="flex gap-2 flex-1 mr-4">
            <input
              autoFocus
              className="flex-1 p-1 px-2 border rounded outline-none bg-white"
              value={status.editName}
              onChange={(e) => setters.setEditName(e.target.value)}
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => handlers.handleUpdate(parent.id)}
            >
              저장
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setters.setEditingId(null)}
            >
              취소
            </Button>
          </div>
        ) : (
          <span className="text-lg">
            {parent.name} ({parent.children?.length || 0})
          </span>
        )}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setters.setAddingParentId(parent.id)}
          >
            추가
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => handlers.openEdit(parent)}
          >
            수정
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={() => handlers.openDelete(parent.id)}
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
          />
        ))}

        {/* 2차 추가 인라인 폼 */}
        {status.addingParentId === parent.id && (
          <div className="p-4 bg-gray-50 flex gap-2">
            <input
              autoFocus
              placeholder="새 2차 카테고리 이름"
              className={`${inputStyles}`}
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
