import useSWR, { SWRConfiguration } from "swr";
import { useCallback } from "react";
import { showToast } from "@/lib/toast";
import { MESSAGES } from "@/lib/constants/messages";

export function useAppSWR<T, C = Partial<T>, U = Partial<T>>(
  key: string | null,
  fetcher: (key: string) => Promise<T>,
  config?: SWRConfiguration<T> & {
    onSuccess?: (action: "add" | "edit" | "delete") => void;
  },
) {
  const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher, config);

  const createItem = useCallback(
    async (createData: C): Promise<T | null> => {
      if (!key) return null;
      try {
        const res = await fetch(key, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createData),
        });
        if (!res.ok) {
          const errorResult = await res.json();
          throw new Error(errorResult.error || MESSAGES.ERROR.CREATED_FAILED);
        }
        const newItem = await res.json();
        mutate();
        showToast.save("add");
        config?.onSuccess?.("add");
        return newItem;
      } catch (e) {
        showToast.error((e as Error).message);
        return null;
      }
    },
    [key, mutate, config],
  );

  const updateItem = useCallback(
    async (
      id: number | string,
      updateData: U,
      options: { showToast?: boolean } = { showToast: true },
    ): Promise<T | null> => {
      if (!key) return null;
      try {
        const res = await fetch(`${key}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        });

        if (!res.ok) {
          const errorResult = await res.json();
          throw new Error(errorResult.error || MESSAGES.ERROR.UPDATE_FAILED);
        }

        const updatedItem = await res.json();
        mutate();

        // 옵션이 true일 때만 토스트 띄움
        if (options.showToast) {
          showToast.save("edit");
          config?.onSuccess?.("edit");
        }

        return updatedItem;
      } catch (e) {
        showToast.error((e as Error).message);
        return null;
      }
    },
    [key, mutate, config],
  );

  const saveItem = useCallback(
    async (
      id: number | string | undefined,
      payload: C | U,
    ): Promise<T | null> => {
      if (id) return updateItem(id, payload as U);
      return createItem(payload as C);
    },
    [createItem, updateItem],
  );

  const deleteItem = useCallback(
    async (id: number | string): Promise<boolean> => {
      if (!key) return false;
      try {
        const res = await fetch(`${key}/${id}`, { method: "DELETE" });
        if (!res.ok) {
          const errorResult = await res.json();
          throw new Error(errorResult.error || MESSAGES.ERROR.DELETE_FAILED);
        }
        mutate();
        showToast.delete();
        config?.onSuccess?.("delete");
        return true;
      } catch (e) {
        showToast.error((e as Error).message);
        return false;
      }
    },
    [key, mutate, config],
  );

  const deleteManyItems = useCallback(
    async (ids: (number | string)[], customUrl?: string): Promise<boolean> => {
      const targetUrl = customUrl || key;

      if (!targetUrl || ids.length === 0) return false;

      try {
        const res = await fetch(targetUrl, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids }),
        });

        if (!res.ok) throw new Error(MESSAGES.ERROR.DELETE_FAILED);

        mutate();
        showToast.delete();
        config?.onSuccess?.("delete");
        return true;
      } catch (e) {
        showToast.error((e as Error).message);
        return false;
      }
    },
    [key, mutate, config],
  );

  return {
    data: data,
    isLoading,
    error,
    mutate,
    createItem,
    updateItem,
    saveItem,
    deleteItem,
    deleteManyItems,
  };
}
