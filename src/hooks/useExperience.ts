import { useState, useEffect, useCallback } from "react";
import { Experience } from "@/types/api/experience";

export function useExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/experience");
      const json = await res.json();

      if (json.success && json.data) {
        setExperiences(json.data);
      } else {
        throw new Error(json.error || "데이터 로드 실패");
      }
    } catch (error) {
      console.error("경력 조회 실패:", error);
      alert("경력을 불러오는데 실패했습니다.");
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const deleteExperience = useCallback(
    async (id: number) => {
      if (!confirm("정말 삭제하시겠습니까?")) return;

      try {
        const res = await fetch(`/api/experience/${id}`, {
          method: "DELETE",
        });

        const json = await res.json();

        if (json.success || res.ok) {
          alert("삭제되었습니다.");
          fetchExperiences();
        } else {
          throw new Error(json.error || "삭제 실패");
        }
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제에 실패했습니다.");
      }
    },
    [fetchExperiences],
  );

  return {
    experiences,
    loading,
    fetchExperiences,
    deleteExperience,
  };
}
