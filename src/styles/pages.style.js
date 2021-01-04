import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const SidebarSection = styled.div`
  background-color: ${themeGet("colors.white", "#ffffff")};
  width: 280px;

  @media (max-width: 990px) {
    display: none;
  }
`;

const ContentSection = styled.div`
  width: calc(100% - 280px);
  height: auto;
  min-height: 100vh;
  padding: 30px 30px 50px;

  @media (max-width: 768px) {
    padding: 30px 7.5px 100px;
  }

  @media (max-width: 1199px) and (min-width: 991px) {
    padding: 15px 30px 50px;
  }

  @media (max-width: 1367px) and (min-width: 1200px) {
    padding: 15px 30px 50px;
  }

  @media (max-width: 990px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding-top: 15px;
    min-height: auto;
  }

  .offer-slider {
    padding: 0 0 30px 30px;
  }
`;

export const MobileCarouselDropdown = styled.div`
  @media (min-width: 990px) {
    display: none;
  }
`;

const MainContentArea = styled.main`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: ${themeGet("colors.gray.200", "#f7f7f7")};
  padding-right: 0;
  transition: padding-right 0.35s ease-in-out;
`;
const Container = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  padding: 0;

  @media only screen and (max-width: 1289px) and (min-width: 960px) {
    position: relative;
    width: 960px;
    margin: 0 auto;
    padding: 0;
  }

  @media only screen and (max-width: 990px) and (min-width: 768px) {
    width: 768px;
  }
  @media (max-width: 769px) {
    width: 100%;
    padding: 0 15px;
  }
`;

const RowWrapper = styled.div`
  margin-top: 55px !important;
  margin-left: -15px;
  margin-right: -15px;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  /* border-bottom: 1px solid #363636; */
  &:before {
    content: " ";
    display: table;
  }
`;
export const RowContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  @media (max-width: 1280px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  justify-content: space-between;
`;

