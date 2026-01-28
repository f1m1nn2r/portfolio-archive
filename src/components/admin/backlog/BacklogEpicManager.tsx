import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { EpicManagerProps } from "@/types/admin/backlog";

export function BacklogEpicManager({
  epics,
  onRemove,
  onAdd,
}: EpicManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 추가 모드가 되면 자동으로 인풋에 포커스
  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  const handleAddEpic = () => {
    if (newLabel.trim()) {
      onAdd(newLabel.trim());
      setNewLabel("");
      setIsAdding(false);
    } else {
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddEpic();
    if (e.key === "Escape") {
      setIsAdding(false);
      setNewLabel("");
    }
  };

  return (
    <section className="mt-7.5">
      <h3 className="text-lg font-bold mb-5 pb-5 border-b border-gray-ddd">
        Epic 관리
      </h3>
      <div className="flex flex-wrap gap-2 items-center">
        {/* 기존 에픽 목록 */}
        {epics.map((epic) => (
          <Badge
            key={epic.id}
            backgroundColor={epic.color}
            className="flex items-center gap-1.5 py-1.5 px-3 group"
          >
            {epic.label}
            <button
              onClick={() => onRemove(epic.id)}
              className="opacity-50 hover:opacity-100 hover:text-red-500 transition-all"
              aria-label={`${epic.label} 삭제`}
            >
              <Icon type="x" size={14} />
            </button>
          </Badge>
        ))}

        {/* 에픽 추가 인풋 모드 */}
        {isAdding ? (
          <div className="flex items-center px-2 py-1 bg-white">
            <input
              ref={inputRef}
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onBlur={handleAddEpic} // 포커스 나가면 자동 저장
              onKeyDown={handleKeyDown}
              placeholder="Epic 이름 입력..."
              className="text-sm outline-none border-none focus:ring-0 ring-0 w-[120px] bg-transparent"
            />
          </div>
        ) : (
          <Button
            variant="secondary"
            size="md"
            className="text-gray-999 text-sm h-[34px] border-dashed"
            onClick={() => setIsAdding(true)}
          >
            <Icon type="plus" size={16} />
            Add Epic
          </Button>
        )}
      </div>
    </section>
  );
}
