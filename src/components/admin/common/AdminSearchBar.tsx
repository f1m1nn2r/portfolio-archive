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
    <div className="flex w-full flex-wrap justify-end gap-2">
      <div className="relative w-full sm:w-[300px]">
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
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              필터 <Icon type="chevronDown" size={20} />
            </Button>
          }
          items={filterItems}
        />
      )}
    </div>
  );
}
