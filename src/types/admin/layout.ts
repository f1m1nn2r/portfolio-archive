import { IconType } from "@/types/icon";
import { ReactNode } from "react";

export interface AdminPageLayoutProps {
  title: string;
  children: ReactNode;
}

export interface AdminSummaryItem {
  title: string;
  value: string | number;
  icon: IconType;
  bgColor: string;
}

export interface AdminSummaryGridProps {
  items: AdminSummaryItem[];
  columns?: 2 | 3 | 4;
}

export interface AdminActionBarProps {
  children: ReactNode;
  align?: "left" | "right" | "between";
}

export interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  bgColor: string;
}

export interface AdminFilterItem {
  label: string;
  onClick: () => void;
}

export interface AdminSearchBarProps {
  placeholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterItems?: AdminFilterItem[]; // 드롭다운에 들어갈 메뉴들
}
