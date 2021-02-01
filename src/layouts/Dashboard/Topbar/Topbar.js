// import { AlertDotIcon, NotificationIcon } from "components/AllSvgIcon";
import Drawer from "components/Drawer/Drawer";
// import Notification from "components/Notification/Notification";
import Popover from "components/Popover/Popover";
// import { SETTINGS } from "constants/constants";
import { PROFILE_PAGE } from "constants/routes.constants";
import { AuthContext } from "contexts/auth/auth.context";
import { DrawerContext } from "contexts/drawer/drawer.context";
import Logoimage from "images/logo.png";
import UserImage from "images/user.jpg";
import React, { useContext, useCallback } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link, useHistory } from "react-router-dom";
// import { useDeviceType } from "utils/useDeviceType";
import {
  DrawerClose,
  DrawerContentWrapper,
  HamburgerIcon,
} from "../../Header/Header.style";
import Sidebar from "../Sidebar/Sidebar";
import {
  // AlertDot,
  CloseButton,
  DrawerWrapper,
  Image,
  Logo,
  LogoImage,
  LogoutBtn,
  NavLink as NavBarLink,
  // NotificationIconWrapper,
  ProfileImg,
  TopbarRightSide,
  TopbarWrapper,
  UserDropdowItem,
} from "./Topbar.style";
import { CloseIcon } from "components/AllSvgIcon";

// const data = [
//   {
//     title: "Application Successful",
//     time: "5m",
//     message: "You will be contacted soon",
//   },
// ];

const Topbar = ({ refs, path, routes }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(DrawerContext);
  const {
    authState: { profile },
    authDispatch,
  } = useContext(AuthContext);
  // const userAgent = navigator.userAgent;
  // const deviceType = useDeviceType(userAgent);
  const img = profile.avatar ? profile.avatar : UserImage;
  // Toggle drawer
  const toggleHandler = useCallback(() => {
    dispatch({
      type: "TOGGLE",
    });
  }, [dispatch]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("darasa_auth_profile");
      localStorage.removeItem("darasa_auth_payload");
      localStorage.removeItem("darasa_auth_roles");
      localStorage.removeItem("darasa_applications");
      localStorage.removeItem("darasa_org_profile");
      localStorage.removeItem("darasa_individual_profile");
      authDispatch({ type: "SIGN_OUT" });
      history.push("/");
    }
  };
  // eslint-disable-next-line no-unused-vars
  const resetSearch = () => {
    dispatch({
      type: "RESET",
    });
  };

  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <Link to="/">
          <LogoImage src={Logoimage} alt="darasa" />
        </Link>
      </Logo>

      <DrawerWrapper>
        <Drawer
          width="250px"
          drawerHandler={
            <HamburgerIcon>
              <span />
              <span />
              <span />
            </HamburgerIcon>
          }
          open={state.isOpen}
          toggleHandler={toggleHandler}
          closeButton={
            <DrawerClose>
              <CloseButton>
                <CloseIcon />
              </CloseButton>
            </DrawerClose>
          }
        >
          <Scrollbars autoHide>
            <DrawerContentWrapper>
              <Sidebar
                path={path}
                routes={routes}
                onMenuItemClick={toggleHandler}
                isOpen={state.isOpen}
              />
            </DrawerContentWrapper>
          </Scrollbars>
        </Drawer>
      </DrawerWrapper>

      <TopbarRightSide>
        {/* {deviceType.desktop ? (
          <Popover
            direction="right"
            content={<Notification data={data} />}
            accessibilityType={"tooltip"}
            placement={"bottomRight"}
            handler={
              <NotificationIconWrapper>
                <NotificationIcon />
                <AlertDot>
                  <AlertDotIcon />
                </AlertDot>
              </NotificationIconWrapper>
            }
          />
        ) : null} */}

        <Link
          style={{ color: "#fff", margin: "0 10px", fontSize: "13px" }}
          to={PROFILE_PAGE}
        >
          {profile.surname !== "" ? profile.surname : profile.email}
        </Link>
        <Popover
          direction="right"
          className="user-pages-dropdown"
          handler={
            <ProfileImg>
              <Image src={img} alt="user" />
            </ProfileImg>
          }
          content={
            <UserDropdowItem>
              <NavBarLink to={PROFILE_PAGE} exact>
                Profile
              </NavBarLink>
              {/* <NavBarLink to={SETTINGS} exact>
                Settings
              </NavBarLink> */}
              <LogoutBtn
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </LogoutBtn>
            </UserDropdowItem>
          }
        />
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
