import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";

export default function Color(props) {
  const { label, name, ...rest } = props;

  return (
    <FormInput className="form-control">
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <div
              style={{
                display: "inline-flex",
                verticalAlign: "middle",
                margin: "10px",
              }}
            >
              <ColorSelector>
                <p
                  style={{
                    display: "inline-flex",
                    verticalAlign: "middle",
                    width: "30px",
                    height: "30px",
                    alignItems: "center",
                    borderRadius: "50%",
                    border: "1px solid #eee",
                    marginRight: "10px",
                    background: value,
                  }}
                />

                <span>{label}</span>
                <input
                  type="color"
                  name="background_color"
                  onChange={(e) => setFieldValue(name, e.target.value)}
                  style={{
                    position: "absolute",
                    left: "0",
                    opacity: "0",
                  }}
                  {...rest}
                />
              </ColorSelector>
            </div>
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </FormInput>
  );
}

const FormInput = styled.div`
  max-width: 400px;
  margin: 10px 0;
  display: inline-block;
  /* padding: 20px; */

  > label {
    /* display: none; */

    margin-bottom: 5px;
    font-size: 14px;
    line-height: 28px;
    color: #333;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  textarea,
  select {
    opacity: 0.9;
  }
  .error {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
`;

const ColorSelector = styled.label`
  display: inline-block;
  margin: 0 auto;
  border-radius: 3px;
  position: relative;
  padding: 1px 32px 1px 5px;
  font-family: verdana;
  background: white;
  vertical-align: middle;
  span {
    vertical-align: middle;
  }

  &:after {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 5px 0 5px;
    border-color: black transparent transparent transparent;
    position: absolute;
    right: 10px;
    top: 17px;
  }
`;
