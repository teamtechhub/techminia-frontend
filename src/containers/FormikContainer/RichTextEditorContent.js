import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import strikethroughIcon from "./StrikethroughIcon";
import createGenericInlineTool from "editorjs-inline-tool";
import React from "react";

export const tools = {
  header: {
    class: Header,
    config: {
      defaultLevel: 1,
      levels: [1, 2, 3],
    },
  },
  list: List,
  quote: Quote,
  strikethrough: createGenericInlineTool({
    sanitize: {
      s: {},
    },
    shortcut: "CMD+S",
    tagName: "s",
    toolboxIcon: strikethroughIcon,
  }),
};

const RichTextEditorContent = ({ className, data, onReady }) => {
  const editor = React.useRef();
  const editorContainer = React.useRef();
  React.useEffect(
    () => {
      if (data) {
        editor.current = new EditorJS({
          data,
          holder: editorContainer.current,
          logLevel: "ERROR",
          onReady,
          readOnly: true,
          tools,
        });
      }

      return editor.current?.destroy;
    },
    // Rerender editor only if changed from undefined to defined state
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data === undefined]
  );

  return (
    <div
      // className={classNames(classes.editor, className)}
      ref={editorContainer}
    />
  );
};

RichTextEditorContent.displayName = "RichTextEditorContent";
export default RichTextEditorContent;
