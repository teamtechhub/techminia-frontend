import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

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
    @media (max-width: 768px) {
    }
    button {
      @media (min-width: 710px) {
        float: right;
      }

      @media (max-width: 768px) {
      }
    }
  }

  @media (min-width: 710px) {
    padding: 25px 40px;
  }
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const FormWrapper = styled.div`
  margin: 0;
  padding: 0;
  color: #333;
  display: block;
  > div {
    margin: 0 20px;
    @media (max-width: 768px) {
      margin: 0;
    }
  }
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

export const Heading = styled.h3`
  color: ${themeGet("colors.primary", "#6c3a1f")};
  margin-bottom: 10px;
  font-family: "Playfair Display", sans-serif;
  font-size: ${themeGet("fontSizes.4", "21")}px;
  font-weight: ${themeGet("fontWeights.6", "700")};
`;

export const SubHeading = styled.span`
  /* margin-bottom: 30px; */
  font-family: "Lato", sans-serif;
  font-size: ${themeGet("fontSizes.2", "15")}px;
  font-weight: ${themeGet("fontWeights.3", "400")};
  color: ${themeGet("colors.darkRegular", "#77798c")};
  display: block;
`;
export const OfferSection = styled.div`
  padding: 20px;
  background-color: ${themeGet("colors.lightColor", "#F7F7F7")};
  color: ${themeGet("colors.primary", "#6c3a1f")};
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
    color: ${themeGet("colors.darkBold", "#6c3a1f")};
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
  color: ${themeGet("colors.primary", "#6c3a1f")};
  text-decoration: underline;
  cursor: pointer;
`;

export const Header = styled.header`
  text-align: center;
  min-height: 50px;
  overflow: hidden;
  position: relative;
  display: block;
  width: 100%;
  @media (min-width: 710px) {
    padding: 25px 40px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const ContainerView = styled.section`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  @media (min-width: 710px) {
    padding: 25px 40px;
  }
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const Row = styled.div`
  margin-right: -15px;
  margin-left: -15px;

  @media (min-width: 710px) {
    display: flex;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Col12 = styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
  @media (min-width: 992px) {
    float: left;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
  img {
    border-radius: 50%;
    border: 5px solid #fff;
    box-shadow: 2px 2px #000;
    display: inline-block !important;
    height: 120px;
    width: 120px;
    @media (max-width: 768px) {
      border-radius: 50%;
      border: 5px solid #fff;
      box-shadow: 2px 2px #000;
      max-width: 50px;
      height: 50px;
      margin: 15px;
    }
  }
`;
export const Col8 = styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
  @media (min-width: 992px) {
    width: 66.66666667%;
  }
  @media (min-width: 992px) {
    float: left;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    float: left;
  }
`;
export const Col4 = styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;

  width: 100%;
  @media (min-width: 992px) {
    width: 33.33333333%;
  }
  @media (min-width: 992px) {
    float: left;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    float: left;
  }
`;
export const Col6 = styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
  @media (min-width: 992px) {
    width: 50%;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
`;

export const About = styled.div`
  background: #fff;
  box-shadow: 0px 1px 5px rgba(50, 50, 50, 0.08);
  padding: 40px;
  display: block;
  @media (min-width: 768px) {
    min-height: 330px;
  }
`;
export const ProfileDetails = styled.div`
  padding: 40px;
  display: block;
  .tm-title {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    .tm-title {
      font-size: 13px;
    }
    padding: 0px 15px;
    font-size: 12px;
  }
`;

export const Accent = styled.div`
  font-family: "Proxima Bold";
  line-height: 14px;
  color: #60a9f0;
`;
export const Skills = styled.div`
  background: #652e8d;
  color: #f5f5f5;
  padding: 40px;
  display: block;
  @media (min-width: 768px) {
    min-height: 330px;
  }
`;

export const Education = styled.div`
  background: #652e8d;
  color: #f5f5f5;
  padding: 40px;
  display: block;
  @media (min-width: 768px) {
    min-height: 330px;
  }
`;

export const EducationTitle = styled.h4`
  font-family: "Proxima Bold";
  line-height: 14px;
  color: #60a9f0;
`;

export const Languages = styled.div`
  background: #fff;
  box-shadow: 0px 1px 5px rgba(50, 50, 50, 0.08);
  padding: 40px;
  display: block;
  @media (min-width: 768px) {
    min-height: 330px;
  }
`;
export const Contact = styled.div`
  box-shadow: 0px 1px 5px rgba(50, 50, 50, 0.08);
  padding: 40px;
  display: block;
  background: #652e8d;
  color: #f5f5f5;
  @media (min-width: 768px) {
    min-height: 330px;
  }
`;

export const Experience = styled.div`
  background: #652e8d;
  color: #f5f5f5;
  padding: 40px;
  display: block;
  @media (min-width: 768px) {
    min-height: 330px;
  }
`;

export const Footer = styled.footer`
  color: #f9f9f9;
  text-align: center;
  padding-top: 140px;
  padding-bottom: 100px;
  display: block;
`;

export const SocialIcons = styled.ul`
  padding: 0;
  margin: 0;

  li {
    display: inline-block;
    list-style: none;
    a {
      background: #666666;
      /* border-radius: 50%; */
      color: #fff;
      text-decoration: none;
      font-size: 18px;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      transition: all 0.4s ease-in;
      position: relative;
      bottom: 10px;
      top: 10px;
      padding: 5px;
      svg {
      }
    }
  }
`;

export const ImageContainer = styled.div``;
