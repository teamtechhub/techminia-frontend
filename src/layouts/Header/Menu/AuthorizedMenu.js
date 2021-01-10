import React from "react";
import NavLink from "components/NavLink/NavLink";

import { DASHBOARD, PROFILE_PAGE } from "constants/routes.constants";

const AUTHORIZED_MENU_ITEMS = [
  {
    link: PROFILE_PAGE,
    label: "Profile",
  },
  {
    link: DASHBOARD,
    label: "Dashboard",
  },
];

export const AuthorizedMenu = ({ onLogout }) => {
  return (
    <>
      {AUTHORIZED_MENU_ITEMS.map((item, idx) => (
        <NavLink
          key={idx}
          className="menu-item"
          href={item.link}
          label={item.label}
        />
      ))}
      <NavLink
        onClick={onLogout}
        className="menu-item"
        href="/"
        label="logout"
      />
    </>
  );
};
