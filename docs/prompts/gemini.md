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

modified: package-lock.json
modified: package.json
deleted: src/app/(main)/writing/page.tsx
modified: src/app/admin/categories/page.tsx
modified: src/app/admin/layout.tsx
modified: src/app/admin/posts/page.tsx
modified: src/app/api/categories/route.ts
modified: src/app/api/experience/route.ts
modified: src/app/api/projects/[id]/route.ts
modified: src/app/api/projects/route.ts
deleted: src/app/api/writing/[id]/route.ts
deleted: src/app/api/writing/route.ts
modified: src/app/globals.css
modified: src/components/admin/categories/CategoryGroup.tsx
modified: src/components/admin/categories/CategoryItem.tsx
modified: src/components/admin/experience/ExperienceCard.tsx
modified: src/components/admin/experience/ExperienceManagementSection.tsx
modified: src/components/admin/experience/ExperienceModal.tsx
modified: src/components/admin/layout/AdminSidebar.tsx
modified: src/components/admin/post/PostColumns.tsx
modified: src/components/admin/post/PostEditor.tsx
modified: src/components/admin/project/ProjectCard.tsx
modified: src/components/admin/project/ProjectManagementSection.tsx
modified: src/components/admin/project/ProjectModal.tsx
modified: src/hooks/categories/useCategories.ts
modified: src/hooks/common/useAppSWR.ts
modified: src/hooks/experience/useExperience.ts
modified: src/hooks/experience/useExperienceForm.ts
modified: src/hooks/experience/useExperienceManagement.ts
modified: src/hooks/posts/usePosts.ts
modified: src/hooks/project/useProjectManagement.ts
modified: src/hooks/project/useProjects.ts
modified: src/hooks/writing/useWritingForm.ts
modified: src/lib/markdown.ts
modified: src/lib/validations/experience.ts
modified: src/services/category/server.ts
modified: src/services/experience/server.ts
modified: src/services/post/client.ts
modified: src/services/writing/client.ts
modified: src/services/writing/server.ts
modified: src/types/admin/category.ts
modified: src/types/admin/experience.ts
modified: src/types/api/experience.ts
modified: src/types/api/post.ts
modified: src/types/ui/category.ts
modified: src/types/ui/experience.ts
modified: src/types/ui/project.ts

.coderabbit.yaml
.github/
API_Specification.md
GEMINI.md
public/images/new-open-muyaho.png
src/app/(main)/etc/
src/app/api/posts/
src/components/ui/accordion.tsx
src/services/post/server.ts
