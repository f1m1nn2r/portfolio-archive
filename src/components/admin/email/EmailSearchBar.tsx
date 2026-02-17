import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";

export function EmailSearchBar() {
  return (
    <div className="mb-4 flex w-full flex-wrap justify-end gap-2">
      <div className="relative w-full sm:w-[300px]">
        <input
          type="text"
          placeholder="이메일 검색"
          className="w-full border border-gray-ddd rounded-sm py-2 px-10 text-base outline-none focus:border-gray-400"
        />
        <Icon
          type="search"
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
      <Button variant="secondary" size="md" className="w-full sm:w-auto">
        필터 <Icon type="chevronDown" size={20} />
      </Button>
    </div>
  );
}
