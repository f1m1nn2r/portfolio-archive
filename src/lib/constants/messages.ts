export const MESSAGES = {
  // ------------------ 프로필 수정 관련
  PROFILE: {
    UPDATE_SUCCESS: "프로필 정보가 수정되었습니다.",
  },

  // ------------------ 백로그 관련
  BACKLOG: {
    FILTERS: {
      LATEST: "기본(최신순)",
      UNCOMPLETED: "미구현 우선",
      SCREEN: "화면별",
    },
  },

  // ------------------ 경력 관련
  EXPERIENCE: {
    EMPTY: "등록된 경력이 없습니다.",
    CONFIRM_DELETE: "선택한 경력을 정말 삭제하시겠습니까?",
  },

  // ------------------ 메시지(메일) 관련
  CONTACTS: {
    DETAIL: {
      TITLE: "Message Detail",
      BACK_TO_LIST: "목록으로",
      REPLY: "답장하기",
      SENDER_INFO: "From:",
      NO_NAME: "이름 없음",
      NOT_FOUND: "메시지를 찾을 수 없습니다.",
      LOADING: "메시지를 불러오는 중...",
    },
    DELETE: {
      TITLE: "메시지 삭제",
      DESCRIPTION:
        "이 메시지를 정말 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.",
    },
  },

  // ------------------ 프로젝트 관련
  PROJECT: {
    SAVE_SUCCESS: "작업물이 성공적으로 저장되었습니다.",
    EXP_DELETE_CONFIRM: "선택한 경력을 정말 삭제하시겠습니까?",
    EMPTY: "등록된 작업물이 없습니다.",
    VALIDATION: {
      ALL_FIELDS: "필수 항목을 모두 입력해주세요.",
      COMPANY_REQUIRED: "회사명은 필수입니다.",
      TEAM_REQUIRED: "팀명은 필수입니다.",
      START_DATE_REQUIRED: "시작일은 필수입니다.",
      TITLE_REQUIRED: "프로젝트 제목을 입력해주세요.",
    },
  },

  // ------------------ 컨택트(메일) 관련
  CONTACT: {
    SUCCESS: "메시지가 성공적으로 전달되었습니다.",
    FAILURE: "메시지 전송에 실패했습니다.",
    EMPTY: "받은 메시지가 없습니다.",
    ONLY_ADMIN: "관리자만 확인할 수 있습니다.",
    DELETE_SELECTED: (count: number) =>
      `선택한 ${count}개의 메시지를 정말 삭제하시겠습니까?`,
    VALIDATION: {
      EMAIL: "올바른 이메일 형식을 입력해주세요.",
      NAME: "이름 또는 소속은 최소 2글자 이상 입력해주세요.",
      MESSAGE: "메시지는 최소 10글자 이상 작성해주세요.",
    },
  },

  // ------------------ 에픽 관련
  EPIC: {
    DEFAULT_LABEL: "새 에픽",
    ADD_SUCCESS: "에픽이 추가되었습니다.",
    DELETE_SUCCESS: "에픽이 삭제되었습니다.",
  },

  // ------------------ 권한 관련
  AUTH: {
    REQUIRED_ADMIN: "관리자 권한이 필요합니다.",
    REQUIRED_LOGIN: "로그인이 필요한 서비스입니다.",
  },

  // ------------------ 게시글 관련
  POSTS: {
    DELETE: {
      TITLE: "게시글 삭제",
      DESCRIPTION: (count: number) =>
        `정말 선택한 ${count}개의 게시글을 삭제하시겠습니까?`,
    },
    EMPTY: "등록된 게시글이 없습니다.",
    SEARCH_PLACEHOLDER: "게시글 검색",
  },

  // ------------------ 에러 및 경고 (상태별 구분)
  ERROR: {
    DEFAULT: "오류가 발생했습니다.",
    UNAUTHORIZED: "권한이 없습니다.",
    SAVE_FAILED: "저장에 실패하였습니다.",
    ADD_FAILED: "추가 중 오류가 발생했습니다.",
    UPDATE_FAILED: "수정에 실패하였습니다.",
    DELETE_FAILED: "삭제에 실패하였습니다.",
  },

  // ------------------ 공통
  COMMON: {
    DELETE_TITLE: "정말 삭제하시겠습니까?",
    DELETE_DESC: "삭제 후에는 다시 되돌릴 수 없습니다.",
    ADD_SUCCESS: "추가되었습니다.",
    EDIT_SUCCESS: "수정되었습니다.",
    DELETE_SUCCESS: "삭제되었습니다.",
    CANCEL: "취소",
    CONFIRM: "확인",
    SAVING: "저장 중...",
    SAVE: "저장하기",
  },

  VALIDATION: {
    ALL_FIELDS: "필수 항목을 모두 입력해주세요.",
    SELECT_REQUIRED: "삭제할 항목을 선택해주세요.",
    NO_SEARCH_RESULTS: "검색 결과가 없습니다.",
  },
} as const;
