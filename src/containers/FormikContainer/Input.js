import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";
import Uploader from "components/Uploader/Uploader";
import PhoneInput from "react-phone-input-2";
import { themeGet } from "@styled-system/theme-get";
import ReactCodeInput from "react-code-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye , faEyeSlash } from '@fortawesome/fontawesome-free-solid'


function setImageFieldValue(img) {
  if (typeof img !== "string" && typeof img !== undefined && img !== null) {
    return img[0];
  }
  if (typeof img === Array) {
    return img;
  }
  return null;
}

function Input(props) {
  const [show, setShow] = useState(false);
  const { label, name, type, file, setFieldValue, ...rest } = props;
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <FormInput>
      <label htmlFor={name}>{label}</label>

      {type === "file" ? (
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            console.log(field, form);
            return (
              <Uploader
                id={name}
                name={name}
                selected={value}
                doc={rest.doc}
                multiple={rest.multiple ? rest.multiple : false}
                {...field}
                {...rest}
                onChange={(val) =>
                  setFieldValue(
                    name,
                    rest.multiple ? val : setImageFieldValue(val)
                  )
                }
                imageURL={value}
                onBlur={(e) => field.onBlur(e)}
              />
            );
          }}
        </Field>
      ) : type === "phone" ? (
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <PhoneInput
                id={name}
                name={name}
                {...field}
                {...rest}
                inputExtraProps={{
                  name: "phone",
                  required: true,
                  autoFocus: false,
                }}
                country="ke"
                onlyCountries={["ke", "ug", "tz"]}
                masks={{ ke: "...-... ..." }}
                value={value}
                onBlur={(e) => field.onBlur(e)}
                onChange={(val) => setFieldValue(name, val)}
              />
            );
          }}
        </Field>
      ) : type === "code" ? (
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <ReactCodeInput
                value={value}
                onChange={(val) => setFieldValue(name, val)}
                type="number"
                fields={6}
                style={{ display: "flex", flexDirection: "row" }}
              />
            );
          }}
        </Field>
      ) : (
        <>
          {type === "password" ? (
            <FontAwesomeIcon
              icon={show ? faEye : faEyeSlash}
              className="icon"
              onClick={handleShow}
              style={{
                float: "right",
                position: "absolute",
                zIndex: 1,
                right: "64px",
                margin: "10px",
              }}
            />
          ) : null}
          <Field
            placeholder={label}
            id={name}
            name={name}
            type={show ? "text" : type}
            {...rest}
          />
        </>
      )}
      <ErrorMessage component={TextError} name={name} />
    </FormInput>
  );
}

export default Input;

const FormInput = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 10px 0;
  display: inline-block;
  /* padding: 20px; */

  > label {
    display: none;

    margin-bottom: 5px;
    font-size: 14px;
    line-height: 28px;
    color: #333;
  }

  > input[type="text"],
  > input[type="email"],
  > input[type="password"] {
    opacity: 0.9;
  }
  > input[type="number"] {
    -moz-appearance: textfield;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .error {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
  input,
  textarea,
  select {
    max-width: 400px;
  }
  .react-tel-input .country-list {
    max-width: 400px;
    width: 2000%;
  }
  .react-tel-input .form-control {
    width: 100%;
    height: 40px;
    border-radius: 0;
    background-color: ${themeGet("colors.gray.200", "#F7F7F7")};
    border: 1px solid ${themeGet("colors.borderColor", "#E6E6E6")};
    font-family: ${themeGet("fonts.body", "Lato")};
    font-size: ${themeGet("fontSizes.base", "15")}px;
    font-weight: ${themeGet("fontWeights.3", "400")};
    color: ${themeGet("colors.text.bold", "#652e8d")};
    line-height: 19px;
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
