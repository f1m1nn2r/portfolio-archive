import { Epic } from "@/types/admin";
import { createClient } from "@/lib/supabase/server";

export async function getEpicsFromDb(): Promise<Epic[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("epics").select("*");
  if (error) return [];
  return data || [];
}
