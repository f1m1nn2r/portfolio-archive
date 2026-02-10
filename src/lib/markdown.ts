import MarkdownIt from "markdown-it";

export const mdParser = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
});
