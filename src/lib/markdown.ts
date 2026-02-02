import MarkdownIt from "markdown-it";

export const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});
