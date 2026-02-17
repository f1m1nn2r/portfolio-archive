"use client";

import { useState } from "react";
import { PageLayout } from "@/components/common/PageLayout";
import { Icon } from "@/components/common/Icon";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { showToast } from "@/lib/toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const labelStyles = "text-lg font-medium mb-2 block";
  const inputStyles =
    "w-full bg-transparent border-b border-gray-ddd py-2 outline-none focus:border-black transition-colors placeholder:text-gray-999";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        showToast.error("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      showToast.error("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="">
        <div className="mb-14 sm:mb-20 md:mb-25">
          <h1 className="mb-3 text-4xl font-bold leading-none sm:text-6xl md:text-[80px]">
            Login
          </h1>
          <p className="mb-6 text-base leading-relaxed text-gray-222 sm:text-lg">
            대시보드 확인을 위해 로그인이 필요합니다.
            <br />
            관리자 기능을 둘러보시려면 아래{" "}
            <strong className="text-black font-semibold">옵저버 계정</strong>을
            이용해 주세요.
          </p>

          <div className="inline-block max-w-full rounded-sm border border-gray-ddd bg-bg-light p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-555 sm:gap-4">
              <span className="flex items-center gap-1">
                <Icon type="userCircle" size={14} /> ID: observer@guest.com
              </span>
              <span className="hidden h-3 w-[1px] bg-gray-ddd sm:block"></span>
              <span className="flex items-center gap-1">
                <Icon type="lockAlt" size={14} /> PW: guest1234
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-start md:justify-end">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[450px] space-y-8 sm:space-y-10 md:space-y-12"
          >
            <div>
              <label className={labelStyles}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해 주세요."
                className={inputStyles}
                required
              />
            </div>

            <div>
              <label className={labelStyles}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요."
                className={inputStyles}
                required
              />
            </div>

            <div className="flex items-center justify-end gap-4">
              <button
                type="submit"
                className="px-6 py-1.5 rounded-full text-base text-white font-medium transition-all border border-black bg-black disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? "Conneting..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
