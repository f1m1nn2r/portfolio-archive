import useSWR from "swr";
import { getEpics, createEpicApi, deleteEpicApi } from "@/services/epic/client";
import { Epic } from "@/types/admin/backlog";
import { showToast } from "@/lib/toast";
import { MESSAGES } from "@/lib/constants/messages";

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

  const addEpic = async (label: string = MESSAGES.EPIC.DEFAULT_LABEL) => {
    const randomColor =
      EPIC_COLORS[Math.floor(Math.random() * EPIC_COLORS.length)];

    const newEpicData: Partial<Epic> = {
      label,
      color: randomColor,
    };

    try {
      await createEpicApi(newEpicData);
      await mutate();
      showToast.success(MESSAGES.EPIC.ADD_SUCCESS);
    } catch (error) {
      console.error("[useEpics] 에픽 추가 실패:", error);
      showToast.error(MESSAGES.ERROR.ADD_FAILED);
    }
  };

  const removeEpic = async (id: string) => {
    try {
      await deleteEpicApi(id);
      await mutate();
      showToast.success(MESSAGES.COMMON.DELETE_SUCCESS);
    } catch (error) {
      console.error("[useEpics] 에픽 삭제 실패:", error);
      showToast.error(MESSAGES.ERROR.DELETE_FAILED);
    }
  };

  return {
    epics: epics as readonly Epic[],
    addEpic,
    removeEpic,
  };
}
