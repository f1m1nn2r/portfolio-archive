import { useAppSWR } from "../common/useAppSWR";
import { getEpics } from "@/services/epic/client";
import { Epic } from "@/types/admin/backlog";
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
  const {
    data: epics,
    isLoading,
    createItem,
    deleteItem,
  } = useAppSWR<Epic[], Partial<Epic>, Partial<Epic>>("/api/epics", getEpics);

  const addEpic = async (label: string = MESSAGES.EPIC.DEFAULT_LABEL) => {
    const randomColor =
      EPIC_COLORS[Math.floor(Math.random() * EPIC_COLORS.length)];

    const newEpicData: Partial<Epic> = {
      label,
      color: randomColor,
    };

    return await createItem(newEpicData);
  };

  const removeEpic = async (id: string) => {
    return await deleteItem(id);
  };

  return {
    epics: (epics || []) as readonly Epic[],
    loading: isLoading,
    addEpic,
    removeEpic,
  };
}
