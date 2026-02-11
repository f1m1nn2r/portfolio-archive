// Supabase Storage에 이미지를 업로드하고 URL을 반환하는 함수
import { createClient } from "@/lib/supabase/client";

export const uploadImageApi = async (file: File) => {
  const supabase = createClient();

  // 파일 이름 설정 (중복 방지를 위해 타임스탬프 추가)
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `post-content/${fileName}`; // 버킷 내부 폴더 구조

  // 업로드 실행
  const { data, error } = await supabase.storage
    .from("images")
    .upload(filePath, file);

  if (error) {
    console.error("이미지 업로드 실패:", error);
    throw new Error("이미지 업로드 중 오류가 발생했습니다.");
  }

  // 업로드된 파일의 공개 URL 가져오기
  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(filePath);

  return publicUrl;
};
