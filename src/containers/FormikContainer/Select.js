import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";
function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <FormInput className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </FormInput>
  );
}

export default Select;

const FormInput = styled.div`
  width: 100%;
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
