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
  // padding: 15px 30px;
  color: #333;
  display: block;
  > div {
    margin: 0 20px;
    @media (max-width: 710px) {
      margin: 0;
    }
  }
  form {
    > div {
      margin: 0 10px;
      max-width: 360px;
      label {
        display: table;
        margin: 0 10px;
      }
      input {
        //
      }
    }
  }
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
  @media (max-width: 710px) {
    display: flex;
  }
`;

export const Container = styled.section`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  @media (min-width: 710px) {
    padding: 25px 40px;
  }
  @media (max-width: 710px) {
    padding: 0;
  }
`;

export const Row = styled.div`
  margin-right: -15px;
  margin-left: -15px;

  @media (min-width: 710px) {
    display: flex;
  }
  @media (max-width: 710px) {
    display: block;
  }
`;

export const Col12 = styled.div`
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 30px;
  width: 100%;
  @media (min-width: 992px) {
    float: left;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
`;
export const Col8 = styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 30px;
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
  margin-top: 30px;
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
  margin-top: 30px;
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
  min-height: 330px;
  display: block;
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
  min-height: 330px;
  display: block;
`;

export const Education = styled.div`
  background: #652e8d;
  color: #f5f5f5;
  padding: 40px;
  min-height: 330px;
  display: block;
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
  min-height: 330px;
  display: block;
`;
export const Contact = styled.div`
  background: #fff;
  box-shadow: 0px 1px 5px rgba(50, 50, 50, 0.08);
  padding: 40px;
  min-height: 330px;
  display: block;
`;

export const Experience = styled.div`
  background: #652e8d;
  color: #f5f5f5;
  padding: 40px;
  min-height: 330px;
  display: block;
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

export const ProfileSidebar = styled.div`
  float: left;
  width: 350px;
  margin-right: 20px;
  @media (max-width: 991px) {
    float: none;
    width: 100% !important;
    margin: 0;
  }
`;

export const ProfileCard = styled.div`
  position: relative;
  margin-bottom: 24px;
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);

  display: flex;
  flex-direction: column;
  min-width: 0;
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
`;

export const ProfileCardBody = styled.div`
  padding: 10px 24px 14px 24px;
  position: relative;

  flex: 1 1 auto;
  min-height: 1px;
  &:last-child {
    border-radius: 0 0 2px 2px;
  }
  &:before,
  &:after {
    content: " ";
    display: table;
  }
`;

export const CardRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;

  .profile-stat {
    padding-bottom: 20px;
    border-bottom: 1px solid #f0f4f7;
  }
  .list-separated {
    margin-top: 10px;
    margin-bottom: 15px;
  }
`;

export const ProfilePic = styled.div`
  float: left;
  width: 100%;
  text-align: center;

  img {
    margin: 0px auto;
    width: 130px;
    padding: 3px;
    border: 3px solid rgb(210, 214, 222);
    border-radius: 50% 50% 50% 50%;
    vertical-align: middle;
    .img-responsive {
      display: block;
      max-width: 100%;
      height: auto;
    }
  }
`;

export const ProfileUserTitle = styled.div`
  text-align: center;
  margin-top: 5px;
`;

export const ProfileName = styled.div`
  font-size: 20px;
  margin-bottom: 2px;
  font-weight: bold;
  color: #3a405b;
`;
export const ProfileTitle = styled.div`
  color: #777777;
  font-size: 12px;
  margin-bottom: 5px;
`;

export const ListGroup = styled.ul`
  margin-top: 0;
  font-weight: 400;
  letter-spacing: 0;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
`;

export const Li = styled.li`
  display: block;
  border-left: 0px none;
  border-right: 0px none;
  border-radius: 0px 0px 0px 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: relative;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;
export const B = styled.b`
  font-weight: bolder;
`;

export const A = styled.a`
  float: right !important;
  &:not([href]) {
    color: inherit;
    text-decoration: none;
  }
`;

export const ProfileContent = styled.div`
  overflow: hidden;
  @media (max-width: 991px) {
    overflow: visible;
  }
`;
export const ProfileCardHead = styled.div`
  border-radius: 2px 2px 0 0;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
  padding: 2px;
  /* text-transform: uppercase; */
  color: #3a405b;
  font-size: 14px;
  font-weight: 600;
  line-height: 40px;
  min-height: 40px;

  .card-topline {
    border-top: 3px solid ${themeGet("colors.primary.regular", "#652e8d")};
  }
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  header {
    display: inline-block;
    padding: 11px 20px;
    vertical-align: middle;
    line-height: 17px;
    font-size: 20px;
  }
`;

export const ProfileDescription = styled.div`
  text-align: left;
  margin-top: 10px;
  margin-bottom: 25px;
`;

export const ProfileListCol = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 50%;
  max-width: 50%;
  @media (min-width: 576px) {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
`;

export const ProfileListTitle = styled.div`
  color: #7f90a4;
  font-size: 25px;
  text-align: center;
  text-transform: uppercase !important;
`;

export const ProfileListText = styled.div`
  color: ${themeGet("colors.primary.regular", "#652e8d")};
  font-size: 11px;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase !important;
`;

export const Ul = styled.ul`
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: 0;
  margin-top: 0;
  margin-bottom: 1rem;
  list-style: none outside none;
  padding: 0px;

  > li a {
    color: rgb(158, 158, 158);
    margin-bottom: 10px;
    display: block;
    text-decoration: none;
    &:not([href]) {
      color: inherit;
      text-decoration: none;
    }
    span {
      float: right !important;
    }
  }
`;
