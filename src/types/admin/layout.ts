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
