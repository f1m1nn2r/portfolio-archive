import useSWR from "swr";
import { getEpics, createEpicApi, deleteEpicApi } from "@/services/epic";
import { Epic } from "@/types/admin/backlog";
import { showToast } from "@/utils/toast";

const EPIC_COLORS = [
  "#DBF0D6",
  "#C7E0E9",
  "#B6D5D7",
  "#F6B9BA",
  "#B9BBF6",
  "#FFEBEE",
  "#E3F2FD",
  "#E8F5E9",
  "#FFF3E0",
  "#F3E5F5",
  "#F5F5F5",
  "#EFEBE9",
  "#FFFDE7",
];

export function useEpics() {
  const { data: epics = [], mutate } = useSWR<Epic[]>("/api/epics", getEpics);

  const addEpic = async (label: string = "새 에픽", password: string) => {
    const randomColor =
      EPIC_COLORS[Math.floor(Math.random() * EPIC_COLORS.length)];

    const newEpicData: Partial<Epic> = {
      label,
      color: randomColor,
    };

    try {
      await createEpicApi(newEpicData, password);
      await mutate();
      showToast.success("에픽이 추가되었습니다.");
    } catch (error) {
      console.error("에픽 추가 실패:", error);
      showToast.error("에픽을 추가하는 중 오류가 발생했습니다.");
    }
  };

  const removeEpic = async (id: string, password: string) => {
    try {
      await deleteEpicApi(id, password);
      await mutate();
      showToast.success("에픽이 삭제되었습니다.");
    } catch (error) {
      console.error("에픽 삭제 실패:", error);
      showToast.error("삭제에 실패했습니다.");
    }
  };

  return {
    epics: epics as readonly Epic[],
    addEpic,
    removeEpic,
  };
}
