"use client";

import { useState, useEffect, useRef } from "react";
import { DropdownProps } from "@/types/common/ui";
import { useOutsideClick } from "@/hooks/common/useOutsideClick";

export const Dropdown = ({
  trigger,
  items,
  width = "w-[150px]",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  // 메뉴 토글 함수
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모(리스트 아이템 등)의 클릭 이벤트 전파 방지
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* 트리거 영역: 클릭 이벤트 연결 */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {/* 드롭다운 메뉴 영역: isOpen 상태에 따라 노출 */}
      {isOpen && (
        <div
          className={`
            absolute top-full right-0 mt-2
            ${width} bg-white border border-gray-ddd rounded-md shadow-lg z-20 py-2
          `}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="px-4 py-2 text-sm md:text-base font-medium hover:bg-bg-light transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
                setIsOpen(false); // 아이템 클릭 시 메뉴 닫기
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
