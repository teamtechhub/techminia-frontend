import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ImageHeader = styled.div`
  max-height: 25vh;
  max-width: 100vw;
  height: 192.5px;
  width: 100%;
  background-color: #fff;

  background-size: cover;
  background-position: center;

  border: 1px solid #dadce0;
`;

export const ForumSidebar = styled.div`
  float: left;
  //   width: 350px;
  margin-right: 20px;
  @media (max-width: 991px) {
    float: none;
    width: 100% !important;
    margin: 0;
  }
`;

export const ForumCard = styled.div`
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

export const ForumCardBody = styled.div`
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
export const ForumContent = styled.div`
  overflow: hidden;
  @media (max-width: 991px) {
    overflow: visible;
  }
`;
export const ForumCardHead = styled.div`
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
