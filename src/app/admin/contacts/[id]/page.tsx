"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { useParams, useRouter } from "next/navigation";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { LoadingState } from "@/components/common/LoadingState";
import { useContact } from "@/hooks/contact/useContact";
import { useEffect, useRef, useState } from "react";
import { MESSAGES } from "@/lib/constants/messages";
import { formatDate } from "@/lib/date";
import { useModal } from "@/hooks/common/useModal";

export default function ContactsDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { contacts, loading, deleteContacts, toggleStar, markAsRead } =
    useContact();
  const isProcessing = useRef(false);

  const deleteModal = useModal();

  // 현재 ID에 맞는 이메일 찾기
  const email = contacts.find((item) => item.id === id);

  // 페이지 진입 시 읽음 처리
  useEffect(() => {
    // 기본 방어
    if (!email || email.is_read || isProcessing.current) return;

    // 처리 시작 표시
    isProcessing.current = true;

    markAsRead([email.id]);
  }, [email, markAsRead]);

  const handleConfirmDelete = async () => {
    if (!email) return;
    await deleteContacts([email.id]);
    deleteModal.close();
    router.push("/admin/contacts");
  };

  if (loading)
    return <LoadingState message={MESSAGES.CONTACTS.DETAIL.LOADING} />;
  if (!email)
    return (
      <div className="p-10 text-center">
        {MESSAGES.CONTACTS.DETAIL.NOT_FOUND}
      </div>
    );

  return (
    <AdminPageLayout title="Message Detail">
      {/* 상단 액션 바 */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="secondary" size="md" onClick={() => router.back()}>
          <Icon type="chevronLeft" size={20} className="mr-1" /> 목록으로
        </Button>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => toggleStar(email.id, email.is_starred)}
          >
            <Icon
              type="star"
              size={20}
              className={email.is_starred ? "text-yellow-400" : "text-gray-400"}
            />
          </Button>
          <Button variant="danger" size="md" onClick={deleteModal.open}>
            <Icon type="trash" size={20} />
          </Button>
        </div>
      </div>

      {/* 메일 본문 카드 */}
      <div className="bg-white rounded-lg border border-gray-ddd overflow-hidden">
        {/* 헤더 섹션 */}
        <div className="p-8 border-b border-gray-eee bg-bg-light/10">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {email.sender || "이름 없음"}
            </h1>
            <span className="text-base text-gray-555">
              {formatDate(email.created_at)}
            </span>
          </div>

          <div className="flex flex-col gap-1 text-base">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">From: </span>
              {email.sender} ({email.name_company})
            </p>
          </div>
        </div>

        {/* 본문 섹션 */}
        <div className="p-8 min-h-[300px] text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
          {email.content}
        </div>

        {/* 하단 푸터 */}
        <div className="p-6 bg-gray-50 border-t border-gray-eee flex justify-end">
          <a href={`mailto:${email.name_company}`}>
            <Button variant="primary" size="md">
              <Icon type="mailSend" size={20} className="mr-2" /> 답장하기
            </Button>
          </a>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleConfirmDelete}
        title={MESSAGES.CONTACTS.DELETE.TITLE}
        description={MESSAGES.CONTACTS.DELETE.DESCRIPTION}
      />
    </AdminPageLayout>
  );
}
