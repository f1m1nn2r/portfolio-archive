// 2차 카테고리
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { CategoryItemProps } from "@/types/ui/category";

export function CategoryItem({
  category,
  isEditing,
  editName,
  onEditChange,
  onUpdate,
  onCancel,
  onOpenEdit,
  onOpenDelete,
  isMaster,
}: CategoryItemProps) {
  const disabledStyles = !isMaster ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div className="flex items-center justify-between py-3 px-5 hover:bg-gray-50 transition-colors">
      {isEditing ? (
        <div className="flex gap-2 flex-1 mr-4 ml-6">
          <input
            autoFocus
            className="flex-1 p-1 px-2 border rounded text-sm outline-none focus:border-gray-555 bg-white"
            value={editName}
            onChange={(e) => onEditChange(e.target.value)}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => onUpdate(category.id)}
            className={disabledStyles}
          >
            저장
          </Button>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            취소
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-gray-600 pl-4">
          <Icon type="fileBlank" size={16} />
          <span>
            {category.name}
            <span className="ml-1 text-base">
              ({(category as any).postCount || 0})
            </span>
          </span>
        </div>
      )}
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onOpenEdit(category)}
          className={disabledStyles}
        >
          수정
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onOpenDelete(category.id)}
          className={disabledStyles}
        >
          삭제
        </Button>
      </div>
    </div>
  );
}
