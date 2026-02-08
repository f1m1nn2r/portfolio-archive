import { BacklogResponse } from "@/types/api/backlog";

export interface Backlog {
  id: string;
  no: number;
  screen: string;
  sub_page: string;
  // epic: string;
  feature: string;
  description: string;
  is_done: boolean;
  is_designed: boolean;
  priority: "high" | "medium" | "low";
  order: number;
  created_at: string;
  epic_ids: string[];
}

export interface Epic {
  id: string;
  label: string;
  color: string;
  created_at?: string;
}

export interface EpicManagerProps {
  epics: readonly Epic[];
  onRemove?: (id: string) => void;
  onAdd?: (label: string) => void;
  isMaster: boolean;
}

export interface UseBacklogProps {
  initialData?: BacklogResponse;
  onSuccess?: () => void;
}
