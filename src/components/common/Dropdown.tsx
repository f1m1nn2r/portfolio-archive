"use client";

import { DropdownProps } from "@/types/common/ui";

export const Dropdown = ({
  trigger,
  items,
  width = "w-[150px]",
}: DropdownProps) => {
  return (
    <div className="relative group cursor-pointer">
      {/* 트리거 영역 */}
      {trigger}

      {/* 드롭다운 메뉴 영역 */}
      <div
        className={`
        hidden group-hover:block absolute top-full left-0 mt-1 
        ${width} bg-white border border-gray-ddd rounded-md shadow-lg z-10 py-2.5
      `}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="px-4 py-2 text-base font-medium hover:bg-gray-50 transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // 부모 클릭 이벤트 방지
              item.onClick();
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
