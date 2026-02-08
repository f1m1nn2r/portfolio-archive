import { Backlog } from "@/types/admin";

export interface BacklogResponse {
  items: Backlog[];
  stats: {
    total: number;
    completed: number;
    completionRate: number;
  };
}
