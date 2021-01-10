import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
export const RightMenuBox = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  .menu-icon {
    min-width: 14px;
    margin-right: 7px;
  }

  .menu-item {
    a {
      font-family: ${themeGet("fonts.body", "Lato")};
      font-size: ${themeGet("fontSizes.base", "15")}px;
      color: #fff;
      line-height: 1.2em;
      display: block;
      transition: 0.15s ease-in-out;
      display: flex;
      align-items: center;
      margin-right: 20px;

      @media (max-width: 1400px) {
        margin-right: 35px;
        font-size: ${themeGet("fontSizes.base", "15")}px;
      }
      &:hover {
        color: ${themeGet("colors.primary.regular", "#652e8d")};
      }
      &.current-page {
        color: ${themeGet("colors.primary.regular", "#652e8d")};
      }
    }
  }

  .user-pages-dropdown {
    .popover-handler {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: block;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    .popover-content {
      .inner-wrap {
        /* padding: ; */
      }
    }
  }
`;

export const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 50%;
  border: 2px solid #ffffff;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  background: #ffffff;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
