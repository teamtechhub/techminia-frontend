import React from "react";
import useComponentSize from "utils/useComponentSize";
import Sidebar from "./Dashboard/Sidebar/Sidebar";
import Topbar from "./Dashboard/Topbar/Topbar";
import DrawerItems from "containers/DrawerItems/DrawerItems";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import {
  LayoutWrapper,
  ContentWrapper,
  ContentInnerWrapper,
} from "./Dashboard/Layout.style";
import { useDeviceType } from "utils/useDeviceType";
import styled from "styled-components";

const SidedbarDesktop = styled.div`
  @media only screen and (max-width: 1199px) {
    display: none;
  }
`;

const DashboardLayout = (props) => {
  let [topbarRef, { height }] = useComponentSize();
  let [sidebarRef, { width }] = useComponentSize();
  const { desktop } = useDeviceType();

  return (
    <DrawerProvider>
      <Topbar path={props.path} routes={props.routes} refs={topbarRef} />
      <LayoutWrapper
        style={{
          height: `calc(100vh - ${height}px)`,
        }}
      >
        {desktop ? (
          <>
            <SidedbarDesktop>
              <Sidebar
                refs={sidebarRef}
                style={{
                  height: `calc(100vh - ${height}px)`,
                }}
                path={props.path}
                {...props}
              />
            </SidedbarDesktop>
            <ContentWrapper
              style={{
                width: `calc(100% - ${width}px)`,
              }}
            >
              <ContentInnerWrapper>{props.children}</ContentInnerWrapper>
            </ContentWrapper>
          </>
        ) : (
          <ContentWrapper
            style={{
              width: "100%",
            }}
          >
            <h3>
              width: {width} , height: {height}
            </h3>
            <ContentInnerWrapper>{props.children}</ContentInnerWrapper>
          </ContentWrapper>
        )}
      </LayoutWrapper>
      <DrawerItems path={props.path} routes={props.routes} />
    </DrawerProvider>
  );
};

export default DashboardLayout;
