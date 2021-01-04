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
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export const Link = styled.a`
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  padding: 0 5px;
  &:hover {
    color: #652e8d;
    transition: 200ms ease-in;
  }
  svg {
    font-size: 18px;
    margin-right: 16px;
  }
`;
export const Text = styled.p`
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  svg {
    font-size: 18px;
    margin-right: 16px;
  }
`;

export const Title = styled.p`
  color: #fff;
  margin-bottom: 20px;
  font-weight: 700;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  will-change: transform;
`;

export const CardTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
`;

export const CardBody = styled.div`
  margin-top: 27px;
  margin-bottom: 27px;
  line-height: 1.2;
  font-size: 13px;
  @media screen and (min-width: 576px) {
    font-size: 18px;
  }
`;

export const ImageContainer = styled.div`
  margin-top: auto;
  padding-top: 27px;
  padding-bottom: 18px;
  @media screen and (min-width: 576px) {
    padding-bottom: 30px;
  }

  img {
    width: 100%;
  }
`;

export const ImageInnerConatiner = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 250px;
`;

export const Ratio = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
`;

export const RatioInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
