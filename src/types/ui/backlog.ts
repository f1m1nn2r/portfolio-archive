import { Backlog, Epic } from "@/types/admin";

export interface BacklogClientProps {
  initialBacklogs: Backlog[];
  initialEpics: Epic[];
}
