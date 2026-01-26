"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      expand={false}
      duration={3000}
      toastOptions={{
        style: {
          background: "var(--background, #fff)",
          color: "var(--foreground, #000)",
          border: "1px solid var(--border, #e4e4e7)", // shadcn의 border 색상
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          padding: "16px",
          borderRadius: "8px", // shadcn의 기본 radius
          fontSize: "14px",
          fontWeight: 500,
        },
        // 아이콘과 텍스트 사이 간격 및 세부 스타일링
        className: "font-sans",
      }}
    />
  );
}
