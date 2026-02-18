import MarkdownIt from "markdown-it";
// import markdownItHighlightjs from "markdown-it-highlightjs";
import hljs from "highlight.js";

function markdownItIns(md: MarkdownIt) {
  md.inline.ruler.before("emphasis", "ins", (state, silent) => {
    const start = state.pos;
    const max = state.posMax;
    const src = state.src;

    if (start + 3 >= max) return false;
    if (src.charCodeAt(start) !== 0x2b || src.charCodeAt(start + 1) !== 0x2b)
      return false;
    if (silent) return false;

    let end = start + 2;
    while (end + 1 < max) {
      if (src.charCodeAt(end) === 0x2b && src.charCodeAt(end + 1) === 0x2b) {
        break;
      }
      end += 1;
    }

    if (end + 1 >= max || end === start + 2) return false;

    const oldPos = state.pos;
    const oldMax = state.posMax;

    state.push("ins_open", "ins", 1);
    state.pos = start + 2;
    state.posMax = end;
    state.md.inline.tokenize(state);
    state.push("ins_close", "ins", -1);

    state.pos = end + 2;
    state.posMax = oldMax;

    if (state.pos < oldPos) state.pos = oldPos;

    return true;
  });
}

export const mdParser = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
  highlight: (code, lang) => {
    const validLang = hljs.getLanguage(lang || "") ? lang : "plaintext";
    const highlighted = validLang
      ? hljs.highlight(code, { language: validLang }).value
      : code;

    return `<pre data-lang="${validLang}" class="code-block"><code class="hljs">${highlighted}</code></pre>`;
  },
}).use(markdownItIns);
// .use(markdownItHighlightjs, {
//   auto: true,
//   code: true,
//   ignoreIllegals: true,
// })
// .use(markdownItIns);
