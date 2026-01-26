import { createClient } from "@/utils/supabase/client";
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

  return (data || []).map((item) => ({
    id: item.id,
    senderName: item.name_company, // DB: name_company -> UI: senderName
    senderEmail: item.sender, // DB: sender -> UI: senderEmail
    message: item.content, // DB: content -> UI: message
    isRead: item.is_read, // DB: is_read -> UI: isRead
    isStarred: item.is_starred, // DB: is_starred -> UI: isStarred
    receivedAt: item.created_at, // DB: created_at -> UI: receivedAt
  }));
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
