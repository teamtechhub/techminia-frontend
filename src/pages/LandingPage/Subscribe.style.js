import styled from "styled-components";

export const Section = styled.section`
  background-color: #ec762380;
  padding: 75px 0px;
  position: relative;
  z-index: 0;
`;

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px;
`;

export const SubscribeFooter = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  padding: 60px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  > div {
    width: calc(50%);
    @media only screen and (max-width: 1023px) {
      width: 100%;
    }
  }
  @media only screen and (max-width: 1023px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  margin-right: 70px;
  > div {
    width: calc(50%);
    @media only screen and (max-width: 1023px) {
      width: 100%;
    }
  }
  h3 {
    font-weight: 700;
    font-size: 30px;
    line-height: 55px;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }
  p {
    color: rgb(52, 61, 72);
    font-size: 16px;
    line-height: 30px;
  }

  @media only screen and (max-width: 1023px) {
    margin-right: 0px;
  }
`;

export const FormSect = styled.div`
  > div {
    display: flex;
  }
  label {
    display: none;
  }
`;
export const H3 = styled.h3`
  box-sizing: border-box;
  margin-top: 0px;
  margin-bottom: 1rem;
  font-weight: bold;
`;

export const P = styled.p`
  box-sizing: border-box;
  margin-top: 0px;
  margin-bottom: 1rem;
`;

export const Form = styled.div``;
