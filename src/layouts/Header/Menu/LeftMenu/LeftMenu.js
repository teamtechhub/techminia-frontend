import React from "react";
import { LeftMenuBox } from "./LeftMenu.style";
import { Link, useLocation } from "react-router-dom";
import Logoimage from "images/logo1.png";
import styled from "styled-components";
import LogoimageInverted from "images/logo1.png";
import { isCategoryPage } from "layouts/is-home-page";

export const Logo = styled.div`
  margin-right: auto;

  @media only screen and (max-width: 1199px) {
    display: none;
  }
`;
export const LogoImage = styled.img`
  display: block;
  backface-visibility: hidden;
  max-width: 150px;
  max-height: 50px;
`;
export const LeftMenu = ({ isSticky, logo }) => {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;

  const isHomePage = isCategoryPage(pathname);
  return (
    <LeftMenuBox>
      <Logo>
        {!isHomePage ? (
          <Link to="/">
            <LogoImage src={LogoimageInverted} alt="darasa" />
          </Link>
        ) : (
          <>
            {isSticky ? (
              <Link to="/">
                <LogoImage src={LogoimageInverted} alt="darasa" />
              </Link>
            ) : (
              <Link to="/">
                <LogoImage src={Logoimage} alt="darasa" />
              </Link>
            )}
          </>
        )}
      </Logo>
    </LeftMenuBox>
  );
};
