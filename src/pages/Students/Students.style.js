import styled from "styled-components";
import css from "@styled-system/css";
import { animated } from "react-spring";

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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px;
  overflowy: hidden;
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

export const VideoPreview = styled.div`
  padding-bottom: 56.25%;
  position: relative;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(236, 118, 35, 1) 0%,
    rgba(101, 46, 141, 1) 100%
  );
  border-radius: 4px;
  border: 1px solid #dcdacb;
  overflow: hidden;
  .play-btn {
    width: 100%;
    height: 100%;
    opacity: 0;
    background-size: cover;
    position: absolute;
    z-index: 99;
    transition: ease 0.5s;
    > .icon {
      width: 4vw;
      height: 4vw;
      fill: #fff;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    display: block;
    transition: opacity linear 100ms;
  }
  &:hover {
    > div {
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
    }
  }
`;

export const Notes = styled.div`
  width: 100%;
  min-height: 100px;
  border-radius: 6px;
  background-color: #f7f7f7;
  border: 1px solid gray.500;
  font-family: DM Sans, sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #0d1136;
  line-height: 19px;
  padding: 0 18px;
  box-sizing: border-box;
  -webkit-transition: border-color 0.25s ease;
  transition: border-color 0.25s ease;
`;
export const Header = styled.header(
  (props) =>
    css({
      fontSize: props.depth === "parent" ? [17] : [15],
      fontWeight: 16,
      display: "flex",
      alignItems: "center",
      marginBottom: props.depth === "parent" ? 1 : 0,
      color:
        props.depth === "parent"
          ? props.open
            ? "primary"
            : "darkBold"
          : props.open
          ? "primary"
          : "darkRegular",
      cursor: "pointer",
      transition: "0.15s ease-in-out",

      "&:hover": {
        color: "primary",
      },
    }),
  {
    padding: " 0 5px",
    outline: 0,
  }
);

export const IconWrapper = styled.div(
  (props) =>
    css({
      width: props.depth === "child" ? 8 : 10,
      marginRight: props.depth === "child" ? "8px" : 15,
    }),
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
    // padding: 1,

    svg: {
      width: "100%",
      height: "auto",
    },
  }
);

export const Title = styled.span({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  overflow: "hidden",
});

export const Content = styled(animated.div)({
  willChange: "transform, opacity, height",
  borderLeft: 0,
  overflow: "hidden",
});

export const Frame = styled.div(
  (props) =>
    css({
      paddingBottom: props.depth === "parent" ? 15 : 10,
      paddingLeft: props.depth === "child" ? 32 : 0,
    }),
  {
    position: "relative",
    // borderRadius: "10px",
    background: "#ffffff2e",
    overflowX: "hidden",
  }
);
