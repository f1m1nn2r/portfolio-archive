import { AdminTableColumn, FormattedPost } from "@/types/admin";

export const PostColumns = (
  onTitleClick: (id: string) => void,
): AdminTableColumn<FormattedPost>[] => [
  {
    label: "checkbox",
    width: "w-[50px]",
    center: true,
  },
  {
    key: "no",
    label: "NO",
    width: "w-[60px]",
    center: true,
  },
  {
    key: "title",
    label: "제목",
    renderCell: (item: FormattedPost) => (
      <span
        className="cursor-pointer hover:underline"
        onClick={() => onTitleClick(String(item.id))}
      >
        {item.title}
      </span>
    ),
  },
  {
    key: "category",
    label: "카테고리",
    width: "",
  },
  {
    key: "date",
    label: "작성일",
    width: "w-[200px]",
  },
];
