import styled from "styled-components";

export const LayoutWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f2f2f2;
`;

export const ContentInnerWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0px 30px;
  overflow: hidden;
  overflow-y: auto;

  @media only screen and (max-width: 769px) {
    padding: 0px 15px;
  }
`;
