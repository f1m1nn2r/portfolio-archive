import { useAppSWR } from "@/hooks/common/useAppSWR";
import { createEpicApi, deleteEpicApi, getEpics } from "@/services/epic/client";
import { Epic } from "../model/backlog.admin";
import { MESSAGES } from "@/lib/constants/messages";
import { useState } from "react";
import { showToast } from "@/lib/toast";

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
  const { data: epics, isLoading, mutate } = useAppSWR<Epic[]>(
    "/api/epics",
    getEpics,
  );

  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const addEpic = async (label: string = MESSAGES.EPIC.DEFAULT_LABEL) => {
    const randomColor =
      EPIC_COLORS[Math.floor(Math.random() * EPIC_COLORS.length)];
    const newEpicData: Partial<Epic> = { label, color: randomColor };
    try {
      const result = await createEpicApi(newEpicData);
      await mutate();
      showToast.save("add");
      return result;
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : "생성에 실패했습니다.");
      return null;
    }
  };

  const submitNewEpic = async () => {
    const trimmed = newLabel.trim();
    if (trimmed) {
      await addEpic(trimmed);
    }
    setNewLabel("");
    setIsAdding(false);
  };

  const removeEpic = async (id: string) => {
    try {
      await deleteEpicApi(id);
      await mutate();
      showToast.delete();
      return true;
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : "삭제에 실패했습니다.");
      return false;
    }
  };

  return {
    epics: (epics || []) as readonly Epic[],
    loading: isLoading,
    isAdding,
    setIsAdding,
    newLabel,
    setNewLabel,
    submitNewEpic,
    addEpic,
    removeEpic,
  };
}
