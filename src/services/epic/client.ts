import type { Epic } from "@/features/admin/backlog/model/backlog.admin";
import { http } from "@/services/http/client";

export const getEpics = async (): Promise<Epic[]> => {
  return http.get<Epic[]>("/api/epics");
};

export const createEpicApi = async (
  payload: Partial<Epic>,
): Promise<Epic> => {
  return http.post<Epic>("/api/epics", {
    body: payload,
  });
};

export const deleteEpicApi = async (id: string): Promise<void> => {
  await http.delete(`/api/epics/${id}`);
};
