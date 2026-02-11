아래는 내 로컬에서 실행한 `git status` 결과야.  
**이 출력에 포함된 정보만을 기준으로** 변경 내역을 분석해서 정리해줘.
(파일 내용은 추측하지 말고, 파일 경로/이름을 기반으로 판단해줘)

---

## 요청 사항

### 1️⃣ 변경 파일 그룹화

- 수정/추가된 파일들을 **의미 있는 단위**로 묶어줘
- 예시 분류:
  - 문서 (docs)
  - 설정 / 컨벤션 (.github 등)
  - 기능 (feature)
  - 리팩토링 (refactor)
  - 기타 (chore)
- **하나의 커밋이 과도하게 커지지 않도록** 적절히 분리해줘

---

### 2️⃣ 각 그룹별 산출물

각 그룹마다 아래 정보를 모두 포함해줘.

- 📁 포함된 파일 목록
- 📝 커밋 메시지
  - 한국어
  - Conventional Commits 형식 사용  
    (예: `feat:`, `fix:`, `docs:`, `chore:`)

출력 형식은 아래를 따라줘:

---

### 3️⃣ 브랜치명 추천

- 각 그룹 또는 전체 변경을 대표하는 **브랜치명**을 추천해줘
- 형식:
  - `feat/기능명`
  - `docs/문서명`
  - `chore/설정-정리`
  - `refactor/대상-내용`

---

### 4️⃣ PR 문서 작성

아래 조건을 반드시 지켜서 PR 문서를 작성해줘.

- **`.github/pull_request_template.md` 구조를 그대로 사용**
- 항목 누락 없이 작성
- PR 제목과 본문을 모두 작성

포함할 내용:

- 🎯 주요 변경 사항
- 📝 상세 설명
- 🔍 변경 이유
- ✅ 테스트 방법
- 📌 참고 사항
- 📸 스크린샷 (필요 시)

---

## git status 결과

- `git status` 출력에 상태 키워드(`modified`, `deleted` 등)가 없더라도  
  **목록에 포함된 모든 파일/디렉터리는 변경된 것으로 간주할 것**

  both modified: src/components/admin/project/ProjectManagementSection.tsx
  both modified: src/hooks/experience/useExperienceManagement.ts

  .github/ISSUE_TEMPLATE/refactor.md
  src/app/admin/posts/editor/
  src/components/common/DeleteButton.tsx
  src/components/common/SaveButton.tsx
  src/components/ui/textarea.tsx
  src/hooks/posts/usePostForm.ts
  src/hooks/profile/
  src/lib/schemas/
  src/utils/

### 5️⃣ 리팩토링 문서 작성 (Refactoring Doc)

아래 조건에 따라 **리팩토링 문서 초안**을 작성해줘.

---

## 작성 대상

- 1️⃣에서 분류한 그룹 중  
  **`refactor` 성격이 명확한 그룹만** 대상으로 작성
- 단순 파일 이동, 설정 변경, 에셋 추가만 있는 경우는 제외 가능

---

## 작성 기준

- **파일 내용은 절대 추측하지 말 것**
- 오직 아래 정보만을 근거로 판단할 것
  - 파일 경로
  - 파일 이름
  - 파일의 추가 / 수정 / 삭제 여부
- 다음과 같은 표현은 사용하지 말 것
  - “~했을 것으로 보임”
  - “~을 개선했을 가능성”
- 대신, **구조적 변화·역할 분리·영역 확장 여부**처럼  
  _경로/파일명에서 직접 확인 가능한 사실만 서술할 것_

---

## 문서 형식

※ 아래 템플릿을 **변형 없이 그대로 사용**

```md
> 대상 그룹: refactor/xxxx  
> 관련 파일 수: N  
> 주요 변경 영역: admin / api / hooks / services 등

# 1. 현상 및 문제점 (AS-IS)

-
- 수정 전 코드

---

# 2. 개선 방향 (TO-BE)

- ***

# 3. 예상 영향 범위 (Side Effects)

- ***

# 4. 결과 및 회고

-
- 결과 코드
```
