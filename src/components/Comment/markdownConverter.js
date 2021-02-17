import Showdown from "showdown";
import showdownKatex from "showdown-katex";
import "katex/dist/katex.css";

export default new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  // extensions: ['showdown_mathjax_ext'],
  extensions: [
    showdownKatex({
      // maybe you want katex to throwOnError
      throwOnError: true,
      // disable displayMode
      displayMode: false,
    }),
  ],
});
