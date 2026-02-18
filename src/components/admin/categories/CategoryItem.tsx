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
    <div className="flex flex-col gap-2 px-4 py-3 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      {isEditing ? (
        <div className="ml-0 flex w-full min-w-0 flex-col gap-2 sm:mr-4 sm:ml-6 sm:flex-1 sm:flex-row">
          <input
            autoFocus
            className="min-w-0 flex-1 rounded border bg-white p-1 px-2 text-sm outline-none focus:border-gray-555"
            value={editName}
            onChange={(e) => onEditChange(e.target.value)}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => onUpdate(category.id)}
            className={`w-full whitespace-nowrap sm:w-auto ${disabledStyles}`}
          >
            저장
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="w-full whitespace-nowrap sm:w-auto"
          >
            취소
          </Button>
        </div>
      ) : (
        <div className="flex w-full items-center gap-2 pl-1 text-gray-600 sm:pl-4">
          <Icon type="fileBlank" size={16} />
          <span>
            {category.name}
            <span className="ml-1 text-base">
              ({(category as any).postCount || 0})
            </span>
          </span>
        </div>
      )}
      <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:flex">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onOpenEdit(category)}
          className={`w-full whitespace-nowrap sm:w-auto ${disabledStyles}`}
        >
          수정
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onOpenDelete(category.id)}
          className={`w-full whitespace-nowrap sm:w-auto ${disabledStyles}`}
        >
          삭제
        </Button>
      </div>
    </div>
  );
}
