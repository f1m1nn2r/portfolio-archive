export type MainLink = {
  label: string;
  useProfileUrl: "resume_url" | "pdf_url" | "github_url";
  external?: boolean;
};

export type DocumentLink = {
  icon: string;
  label: string;
  href: string;
  external: boolean;
};
