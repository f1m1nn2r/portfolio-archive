import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Dropdown } from "@/components/common/Dropdown";
import { AdminSearchBarProps } from "@/types/admin";

export function AdminSearchBar({
  placeholder,
  searchValue,
  onSearchChange,
  filterItems = [],
}: AdminSearchBarProps) {
  return (
    <div className="flex w-full min-w-0 items-center justify-end gap-2">
      <div className="relative min-w-0 flex-1 sm:w-[300px] sm:flex-none">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-ddd rounded-sm py-1.5 px-10 text-base outline-none focus:border-gray-400"
        />
        <Icon
          type="search"
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* 필터 아이템이 있을 때만 드롭다운 렌더링 */}
      {filterItems.length > 0 && (
        <Dropdown
          trigger={
            <Button
              variant="secondary"
              size="md"
              className="shrink-0 whitespace-nowrap"
            >
              필터 <Icon type="chevronDown" size={20} />
            </Button>
          }
          items={filterItems}
        />
      )}
    </div>
  );
}
