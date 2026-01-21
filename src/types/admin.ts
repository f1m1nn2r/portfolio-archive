import { IconType } from "@/types/icon";
import { ReactNode } from "react";

// ------------------ 관리자 레이아웃 컴포넌트

export interface AdminPageLayoutProps {
  title: string;
  children: React.ReactNode;
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
  children: React.ReactNode;
  align?: "left" | "right" | "between";
}

// ------------------ 관리자 테이블 컴포넌트

export interface AdminTableColumn<T> {
  label: string;
  width?: string;
  center?: boolean;
  key?: keyof T; // T의 키만 허용
  renderHeader?: () => ReactNode;
  renderCell?: (item: T, index: number) => ReactNode;
}

export interface AdminTableSectionProps {
  title?: string;
  children: ReactNode;
  actionButtons?: ReactNode;
  showDeleteButton?: boolean;
  onDelete?: () => void;
}

export interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[];
  data: T[];
  selectedIds: (string | number)[];
  onToggleSelect?: (id: string | number) => void;
  onToggleSelectAll?: () => void;
  showAddColumn?: boolean;
  getItemId: (item: T) => string | number;
  rowClassName?: (item: T, isSelected: boolean) => string;
}

// ------------------ 관리자 페이지 카드

export interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  bgColor: string;
}

// ------------------ 관리자 페이지별 데이터 타입

export interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: any; // 실제 경력 타입으로 수정 필요
}
