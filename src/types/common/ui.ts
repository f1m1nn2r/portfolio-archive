import { IconType } from "@/types/icon";

// ------------------ 버튼
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
