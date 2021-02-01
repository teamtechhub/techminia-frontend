import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { themeGet } from "@styled-system/theme-get";
import styled from "styled-components";
import EditorField from "./EditorField";
// import RichTextEditor from "./RichTextEditor";

function Textarea(props) {
  const { label, name, rte, value, ...rest } = props;
  return (
    <FormInput className="form-control">
      <label htmlFor={name}>{label}</label>
      {rte ? (
        <Field
          as="textarea"
          id={name}
          name={name}
          value={value}
          component={EditorField}
          // component={RichTextEditor}
          {...rest}
        />
      ) : (
        <Field as="textarea" id={name} name={name} value={value} {...rest} />
      )}

      <ErrorMessage component={TextError} name={name} />
    </FormInput>
  );
}

export default Textarea;

const FormInput = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: inline-block;
  /* padding: 20px; */

  > label {
    /* display: none; */

    margin-bottom: 5px;
    font-size: 14px;
    line-height: 28px;
    color: #333;
  }

  > input[type="text"],
  > input[type="email"],
  > input[type="password"],
  textarea,
  select {
    opacity: 0.9;
  }
  .error {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
  .rdw-editor-toolbar {
    padding: 6px 5px 0;
    border-radius: 2px;
    border: 1px solid #f1f1f1;
    display: flex;
    justify-content: flex-start;
    // background: #21277fad;
    flex-wrap: wrap;
    font-size: ${themeGet("fontSizes.base", "15")}px;
    margin-bottom: 5px;
    -webkit-user-select: none;
    user-select: none;
    a {
      color: ${themeGet("colors.text.bold", "#652e8d")};
      -webkit-transition: 0.3s;
      transition: 0.3s;
    }
  }
  .editorClassName {
    width: 100%;
    min-height: 100px;
    max-height: 300px;
    border-radius: ${themeGet("radii.base", "6px")};
    background-color: ${themeGet("colors.gray.200", "#F7F7F7")};
    border: 1px solid ${themeGet("colors.borderColor", "#E6E6E6")};
    font-family: ${themeGet("fonts.body", "Lato")};
    font-size: ${themeGet("fontSizes.base", "15")}px;
    font-weight: ${themeGet("fontWeights.3", "400")};
    color: ${themeGet("colors.text.bold", "#652e8d")};
    line-height: 19px;
    padding: 0 18px;
    box-sizing: border-box;
    transition: border-color 0.25s ease;

    &:hover,
    &:focus {
      outline: 0;
    }

    &:focus {
      border-color: ${themeGet("colors.primary.regular", "#652e8d")};
    }

    &::placeholder {
      color: ${themeGet("colors.darkRegular", "#77798c")};
      font-size: 14px;
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &.disabled {
      .inner-wrap {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }
  }
`;
