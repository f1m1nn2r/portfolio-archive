export interface Backlog {
  id: string;
  no: number;
  screen: string;
  sub_page: string;
  epic: string;
  feature: string;
  description: string;
  is_done: boolean;
  is_designed: boolean;
  priority: "high" | "medium" | "low";
  order: number;
  created_at: string;
}

export interface Epic {
  id: string;
  label: string;
  color: string;
}

export interface EpicManagerProps {
  epics: readonly Epic[];
  onRemove: (id: string) => void;
  onAdd: () => void;
}

export interface BacklogResponse {
  items: Backlog[];
  stats: {
    total: number;
    completed: number;
    completionRate: number;
  };
}
