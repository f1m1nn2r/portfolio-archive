import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/components/common/Icon";
import { PostCategorySelectProps } from "./types";

export function PostCategorySelect({
  categories,
  category1,
  setCategory1,
  category2,
  setCategory2,
  subCategories,
}: PostCategorySelectProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="flex-1">
        <label className="inline-block text-base font-medium mb-4">
          1차 카테고리
        </label>
        <Select
          value={category1}
          onValueChange={(value) => {
            setCategory1(value);
            setCategory2("");
          }}
        >
          <SelectTrigger className="flex w-full items-center justify-between rounded-none border border-black px-6 py-5.5 text-base">
            <SelectValue placeholder="1차 카테고리 선택" />
            <Icon type="solidDownArrowAlt" size={12} className="text-black" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="inline-block text-base font-medium mb-4">
          2차 카테고리
        </label>
        <Select
          value={category2}
          onValueChange={setCategory2}
          disabled={!category1 || subCategories.length === 0}
        >
          <SelectTrigger className="flex w-full items-center justify-between rounded-none border border-black px-6 py-5.5 text-base">
            <SelectValue
              placeholder={
                !category1
                  ? "1차 카테고리 먼저 선택해주세요."
                  : subCategories.length === 0
                    ? "2차 카테고리 없음"
                    : "2차 카테고리 선택"
              }
            />
            <Icon type="solidDownArrowAlt" size={12} className="text-black" />
          </SelectTrigger>
          <SelectContent>
            {subCategories.map((sub) => (
              <SelectItem key={sub.id} value={sub.id}>
                {sub.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
