import { useAppSWR } from "@/hooks/common/useAppSWR";
import {
  deleteContactsApi,
  getContacts,
  updateReadStatus,
  updateStarStatus,
} from "@/services/contact/client";
import { ContactMessage, UseContactProps } from "@/types/admin";
import { useSummaryData } from "@/hooks/common/useSummaryData";
import { showToast } from "@/lib/toast";
import { useState } from "react";

export function useContact({ initialData, onSuccess }: UseContactProps = {}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: contacts = [],
    isLoading,
    mutate,
  } = useAppSWR<ContactMessage[]>(
    "/api/contact",
    getContacts,
    {
      fallbackData: initialData,
    },
  );

  const summaryItems = useSummaryData([
    {
      icon: "mailSend",
      bgColor: "bg-bg-purple",
      label: "총 메시지",
      getValue: () => `${contacts.length}개`,
    },
    {
      icon: "envelopeOpen",
      bgColor: "bg-bg-blue",
      label: "읽지 않음",
      getValue: () => `${contacts.filter((e) => !e.is_read).length}개`,
    },
    {
      icon: "star",
      bgColor: "bg-[#FCFDE1]",
      label: "중요 메시지",
      getValue: () => `${contacts.filter((e) => e.is_starred).length}개`,
    },
  ]);

  const deleteContacts = async (ids: string[], onComplete?: () => void) => {
    if (ids.length === 0) return;

    setIsDeleting(true);
    try {
      await deleteContactsApi(ids);
      await mutate();
      onSuccess?.();
      showToast.delete();
      onComplete?.();
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : "삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleStar = async (id: string, currentStatus: boolean) => {
    try {
      await updateStarStatus(id, !currentStatus);
      await mutate();
      onSuccess?.();
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : "처리 중 오류가 발생했습니다.");
    }
  };

  const markAsRead = async (ids: string[]) => {
    try {
      await updateReadStatus(ids, true);
      await mutate();
      onSuccess?.();
      showToast.success(`${ids.length}개의 메시지를 읽음 처리했습니다.`);
    } catch (error) {
      showToast.error("처리 중 오류가 발생했습니다.");
    }
  };

  return {
    contacts,
    summaryItems,
    loading: isLoading,
    isDeleting,
    deleteContacts,
    toggleStar,
    markAsRead,
    refresh: mutate,
  };
}
