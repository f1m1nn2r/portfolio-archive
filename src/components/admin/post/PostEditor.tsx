import "react-markdown-editor-lite/lib/index.css";
import dynamic from "next/dynamic";
import { mdParser } from "@/lib/markdown";
import { PostEditorProps } from "@/types/ui/post";
import { uploadImageApi } from "@/services/storage";
import { showToast } from "@/lib/toast";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export function PostEditor({ value, onChange, isMaster }: PostEditorProps) {
  const handleImageUpload = async (file: File) => {
    try {
      const url = await uploadImageApi(file);
      return url; // 에디터가 이 URL을 받아서 마크다운 형식으로 본문에 넣어줌
    } catch (err) {
      showToast.error("이미지 업로드에 실패했습니다.");
      return "";
    }
  };

  return (
    <div className="h-[600px] flex flex-col">
      <MdEditor
        value={value}
        style={{ height: "100%" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={({ text }) => onChange(text)}
        onImageUpload={handleImageUpload}
        placeholder="내용을 입력하세요."
        readOnly={!isMaster}
        config={{
          view: {
            menu: isMaster,
            md: true,
            html: true,
          },
        }}
      />
    </div>
  );
}
