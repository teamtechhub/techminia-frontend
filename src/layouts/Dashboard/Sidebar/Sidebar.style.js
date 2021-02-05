import styled from "styled-components";
import { NavLink as NavLinks } from "react-router-dom";

import css from "@styled-system/css";
import { animated } from "react-spring";

export const SidebarWrapper = styled.div`
  width: 270px;
  height: auto;
  display: flex;
  flex-shrink: 0;
  color: $fff;
  flex-direction: column;

  @media only screen and (max-width: 769px) {
    /* width: "calc(100% - 65px)"; */
    width: auto;
    padding: 0;
    height: 100%;
  }
`;

export const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 45px 0;
  overflow-y: auto;

  @media only screen and (max-width: 769px) {
    padding: 20px 0;
    alignitems: "flex-start";
  }
`;

export const NavLink = styled(NavLinks)`
  // width: calc(100% - 30px);
  outline: 0;
  color: black;
  display: flex;
  align-items: center;
  left: 0;
  padding: 5px 30px;
  text-decoration: none;
  transition: 0.15s ease-in-out;

  @media only screen and (max-width: 769px) {
    width: 100%;
    padding: 3px 35px;
  }
`;

export const Svg = styled.span`
  width: 16px;
  margin-right: 15px;
  display: flex;
  align-items: center;
`;
export const LogoutBtn = styled.button`
  width: calc(100% - 30px);
  outline: 0;
  color: black;
  background-color: transparent;
  border: 0;
  display: flex;
  align-items: center;
  padding: 20px 55px 20px 30px;
  text-decoration: none;
  transition: 0.15s ease-in-out;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: 25px;
  cursor: pointer;

  @media only screen and (max-width: 769px) {
    width: 100%;
    padding: 20px 35px;
  }
`;

export const LogoImage = styled.img`
  display: block;
  backface-visibility: hidden;
  max-width: 150px;
  max-height: 50px;
  z-index: 1000;
  top: 12px;
  position: absolute;
  left: 33px;
`;

export const Header = styled.header(
  (props) =>
    css({
      fontSize: props.depth === "parent" ? [15] : [12],
      // fontWeight: 6,
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
          : "#ec7323",
      cursor: "pointer",
      transition: "0.15s ease-in-out",

      "&:hover": {
        color: "primary",
      },
    }),
  {
    padding: "5px 0",
    outline: 0,
  }
);

export const IconWrapper = styled.div(
  (props) =>
    css({
      width: props.depth === "child" ? 8 : 10,
      marginRight: props.depth === "child" ? 0 : 15,
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
      marginBottom: props.depth === "parent" ? "0" : "5px",
      marginTop: props.depth === "parent" ? "5px" : "5px",
      paddingLeft: props.depth === "child" ? 32 : 0,
    }),
  {
    position: "relative",

    // overflowX: "hidden",
  }
);
