import { Backlog } from "../model/backlog.admin";
import { BacklogResponse } from "../model/backlog.api";
import { http } from "@/services/http/client";

export const getBacklogs = async (): Promise<BacklogResponse> => {
  return http.get<BacklogResponse>("/api/backlog");
};

export const createBacklogApi = async (
  newEntry: Partial<Backlog>,
): Promise<Backlog> => {
  return http.post<Backlog>("/api/backlog", {
    body: newEntry,
  });
};

export const updateBacklogApi = async (
  id: string,
  data: Partial<Backlog>,
): Promise<Backlog> => {
  return http.patch<Backlog>(`/api/backlog/${id}`, {
    body: data,
  });
};

export const deleteBacklogsApi = async (ids: string[]): Promise<void> => {
  await http.delete("/api/backlog", {
    body: { ids },
  });
};
