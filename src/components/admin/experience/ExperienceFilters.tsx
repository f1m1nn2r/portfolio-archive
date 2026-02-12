"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/components/common/Icon";
import { ExperienceFiltersProps } from "@/types/ui/experience";

export function ExperienceFilters({
  experiences,
  years,
  onCompanyChange,
  onYearChange,
  selectedCompany = "all",
  selectedYear = "all",
}: ExperienceFiltersProps) {
  return (
    <div className="flex gap-4 mb-10">
      {/* 회사 선택 필터 (동적) */}
      <Select value={selectedCompany} onValueChange={onCompanyChange}>
        <SelectTrigger className="w-[350px] px-6 py-5.5 border border-black rounded-none text-base flex justify-between items-center">
          <SelectValue placeholder="전체 회사" />
          <Icon type="solidDownArrowAlt" size={12} className="text-black" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          {experiences.map((exp) => (
            <SelectItem key={exp.id} value={String(exp.id)}>
              {exp.company}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 연도 선택 필터 (부모에서 계산된 연도에 따라 동적으로 변함) */}
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-[350px] px-6 py-5.5 border border-black rounded-none text-base flex justify-between items-center">
          <SelectValue placeholder="전체 연도" />
          <Icon type="solidDownArrowAlt" size={12} className="text-black" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">연도</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}년
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
