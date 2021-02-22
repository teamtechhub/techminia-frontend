import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import Buttons from "components/Button/Button";

export const CardWrapper = styled.div`
  margin: 30px 0 0 0;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  background: #fff;
  padding: 0;

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    padding: 15px 30px;
    color: #333;
    background-color: #fff;
    display: block;
    border-bottom: 1px solid #eaeaea;
    border-radius: 4px 4px 0 0;
  }

  @media (min-width: 710px) {
    padding: 25px 40px;
  }
  @media (max-width: 710px) {
    padding: 0;
  }
`;

export const FormWrapper = styled.div`
  margin: 0;
  padding: 15px 30px;
  color: #333;
  display: block;
  > div {
    margin: 0 20px;
    @media (max-width: 710px) {
      margin: 0;
    }
  }
`;

export const Button = styled(Buttons)`
  &.google {
    background-color: #4285f4;
  }

  &.facebook {
    background-color: #4267b2;
    margin-bottom: 10px;
  }
`;
export const Btn = styled(Buttons)`
  &:hover : {
    transform: translateY(-3px);
    box-shadow: 0 1rem 2rem rgb(0 0 0 / 20%);
  }
  transition: all 0.2s;
`;
export const Wrapper = styled.div`
  text-align: center;
  background-color: #ffffff;
`;

export const Container = styled.div`
  padding: 40px 60px 0;

  @media (max-width: 768px) {
    padding: 40px 30px 0;
  }
`;

export const LogoWrapper = styled.div`
  margin-bottom: 30px;

  img {
    max-width: 160px;
  }
`;

export const Heading = styled.h3`
  color: ${themeGet("colors.primary", "#652e8d")};
  margin-bottom: 10px;
  font-family: "Playfair Display", sans-serif;
  font-size: ${themeGet("fontSizes.4", "21")}px;
  font-weight: ${themeGet("fontWeights.6", "700")};
`;

export const SubHeading = styled.span`
  margin-bottom: 30px;
  font-family: "Lato", sans-serif;
  font-size: ${themeGet("fontSizes.2", "15")}px;
  font-weight: ${themeGet("fontWeights.3", "400")};
  color: ${themeGet("colors.darkRegular", "#77798c")};
  display: block;
`;

export const OfferSection = styled.div`
  padding: 20px;
  background-color: ${themeGet("colors.lightColor", "#F7F7F7")};
  color: ${themeGet("colors.primary", "#652e8d")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Offer = styled.p`
  font-family: "Lato", sans-serif;
  font-size: ${themeGet("fontSizes.2", "15")}px;
  font-weight: ${themeGet("fontWeights.3", "400")};
  margin: 0;
`;

export const HelperText = styled.p`
  font-family: "Lato", sans-serif;
  font-size: ${themeGet("fontSizes.1", "13")}px;
  font-weight: ${themeGet("fontWeights.3", "400")};
  color: ${themeGet("colors.darkRegular", "#77798c")};
  margin: 0;
  text-align: center;
  width: 100%;

  a {
    font-weight: 700;
    color: #4285f4;
    text-decoration: underline;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 6px;
  background-color: ${themeGet("colors.lightColor", "#F7F7F7")};
  border: 1px solid ${themeGet("colors.borderColor", "#E6E6E6")};
  font-family: "Lato", sans-serif;
  font-size: ${themeGet("fontSizes.2", "15")}px;
  font-weight: ${themeGet("fontWeights.3", "400")};
  color: ${themeGet("colors.darkBold", "#652e8d")};
  line-height: 19px;
  padding: 0 18px;
  box-sizing: border-box;
  transition: border-color 0.25s ease;
  margin-bottom: 10px;

  &:hover,
  &:focus {
    outline: 0;
  }

  &:focus {
    border-color: ${themeGet("colors.primary", "#652e8d")};
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
`;

export const Divider = styled.div`
  padding: 15px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    font-family: "Lato", sans-serif;
    font-size: ${themeGet("fontSizes.2", "15")}px;
    font-weight: ${themeGet("fontWeights.3", "400")};
    color: ${themeGet("colors.darkBold", "#652e8d")};
    line-height: 1;
    background-color: #ffffff;
    z-index: 1;
    position: relative;
    padding: 0 10px;
  }

  &::before {
    content: "";
    width: 100%;
    height: 1px;
    background-color: ${themeGet("colors.borderColor", "#E6E6E6")};
    position: absolute;
    top: 50%;
  }
`;

export const LinkButton = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
  box-shadow: none;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${themeGet("colors.primary", "#652e8d")};
  text-decoration: underline;
  cursor: pointer;
`;

export const WizardRightSideCard = styled.div`
  float: right;
  width: 350px;
  margin-left: 20px;
  @media (max-width: 991px) {
    float: none;
    width: 100% !important;
    margin: 0;
  }
`;
export const WizardLeftSideCard = styled.div`
  float: left;
  width: 350px;
  min-width: 350px;
  margin-right: 20px;
  @media (max-width: 991px) {
    float: none;
    width: 100% !important;
    margin: 0;
  }
`;

export const WizardCard = styled.div`
  position: relative;
  margin-bottom: 24px;
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
  min-height: 300px;

  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  .card-topline {
    border-top: 3px solid ${themeGet("colors.primary.regular", "#652e8d")};
  }
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
  @media (max-width: 991px) {
    min-height: 50px;
  }
`;
