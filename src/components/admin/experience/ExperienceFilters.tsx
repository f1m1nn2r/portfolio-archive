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
    <div className="mb-10 flex w-full flex-col gap-4 md:flex-row">
      {/* 회사 선택 필터 (동적) */}
      <div className="w-full md:w-[350px]">
        <Select value={selectedCompany} onValueChange={onCompanyChange}>
          <SelectTrigger className="flex w-full items-center justify-between rounded-none border border-black px-6 py-5.5 text-base">
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
      </div>

      {/* 연도 선택 필터 (부모에서 계산된 연도에 따라 동적으로 변함) */}
      <div className="w-full md:w-[350px]">
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="flex w-full items-center justify-between rounded-none border border-black px-6 py-5.5 text-base">
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
    </div>
  );
}
