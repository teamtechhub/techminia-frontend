import React, { useState, useEffect } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

// function uploadImageCallBack(file) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", "https://api.imgur.com/3/image");
//     xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
//     const data = new FormData();
//     data.append("image", file);
//     xhr.send(data);
//     xhr.addEventListener("load", () => {
//       const response = JSON.parse(xhr.responseText);
//       resolve(response);
//     });
//     xhr.addEventListener("error", () => {
//       const error = JSON.parse(xhr.responseText);
//       reject(error);
//     });
//   });
// }

function EditorField({
  input,
  meta,
  field,
  form,
  label,
  placeholder,
  labelCss,
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (form.dirty) {
      return;
    }
    if (!field.value) {
      return;
    }
    const contentBlock = htmlToDraft(field.value);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [field.value, form.dirty]);

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
    form.setFieldValue(
      field.name,
      //   convertToRaw(editorState.getCurrentContent())
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  }

  // const { editorState } = editorState;
  return (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        placeholder={placeholder}
        onEditorStateChange={(val) => onEditorStateChange(val)}
        // onFocus={(e) => field.onFocus(e)}
        // onBlur={(e) => field.onBlur(e)}
        // toolbar={{
        //   options: [
        //     "inline",
        //     "blockType",
        //     "fontSize",
        //     "fontFamily",
        //     "list",
        //     "textAlign",
        //     "link",
        //     "embedded",
        //     "remove",
        //     "history",
        //   ],
        // }}
        // toolbar={{
        //     inline: { inDropdown: true },
        //     list: { inDropdown: true },
        //     textAlign: { inDropdown: true },
        //     link: { inDropdown: true },
        //     history: { inDropdown: true },
        //
      />
    </>
  );
}

export default EditorField;
