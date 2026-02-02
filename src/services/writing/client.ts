import { Post } from "@/types/admin";

export const getWritingApi = async (): Promise<Post[]> => {
  const res = await fetch("/api/writing");
  const result = await res.json();
  return result.data || [];
};

export const createWritingApi = async (
  payload: Partial<Post>,
): Promise<Post | null> => {
  const res = await fetch("/api/writing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) return null;
  const result = await res.json();
  return result.data;
};

export const getWritingByIdApi = async (id: string): Promise<Post | null> => {
  const res = await fetch(`/api/writing/${id}`);
  if (!res.ok) return null;
  const result = await res.json();
  return result.data;
};

export const updateWritingApi = async (
  id: string,
  payload: Partial<Post>,
): Promise<boolean> => {
  const res = await fetch(`/api/writing/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.ok;
};

export const deleteWritingApi = async (id: string): Promise<boolean> => {
  const res = await fetch(`/api/writing/${id}`, {
    method: "DELETE",
  });
  return res.ok;
};
