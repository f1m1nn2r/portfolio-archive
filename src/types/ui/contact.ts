export interface ContactListHeaderProps {
  selectedCount: number;
  totalCount: number;
  isMaster: boolean;
  filterMenuItems: any[];
  onMarkAsRead: () => void;
  onOpenDeleteModal: () => void;
}
