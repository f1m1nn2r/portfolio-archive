import { createClient } from "@/lib/supabase/client";
import { ContactMessage } from "@/types/admin/contact";
import { TABLES } from "@/lib/constants/tables";

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
  const { error } = await supabase
    .from(TABLES.CONTACTS)
    .update({ is_read: isRead })
    .in("id", ids);

  if (error) throw error;
};

export const updateStarStatus = async (id: string, isStarred: boolean) => {
  const { error } = await supabase
    .from(TABLES.CONTACTS)
    .update({ is_starred: isStarred })
    .eq("id", id);

  if (error) throw error;
};

export const deleteContactsApi = async (ids: string[]) => {
  const { error } = await supabase.from(TABLES.CONTACTS).delete().in("id", ids);

  if (error) throw error;
};

// 사용자용: 문의 메시지 발송 API 호출
export const sendContactMessage = async (formData: any) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || "발송 실패");
  }

  return response.json();
};
