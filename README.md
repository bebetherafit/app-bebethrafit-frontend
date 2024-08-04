## Getting Started

First, run the development server:

```bash
npm run dev
```

# 베베테라핏 프로젝트 컴포넌트 구조

## Atoms (원자 단위 컴포넌트)
1. Button
   - 파일 위치: `app/components/atoms/Button.tsx`
   - 설명: 재사용 가능한 버튼 컴포넌트

2. Input
   - 파일 위치: `app/components/atoms/Input.tsx`
   - 설명: 재사용 가능한 입력 필드 컴포넌트

3. Logo
   - 파일 위치: `app/components/atoms/Logo.tsx`
   - 설명: 베베테라핏 로고 컴포넌트

## Molecules (분자 단위 컴포넌트)
1. MeasurementRecordItem
   - 파일 위치: `app/components/molecules/MeasurementRecordItem.tsx`
   - 설명: 개별 측정 기록 항목을 표시하는 컴포넌트

2. MeasurementDateSelector
   - 파일 위치: `app/components/molecules/MeasurementDateSelector.tsx`
   - 설명: 측정 날짜를 선택하는 컴포넌트

3. DataCard
   - 파일 위치: `app/components/molecules/DataCard.tsx`
   - 설명: 데이터를 카드 형태로 표시하는 컴포넌트

4. FootImage
   - 파일 위치: `app/components/molecules/FootImage.tsx`
   - 설명: 발 이미지와 관련 데이터를 표시하는 컴포넌트

## Organisms (유기체 단위 컴포넌트)
1. Sidebar
   - 파일 위치: `app/components/organisms/Sidebar.tsx`
   - 설명: 일반 사용자용 사이드바 컴포넌트

2. AdminSidebar
   - 파일 위치: `app/components/organisms/AdminSidebar.tsx`
   - 설명: 관리자용 사이드바 컴포넌트

3. UserTable
   - 파일 위치: `app/components/organisms/UserTable.tsx`
   - 설명: 사용자 목록을 테이블 형태로 표시하는 컴포넌트

## Templates (템플릿 컴포넌트)
1. DashboardLayout
   - 파일 위치: `app/components/templates/DashboardLayout.tsx`
   - 설명: 대시보드 페이지의 전체적인 레이아웃을 정의하는 컴포넌트

2. AdminLayout
   - 파일 위치: `app/components/templates/AdminLayout.tsx`
   - 설명: 관리자 페이지의 전체적인 레이아웃을 정의하는 컴포넌트

## Pages (페이지 컴포넌트)
1. LoginPage
   - 파일 위치: `app/page.tsx`
   - 설명: 로그인 페이지

2. DashboardPage
   - 파일 위치: `app/dashboard/page.tsx`
   - 설명: 사용자 대시보드 페이지

3. VisualizationAnalysisPage
   - 파일 위치: `app/analysis/page.tsx`
   - 설명: 시각화 분석 페이지

4. AdminMemberManagementPage
   - 파일 위치: `app/admin/settings/page.tsx`
   - 설명: 관리자 회원 관리 페이지

5. CustomerInfoPage
   - 파일 위치: `app/admin/customer-info/page.tsx`
   - 설명: 고객 정보 조회 페이지

## Context (컨텍스트)
1. AuthContext
   - 파일 위치: `app/contexts/AuthContext.tsx`
   - 설명: 사용자 인증 상태를 관리하는 컨텍스트

## Hooks (커스텀 훅)
1. useAuth
   - 파일 위치: `app/hooks/useAuth.ts`
   - 설명: 인증 관련 기능을 제공하는 커스텀 훅

## Utilities (유틸리티 함수)
1. Firebase 설정
   - 파일 위치: `app/lib/firebase.ts`
   - 설명: Firebase 초기화 및 관련 함수