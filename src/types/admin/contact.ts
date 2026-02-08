export interface ContactMessage {
  id: string;
  sender: string;
  name_company: string;
  content: string;
  is_read: boolean;
  is_starred: boolean;
  created_at: string;
}

export interface UseContactFilterProps<T> {
  data: T[];
  searchKeys: (keyof T)[]; // 검색 대상이 될 키 배열 (예: ['sender', 'name_company'])
  selectionHandlers: {
    toggleSelect: (id: string) => void;
    toggleSelectAll: () => void;
    clearSelection: () => void;
  };
}

export interface UseContactProps {
  initialData?: ContactMessage[]; // 초기 데이터 (SSR용)
  onSuccess?: () => void; // 성공 시 콜백 (새로고침 등)
  currentPage?: number; // 현재 페이지
  itemsPerPage?: number; // 페이지당 아이템 수
}
