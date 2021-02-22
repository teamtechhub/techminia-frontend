import React, { useState, useEffect } from "react";
import { EditorState, convertFromRaw, convertToRaw, Modifier } from "draft-js";
import { List } from "immutable";
import { getSelectedBlock } from "draftjs-utils";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "./style.css";
// import { axiosInstance } from "utils/axios";

// export const imageUploadApi = (file, transform = true) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   return axiosInstance.post(`/api/images/`, formData);
// };

function EditorField({
  input,
  meta,
  field,
  form,
  label,
  placeholder,
  labelCss,
  wrapperClassName,
  toolbarClassName,
  editorClassName,
  ...rest
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (form.dirty) {
      return;
    }
    if (
      field.value === null ||
      field.value === undefined ||
      Object.keys(field.value).length === 0
    ) {
      return;
    }
    const contentBlock = convertFromRaw(field.value);

    if (contentBlock) {
      const contentState = contentBlock;
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [field.value, form.dirty]);

  const isValidLength = (contentState) => {
    const maxLength = rest.maxLength || 1000;
    return contentState.getPlainText("").length <= maxLength;
  };

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
    form.setFieldValue(
      field.name,
      convertToRaw(editorState.getCurrentContent())
    );
  }
  const handlePastedText = (text, html, editorState, onChange) => {
    if (html) {
      const contentBlock = htmlToDraft(html);
      let contentState = editorState.getCurrentContent();
      contentBlock.entityMap.forEach((value, key) => {
        contentState = contentState.mergeEntityData(key, value);
      });
      contentState = Modifier.replaceWithFragment(
        contentState,
        editorState.getSelection(),
        new List(contentBlock.contentBlocks)
      );
      if (!isValidLength(contentState)) {
        return "handled";
      }
      onChange(
        EditorState.push(editorState, contentState, "insert-characters")
      );
      return true;
    }
    const selectedBlock = getSelectedBlock(editorState);
    const newState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text,
      editorState.getCurrentInlineStyle()
    );
    if (!isValidLength(newState)) {
      return "handled";
    }
    onChange(EditorState.push(editorState, newState, "insert-characters"));
    if (selectedBlock && selectedBlock.type === "code") {
      return true;
    }
    return false;
  };
  // function uploadImageCallBack(file) {
  //   return new Promise((resolve, reject) => {
  //     imageUploadApi(file, false)
  //       .then((response) => {
  //         /* react-draft-wywsgi need data.link as the uploaded image url
  //         so we had to slightly modify the result from cloudinary response */
  //         let newResponse = {
  //           data: {
  //             link: response.data.secure_url,
  //           },
  //         };
  //         resolve(newResponse);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // }

  return (
    <>
      <Editor
        editorState={editorState}
        wrapperClassName={wrapperClassName || "richEditor-wrapper"}
        toolbarClassName={toolbarClassName || "richEditor-toolbar"}
        editorClassName={editorClassName || "richEditor-editor"}
        placeholder={placeholder}
        handlePastedText={handlePastedText}
        onEditorStateChange={(val) => onEditorStateChange(val)}
        // onFocus={(e) => field.onFocus(e)}
        // onBlur={(e) => field.onBlur(e)}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "emoji",
            "image",
            "history",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          image: {
            // uploadCallback: uploadImageCallBack,
            alt: { present: true },
            previewImage: true,
          },
          fontFamily: {
            options: [
              "Arial",
              "Georgia",
              "Impact",
              "Tahoma",
              "Roboto",
              "Times New Roman",
              "Verdana",
            ],
          },
        }}
      />
    </>
  );
}

export default EditorField;
