import styled, { keyframes } from "styled-components";

const clockwise = keyframes`
0%{ transform: rotate(0deg);}
  100%{ transform: rotate(360deg);}
  `;
const anticlockwise = keyframes`
0%{ transform: rotate(360deg);}
100%{ transform: rotate(0deg);}
`;
const clockwiseError = keyframes`
0%{ transform: rotate(0deg);}
20%{ transform: rotate(30deg);}
40%{ transform: rotate(25deg);}
60%{ transform: rotate(30deg);}
100%{ transform: rotate(0deg);}
`;
const anticlockwiseErrorStop = keyframes`
0%{ transform: rotate(0deg);}
  20%{ transform: rotate(-30deg);}
  60%{ transform: rotate(-30deg);}
  100%{ transform: rotate(0deg);}
`;

const anticlockwiseError = keyframes`
0%{ transform: rotate(0deg);}
  20%{ transform: rotate(-30deg);}
  40%{ transform: rotate(-25deg);}
  60%{ transform: rotate(-30deg);}
  100%{ transform: rotate(0deg);}`;

export const Gears = styled.div`
  position: relative;
  margin: 0 auto;
  width: auto;
  height: 0;
`;

export const Gear = styled.div`
  position: relative;
  z-index: 0;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  background: #652e8d;
  &:before {
    position: absolute;
    left: 5px;
    top: 5px;
    right: 5px;
    bottom: 5px;
    z-index: 2;
    content: "";
    border-radius: 50%;
    background: white;
  }
  &:after {
    position: absolute;
    left: 25px;
    top: 25px;
    z-index: 3;
    content: "";
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 5px solid #652e8d;
    box-sizing: border-box;
    background: white;
  }
  &.one {
    left: -130px;
    animation: ${anticlockwiseErrorStop} 2s linear;
  }
  &.two {
    top: -75px;
    animation: ${anticlockwiseError} 2s linear infinite;
  }
  &.three {
    top: -235px;
    left: 130px;
    animation: ${clockwiseError} 2s linear infinite;
  }
`;
export const Bar = styled.div`
  position: absolute;
  left: -15px;
  top: 50%;
  z-index: 0;
  width: 150px;
  height: 30px;
  margin-top: -15px;
  border-radius: 5px;
  background: #652e8d;

  &:before {
    position: absolute;
    left: 5px;
    top: 5px;
    right: 5px;
    bottom: 5px;
    z-index: 1;
    content: "";
    border-radius: 2px;
    background: white;
  }
  &:nth-child(2) {
    transform: rotate(60deg);
    transform: rotate(60deg);
  }
  &:nth-child(3) {
    transform: rotate(120deg);
    transform: rotate(120deg);
  }
`;
export const H1 = styled.h1`
  margin: 10px auto 0 auto;
  color: #ec7623;
  font-family: "Encode Sans Semi Condensed", Verdana, sans-serif;
  font-size: 4rem;
  line-height: 6rem;
  font-weight: 200;
  text-align: center;
  -webkit-transition: opacity 0.5s linear, margin-top 0.5s linear; /* Safari */
  transition: opacity 0.5s linear, margin-top 0.5s linear;
`;
export const H2 = styled.h2`
  margin: 5px auto 30px auto;
  font-family: "Encode Sans Semi Condensed", Verdana, sans-serif;
  font-size: 1.5rem;
  font-weight: 200;
  text-align: center;
  -webkit-transition: opacity 0.5s linear, margin-top 0.5s linear; /* Safari */
  transition: opacity 0.5s linear, margin-top 0.5s linear;
`;
export const Wrapper = styled.div`
  background: #fff;
  height: 100vh;

  /* &.loading ${H1}, &.loading ${H2} {
    margin-top: 0px;
    opacity: 0;
  } */
  &.loading ${Gear}&.one, &.loading ${Gear}&.three {
    animation: ${clockwise} 3s linear infinite;
  }
  &.loading ${Gear}&.two {
    animation: ${anticlockwise} 3s linear infinite;
  }
`;
