import { themeGet } from "@styled-system/theme-get";
import styled, { keyframes } from "styled-components";

const float = keyframes`
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-20px);
  }
  100% {
    transform: translatey(0px);
  }
`;

export const BannerWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-size: 100%;
  background-position: right top;
  background-repeat: no-repeat;
  background-color: ${themeGet("colors.white", "#ffffff")};
  background-size: cover;
  @media (max-width: 769px) {
    min-height: 160px;
    height: 100vh;
    padding-top: 45px;
  }
  @media (max-width: 990px) {
    min-height: 260px;
    height: 100vh;
    padding-top: 50px;
  }
  @media (max-width: 1050px) {
    min-height: 50vh;
  }
  @media (max-width: 1200px) {
    min-height: 70vh;
  }
  @media (max-width: 1400px) {
    min-height: 80vh;
  }
`;

export const BannerComponent = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;

  @media (min-width: 768px) {
    max-width: 750px;
    width: 100%;
  }
  @media (min-width: 992px) {
    max-width: 970px;
    width: 100%;
  }
  @media (min-width: 1200px) {
    max-width: 1170px;
    padding: 0px;
  }
  @media (min-width: 1400px) {
    padding: 0px;
    max-width: 1200px;
    width: 100%;
  }
`;

export const BannerContent = styled.div`
  width: 100%;
  padding-top: 170px;
  padding-bottom: 160px;
  @media (min-width: 1600px) {
    max-width: 40%;
    padding-top: 140px;
    padding-bottom: 100px;
  }
`;

export const HeadingWrapper = styled.h1`
  line-height: 1.6;
  font-weight: 700;
  color: #652e8d;
  letter-spacing: -2px;
  box-sizing: border-box;
  margin-top: 0px;

  @media only screen and (max-width: 1600px) {
    font-size: 40px;
    margin-bottom: 10px;
  }
`;
export const SubHeadingWrapper = styled.h3`
  line-height: 1.6;
  font-weight: 700;
  color: #652e8d;
  letter-spacing: -2px;
  box-sizing: border-box;
  margin-top: 0px;

  @media only screen and (max-width: 1600px) {
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

export const BannerCaption = styled.div`
  color: #ec7623;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 400;
  margin-bottom: 0px;
  box-sizing: border-box;
  margin-top: 0px;
`;

export const GetStarted = styled.div`
  display: flex;
  margin-top: 50px;
`;

export const FloatingImage = styled.img`
  position: fixed;
  bottom: -8px;
  right: 39%;
  width: 250px;
  animation: ${float} 6s ease-in-out infinite;
`;

export const Row = styled.div``;
export const ColLeft = styled.div``;
export const ColRight = styled.div``;
export const Text = styled.div``;
export const A = styled.div``;
export const Box = styled.div``;
export const Subtext = styled.div``;
export const Heading = styled.div``;
export const Title = styled.div``;
export const Number = styled.div``;
export const Container = styled.div``;
