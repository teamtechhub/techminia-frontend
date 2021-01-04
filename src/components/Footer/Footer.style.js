import styled from "styled-components";

export const Container = styled.div`
  z-index: 1;

  clear: both;
  background: #313b3d;
  background-color: #ec7623;
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
  max-width: 1200px;
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
