import { createClient } from "@/lib/supabase/client";
import { ContactMessage } from "@/types/admin/contact";
import { TABLES } from "@/lib/constants/tables";
import { ContactFormData } from "@/lib/validations/contact";
import { http } from "@/services/http/client";

const supabase = createClient();

export const getContacts = async (): Promise<ContactMessage[]> => {
  const { data, error } = await supabase
    .from(TABLES.CONTACTS)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("데이터 패칭 에러:", error);
    throw error;
  }

  return (data || []) as ContactMessage[];
};

export const updateReadStatus = async (ids: string[], isRead: boolean) => {
  await http.patch("/api/contact", {
    body: { ids, is_read: isRead },
  });
};

export const updateStarStatus = async (id: string, isStarred: boolean) => {
  await http.patch("/api/contact", {
    body: { ids: [id], is_starred: isStarred },
  });
};

export const deleteContactsApi = async (ids: string[]) => {
  await http.delete("/api/contact", {
    body: { ids },
  });
};

// 사용자용: 문의 메시지 발송 API 호출
export const sendContactMessage = async (formData: ContactFormData) => {
  return http.post("/api/contact", {
    body: formData,
  });
};
