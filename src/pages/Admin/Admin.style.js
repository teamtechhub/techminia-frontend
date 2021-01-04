import styled from "styled-components";

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
