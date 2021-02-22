import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import Buttons from "components/Button/Button";
import pic from "images/login-1.png";

export const Button = styled(Buttons)`
  &.google {
    background-color: #4285f4;
  }

  &.facebook {
    background-color: #4267b2;
    margin-bottom: 10px;
  }
`;

export const Wrapper = styled.div`
  text-align: center;
  background-color: ${themeGet("colors.white", "#ffffff")};
  margin: auto;
  margin-top: 5px;
`;

export const Container = styled.div`
  padding: 10px 15px 0;

  @media (max-width: 768px) {
    padding: 10px 10px 0;
  }
`;

export const LogoWrapper = styled.div`
  margin-bottom: 20px;

  img {
    max-width: 160px;
  }
`;

export const Heading = styled.h3`
  margin-bottom: 10px;
  font-family: ${themeGet("fonts.heading", "sans-serif")};
  font-size: ${themeGet("fontSizes.lg", "21")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.primary.regular", "#652e8d")};
`;

export const SubHeading = styled.span`
  margin-bottom: 30px;
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  display: block;
`;

export const OfferSection = styled.div`
  padding: 20px;
  background-color: ${themeGet("colors.gray.200", "#F7F7F7")};
  color: ${themeGet("colors.primary.regular", "#652e8d")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Offer = styled.p`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  margin: 0;
`;

export const HelperText = styled.p`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  margin: 0;
  text-align: center;
  width: 100%;

  a {
    font-weight: ${themeGet("fontWeights.bold", "700")};
    color: ${themeGet("colors.blue.link", "#4285f4")};
    text-decoration: underline;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
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
  margin-bottom: 10px;

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
`;

export const Divider = styled.div`
  padding: 15px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    font-family: ${themeGet("fonts.body", "Lato")};
    font-size: ${themeGet("fontSizes.base", "15")}px;
    font-weight: ${themeGet("fontWeights.3", "400")};
    color: ${themeGet("colors.text.bold", "#652e8d")};
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
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.primary.regular", "#652e8d")};
  text-decoration: underline;
  cursor: pointer;
`;

export const LeftPreview = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: url(${pic});
  background-repeat: no-repeat;
  background-size: 100% 100%;

  @media (max-width: 900px) {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 30px 47px 40px 30px;
    order: 0;
    display: none;
  }

  img {
    width: 100%;

    @media (max-width: 900px) {
      min-width: auto !important;
    }
  }
`;

export const ModalClose = styled.button`
  position: fixed;
  top: 20px;
  right: 15px;
  padding: 10px 15px;
  z-index: 1;

  cursor: pointer;
  display: block;
  color: rgba(0, 0, 0, 0.5);
  background: transparent;
  border: 0;
  outline: none;
  display: inline-block;
  svg {
    width: 12px;
    height: 12px;
  }
  @media (max-width: 769px) {
    top: 5px;
    right: 0;
  }
`;

export const AuthSection = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  width: 70%;
  max-width: 100%;
  top: 100px;
  display: flex;
  margin: auto;
  min-height: 600px;
  @media (max-width: 610px) {
    min-height: 85vh;
    padding: 10px;
    width: 100%;
  }
`;

export const AuthWrapper = styled.div`
  padding: 80px 10px 30px;
  background: #652e8c;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  min-height: 100vh;
`;
