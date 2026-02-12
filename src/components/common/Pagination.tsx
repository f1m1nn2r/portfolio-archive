import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationProps } from "@/types/common/ui";

export const CommonPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages,
}: PaginationProps) => {
  // 표시할 페이지 번호 계산 (예: 현재 페이지 기준 앞뒤로 노출)
  const renderPageNumbers = () => {
    const pages = [];
    const visibleCount = maxVisiblePages && maxVisiblePages > 0
      ? maxVisiblePages
      : totalPages;
    const groupIndex = Math.floor((currentPage - 1) / visibleCount);
    const startPage = groupIndex * visibleCount + 1;
    const endPage = Math.min(totalPages, startPage + visibleCount - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <div className="mt-4">
      <Pagination>
        <PaginationContent>
          {/* 이전 버튼 */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* 페이지 번호들 */}
          {renderPageNumbers()}

          {/* 다음 버튼 */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
