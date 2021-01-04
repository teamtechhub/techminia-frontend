import React, { useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { openModal, closeModal } from "@redq/reuse-modal";
import SearchBox from "components/SearchBox/SearchBox";
import { SearchContext } from "contexts/search/search.context";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "containers/Authentication/Form";
import { RightMenu } from "./Menu/RightMenu/RightMenu";
import { LeftMenu } from "./Menu/LeftMenu/LeftMenu";
import HeaderWrapper from "./Header.style";
import UserImage from "images/user.jpg";
import LogoImage from "images/logo1.png";

const Header = ({ className, isSticky, deviceType }) => {
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;
  const query = new URLSearchParams(location.search);
  const {
    authState: { isAuthenticated, profile },
    authDispatch,
  } = React.useContext(AuthContext);
  const img = profile.avatar ? profile.avatar : UserImage;
  const { state, dispatch } = useContext(SearchContext);

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

  const handleJoin = () => {
    authDispatch({
      type: "SIGNIN",
    });

    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
      componentProps: { deviceType, closeModal },
      closeComponent: "div",
      config: deviceType.desktop
        ? {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 900,
            y: 30,
            height: "auto",
            transition: {
              mass: 1,
              tension: 0,
              friction: 0,
            },
          }
        : {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
          },
    });
  };
  const onSearch = (text) => {
    dispatch({
      type: "UPDATE",
      payload: {
        ...state,
        text,
      },
    });
  };

  const onClickHandler = (searchValue) => {
    const categoryParam = query.get("category") ? query.get("category") : "";

    const queryParams = query.get("category")
      ? `category=${categoryParam}&text=${searchValue}`
      : `&text=${searchValue}`;

    history.push(`${pathname}?${queryParams}`);
  };
  return (
    <HeaderWrapper className={className}>
      <LeftMenu logo={LogoImage} isSticky={isSticky} />

      <SearchBox
        className="headerSearch"
        handleSearch={(value) => onSearch(value)}
        onClick={(value) => onClickHandler(value)}
        placeholder="Search anything..."
        hideType={true}
        minimal={true}
        showSvg={true}
        style={{ width: "100%" }}
        value={state.text || ""}
      />
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={img}
      />
    </HeaderWrapper>
  );
};

export default Header;
