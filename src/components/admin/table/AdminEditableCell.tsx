import { AdminEditableCellProps } from "@/types/admin";
import { useState } from "react";

export function AdminEditableCell({ value, onSave }: AdminEditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || "");

  if (value !== undefined && !isEditing && currentValue !== (value || "")) {
    setCurrentValue(value || "");
  }

  const handleBlur = () => {
    setIsEditing(false);
    // 값이 실제로 변했을 때만 저장 실행
    if (currentValue !== (value || "")) {
      onSave(currentValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setCurrentValue(value || "");
    }
  };

  if (isEditing) {
    return (
      <input
        autoFocus
        className="w-full outline-none text-base"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <div
      className={`w-full min-h-[30px] flex items-center cursor-text hover:bg-gray-50 rounded transition-colors ${
        !value ? "text-gray-300" : "text-gray-700"
      }`}
      onClick={() => setIsEditing(true)}
    >
      <span className="truncate text-base">{value}</span>
    </div>
  );
}
