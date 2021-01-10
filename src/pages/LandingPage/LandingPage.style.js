import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const Site = styled.div`
  z-index: 1000;
  position: relative;
  // margin: 0 20px;
  // @media (max-width: 1600px) {
  //   margin-right: 20px;
  // }
`;
export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
  margin: 0 auto;
  z-index: 1;
  align-items: center !important;
  justify-content: flex-end !important;
  display: flex !important;
  box-sizing: border-box;

  //   @media (min-width: 992px) {
  //     max-width: 960px;
  //   }
  //   @media (min-width: 768px) {
  //     max-width: 720px;
  //   }
  //   @media (min-width: 576px) {
  //     max-width: 540px;
  //   }
`;
export const Row = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  bottom: 20px;
`;
export const ColLeft = styled.div`
  position: relative;
  width: 100%;
  padding: 15px;
  background: #26253378;
  // border: 4px solid #262533d6;

  @media (min-width: 768px) {
    flex: 0 0 41.66667%;
    max-width: 41.66667%;
  }
`;

export const ColRight = styled.div`
  margin-left: auto !important;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  @media (min-width: 768px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }
`;
export const Title = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 30px;
`;

export const Text = styled.div`
  margin-bottom: 3rem !important;
  color: #b9b9b9;
`;
export const A = styled.a`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  position: relative;
  padding-right: 20px;
  color: #652e8d;
`;
export const Box = styled.div`
  border: 4px solid #262533d6;
  padding: 40px;
  position: relative;
  background: #26253378;
  // background: #262533;
  &:before {
    z-index: -1;
    content: "";
    position: absolute;
    top: -31px;
    left: -31px;
    width: 100%;
    height: 100%;
    background: #f9cc4196;
  }
`;

export const Heading = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 30px;
`;
export const Subtext = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  line-height: 1;
  position: relative;
  margin-bottom: 30px;
  display: block;
`;
export const Number = styled.div`
  font-size: 5rem;
  color: #fff;
  font-weight: bold;
  position: relative;
  &:before {
    right: 0;
    z-index: 1;
    position: absolute;
    content: "";
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #f9cc4196;
  }
  > span {
    position: relative;
    z-index: 2;
  }
`;
const BannerWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-size: 100%;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-color: #f7f7f7;
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

const BannerComponent = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .banner-search {
    @media (max-width: 990px) {
      display: none;
    }
  }
`;

const BannerHeading = styled("h1")`
  font-family: ${themeGet("fontFamily.1", "sans-serif")};
  font-size: ${themeGet("fontSizes.7", "60")}px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 15px;
  text-align: center;

  @media (max-width: 1400px) {
    font-size: ${themeGet("fontSizes.7", "60")}px;
  }
  @media (max-width: 990px) {
    font-size: ${themeGet("fontSizes.6", "45")}px;
  }
  @media (max-width: 769px) {
    font-size: 30px;
  }
`;

const BannerSubHeading1 = styled("h3")`
  font-family: ${themeGet("fontFamily.1", "sans-serif")};
  font-size: ${themeGet("fontSizes.5", "30")}px;
  font-weight: 500;
  font-style: italic;
  color: #fff;
  margin-bottom: 15px;
  text-align: center;

  @media (max-width: 1400px) {
    font-size: ${themeGet("fontSizes.5", "30")}px;
  }
  @media (max-width: 990px) {
    font-size: ${themeGet("fontSizes.5", "30")}px;
  }
  @media (max-width: 769px) {
    font-size: 20px;
  }
`;

const BannerSubHeading = styled("span")`
  font-family: ${themeGet("fontFamily.0", "sans-serif")};
  font-size: ${themeGet("fontSizes.3", "19")}px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 1400px) {
    font-size: ${themeGet("fontSizes.2", "21")}px;
  }
  @media (max-width: 990px) {
    display: none;
  }
`;

export const AreaHeading = styled.div`
  margin-bottom: 25px;
  text-align: center;
  > p {
    font-size: 12px;
    color: #ec7623;
    font-weight: 700;
    margin-bottom: 30px;
    text-transform: uppercase;
    margin-top: 0;
  }
  > h3 {
    line-height: 1.2;
    font-size: 45px;
    position: relative;
    font-weight: 700;
    color: #652e8d;
  }
`;

export {
  BannerWrapper,
  BannerHeading,
  BannerSubHeading,
  BannerSubHeading1,
  BannerComponent,
};
