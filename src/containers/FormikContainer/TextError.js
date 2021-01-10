import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

function TextError(props) {
  return <InputFeedback className="error">{props.children}</InputFeedback>;
}

export default TextError;

const InputFeedback = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.secondary.hover", "#FF282F")};
  // position: absolute;
  display: flex;
  justify-content: flex-end;
`;
