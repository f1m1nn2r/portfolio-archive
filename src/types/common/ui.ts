import { IconType } from "@/types/icon";
import { ReactNode } from "react";

// ------------------ 버튼
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: IconType;
}

// ------------------ 관리자 페이지 카드
export interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  bgColor: string;
}

// ------------------ 뱃지
export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string; // 동적 배경색을 위한
}

// ------------------ 페이지네이션
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// ------------------ 경력 모달
export interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: any; // 실제 경력 타입으로 수정 필요
}

// ------------------ 드롭다운 메뉴
export interface DropdownItem {
  label: string;
  onClick: () => void;
}

export interface DropdownProps {
  trigger: ReactNode; // 마우스를 올릴 대상 (아이콘, 버튼 등)
  items: DropdownItem[]; // 메뉴 리스트
  width?: string; // 드롭다운 너비
}
