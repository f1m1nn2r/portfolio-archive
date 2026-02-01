import useSWR from "swr";
import { useMemo } from "react";
import {
  getContacts,
  deleteContactsApi,
  updateReadStatus,
  updateStarStatus,
} from "@/services/contact/client";
import { showToast } from "@/utils/toast";
import { useSummaryData } from "../common/useSummaryData";

export function useContact(currentPage?: number, itemsPerPage?: number) {
  const {
    data: contacts = [],
    isLoading,
    mutate,
  } = useSWR("contacts-list", () => getContacts());

  // 1. 상단 요약 데이터 계산
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
      getValue: () => `${contacts.filter((e) => !e.isRead).length}개`,
    },
    {
      icon: "star",
      bgColor: "bg-[#FCFDE1]",
      label: "중요 메시지",
      getValue: () => `${contacts.filter((e) => e.isStarred).length}개`,
    },
  ]);

  // 2. 페이지네이션 데이터 가공
  const totalPages = itemsPerPage
    ? Math.ceil(contacts.length / itemsPerPage) || 1
    : 1;

  const currentData = useMemo(() => {
    if (!currentPage || !itemsPerPage) return contacts;
    const start = (currentPage - 1) * itemsPerPage;
    return contacts.slice(start, start + itemsPerPage);
  }, [contacts, currentPage, itemsPerPage]);

  // 핸들러들
  const deleteContacts = async (ids: string[]) => {
    try {
      await deleteContactsApi(ids);
      showToast.delete();
      mutate();
    } catch (error) {
      showToast.error("삭제 실패");
    }
  };

  const toggleStar = async (id: string, currentStatus: boolean) => {
    try {
      await updateStarStatus(id, !currentStatus);
      mutate();
    } catch (error) {
      showToast.error("상태 변경 실패");
    }
  };

  const markAsRead = async (ids: string[], showToastMessage = true) => {
    try {
      await updateReadStatus(ids, true);
      if (showToastMessage) showToast.success("읽음 처리되었습니다.");
      mutate();
    } catch (error) {
      showToast.error("처리 실패");
    }
  };

  return {
    contacts, // 전체 데이터
    currentData, // 현재 페이지 데이터
    summaryItems, // 요약 정보
    totalPages, // 전체 페이지 수
    loading: isLoading,
    deleteContacts,
    toggleStar,
    markAsRead,
    refresh: mutate,
  };
}
