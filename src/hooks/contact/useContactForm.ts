import { useState } from "react";
import { showToast } from "@/lib/toast";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactMessage } from "@/services/contact/client";

export function useContactForm() {
  const [formData, setFormData] = useState({
    from: "",
    nameCompany: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 전송 데이터 준비 및 Zod 검증
    const validation = contactSchema.safeParse(formData);

    // 검증 실패 시 첫 번째 에러 메시지 노출
    if (!validation.success) {
      const firstErrorMessage = validation.error.issues[0].message;
      showToast.error(firstErrorMessage);
      return;
    }

    // 스팸 방지 (Honeypot)
    if (honeypot) {
      showToast.success("메시지가 성공적으로 전달되었습니다.");
      setFormData({ from: "", nameCompany: "", message: "" }); // 봇인 경우 폼 비워주기
      return;
    }

    setIsLoading(true);

    try {
      await sendContactMessage(validation.data);

      showToast.success("메시지가 성공적으로 전달되었습니다.");
      setFormData({ from: "", nameCompany: "", message: "" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "메시지 전송에 실패했습니다.";
      showToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    honeypot,
    setHoneypot,
    handleChange,
    handleSubmit,
  };
}
