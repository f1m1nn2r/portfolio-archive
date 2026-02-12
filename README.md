# 📦 portfolio-archive

> 나만의 기술 블로그와 포트폴리오를 한 곳에서 관리하는 통합 아카이브 플랫폼

[Live Demo](https://portfolio-archive-beryl.vercel.app/) | [Wiki](https://github.com/f1m1nn2r/portfolio-archive/wiki)

## 🎯 Why I Built This

시중에 블로그와 포트폴리오 서비스는 많지만,
배운 것들을 온전히 실험하고 기록할 수 있는 **내 공간**을 직접 만들어보고 싶었습니다.

kt cloud 프론트엔드 과정을 거치며
단순 구현을 넘어 프로젝트를 어떻게 관리하고, 기록하고, 확장하는지를 처음으로 제대로 경험했고,
그 과정에서 익힌 것들을 하나의 서비스로 녹여보고 싶었습니다.

- 프로필, 경력, 작업물을 직접 관리하는 관리자 페이지
- 처음부터 끝까지의 작업 흐름을 기록하는 백로그
- 포트폴리오와 함께 이어지는 나만의 기술 개발 블로그

이 프로젝트는 결과물뿐 아니라
어떻게 시작했고, 어떤 고민을 했고, 어떻게 정리해왔는지까지 남기는
지속 가능한 개인 기록 공간을 목표로 합니다.

## 📖 Overview

portfolio-archive는 단순한 포트폴리오를 넘어, 개인 기술 블로그와
관리 시스템을 통합한 자체 제작 아카이브 플랫폼입니다.

개발 과정에서의 고민을 담은 백로그 관리, 데이터 기반의 경력 및
작업물 큐레이션, 그리고 직접 구현한 관리자 대시보드를 통해
지속 가능한 개인 브랜딩 시스템을 지향합니다.

## ✨ Features

### 📝 Content Management

- 마크다운 기반 게시글 작성/수정
- 카테고리 분류 및 태깅
- 게시글 검색 및 일괄 삭제 지원

### 💼 Career & Projects

- 경력(Experience) · 프로젝트(Project) 통합 관리
- 회사/연도 기반 필터링
- 요약 카드를 통한 데이터 현황 대시보드

### 🔐 Admin System

- `useAppSWR` 제네릭 훅 기반 CRUD 공통화
- `AdminProvider` + `useAdmin` 권한 제어
- Backlog/Posts/Categories/Contacts/Profile 통합 관리

### 🎨 Customizable Design

- Tailwind CSS + shadcn/ui 기반 커스텀 디자인
- 내 마음대로 수정 가능한 레이아웃과 스타일

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

### Backend & Database

- **BaaS**: Supabase (Auth, Database, Storage)

### State & Data

- **State Management**: Zustand
- **Data Fetching**: SWR (Custom `useAppSWR` hook)
- **Form Validation**: Zod

### External Services

- **Email**: Resend
- **Toast Notifications**: Sonner

## 📸 Screenshots

<img width="1902" height="929" alt="스크린샷 2026-02-12 오전 12 44 35" src="https://github.com/user-attachments/assets/95cdbd9a-7c39-4a49-9e52-e4fd7aa6f67d" />
<img width="1901" height="927" alt="스크린샷 2026-02-12 오전 12 43 52" src="https://github.com/user-attachments/assets/73b18486-7d1b-43d7-a37f-c749b9e4caf3" />
<img width="1906" height="927" alt="스크린샷 2026-02-12 오전 12 43 35" src="https://github.com/user-attachments/assets/5bc7fe1b-d295-4dd0-9aaa-18dcdbc41e70" />

## 👤 Contact

- Email: [f1minn2r@naver.com]
- Blog: [portfolio-archive-url](https://portfolio-archive-beryl.vercel.app/etc)
