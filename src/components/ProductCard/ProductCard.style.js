import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const DiscountPercent = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.white", "#ffffff")};
  line-height: 24px;
  background-color: ${themeGet("colors.yellow.regular", "#FFAD5E")};
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  display: inline-block;
  position: absolute;
  top: 15px;
  right: 15px;
  border-radius: ${themeGet("radii.medium", "12px")};
  z-index: 2;
`;

export const BookImageWrapper = styled.div`
  height: 275px;
  padding: 0;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  img {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
  }
  @media (max-width: 769px) {
    height: 215px;
  }
  ${DiscountPercent} {
    top: 0;
    right: 0;
  }
`;

export const BookInfo = styled.div`
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 769px) {
    padding: 15px 0px 0px;
  }
`;

export const ProductName = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  margin: 0 0 7px 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  display: block;
  &:only-child {
    margin: 0;
  }
  @media (max-width: 769px) {
    font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
    margin: 0 0 5px 0;
  }
`;

export const AuthorInfo = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  @media (max-width: 769px) {
    font-size: ${themeGet("fontSizes.sm", "13")}px;
  }
`;

export const DiscountedPrice = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")} px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.yellow.regular", "#FFAD5E")};
  font-style: italic;
  padding: 0 5px;
  position: relative;
  overflow: hidden;
  margin-bottom: 5px;
  margin-left: -4px;
  z-index: 2;
  &:before {
    content: "";
    width: 100%;
    height: 1px;
    display: inline-block;
    background-color: ${themeGet("colors.yellow.regular", "#FFAD5E")};
    position: absolute;
    top: 50%;
    left: 0;
  }
`;

export const BookCardWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
  background-color: ${themeGet("colors.white", "#ffffff")};
  position: relative;
  font-family: ${themeGet("fonts.body", "Lato")};
  border-radius: ${themeGet("radii.base", "6px")};
  cursor: pointer;
  @media (max-width: 769px) {
    padding: 15px;
  }
`;
