import * as React from "react";

interface ContactEmailTemplateProps {
  senderName: string;
  senderEmail: string;
  message: string;
}

export const ContactEmailTemplate = ({
  senderName,
  senderEmail,
  message,
}: ContactEmailTemplateProps) => (
  <div style={{ fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
    <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
      포트폴리오 문의
    </h2>
    <p>
      <strong>보낸 사람:</strong> {senderName} ({senderEmail})
    </p>
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        whiteSpace: "pre-wrap", // 줄바꿈 유지
      }}
    >
      {message}
    </div>
    <p style={{ fontSize: "12px", color: "#888", marginTop: "20px" }}>
      이 메시지는 관리자 페이지 DB에도 안전하게 저장되었습니다.
    </p>
  </div>
);
