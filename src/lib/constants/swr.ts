export const SWR_MUTATE_OPTIONS = (optimisticData: any) => ({
  optimisticData,
  rollbackOnError: true,
  revalidate: true,
});
