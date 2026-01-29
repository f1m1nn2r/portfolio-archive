import { ReactNode } from "react";

export interface AdminTableColumn<T> {
  label: string;
  width?: string;
  center?: boolean;
  key?: keyof T;
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

export interface AdminEditableCellProps {
  value: string | null | undefined;
  onSave: (newValue: string) => void;
  isEditable?: boolean;
}
