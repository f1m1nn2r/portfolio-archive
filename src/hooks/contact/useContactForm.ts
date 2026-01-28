import { useState } from "react";
import { showToast } from "@/utils/toast";

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

    if (!formData.from || !formData.message) {
      showToast.error("이메일과 내용을 입력해주세요.");
      return;
    }

    if (honeypot) {
      showToast.success("메시지가 성공적으로 전달되었습니다.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderEmail: formData.from,
          senderName: formData.nameCompany,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error("발송 실패");

      showToast.success("메시지가 성공적으로 전달되었습니다.");
      setFormData({ from: "", nameCompany: "", message: "" });
    } catch (error) {
      showToast.error("메시지 전송에 실패했습니다.");
      console.error(error);
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
