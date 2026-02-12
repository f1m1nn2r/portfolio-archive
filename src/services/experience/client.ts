import { Experience } from "@/types/api/experience";

export async function getExperiences(): Promise<Experience[]> {
  try {
    const res = await fetch("/api/experience", {
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("경력 정보 조회 실패:", {
        status: res.status,
        statusText: res.statusText,
        detail,
      });
      return [];
    }

    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }

    if (Array.isArray(json)) {
      return json;
    }

    return [];
  } catch (error) {
    console.error("경력 정보 조회 실패:", error);
    return [];
  }
}

export async function createExperienceApi(data: any) {
  const res = await fetch("/api/experience", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("경력 생성 실패");
  return res.json();
}

export async function updateExperienceApi(id: number, data: any) {
  const res = await fetch(`/api/experience/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("경력 업데이트 실패");
  return res.json();
}

export async function deleteExperienceApi(id: number): Promise<void> {
  const res = await fetch(`/api/experience/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error || "삭제 실패");
  }
}
