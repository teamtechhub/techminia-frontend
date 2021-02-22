import React from "react";
import { Field } from "formik";
import ContentEditor from "components/ContentEditor";

export default function ContentEditorContainer(props) {
  const { name } = props;

  return (
    <Field name={name}>
      {({ form, field }) => {
        const { setFieldValue } = form;
        const { value } = field;
        return (
          <ContentEditor
            id={name}
            name={name}
            value={value}
            onContentChange={(val) => setFieldValue(name, val)}
          />
        );
      }}
    </Field>
  );
}