export const ReviewContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(223px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  justify-content: space-between;
`;

const Center = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 20px);
  /* left: -10px; */
  position: relative;
  align-items: center;
`;
const CategoryBox = styled.div`
  width: calc(25% - 20px);
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 0;
  text-align: left;
  padding: 25px;
  border-radius: 4px;
  transition: 0.35s;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 25%,
    rgba(255, 255, 255, 0.2)
  );
  background-color: #652e8d;
  margin: 10px;
  position: relative;
  box-sizing: border-box;
  color: #ec7623;
  @media (max-width: 1289px) {
    width: calc(33% - 20px);
  }
  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 480px) {
    width: calc(100% - 20px);
    margin-right: 0;
  }
  &:hover {
    background: #8661d8;
    box-shadow: 0 4px 12px rgba(38, 174, 97, 0.35);
    color: #fff;
  }
`;
const BoxIcon = styled.div`
  font-size: 36px;
  line-height: 32px;
  position: relative;

  svg {
    height: 42px;
    display: block;
    transition: 0.35s;
    margin-bottom: 2px;
    color: #c018e6;
  }
`;
const BoxCounter = styled.div`
  color: #ffffff;
  margin: 0 auto 0 0;
  transition: 0.35s;
  margin-bottom: 18px;
  display: inline-block;
  position: absolute;
  right: 25px;
  top: 50%;
  background: transparent !important;
  font-size: 48px;
  opacity: 0.48;
  font-weight: 500;
  transform: translateY(-50%);
`;
const BoxContent = styled.div`
  position: static;
  bottom: 30px;
  left: 34px;
  width: auto;
  z-index: 50;
  box-sizing: border-box;
`;

const JobsRow = styled.div`
  margin-top: 55px !important;
  margin-left: -15px;
  margin-right: -15px;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  &:after,
  &:after {
    content: " ";
    display: table;
  }
`;
const JobsLeftCol = styled.div`
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  position: relative;
  min-height: 1px;
  @media (min-width: 768px) {
    width: 66.66666667%;
    float: left;
  }
  /* div {
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    &:before {
      content: " ";
      display: table;
    }
    &:after {
      content: " ";
      display: table;
      clear: both;
    }
  } */
`;
const JobsRightCol = styled.div`
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  position: relative;
  min-height: 1px;

  @media (min-width: 768px) {
    width: 33.33333333%;
    float: left;
  }
  div {
    box-sizing: border-box;
    /* padding-left: 15px;
    padding-right: 15px; */
    /* width: 100%; */
    &:before {
      content: " ";
      display: table;
    }
    &:after {
      content: " ";
      display: table;
      clear: both;
    }
  }
`;
const RightWrapper = styled.div``;

const JobSpotlight = styled.div`
  position: relative;
  display: block;
  margin-top: 22px;
  ul {
    display: flex;
  }
  /* div {
    height: 540px;
  } */
`;
const SpotlightCard = styled.div`
  display: block;
  margin: 0 10px 0 10px;
  margin-bottom: 2px;
  width: 380px;
  float: left;
  height: 100%;
  min-height: 1px;
  color: #808080;
  margin-right: 13px;
  margin-bottom: 2px;
  font-size: 14px;
  background-color: #fdfdfd;
  border: 1px solid #e2e2e2;
  padding: 35px 38px 31px 38px;
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
  @media only screen and (max-width: 1289px) and (min-width: 768px) {
    width: 290px;
  }
  span {
    svg {
      color: #999;
      margin-right: 4px;
    }
  }
`;
const SpotlightName = styled.span`
  color: #808080;
  margin-right: 13px;
  margin-bottom: 2px;
  font-size: 14px;
`;
const SpotlightLocation = styled.span`
  color: #808080;
  margin-right: 13px;
  margin-bottom: 2px;
  font-size: 14px;
`;
const SpotlightRate = styled.span`
  color: #808080;
  margin-right: 13px;
  margin-bottom: 2px;
  font-size: 14px;
`;
const SpotlightSalary = styled.span`
  color: #808080;
  margin-right: 13px;
  margin-bottom: 2px;
  font-size: 14px;
`;

const LeftContent = styled.div`
  margin-bottom: 35px;
  position: relative;

  .full-time,
  .fulltime {
    color: #186fc9;
    border-left: 4px solid #186fc9;
    background-color: rgba(24, 111, 201, 0.07);
  }
  .internship,
  .Internship {
    color: #e1d123;
    border-left: 4px solid #e1d123;
    background-color: rgba(225, 209, 35, 0.07);
  }
  .temporary {
    color: #e12335;
    border-left: 4px solid #e12335;
    background-color: rgba(225, 35, 53, 0.07);
  }
  .part-time,
  .parttime {
    color: #f1630d;
    border-left: 4px solid #f1630d;
    background-color: rgba(241, 99, 13, 0.07);
  }
  .freelance,
  .volunteering,
  .Volunteering {
    color: #c018e6;
    border-left: 4px solid #c018e6;
    background-color: rgba(83, 180, 39, 0.07);
  }
  .gig,
  .Gig {
    color: #53b427;
    border-left: 4px solid #53b427;
    /* border: 1px solid #53b427; */
    background-color: rgba(83, 180, 39, 0.07);
  }

  ul {
    /* margin-bottom: 30px; */
    list-style: none;
    margin-left: 0px;
    li {
      padding: 0px;
      border-top: 0px;
      border: none;
      line-height: 24px;
      transition: 0.3s !important;
      z-index: auto !important;
      > div {
        @media (max-width: 768px) {
          display: none;
        }
      }
      section {
        border-radius: 4px 4px 0 0;
        display: flex;
        padding: 10px 25px;
        border-left: 4px solid #eee;
        transition: 0.3s;
        position: relative;
        overflow: hidden;
        border: 1px solid #e0e0e0;
        margin-top: -1px;
        width: auto;
        height: auto;
        color: #808080;
        .description {
          display: block;
          @media (max-width: 768px) {
            display: none;
          }
        }
        @media (max-width: 768px) {
          padding: 10px;
        }
      }
      a {
        border-radius: 4px 4px 0 0;
        display: flex;
        padding: 10px 25px;
        border-left: 4px solid #eee;
        transition: 0.3s;
        position: relative;
        overflow: hidden;
        border: 1px solid #e0e0e0;
        margin-top: -1px;
        width: auto;
        height: auto;
        color: #808080;
        .description {
          display: block;
          @media (max-width: 768px) {
            display: none;
          }
        }
        @media (max-width: 768px) {
          padding: 10px;
        }
      }
    }
  }
`;
const ListingLogo = styled.div`
  width: 60px;
  min-width: 60px;
  flex-wrap: wrap;
  float: none;
  margin: 0px;
  img {
    float: none;
    margin: 0px;
    padding: 0px;
    display: inline-block;
    border-radius: 3px;
    transform: translate3d(0, 0, 0);
    width: 60px;
    height: 60px;
  }
`;

const ListingTitle = styled.div`
  flex-wrap: wrap;
  padding-left: 25px;
  padding-right: 110px;
  width: 95%;

  @media (max-width: 768px) {
    padding: 0 10px;
    width: 85%;
  }
  h3 {
    @media (max-width: 768px) {
      padding: 0;
    }
  }
`;
const ListingIcons = styled.ul`
  padding: 0;
  margin: 0;
  font-size: 14px;
  list-style-type: circle;
  list-style-position: outside;
  list-style: none outside;
  width: 100%;
  li {
    padding: 0px;
    border-top: 0px;
    border: none;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    svg {
      color: #999;
      margin-right: 4px;
      font-size: 19px;
      position: relative;
      top: 2px;
      margin: 0 4px 0 0;
    }
  }
`;
const TypeList = styled.div`
  position: absolute;
  right: 25px;
  /* top: 50%; */
  transform: translateY(-50%);
  text-align: right;
  max-width: 220px;
  @media (max-width: 992px) {
    position: relative;
    right: 0;
    top: 0;
    transform: translateY(0);
    text-align: left;
    max-width: 100%;
    display: inline-flex;
    margin-top: 5px;
    margin-bottom: 2px;
  }
  @media (max-width: 768px) {
    zoom: 0.85;
  }
  .full-time {
    color: #186fc9;
    border: 1px solid #186fc9;
    background-color: rgba(24, 111, 201, 0.07);
  }
  .fulltime {
    color: #186fc9;
    border: 1px solid #186fc9;
    background-color: rgba(24, 111, 201, 0.07);
  }
  .internship,
  .Internship {
    color: #e1d123;
    border: 1px solid #e1d123;
    background-color: rgba(225, 209, 35, 0.07);
  }
  .temporary {
    color: #e12335;
    border: 1px solid #e12335;
    background-color: rgba(225, 35, 53, 0.07);
  }
  .part-time,
  .parttime {
    color: #f1630d;
    border: 1px solid #f1630d;
    background-color: rgba(241, 99, 13, 0.07);
  }
  .freelance,
  .volunteering,
  .Volunteering {
    color: #c018e6;
    border: 1px solid #c018e6;
    background-color: rgba(83, 180, 39, 0.07);
  }
  .gig,
  .Gig {
    color: #53b427;
    border: 1px solid #53b427;
    background-color: rgba(83, 180, 39, 0.07);
  }
`;
const ListSpan = styled.span`
  border-radius: 3px;
  font-size: 12px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  color: #888;
  padding: 4px 8px;
  line-height: 18px;
  font-weight: 500;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  text-align: center;
  min-width: 76px;
  margin: 2px 0 2px 4px;
`;

const UserComments = styled.div`
  margin-top: 55px !important;
  margin-left: -15px;
  margin-right: -15px;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px solid #363636;

  &:before,
  &::left {
    content: " ";
    display: table;
  }

  div {
    div {
      h3 {
        text-align: center;
        font-size: 24px;
        width: 100%;
        line-height: 32px;
        margin: 0 0 30px 0;
        margin-top: 0 !important;
        margin-bottom: 25px !important;
        span {
          font-size: 18px;
          line-height: 32px;
          margin-top: 25px;
          color: #888;
          font-weight: 300;
          display: block;
          /* padding: 0 28%; */
        }
      }
    }
  }
`;
const Comments = styled.div`
  overflow: hidden;
  width: 100%;
  margin-top: 20px !important;
  display: block;
  ul {
    display: flex;
  }
`;
const Comment = styled.div`
  @media (max-width: 1289px) {
    width: calc(33% - 20px);
  }

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 480px) {
    width: calc(100% - 20px);
    margin-right: 0;
  }
  width: 370px;
  opacity: 1;
  filter: none;
  pointer-events: all;
  display: block;
  transition: 0.4s;
  float: left;
  height: 100%;
  min-height: 1px;
  margin: 0 10px;
`;
const TestimonialBox = styled.div`
  background: #282828;
  color: #fff;
  border-radius: 6px;
  padding: 35px;
  text-align: center;
  position: relative;
  margin: 18px 0;
  box-shadow: none;
  transition: 0.4s;
`;

const Testimonial = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  margin-bottom: 0;
  &:before {
    position: absolute;
    margin: 0 auto;
    display: block;
    width: 100%;
    text-align: center;
    bottom: -9px;
    left: 0;
    content: "\f0dd";
    font-family: "FontAwesome";
    font-size: 42px;
    color: transparent;
    background-color: transparent;
    cursor: default;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 28px;
    margin-bottom: 0;
    margin: 0 0 15px 0;
  }
`;

const TestimonialAuthor = styled.div`
  img {
    width: 60px;
    display: block;
    text-align: center;
    height: auto;
    border-radius: 50%;
    margin: 0 auto;
    max-width: 100%;
  }
  h4 {
    display: block;
    width: 100%;
    font-size: 16px;
    line-height: 24px;
    padding: 0;
    margin-top: 15px;
    color: #333;
    font-weight: 600;
    text-align: center;
    span {
      display: block;
      color: #888;
      line-height: 24px;
      padding: 0;
      font-weight: 400;
      font-size: 14px;
    }
  }
`;

const H3 = styled.h3`
  text-align: left;
  margin-bottom: 25px !important;
  margin-top: 0 !important;
  font-weight: 400;
  font-size: 22px;
  transition: opacity 0.5s ease;
  overflow: hidden;
  padding-top: 30px !important;
  /* padding-bottom: 50px !important; */
`;

const H4 = styled.h4`
  text-align: left;
  letter-spacing: 0;
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 5px;
  color: #652e8d;
  margin-top: 2px;
  > span {
    float: right;
    text-align: right;
    font-size: 10px;
  }
`;
const Br = styled.br`
  margin-top: 50px !important;
  position: relative;
  left: -35.2px;
  box-sizing: border-box;
  width: 1010px;
  border-bottom: 1px solid #363636;
`;

const P = styled.p`
  margin-bottom: 3px;
  margin-top: 15px;
  margin: 18px 0px 3px;
`;

const BannerSection = styled.div``;

const ArticleWrapper = styled.div`
  width: 100%;
  display: block;

  @media (min-width: 768px) {
    display: flex;
    /* width: 33.33333333%; */
  }
`;
const Article = styled.article`
  border: none;
  margin-bottom: 15px;
  padding-bottom: 32px;
  display: block;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
`;
const Figure = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  display: block;
  svg {
    display: none;
    position: absolute;
    right: 0;
    bottom: -46px;
    color: #fff;
    font-size: 14px;
    width: 46px;
    height: 46px;
    background-color: #fff;
    border-radius: 0;
    opacity: 0;
    z-index: 99;
    visibility: hidden;
  }
  &:hover svg {
    display: inline-block;
    opacity: 1;
    visibility: visible;
    bottom: 30px;
  }
`;
const ArticleSection = styled.div`
  p {
    margin-top: 15px;
    margin: 0 0 15px 0;
  }
`;

export {
  ContentSection,
  Container,
  MainContentArea,
  SidebarSection,
  ArticleWrapper,
  Article,
  ArticleSection,
  Figure,
  BannerSection,
  RowWrapper,
  CategoriesContainer,
  SpotlightCard,
  CategoryBox,
  BoxCounter,
  TypeList,
  ListingLogo,
  ListingTitle,
  ListingIcons,
  BoxContent,
  LeftContent,
  ListSpan,
  BoxIcon,
  Center,
  JobsRow,
  JobsLeftCol,
  JobsRightCol,
  RightWrapper,
  JobSpotlight,
  SpotlightName,
  SpotlightLocation,
  SpotlightRate,
  SpotlightSalary,
  TestimonialAuthor,
  TestimonialBox,
  Testimonial,
  UserComments,
  Comments,
  Comment,
  P,
  H3,
  H4,
  Br,
};
