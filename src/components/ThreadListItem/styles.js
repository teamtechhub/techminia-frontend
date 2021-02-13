import styled from "styled-components";

export const CounterText = styled.div`
  font-size: 0.7rem;
`;

export const Row = styled.div`
  background: #f8f8f8;
  padding: 10px;
  @media (min-width: 710px) {
    display: flex;
  }
  @media (max-width: 710px) {
    display: block;
  }
`;
export const Counter = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  margin-left: auto;
`;

export const ListItem = styled.li`
  width: 100%;
  margin: 5px;
`;
export const Col = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
