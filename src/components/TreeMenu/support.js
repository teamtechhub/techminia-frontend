import React, { useContext } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import {
  SidebarWrapper,
  NavLink,
  MenuWrapper,
  Svg,
  LogoutBtn,
  LogoImage,
} from "./Sidebar.style";
import { AuthContext } from "contexts/auth/auth.context";
import Logoimage from "images/logo1.png";
import { LogoutIcon } from "components/AllSvgIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default withRouter(function Sidebar({
  refs,
  style,
  onMenuItemClick,
  isOpen,
  routes,
  path,
}) {
  const history = useHistory();
  const { authDispatch } = useContext(AuthContext);

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
  return (
    <SidebarWrapper ref={refs} style={style}>
      {isOpen ? (
        <Link to="/">
          <LogoImage src={Logoimage} alt="darasa" />
        </Link>
      ) : null}

      <MenuWrapper>
        {routes.map((menu, index) => (
          <NavLink
            to={`${path}${menu.url}`}
            key={index}
            exact={menu.exact}
            activeStyle={{
              color: "#652e8d",
              backgroundColor: "#f7f7f7",
              borderRadius: "50px 0 0 50px",
            }}
            onClick={onMenuItemClick}
          >
            {menu.icon ? (
              <Svg>
                <FontAwesomeIcon icon={menu.icon} />
              </Svg>
            ) : (
              ""
            )}
            {menu.title}
          </NavLink>
        ))}
      </MenuWrapper>

      <LogoutBtn
        onClick={() => {
          handleLogout();
        }}
      >
        <Svg>
          <LogoutIcon />
        </Svg>
        Logout
      </LogoutBtn>
    </SidebarWrapper>
  );
});
