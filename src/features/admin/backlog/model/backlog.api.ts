import type { Backlog } from "./backlog.admin";

export interface BacklogResponse {
  items: Backlog[];
  stats: {
    total: number;
    completed: number;
    completionRate: number;
  };
}
