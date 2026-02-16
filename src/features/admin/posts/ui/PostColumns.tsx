import { AdminTableColumn } from "@/types/admin";
import { FormattedPost } from "../model/post.admin";

export const PostColumns = (
  onTitleClick: (id: string) => void,
): AdminTableColumn<FormattedPost>[] => [
  {
    label: "checkbox",
    width: "w-15",
    center: true,
  },
  {
    key: "no",
    label: "NO",
    width: "w-15",
    center: true,
  },
  {
    key: "title",
    label: "제목",
    width: "w-[400px]",
    renderCell: (item: FormattedPost) => (
      <span
        className="cursor-pointer hover:underline truncate block"
        onClick={() => onTitleClick(String(item.id))}
      >
        {item.title}
      </span>
    ),
  },
  {
    key: "category",
    label: "카테고리",
    width: "w-[350px]",
  },
  {
    key: "date",
    label: "작성일",
    width: "w-[200px]",
  },
];
