export interface CategoryItemProps {
  category: { id: string; name: string };
  isEditing: boolean;
  editName: string;
  onEditChange: (val: string) => void;
  onUpdate: (id: string) => void;
  onCancel: () => void;
  onOpenEdit: (cat: any) => void;
  onOpenDelete: (id: string) => void;
  isMaster?: boolean;
}
