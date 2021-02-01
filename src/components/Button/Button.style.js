import styled, { keyframes } from "styled-components";
import { alignItems, boxShadow } from "styled-system";
import { themeGet } from "@styled-system/theme-get";
import { buttonStyle, colorStyle, buttonSize } from "../utils/customVariant";

const ButtonStyle = styled.button`
  /* button default style */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${themeGet(
    "colors.primary.regular",
    "linear-gradient(90deg, rgba(236,118,35,1) 0%, rgba(101,46,141,1) 100%)"
  )};
  height: ${themeGet("heights.3", "40")}px;
  width: ${(props) => (props.fullwidth ? "100%" : "auto")};
  color: ${(props) =>
    props.variant === "textButton" ||
    props.variant === "outlined" ||
    props.variant === "outlinedDash" ||
    props.variant === "outlinedFab" ||
    props.variant === "extendedOutlinedFab"
      ? "#222222"
      : "#ffffff"};
  border-radius: ${(props) =>
    props.radius ? props.radius : themeGet("radius.3", "6")}px;
  font-family: "Lato", sans-serif;
  font-size: ${themeGet("fontSizes.2", "15")}px;
  text-decoration: none;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${themeGet("space.4", "32")}px;
  padding-right: ${themeGet("space.4", "32")}px;
  border: 0;
  transition: all 0.3s ease;
  box-sizing: border-box;

  span.btn-text {
    padding-left: ${themeGet("space.1", "4")}px;
    padding-right: ${themeGet("space.1", "4")}px;
    white-space: nowrap;
  }
  span.btn-icon {
    display: flex;
    > div {
      display: flex !important;
    }
  }

  &:focus {
    outline: none;
  }

  &.disabled {
    color: ${themeGet("colors.labelColor", "#767676")};
    background-color: ${themeGet("colors.inactiveButton", "#b7dbdd")};
    border-color: ${themeGet("colors.borderColor", "#E6E6E6")};

    &:hover {
      color: ${themeGet("colors.labelColor", "#767676")};
      background-color: ${themeGet("colors.inactiveButton", "#b7dbdd")};
      border-color: ${themeGet("colors.borderColor", "#E6E6E6")};
    }
  }

  /* Material style goes here */
  &.is-material {
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  }

  /* When button on loading stage */
  &.is-loading {
    .btn-text {
      padding-left: ${themeGet("space.2", "8")}px;
      padding-right: ${themeGet("space.2", "8")}px;
    }
  }

  /* Style system support */
  ${alignItems}
  ${boxShadow}
  ${colorStyle}
  ${buttonStyle}
  ${buttonSize}
`;

ButtonStyle.displayName = "ButtonStyle";

export default ButtonStyle;

const rotate = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

export const Spinner = styled.div`
  width: 18px;
  height: 18px;
  margin-left: 10px;
  border: 3px solid #ffffff;
  border-top: 3px solid
    ${(props) =>
      props.color ? props.color : themeGet("primary.regular", "#652e8d")};
  border-radius: 50%;
  transition-property: transform;
  animation-name: ${rotate};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;
