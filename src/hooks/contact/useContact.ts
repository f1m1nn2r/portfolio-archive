import useSWR from "swr";
import {
  getContacts,
  deleteContactsApi,
  updateReadStatus,
  updateStarStatus,
} from "@/services/contact";
import { showToast } from "@/utils/toast";

export function useContact() {
  const {
    data: contacts,
    isLoading,
    mutate,
  } = useSWR("contacts-list", () => getContacts());

  const deleteContacts = async (ids: string[]) => {
    try {
      await deleteContactsApi(ids);
      showToast.delete();
      mutate();
    } catch (error) {
      showToast.error("삭제에 실패했습니다.");
      console.error(error);
    }
  };

  const toggleStar = async (id: string, currentStatus: boolean) => {
    try {
      await updateStarStatus(id, !currentStatus);
      mutate();
    } catch (error) {
      showToast.error("상태 변경 실패");
      console.error(error);
    }
  };

  const markAsRead = async (ids: string[], showToastMessage = true) => {
    try {
      await updateReadStatus(ids, true);

      if (showToastMessage) {
        showToast.success("읽음 처리되었습니다.");
      }

      mutate();
    } catch (error) {
      showToast.error("처리 실패");
      console.error(error);
    }
  };

  return {
    contacts: contacts || [],
    loading: isLoading,
    deleteContacts,
    toggleStar,
    markAsRead,
    refresh: mutate,
  };
}
