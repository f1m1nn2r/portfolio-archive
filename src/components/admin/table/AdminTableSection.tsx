import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { AdminTableSectionProps } from "@/types/admin";

export function AdminTableSection({
  title,
  children,
  actionButtons,
  showDeleteButton = false,
  onDelete,
}: AdminTableSectionProps) {
  return (
    <div className="mb-15 last:mb-0">
      {title && (
        <div className="mt-7.5 border-gray-100">
          <h3 className="text-lg font-bold mb-5 pb-5 border-b border-gray-ddd">
            {title}
          </h3>
        </div>
      )}

      {actionButtons && <div className="mb-4">{actionButtons}</div>}

      {children}

      {showDeleteButton && (
        <div className="w-full text-right mt-5">
          <Button
            variant="danger"
            size="md"
            className="h-10"
            onClick={onDelete}
          >
            <Icon type="trash" size={16} /> 테이블 삭제
          </Button>
        </div>
      )}
    </div>
  );
}
