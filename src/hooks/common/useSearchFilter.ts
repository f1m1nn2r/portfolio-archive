import { useMemo, useState } from "react";

type SearchValueNormalizer = (value: string) => string;

interface UseSearchFilterOptions<T> {
  searchKeys?: (keyof T)[];
  matchFn?: (item: T, normalizedQuery: string) => boolean;
  initialQuery?: string;
  normalizeValue?: SearchValueNormalizer;
}

const defaultNormalizeValue: SearchValueNormalizer = (value) =>
  value.trim().toLowerCase();

export function useSearchFilter<T>(
  data: T[],
  options: UseSearchFilterOptions<T> = {},
) {
  const {
    searchKeys = [],
    matchFn,
    initialQuery = "",
    normalizeValue = defaultNormalizeValue,
  } = options;

  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const normalizedQuery = useMemo(
    () => normalizeValue(searchQuery),
    [searchQuery, normalizeValue],
  );

  const filteredData = useMemo(() => {
    if (!normalizedQuery) return data;

    if (matchFn) {
      return data.filter((item) => matchFn(item, normalizedQuery));
    }

    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        return (
          typeof value === "string" &&
          normalizeValue(value).includes(normalizedQuery)
        );
      }),
    );
  }, [data, normalizedQuery, searchKeys, matchFn, normalizeValue]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
}
