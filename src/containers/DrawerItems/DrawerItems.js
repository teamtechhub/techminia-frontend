import React, { useCallback } from "react";
import styled from "styled-components";
import Drawer from "components/Drawer/Drawer";
import { CloseIcon } from "components/AllSvgIcon";
import {
  useDrawerState,
  useDrawerDispatch,
} from "contexts/drawer/drawer.provider";
// import AuthenticationForm from "containers/Authentication/Form";
// import Sidebar from "layouts/Dashboard/Sidebar/Sidebar";

const CloseButton = styled.button`
  color: black;
  line-height: 1.2;
  outline: 0;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: -30px;
  right: auto;
  cursor: pointer;
  background-color: #ffffff;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  @media only screen and (max-width: 769px) {
    left: auto;
    right: 30px;
    top: 29px;
  }
`;

/** Components Name Constants */
// const DRAWER_COMPONENTS = {
//   AUTHENTICATION_FORM: AuthenticationForm,
//   SIDEBAR: Sidebar,
// };

export default function DrawerItems() {
  const isOpen = useDrawerState("isOpen");
  const drawerComponent = useDrawerState("drawerComponent");
  const data = useDrawerState("data");
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  if (!drawerComponent) {
    return null;
  }
  // const SpecificContent = DRAWER_COMPONENTS[drawerComponent];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      overrides={{
        Root: {
          style: {
            zIndex: 2,
          },
        },
        DrawerBody: {
          style: {
            marginTop: "80px",
            marginLeft: "60px",
            marginRight: "60px",
            marginBottom: "30px",
            "@media only screen and (max-width: 769px)": {
              marginTop: "80px",
              marginLeft: "30px",
              marginRight: "30px",
              marginBottom: "30px",
            },
          },
        },
        DrawerContainer: {
          style: {
            width: "70vw",
            backgroundColor: "#a17fb9",
            "@media only screen and (max-width: 769px)": {
              width: "100%",
            },
          },
        },
        Close: {
          component: () => (
            <CloseButton onClick={closeDrawer}>
              <CloseIcon width="6px" height="6px" />
            </CloseButton>
          ),
        },
      }}
    >
      {/* <SpecificContent onClose={closeDrawer} data={data} /> */}
      {data}
    </Drawer>
  );
}
