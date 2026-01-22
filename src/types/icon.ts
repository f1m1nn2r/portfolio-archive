import * as BiIcons from "react-icons/bi";

export const ICON_MAP = {
  // ------------------ 자주 사용되는 아이콘
  trash: BiIcons.BiTrash,
  checkbox: BiIcons.BiCheckbox,
  checkboxChecked: BiIcons.BiCheckboxChecked,
  x: BiIcons.BiX,
  plus: BiIcons.BiPlus,
  chevronLeft: BiIcons.BiChevronLeft,
  chevronRight: BiIcons.BiChevronRight,
  chevronDown: BiIcons.BiChevronDown,
  save: BiIcons.BiSave,
  search: BiIcons.BiSearch,
  // ------------------ END 자주 사용되는 아이콘

  // ------------------ 관리자 페이지 좌측 메뉴 아이콘
  clipboard: BiIcons.BiClipboard,
  briefcase: BiIcons.BiBriefcase,
  envelope: BiIcons.BiEnvelope,
  editAlt: BiIcons.BiEditAlt,
  data: BiIcons.BiData,
  userCircle: BiIcons.BiUserCircle,
  // ------------------ END 관리자 페이지 좌측 메뉴 아이콘

  // ------------------ 관리자 페이지 - 백로그 페이지 내 아이콘
  barChartAlt2: BiIcons.BiBarChartAlt2,
  listUl: BiIcons.BiListUl,
  filterAlt: BiIcons.BiFilterAlt,
  // ------------------ END 관리자 페이지 - 백로그 페이지 내 아이콘

  // ------------------ 관리자 페이지 - 경력 페이지 내 아이콘
  building: BiIcons.BiBuilding,
  calendarAlt: BiIcons.BiCalendarAlt,
  // ------------------ END 관리자 페이지 - 경력 페이지 내 아이콘

  // ------------------ 관리자 페이지 - 이메일 페이지 내 아이콘
  mailSend: BiIcons.BiMailSend,
  envelopeOpen: BiIcons.BiEnvelopeOpen,
  star: BiIcons.BiStar,
  // ------------------ END 관리자 페이지 - 이메일 페이지 내 아이콘

  // ------------------ 관리자 페이지 - 스키마 페이지 내 아이콘
  table: BiIcons.BiTable,
  columns: BiIcons.BiColumns,
  // ------------------ END 관리자 페이지 - 스키마 페이지 내 아이콘

  // ------------------ 관리자 페이지 - 삭제 아이콘
  trashAlt: BiIcons.BiTrashAlt,
  // ------------------ END 관리자 페이지 - 삭제 아이콘
};

export type IconType = keyof typeof ICON_MAP;

export interface MyIconProps {
  type: IconType;
  size?: number | string;
  color?: string;
  className?: string;
}

export interface MenuItem {
  name: string;
  href: string;
  icon: IconType;
}
