import React, { useState } from "react";
import { lightColors, darkColors } from "./colors";
import { splitCamelCase } from "utils";
import _ from "lodash";
import styled from "styled-components";
import css from "@styled-system/css";

export const StyledContainer = styled.div(
  css({
    width: ["100%", "90vw"],
  }),
  {
    margin: "auto",
    paddingTop: 100,
    paddingBottom: 150,
  }
);

export const StyledContent = styled.div(
  css({
    flexDirection: ["column", "row"],
  }),
  {
    display: "flex",
  }
);

const ColorSelector = styled.label`
  display: inline-block;
  margin: 0 auto;
  border-radius: 3px;
  position: relative;
  padding: 6px 32px 6px 10px;
  font-family: verdana;
  background: white;
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

const data = [{ lightColors: lightColors }, { darkColors: darkColors }];

const checkType = (element, type) => {
  if (!element) {
    return null;
  }
  if (element && !type) {
    if (Array.isArray(element) === true) {
      return "array";
    } else {
      return typeof element;
    }
  }
  if (typeof element === type) {
    if (type === "array") {
      Array.isArray(element);
    }
    return true;
  }
};

function ColorPicker() {
  const handler = (data) => {
    if (checkType(data) === "object") {
      return Object.keys(data).map((child, index, arr) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [color, setColor] = useState(Object.values(data)[index]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [active, setActive] = useState(false);
        const handleChange = (e) => {
          //   data[child] = color;
          console.log(e);
          setColor(e.target.value);
          setActive(!active);
        };
        return (
          <div
            style={{
              display: "block",
              margin: "10px",
            }}
            key={index}
          >
            <strong>
              {isNaN(child) ? `${splitCamelCase(child)}` : `${child}`}
            </strong>
            {` : `}
            {checkType(Object.values(data)[index]) === "object" ? (
              handler(Object.values(data)[index])
            ) : (
              <ColorSelector>
                <span
                  style={{
                    display: "inline-block",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    border: "1px solid #eee",
                    marginRight: "10px",
                    background: color,
                  }}
                />
                <span>{color}</span>
                <input
                  type="color"
                  value={color}
                  onChange={handleChange}
                  style={{
                    position: "absolute",
                    left: "0",
                    opacity: "0",
                  }}
                />
              </ColorSelector>
            )}
          </div>
        );
      });
    } else {
      return data.map((children, index, arr) => {
        return (
          <div
            style={{
              display: "block",
              textIndent: "100px",
            }}
            key={index}
          >
            <h2>{`${splitCamelCase(`${Object.keys(children)}`)}`}</h2>
            {checkType(_.get(children, Object.keys(children)[0])) === "object"
              ? handler(_.get(children, Object.keys(children)[0], null))
              : _.get(children, Object.keys(children)[0], null)}
            <br />
          </div>
        );
      });
    }
  };
  return (
    <StyledContainer
      style={{
        display: "flex",
      }}
    >
      <StyledContent>{handler(data)}</StyledContent>
    </StyledContainer>
  );
}

export default ColorPicker;
