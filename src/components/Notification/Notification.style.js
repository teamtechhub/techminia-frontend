import styled from "styled-components";

export const Header = styled.div`
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
`;

export const Heading = styled.span`
  color: green;
`;

export const ClearAll = styled.button`
  outline: 0;
  border: none;
  padding: 0;
  background-color: transparent;
  color: red;
  cursor: pointer;
`;

export const Body = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const Message = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid grey;
  cursor: pointer;
  &:last-child {
    border-bottom: 0;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
`;

export const Dot = styled.span`
  display: flex;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: grey;
  margin: 0 10px;
`;

export const Title = styled.span`
  color: black;
`;

export const Time = styled.span`
  color: black;
`;

export const Details = styled.p`
  margin: 0;
  color: black;
`;

export const Footer = styled.div`
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid black;
`;

export const FeedsButton = styled.button`
  outline: 0;
  border: none;
  padding: 0;
  background-color: transparent;
  color: black;
  cursor: pointer;
`;
