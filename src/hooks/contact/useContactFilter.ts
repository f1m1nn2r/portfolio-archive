import { UseContactFilterProps } from "@/types/admin/contact";
import { useState, useMemo } from "react";

export function useContactFilter<T extends Record<string, any>>({
  data,
  searchKeys,
}: UseContactFilterProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  // 검색 로직: searchKeys에 포함된 필드 중 하나라도 검색어를 포함하면 결과에 포함
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const lowerQuery = searchQuery.toLowerCase();

    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        return (
          typeof value === "string" && value.toLowerCase().includes(lowerQuery)
        );
      }),
    );
  }, [data, searchQuery, searchKeys]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
}
