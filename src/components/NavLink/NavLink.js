import React from "react";
import styled from "styled-components";
import { Link, withRouter, useLocation } from "react-router-dom";

const Icon = styled.span`
  min-width: 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLink = ({ href, label, icon, className, onClick, iconClass }) => {
  const location = useLocation();
  const isCurrentPath = location.pathname === href;
  return (
    <div onClick={onClick} className={className ? className : ""}>
      <Link
        to={href}
        className={isCurrentPath ? " current-page" : ""}
        style={{ display: "flex", alignItems: "center" }}
      >
        {icon ? <Icon className={iconClass}>{icon}</Icon> : ""}

        <span className="label">{label}</span>
      </Link>
    </div>
  );
};

export default withRouter(NavLink);
