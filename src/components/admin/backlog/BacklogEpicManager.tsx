import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { EpicManagerProps } from "@/types/admin";

export function EpicManager({ epics, onRemove, onAdd }: EpicManagerProps) {
  return (
    <section className="mt-7.5 border-gray-100">
      <h3 className="text-lg font-bold mb-5 pb-5 border-b border-gray-ddd">
        Epic 관리
      </h3>
      <div className="flex flex-wrap gap-2">
        {epics.map((epic) => (
          <Badge key={epic.id} backgroundColor={epic.color}>
            <button
              onClick={() => onRemove(epic.id)}
              className="hover:opacity-70"
              aria-label={`${epic.label} 삭제`}
            >
              <Icon type="x" size={16} />
            </button>
            {epic.label}
          </Badge>
        ))}
        <Button
          variant="secondary"
          size="md"
          className="text-gray-999 text-sm"
          onClick={onAdd}
        >
          <Icon type="plus" size={16} />
          Add Epic
        </Button>
      </div>
    </section>
  );
}
