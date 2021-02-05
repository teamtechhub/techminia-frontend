import { createGlobalStyle } from "styled-components";
import { get } from "styled-system";
import css from "@styled-system/css";
const TIMEOUT = 400;
// export const themed = (key) => (props) =>
//   css(get(props.theme, `customs.${key}`))(props.theme);
// export const themeGet = (path, fallback = null) => (props) =>
//   get(props.theme, path, fallback);

export const GlobalStyle = createGlobalStyle(({ theme }) =>
  css({
    html: {
      overflowX: "auto",
    },
    " *, *::after, *::before": {
      boxSizing: "border-box",
      padding: "0",
      margin: "0",
    },
    "*": {
      scrollbarWidth: "thin",
      scrollbarColor:
        "linear-gradient(360deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%) linear-gradient(180deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%)",
    },

    /* Works on Chrome/Edge/Safari */
    "::-webkit-scrollbar": {
      width: "12px",
    },
    "::-webkit-scrollbar-track": {
      background:
        "linear-gradient(180deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%)",
    },
    "*::-webkit-scrollbar-thumb": {
      background:
        "linear-gradient(360deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%)",
      borderRadius: "20px",
      border:
        "3px solid linear-gradient(180deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%)",
    },

    "*:before, *:after": {
      WebkitBoxSizing: "border-box",
      MozBozSizing: "border-box",
      boxSizing: "border-box",
    },
    body: {
      margin: 0,
      padding: 0,
      overflow: "hidden",
      fontFamily: "body",
      fontWeight: "regular",
      fontSize: "base",
      lineHeight: "1.5",
      backgroundColor: "white",
      transition: get(theme, "customs.transition"),
      textTransform: "none",
      position: "relative",
    },
    h1: {
      fontFamily: "heading",
      fontSize: "5xl",
      margin: 0,
    },
    h2: {
      fontFamily: "heading",
      fontSize: "3xl",
      margin: 0,
    },
    h3: {
      fontFamily: "heading",
      fontSize: "2xl",
      margin: 0,
    },
    h4: {
      fontFamily: "heading",
      fontSize: "xl",
      margin: 0,
    },
    h5: {
      fontFamily: "heading",
      fontSize: "md",
      margin: 0,
    },
    h6: {
      fontFamily: "heading",
      fontSize: "base",
      margin: 0,
    },
    "p,span,button,li,div": {
      fontFamily: "body",
      margin: 0,
    },
    a: {
      fontFamily: "body",
      textDecoration: "none",
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: "none",
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },

    "input[type='text'], input[type='email'], input[type='password'], textarea, select ": {
      display: "block",
      width: "100%",
      padding: "0 18px",
      height: "40px",
      // borderRadius: get(theme, "radii.base"),
      backgroundColor: get(theme, "colors.gray.200"),
      border: `1px solid `,
      borderColor: get(theme, "colors.gray.700"),
      fontFamily: "'Lato', sans-serif",
      fontSize: get(theme, "fontSizes.base"),
      fontWeight: get(theme, "fontWeights.regular"),
      color: get(theme, "colors.text.bold"),
      lineHeight: "19px",
      boxSizing: "border-box",
      transition: "border-color 0.25s ease",

      "&:hover, &:focus": {
        outline: "0",
      },

      "&:focus": {
        borderColor: get(theme, "colors.primary.regular"),
      },

      "&::placeholder": {
        color: get(theme, "colors.text.regular"),
        fontSize: "inherit",
      },
      "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
        webkitAppearance: "none",
        margin: "0",
      },

      "&.disabled": {
        ".inner-wrap": {
          cursor: " not-allowed",
          opacity: "0.6",
        },
      },
    },

    ".quick-view-overlay": {
      backgroundColor: "rgba(0,0,0,.5)",
    },

    ".add-address-modal,.add-contact-modal": {
      boxShadow: "0 10px 40px rgba(0,0,0,0.16)",
      borderRadius: "3px !important",
      ".innerRndComponent": {
        width: "100%",
        padding: "30px",
        height: "auto",
        backgroundColor: "#f7f8f9",
        border: 0,
        boxSizing: "border-box",
      },
    },

    ".search-modal-mobile": {
      transform: "none!important",
      maxWidth: "none!important",
      maxHeight: "none!important",
      top: "0!important",
      left: "0!important",
      background: "transparent!important",
      borderRadius: "0!important",
    },

    ".reuseModalCloseBtn": {
      right: "10px!important",
      backgroundColor: "#ffffff!important",
      color: "#222222!important",
      borderRadius: "15px!important",
      padding: "0 9px!important",
      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
    },

    ".page-transition-enter": {
      opacity: "0",
      transform: "translate3d(0, 20px, 0)",
    },

    ".page-transition-enter-active": {
      opacity: "1",
      transform: "translate3d(0, 0, 0)",
      transition: `opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms`,
    },

    ".page-transition-exit": {
      opacity: "1",
    },

    ".page-transition-exit-active": {
      opacity: "0",
      transition: `opacity ${TIMEOUT}ms`,
    },

    ".loading-indicator-appear, .loading-indicator-enter": {
      opacity: "0",
    },

    ".loading-indicator-appear-active, .loading-indicator-enter-active": {
      opacity: "1",
      transition: `opacity ${TIMEOUT}ms`,
    },

    ".image-item": {
      padding: "0 15px",
    },

    "@media (max-width: 1199px) and (min-width: 991px)": {
      ".image-item": {
        paddingLeft: "10px",
        paddingRight: "10px",
      },
    },

    "@media (max-width: 768px)": {
      ".image-item": {
        paddingLeft: "7.5px",
        paddingRight: "7.5px",
      },
    },

    ".rc-table-fixed-header .rc-table-scroll .rc-table-header": {
      marginBottom: "0 !important",
      paddingBottom: "0 !important",

      th: {
        padding: "8px 20px",
      },
    },

    ".drawer-content-wrapper": {
      "*:focus": {
        outline: "none",
      },
      backgroundColor: "#a17fb9",
    },

    ".rc-table-content": {
      border: 0,
    },
    ".react-multi-carousel-item": {
      margin: " 0 auto",
    },
    // ".video-react": {
    //   color: "#ba9bd0",
    // },
    // ".video-react": {
    //   backgroundColor: "transparent",
    //   background: `linear-gradient(  90deg, rgba(236, 118, 35, 1) 0%, rgba(101, 46, 141, 1) 100% )`,
    // },
    // ".video-react .video-react-poster ": {
    //   backgroundColor: "transparent",
    // },
    ".video-react .video-react-control-bar ": {
      backgroundColor: "#ec76238f ",
    },
    //@js-ignore
    ...theme.globals,
  })
);
