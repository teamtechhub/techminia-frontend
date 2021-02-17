import styled from "styled-components";
import Button from "components/Button/Button";

export const Container = styled.div`
  // position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
  margin: 0 auto;
  // z-index: 1;
  align-items: center !important;

  box-sizing: border-box;
`;

export const Row = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  bottom: 20px;
  background: #fff;
`;

export const Col = styled.div`
  position: relative;
  width: 100%;
  padding: 5px;
`;
export const Btn = styled(Button)`
  &:hover : {
    transform: translateY(-3px);
    box-shadow: 0 1rem 2rem rgb(0 0 0 / 20%);
  }
  transition: all 0.2s;
`;
