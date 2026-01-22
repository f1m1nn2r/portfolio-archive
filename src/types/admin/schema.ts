import { AdminTableColumn } from "./table";

export interface SchemaItem {
  id: string;
  name: string;
  type: string;
  constraint: string;
  desc: string;
}

export interface SchemaTableProps {
  tableName: string;
  data: SchemaItem[];
  columns: AdminTableColumn<SchemaItem>[];
  selectedIds: (string | number)[];
  onToggleSelect: (id: string | number) => void;
  onToggleSelectAll: () => void;
  onDeleteTable: (tableName: string) => void;
  onDeleteSelected: (tableName: string, data: SchemaItem[]) => void;
  filterItems: { label: string; onClick: () => void }[];
}
