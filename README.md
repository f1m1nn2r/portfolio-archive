# 개인 포트폴리오 & 개발 허브

Notion과 같은 생산성 툴, 개인 기술 블로그, 그리고 포트폴리오를 하나로 통합한 올인원(All-in-one) 웹 입니다.

## ✨ 주요 기능

이 프로젝트는 다음과 같은 핵심 기능들을 제공합니다.

- **경력 및 프로젝트 관리**: 저의 개발 여정과 참여했던 프로젝트들을 보여주는 포트폴리오 섹션입니다.
- **기술 블로그**: 개발 과정에서 얻은 지식과 경험을 기록하고 공유하는 공간입니다.
- **백로그 관리**: Notion과 같이 아이디어를 기록하고, 업무를 칸반 보드 형식으로 관리할 수 있는 기능입니다.
- **문의하기**: 방문하신 분들이 저에게 쉽게 연락할 수 있는 메일링 기능이 포함된 페이지입니다.
- **관리자 대시보드**: 포트폴리오, 블로그 글, 백로그 등 모든 콘텐츠를 효율적으로 관리할 수 있는 전용 대시보드입니다.

## 🛠️ 기술 스택

이 프로젝트는 다음과 같은 최신 기술들을 기반으로 구축되었습니다.

- **프레임워크**: [Next.js](https://nextjs.org/) (App Router)
- **언어**: [TypeScript](https://www.typescriptlang.org/)
- **백엔드 & 데이터베이스**: [Supabase](https://supabase.io/)
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 컴포넌트**: [shadcn/ui](https://ui.shadcn.com/)
- **상태 관리**: [Zustand](https://zustand-demo.pmnd.rs/)
- **데이터 페칭**: [SWR](https://swr.vercel.app/)
- **폼 검증**: [Zod](https://zod.dev/)
- **메일링**: [Resend](https://resend.com/)
- **알림**: [Sonner](https://sonner.emilpriv.dev/)

## 🚀 시작하기

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 1. 저장소 복제

```bash
git clone https://github.com/your-username/portfolio-archive.git
cd portfolio-archive
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트 디렉터리에 `.env.local` 파일을 생성하고, 아래의 Supabase 및 Resend 키를 입력하세요. 이 키들은 각 서비스의 대시보드에서 발급받을 수 있습니다.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Resend
RESEND_API_KEY=YOUR_RESEND_API_KEY
```

### 4. 개발 서버 실행

```bash
npm run dev
```

이제 브라우저에서 `http://localhost:3000`으로 접속하여 프로젝트를 확인할 수 있습니다.

## 📂 프로젝트 구조

주요 디렉토리 구조는 다음과 같습니다.

```
/src
├── /app            # Next.js App Router 기반 라우팅 및 페이지
├── /components     # 공통 및 UI 컴포넌트
├── /hooks          # 재사용 가능한 커스텀 훅
├── /lib            # 유틸리티, 상수, Zod 스키마
├── /services       # API 요청 및 서버 로직
├── /store          # Zustand를 사용한 전역 상태 관리
└── /utils          # 날짜, 토스트 등 보조 유틸리티
```
