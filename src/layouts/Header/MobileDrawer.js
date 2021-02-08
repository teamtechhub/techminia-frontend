import React, { useContext } from "react";
import { openModal } from "@redq/reuse-modal";
import { useHistory, useLocation } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import Drawer from "components/Drawer/Drawer";
import Button from "components/Button/Button";
import NavLink from "components/NavLink/NavLink";
import { CloseIcon } from "components/AllSvgIcon";
import { DrawerContext } from "contexts/drawer/drawer.context";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "containers/Authentication/Form";
import {
  HamburgerIcon,
  DrawerContentWrapper,
  DrawerClose,
  DrawerProfile,
  LogoutView,
  LoginView,
  UserAvatar,
  UserDetails,
  DrawerMenu,
  DrawerMenuItem,
  UesrOptionMenu,
} from "./Header.style";
import UserImage from "images/user.jpg";
import { useStickyState } from "contexts/app/app.provider";
import { CONTACT, PROFILE_PAGE, HELP_PAGE } from "constants/routes.constants";
import { isCategoryPage } from "../is-home-page";

const DrawerMenuItems = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Profile",
    href: PROFILE_PAGE,
  },
  {
    id: 3,
    label: "Contact Us",
    href: CONTACT,
  },
  {
    id: 4,
    label: "Help",
    href: HELP_PAGE,
  },
];

const MobileDrawer = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(DrawerContext);
  const {
    authState: { isAuthenticated, profile },
    authDispatch,
  } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.split("/")[1].trim() : path;
  const isAuthPage = pathname === "auth";
  const img = localStorage.getItem("darasa_individual_profile")
    ? JSON.parse(localStorage.getItem("darasa_individual_profile"))["image"]
    : localStorage.getItem("darasa_org_profile")
    ? JSON.parse(localStorage.getItem("darasa_org_profile"))["logo"]
    : UserImage;

  const isHomePage = isCategoryPage(pathname);
  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
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

  const signInOutForm = () => {
    dispatch({
      type: "TOGGLE",
    });

    authDispatch({
      type: "SIGNIN",
    });

    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };
  const isSticky = useStickyState("isSticky");
  const classStyle = isSticky
    ? {}
    : isHomePage
    ? { backgroundColor: "white" }
    : {};

  return (
    <Drawer
      width="316px"
      drawerHandler={
        <HamburgerIcon>
          <span
            style={{
              ...classStyle,
              backgroundColor: "#652e8d",
            }}
          />
          <span
            style={{
              ...classStyle,
              backgroundColor: "#652e8d",
            }}
          />
          <span
            style={{
              ...classStyle,
              backgroundColor: "#652e8d",
            }}
          />
        </HamburgerIcon>
      }
      open={state.isOpen}
      toggleHandler={toggleHandler}
      closeButton={
        <DrawerClose>
          <CloseIcon />
        </DrawerClose>
      }
    >
      <Scrollbars autoHide>
        <DrawerContentWrapper>
          <DrawerProfile>
            {isAuthenticated ? (
              <LoginView>
                <UserAvatar>
                  <img src={img} alt="user_avatar" />
                </UserAvatar>
                <UserDetails>
                  <h3>{profile.full_name}</h3>
                  <span>
                    {profile.surname !== "" ? profile.surname : profile.email}
                  </span>
                </UserDetails>
              </LoginView>
            ) : (
              <>
                {isAuthPage ? null : isAuthPage ? null : (
                  <LogoutView>
                    <Button
                      title="Log In"
                      size="small"
                      className="sign_in"
                      // variant="primary"
                      onClick={signInOutForm}
                    />
                  </LogoutView>
                )}
              </>
            )}
          </DrawerProfile>

          <DrawerMenu>
            {DrawerMenuItems.map((item) => (
              <DrawerMenuItem key={item.id}>
                <NavLink
                  onClick={toggleHandler}
                  href={item.href}
                  label={item.label}
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
            ))}
          </DrawerMenu>

          {isAuthenticated && (
            <UesrOptionMenu>
              {/* <DrawerMenuItem>
                <NavLink
                  href="/dashboard/profile"
                  label="Your Account Settings"
                  className="drawer_menu_item"
                />
              </DrawerMenuItem> */}
              <DrawerMenuItem>
                <NavLink
                  href="/dashboard/classes"
                  label="Classes"
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
              <DrawerMenuItem>
                <NavLink
                  href="/dashboard/form"
                  label="Assignments"
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
              <DrawerMenuItem>
                <div onClick={handleLogout} className="drawer_menu_item">
                  <span className="logoutBtn">Logout</span>
                </div>
              </DrawerMenuItem>
            </UesrOptionMenu>
          )}
        </DrawerContentWrapper>
      </Scrollbars>
    </Drawer>
  );
};

export default MobileDrawer;
