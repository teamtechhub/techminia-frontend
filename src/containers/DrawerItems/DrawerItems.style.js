import { styled } from "styled-components";

export const Form = styled.form`
  /* minHeight: 100vh; */
  background-color: blue;
  padding-bottom: 100px;
`;

export const DrawerTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -55px 0 30px;
  position: fixed;
`;

export const DrawerTitle = styled.h3`
  margin: 0;
  color: black;
`;

export const FieldDetails = styled.span`
  padding: 28px 0 15px;
  color: black;
  display: block;

  @media only screen and (max-width: 991px) {
    padding: 30px 0;
  }
`;

export const ButtonGroup = styled.div`
  padding: 30px 60px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 769px) {
    padding: 20px 30px;
  }
`;
