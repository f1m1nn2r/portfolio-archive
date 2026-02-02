export const getPostsApi = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("데이터 페치 실패");

  const result = await res.json();

  return {
    posts: result.data || [],
    totalCount: result.totalCount || 0,
    recentCount: result.recentCount || 0,
  };
};

export const deleteWritingApi = async (id: string) => {
  const res = await fetch(`/api/writing/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("삭제 실패");
  return res.json();
};
