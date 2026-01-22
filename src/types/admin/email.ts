export interface EmailMessage {
  id: string;
  senderName: string; // Name/Company
  senderEmail: string; // 이메일 주소
  message: string; // 메시지 본문 (Textarea)
  isRead: boolean; // 읽음 상태
  isStarred: boolean; // 별표(중요) 표시
  receivedAt: string; // 수신 일시
}
