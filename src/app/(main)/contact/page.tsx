"use client";

import { PageLayout } from "@/components/common/PageLayout";
import { useContactForm } from "@/hooks/contact/useContactForm";

export default function ContactPage() {
  const {
    formData,
    isLoading,
    honeypot,
    setHoneypot,
    handleChange,
    handleSubmit,
  } = useContactForm();

  const labelStyles = "text-lg font-medium mb-2 block";
  const inputStyles =
    "w-full bg-transparent border-b border-gray-ddd py-2 outline-none focus:border-black transition-colors placeholder:text-gray-999";

  return (
    <PageLayout>
      <div className="mb-14 sm:mb-20 md:mb-25">
        <h1 className="mb-3 text-4xl font-bold leading-none sm:text-6xl md:text-[80px]">
          Contact me
        </h1>
        <p className="text-base break-keep text-gray-222 sm:text-lg">
          남겨주신 메시지는 대시보드와 개인 이메일을 통해 실시간으로 확인하고
          있습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="ml-auto w-full max-w-[800px]">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 md:gap-y-12">
          {/* Honeypot Field */}
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

          <div className="md:col-span-2">
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

        <div className="mt-10 flex justify-end sm:mt-12">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-1.5 rounded-full text-base text-white font-medium transition-all border border-black bg-black disabled:bg-gray-400"
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </PageLayout>
  );
}
