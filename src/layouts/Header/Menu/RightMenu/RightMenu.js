import { UserAvatar } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import NavLink from "components/NavLink/NavLink";
import Popover from "components/Popover/Popover";
import {} from "constants/constants";
import {
  BAT,
  CLASSES,
  CONTACT,
  DASHBOARD,
  HOME,
  LIBRARY,
  PROFILE_PAGE,
  TUITION,
} from "constants/routes.constants";
import { AuthContext } from "contexts/auth/auth.context";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthorizedMenu } from "../AuthorizedMenu";
import { RightMenuBox, ProfileImg, Image } from "./RightMenu.style";

export const RightMenu = ({ onLogout, avatar, isAuthenticated, onJoin }) => {
  const {
    authState: { profile },
  } = React.useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;
  const isAuthPage = pathname === "auth";
  return (
    <RightMenuBox>
      <NavLink className="menu-item" href={HOME} label="HOME" />
      <NavLink className="menu-item" href={TUITION} label="TUITION" />
      <NavLink className="menu-item" href={CLASSES} label="CLASSES" />

      {isAuthenticated ? (
        <>
          <NavLink className="menu-item" href={LIBRARY} label="LIBRARY" />

          <NavLink
            className="menu-item"
            href={DASHBOARD}
            label="Tuition Dashboard"
          />
        </>
      ) : (
        <NavLink className="menu-item" href={BAT} label="BECOME A TEACHER" />
      )}
      <NavLink className="menu-item" href={CONTACT} label="CONTACT" />

      {!isAuthenticated ? (
        <>
          {isAuthPage ? null : (
            <Button
              onClick={onJoin}
              size="small"
              title="Log In"
              iconPosition="left"
              icon={
                <UserAvatar width={"13px"} height={"13px"} color={"#fff"} />
              }
              style={{
                height: "35px",
                fontWeight: "600",
                fontSize: 15,
                color: "#fff",
                backgroundColor: "transparent",
              }}
            />
          )}
        </>
      ) : (
        <>
          <Popover
            direction="right"
            className="user-pages-dropdown"
            handler={
              <ProfileImg>
                <Image src={avatar} alt="user" />
              </ProfileImg>
            }
            content={<AuthorizedMenu onLogout={onLogout} />}
          />
          <Link
            style={{ color: "#fff", margin: "0 10px", fontSize: "13px" }}
            to={PROFILE_PAGE}
          >
            {profile.surname !== "" ? profile.surname : profile.email}
          </Link>
        </>
      )}
    </RightMenuBox>
  );
};
