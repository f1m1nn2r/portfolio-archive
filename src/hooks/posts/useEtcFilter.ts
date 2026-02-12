import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePagination } from "@/hooks/common/usePagination";
import { FormattedPost } from "@/types/admin";

export function useEtcFilter(
  posts: FormattedPost[],
  itemsPerPage: number = 1,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryPage = useMemo(() => {
    const rawPage = Number(searchParams.get("page") || "1");
    if (!Number.isFinite(rawPage) || rawPage < 1) return 1;
    return Math.floor(rawPage);
  }, [searchParams]);

  const { currentPage, setCurrentPage, totalPages, currentData, totalItems } =
    usePagination(posts, {
    itemsPerPage,
    initialPage: queryPage,
  });

  const normalizedPage = Math.max(1, Math.min(queryPage, totalPages));

  const updatePageQuery = useCallback(
    (page: number) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      if (page <= 1) {
        nextParams.delete("page");
      } else {
        nextParams.set("page", String(page));
      }

      const queryString = nextParams.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (currentPage !== normalizedPage) {
      setCurrentPage(normalizedPage);
    }
  }, [currentPage, normalizedPage, setCurrentPage]);

  useEffect(() => {
    if (queryPage !== normalizedPage) {
      updatePageQuery(normalizedPage);
    }
  }, [normalizedPage, queryPage, updatePageQuery]);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      const clampedPage = Math.max(1, Math.min(nextPage, totalPages));
      setCurrentPage(clampedPage);
      updatePageQuery(clampedPage);
    },
    [setCurrentPage, totalPages, updatePageQuery],
  );

  return {
    page: currentPage,
    totalPages,
    totalCount: totalItems,
    paginatedPosts: currentData,
    handlePageChange,
  };
}
