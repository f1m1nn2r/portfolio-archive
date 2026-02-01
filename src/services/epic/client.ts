import { Epic } from "@/types/admin";

export const getEpics = async (): Promise<Epic[]> => {
  const res = await fetch("/api/epics");
  if (!res.ok) throw new Error("에픽 로드 실패");
  return res.json();
};

export const createEpicApi = async (epic: Partial<Epic>): Promise<Epic> => {
  const res = await fetch("/api/epics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(epic),
  });
  if (!res.ok) throw new Error("에픽 생성 실패");
  return res.json();
};

export const deleteEpicApi = async (id: string): Promise<boolean> => {
  const res = await fetch(`/api/epics?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("에픽 삭제 실패");
  return res.ok;
};
