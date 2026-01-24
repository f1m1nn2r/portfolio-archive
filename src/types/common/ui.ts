import { IconType } from "@/types/icon";
import { ReactNode } from "react";

// ------------------ 버튼
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: IconType;
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

// ------------------ 삭제 모달
export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

// ------------------ 페이지 레이아웃
export interface PageLayoutProps {
  children: React.ReactNode;
  className?: string; // 추가적인 클래스가 필요할 경우 대비
}
