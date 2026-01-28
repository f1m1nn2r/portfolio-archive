import { Backlog, BacklogResponse } from "@/types/admin";

export const getBacklogs = async (): Promise<BacklogResponse> => {
  const res = await fetch("/api/backlog");
  if (!res.ok) throw new Error("데이터 로드 실패");
  return res.json();
};

export const deleteBacklogsApi = async (ids: string[]) => {
  const res = await fetch("/api/backlog", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  return res.ok;
};

export const createBacklogApi = async (
  newEntry: Partial<Backlog>,
): Promise<Backlog | null> => {
  const res = await fetch("/api/backlog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEntry),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
};

export const updateBacklogApi = async (
  id: string,
  data: Partial<Backlog>,
): Promise<Backlog | null> => {
  const res = await fetch(`/api/backlog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) return null;
  return res.json();
};
