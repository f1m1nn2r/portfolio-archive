import useSWR, { SWRConfiguration } from "swr";

export function useAppSWR<T>(
  key: string | null,
  fetcher: (key: string) => Promise<T>,
  config?: SWRConfiguration<T>,
) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<T>(
    key,
    fetcher,
    config,
  );

  return {
    data: data,
    isLoading,
    isValidating,
    error,
    mutate,
  };
}
