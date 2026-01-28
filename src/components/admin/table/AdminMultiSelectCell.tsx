import { useState, useRef } from "react";
import { Badge } from "@/components/common/Badge";
import { Epic } from "@/types/admin/backlog";
import { useOutsideClick } from "@/hooks/common/useOutsideClick";
import { Icon } from "@/components/common/Icon";

interface Props {
  selectedIds: string[];
  allEpics: readonly Epic[];
  onToggle: (id: string) => void;
}

export function AdminMultiSelectCell({
  selectedIds = [],
  allEpics,
  onToggle,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 드롭다운 밖을 클릭하면 닫히게 설정
  useOutsideClick(containerRef, () => setIsOpen(false));

  // 현재 이 행에 선택된 에픽 객체들만 추출
  const selectedEpics = allEpics.filter((e) => selectedIds.includes(e.id));

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-wrap gap-1 cursor-pointer transition-all items-center"
      >
        {selectedEpics.length > 0 ? (
          selectedEpics.map((epic) => (
            <Badge
              key={epic.id}
              backgroundColor={epic.color}
              className=" px-1.5 py-0.5"
            >
              {epic.label}
            </Badge>
          ))
        ) : (
          <span className="text-gray-300">+ 에픽 선택</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-[220px] bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
          <div className="p-2 border-b border-gray-50 bg-gray-50/50">
            <span className="text-sm text-gray-555 uppercase tracking-wider">
              에픽 목록
            </span>
          </div>
          <div className="max-h-[250px] overflow-y-auto p-1">
            {allEpics.length === 0 ? (
              <p className="text-xs text-gray-400 p-2 text-center">
                등록된 에픽이 없습니다.
              </p>
            ) : (
              allEpics.map((epic) => {
                const isSelected = selectedIds.includes(epic.id);
                return (
                  <div
                    key={epic.id}
                    onClick={() => onToggle(epic.id)}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer transition-colors group"
                  >
                    {/* 체크박스 */}
                    <div className="flex items-center justify-center">
                      {isSelected ? (
                        <Icon type="checkboxChecked" />
                      ) : (
                        <Icon type="checkbox" />
                      )}
                    </div>
                    {/* 에픽 라벨 */}
                    <Badge backgroundColor={epic.color} className="text-xs">
                      {epic.label}
                    </Badge>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
