import { Backlog, Epic } from "../model/backlog.admin";

export interface BacklogClientProps {
  initialBacklogs: Backlog[];
  initialEpics: Epic[];
}

export interface BacklogEpicMultiSelectProps {
  selectedIds: string[];
  allEpics: readonly Epic[];
  onToggle: (id: string) => void;
  isMaster?: boolean;
}
