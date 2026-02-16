import { useRef, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { useEpics } from "../hooks/useEpics";
import { useAdmin } from "@/providers/AdminProvider";
import { cn } from "@/lib/utils";

export function BacklogEpicManager() {
  const { isMaster } = useAdmin();
  const {
    epics,
    isAdding,
    setIsAdding,
    newLabel,
    setNewLabel,
    submitNewEpic,
    removeEpic,
  } = useEpics();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

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
            className={cn(
              "flex items-center gap-1.5 py-1.5 px-3",
              "group transition-all",
            )}
          >
            {epic.label}
            {isMaster && (
              <button
                onClick={() => removeEpic(epic.id)}
                className={cn(
                  "opacity-50 transition-all",
                  "hover:opacity-100 hover:text-red-500",
                )}
                aria-label={`${epic.label} 삭제`}
              >
                <Icon type="x" size={14} />
              </button>
            )}
          </Badge>
        ))}

        {/* 에픽 추가 인풋 모드 */}
        {isAdding ? (
          <div className="flex items-center px-2 py-1 bg-white border border-gray-ddd rounded-md">
            <input
              ref={inputRef}
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onBlur={submitNewEpic}
              onKeyDown={(e) => e.key === "Enter" && submitNewEpic()}
              placeholder="Epic 이름 입력..."
              className={cn(
                "text-sm bg-transparent outline-none border-none w-[120px]",
                "focus:ring-0 ring-0",
              )}
            />
          </div>
        ) : (
          isMaster && (
            <Button
              variant="secondary"
              size="md"
              className={cn(
                "text-gray-999 text-sm h-[34px]",
                "border-dashed hover:border-solid",
              )}
              onClick={() => setIsAdding(true)}
            >
              <Icon type="plus" size={16} />
              Add Epic
            </Button>
          )
        )}
      </div>
    </section>
  );
}
