import EditorJS from "@editorjs/editorjs";
import Undo from "editorjs-undo";
import React from "react";

import { tools } from "./RichTextEditorContent";
// import useStyles from "./styles";

const RichTextEditor = ({
  data,
  disabled,
  error,
  helperText,
  label,
  name,
  onChange,
  onReady,
}) => {
  //   const classes = useStyles({});

  // eslint-disable-next-line no-unused-vars
  //   const [isFocused, setFocus] = React.useState(false);
  const editor = React.useRef();
  const editorContainer = React.useRef();
  React.useEffect(
    () => {
      if (data) {
        editor.current = new EditorJS({
          data,
          holder: editorContainer.current,
          logLevel: "ERROR",
          onChange: async (api) => {
            const savedData = await api.saver.save();
            onChange(savedData);
          },
          onReady: () => {
            const undo = new Undo({ editor });
            undo.initialize(data);
            if (onReady) {
              onReady();
            }
          },
          readOnly: disabled,
          tools,
        });
      }

      return editor.current?.destroy;
    },
    // Rerender editor only if changed from undefined to defined state
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data === undefined]
  );
  React.useEffect(() => {
    if (editor.current?.readOnly) {
      editor.current.readOnly.toggle(disabled);
    }
  }, [disabled]);

  return (
    <>
      <label focused={true} shrink={true}>
        {label}
      </label>
      <div
        // className={classNames(classes.editor, classes.root, {
        //   [classes.rootActive]: isFocused,
        //   [classes.rootDisabled]: disabled,
        //   [classes.rootError]: error,
        // })}
        ref={editorContainer}
        // onFocus={() => setFocus(true)}
        // onBlur={() => setFocus(false)}
      />
      <span>{helperText}</span>
    </>
  );
};

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
