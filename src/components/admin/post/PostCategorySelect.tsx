import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/components/common/Icon";
import { PostCategorySelectProps } from "@/types/ui/post";

export function PostCategorySelect({
  categories,
  category1,
  setCategory1,
  category2,
  setCategory2,
  subCategories,
}: PostCategorySelectProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <label className="text-base font-medium mb-4 inline-block">
          1차 카테고리
        </label>
        <Select
          value={category1}
          onValueChange={(value) => {
            setCategory1(value);
            setCategory2("");
          }}
        >
          <SelectTrigger className="w-full px-6 py-5.5 border border-black rounded-none">
            <SelectValue placeholder="선택하세요" />
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
        <label className="text-base font-medium mb-4 inline-block">
          2차 카테고리
        </label>
        <Select
          value={category2}
          onValueChange={setCategory2}
          disabled={!category1 || subCategories.length === 0}
        >
          <SelectTrigger className="w-full px-6 py-5.5 border border-black rounded-none">
            <SelectValue
              placeholder={
                !category1
                  ? "1차 먼저 선택"
                  : subCategories.length === 0
                    ? "하위 없음"
                    : "선택하세요"
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
