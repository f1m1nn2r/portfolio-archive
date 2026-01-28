"use client";

import { useState } from "react";
import { showToast } from "@/utils/toast";
import { PageLayout } from "@/components/common/PageLayout";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    from: "", // 보내는 이메일
    nameCompany: "", // 이름/소속
    message: "", // 내용
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

    // 간단한 유효성 검사
    if (!formData.from || !formData.message) {
      showToast.error("이메일과 내용을 입력해주세요.");
      return;
    }

    //허니팟 필드에 값이 있다면 봇으로 간주하고 중단
    if (honeypot) {
      console.log("Bot detected!");
      showToast.success("메시지가 성공적으로 전달되었습니다."); // 속이기 위해 성공 메시지만 띄움
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Tip: 서버 route.ts에서 받을 이름과 똑같이 맞춰서 보냅니다.
        body: JSON.stringify({
          senderEmail: formData.from,
          senderName: formData.nameCompany,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "발송 실패");
      }

      showToast.success("메시지가 성공적으로 전달되었습니다.");
      setFormData({ from: "", nameCompany: "", message: "" }); // 폼 초기화
    } catch (error) {
      showToast.error("메시지 전송에 실패했습니다. 다시 시도해주세요.");
      console.error("전송 에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const labelStyles = "text-lg font-medium mb-2 block";
  const inputStyles =
    "w-full bg-transparent border-b border-gray-ddd py-2 outline-none focus:border-black transition-colors placeholder:text-gray-999";

  return (
    <PageLayout>
      <div className="mb-25">
        <h1 className="text-[80px] font-bold leading-none mb-3">Contact me</h1>
        <p className="text-lg text-gray-222 leading-relaxed">
          남겨주신 메시지는 대시보드와 개인 이메일을 통해 실시간으로 확인하고
          있습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-[800px] ml-auto">
        <div className="grid grid-cols-2 gap-x-12 gap-y-12">
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="fax_number"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* From Email */}
          <div>
            <label className={labelStyles}>from</label>
            <input
              type="email"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="example@company.com"
              className={inputStyles}
              required
            />
          </div>

          {/* Name/Company */}
          <div>
            <label className={labelStyles}>Name/Company</label>
            <input
              type="text"
              name="nameCompany"
              value={formData.nameCompany}
              onChange={handleChange}
              placeholder="이름과 소속을 입력해주세요."
              className={inputStyles}
            />
          </div>

          {/* Message */}
          <div className="col-span-2">
            <label className={labelStyles}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="내용을 입력해주세요."
              className={`${inputStyles} resize-none overflow-hidden min-h-[200px]`}
              required
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
          </div>
        </div>

        <div className="flex justify-end mt-12">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-1.5 rounded-full text-base text-white font-medium transition-all border border-black bg-black"
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </PageLayout>
  );
}
