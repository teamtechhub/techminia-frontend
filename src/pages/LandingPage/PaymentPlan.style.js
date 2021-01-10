import styled from "styled-components";

export const Container = styled.div`
  clear: both;
  position: relative;
  padding: 30px 0;
  font-size: 14px;
  color: #fff;
  bottom: 0;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px;
  /* background: red; */
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 5px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  }
`;

export const Card = styled.div`
  position: relative;
  height: 300px;
  background: linear-gradient(
    180deg,
    rgb(236, 118, 35) 0%,
    rgb(101, 46, 141) 100%
  );
`;

export const Arrow = styled.span`
  width: 24px;
  height: 2px;
  display: block;
  position: absolute;
  top: calc(50% - 1px);
  left: -15px;
  background-color: rgb(253, 239, 0);
  transition: all 0.3s ease 0s;

  &:after,
  &:before {
    content: "";
    display: block;
    width: 10px;
    height: 2px;
    border-radius: 4px;
    position: absolute;
    right: 0px;
    transition: transform 0.2s ease 0.1s;
  }
  &:after {
    transform: rotate(0deg);
    transform-origin: 10px 2px;
  }
  &:before {
    transform: rotate(0deg);
    transform-origin: right top;
  }
`;

export const A = styled.a`
  overflow: hidden;
  height: 100%
  position: relative;
  box-shadow: rgba(25, 25, 25, 0.19) 0px 30px 70px 10px;

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 130px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.82));
    transition: all 0.3s ease 0s;
  }
  &:hover {
    &:after {
      height: 70%;
    }
    > img {
      transform: scale(1.03);
    }
    > button {
      color: rgb(253, 239, 0);
      > span {
        width: 28px;
        left: calc(100% + 10px);
        border-radius: 4px;

        &:before {
          transform: rotate(-42deg);
          transform-origin: right top;
          background: linear-gradient(
            90deg,
            rgb(236, 118, 35) 0%,
            rgb(101, 46, 141) 100%
          );
        }
        &:after {
          transform: rotate(42deg);
          transform-origin: 10px 2px;
          background: linear-gradient(
            90deg,
            rgb(236, 118, 35) 0%,
            rgb(101, 46, 141) 100%
          );
        }
      }
    }
  }
`;

export const Amount = styled.div`
  margin: auto;
  width: 50%;
  text-align: center;
  display: block;
  max-width: 100%;
  height: auto;
  box-sizing: border-box;
  transform: scale(1);
  transition: all 0.3s ease 0s;
  padding: 70px 0;
  > h1 {
    color: #fff;
    font-size: 4rem;
    font-weight: 700;
  }
  > p {
    color: #fff;
  }
`;

export const PaymentButton = styled.button`
    border: 0px;
    padding: 0px;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    bottom: 35px;
    left: 35px;
    font-size: 22px;
    font-weight: 600;
    text-transform: capitalize;
    color: rgb(198, 198, 198);
    z-index: 2;

    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    transition: all 0.3s ease 0s;
    @media only screen and (max-width: 1200px) {
      font-size: 16px;
    }
    
    @media only screen and (max-width: 1440px) {
        font-size: 18px;
    }

}`;
