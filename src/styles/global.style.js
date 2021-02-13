import { createGlobalStyle } from "styled-components";
import { get } from "styled-system";
import css from "@styled-system/css";
const TIMEOUT = 400;
// export const themed = (key) => (props) =>
//   css(get(props.theme, `customs.${key}`))(props.theme)',
// export const themeGet = (path, fallback = null) => (props) =>
//   get(props.theme, path, fallback)',

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
    ".video-react .video-react-control-bar ": {
      backgroundColor: "#ec76238f ",
    },
    ".wordwrap, .post-content": {
      whiteSpace: "pre-wrap",
      /* CSS3 */
      wordWrap: "break-word",
      /* IE */
    },

    ".theme-dropdown .dropdown-menu": {
      position: "static",
      display: "block",
      marginBottom: "20px",
    },

    ".theme-showcase > p > .btn": {
      margin: "5px 0",
    },

    ".theme-showcase .navbar .container": {
      width: "auto",
    },

    ".navbar": {
      position: "relative",
    },

    ".inline": {
      display: "inline-block",
    },

    ".break-word": {
      wordWrap: "break-word",
    },

    ".hover-point, .count-box": {
      cursor: "pointer",
    },

    ".color-primary": {
      color: "#337ab7",
    },

    "h6, .text-muted": {
      lineHeight: "0",
    },

    ".full-line": {
      lineHeight: "1",
    },

    ".count-box": {
      display: "inline-block",
      width: "50px",
      height: "50px",
      textAlign: "center",
      float: "right",
    },

    ".count-box-score": {
      fontSize: "18px",
      lineHeight: "2.4",
    },

    ".count-box-context": {
      fontSize: "smaller",
    },

    ".op-container, .post-container": {
      paddingTop: "10px",
      marginTop: "10px",
      marginLeft: "10px",
    },

    ".post-container": {
      borderTop: "1px solid #ddd",
      borderLeft: "1px solid #ddd",
      padding: "5px",
    },

    ".post-content": {
      margin: "12px 0",
    },

    ".post-callout": {
      width: "100%",
    },

    ".fa-plus-square-o, .fa-minus-square-o": {
      cursor: "pointer",
    },

    ".nav-tabs": {
      padding: "0 15px",
    },

    ".btn-group-xs.fixed-50 > .btn": {
      width: "50px",
    },

    ".btn-group-xs.fixed-80 > .btn": {
      width: "80px",
    },

    ".btn.btn-width-auto": {
      width: "auto !important",
    },

    ".breadcrumb": {
      backgroundColor: "transparent",
    },

    ".col-icon > .fa-stack": {
      marginTop: "15px",
    },
    ".col-icon > .fa-stack .fa-stack-2x": {
      color: "#eeeeee",
    },
    ".col-icon > .fa-stack .fa-stack-1x": {
      color: "#555555",
    },

    ".col-icon": {
      display: "flex",
      alignItems: "center",
    },

    ".post-heading h3, .post-heading h4, .post-heading h5, .post-heading h6": {
      display: "inline",
      marginLeft: "5px",
    },

    ".vertical-align": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },

    ".bootstrap-select": {
      maxWidth: "100%",
    },

    "@media only screen and (max-width: 500px)": {
      ".darasa-forum-date-silly": {
        display: "inline",
      },

      ".darasa-forum-date-verbose": {
        display: "none",
      },
    },
    "@media only screen and (min-width: 501px)": {
      ".darasa-forum-date-silly": {
        display: "none",
      },

      ".darasa-forum-date-verbose": {
        display: "inline",
      },
    },
    /* Small Devices, Tablets */
    "@media only screen and (min-width: 769px)": {
      ".list-group-item-main-col": {
        paddingLeft: "0",
      },

      ".count-box-small": {
        display: "none",
      },

      ".darasa-forum-thread-item-icon": {
        padding: "5px",
      },

      ".darasa-forum-count-box-overflow": {
        display: "none",
      },

      ".darasa-forum-score, .darasa-forum-score-op": {
        display: "none",
      },

      ".darasa-forum-score-large": {
        display: "flex",
      },

      ".darasa-forum-thread-form > div": {
        paddingBottom: "1em",
      },

      ".post-callout": {
        paddingLeft: "1em",
      },
    },
    "@media only screen and (max-width: 768px)": {
      ".list-group-item-main-col": {
        paddingLeft: "15px",
      },

      ".hide-sm": {
        visibility: "hidden",
      },

      "#main": {
        padding: "0 0 0 0",
      },

      "#main h2": {
        padding: "10px",
      },

      "#main .darasa-forum-topic-description": {
        padding: "10px",
      },

      ".count-box": {
        display: "none",
      },

      ".darasa-forum-count-box-overflow": {
        display: "inline",
      },

      ".count-box-small": {
        display: "inline",
      },

      ".darasa-forum-score, .darasa-forum-score-op": {
        display: "inline",
      },

      ".darasa-forum-score-large": {
        display: "none !important",
      },

      "#discussion-title": {
        marginLeft: "15px",
      },
      ".discussion-toolbar": {
        paddingLeft: "15px",
      },

      ".darasa-forum-thread-form": {
        paddingLeft: "15px",
        paddingRight: "15px",
      },

      ".darasa-forum-thread-form > div": {
        paddingBottom: "0.5em",
      },

      ".darasa-forum-callout .minicol": {
        display: "none",
      },

      ".row, #comments-callout": {
        marginLeft: "0 !important",
        marginRight: "0 !important",
      },

      ".breadcrumb": {
        margin: "15px",
        padding: "0",
      },

      "#comments-callout": {
        marginLeft: "-15px",
        marginRight: "-15px",
      },

      ".post-callout": {
        paddingLeft: "0",
      },
    },
    /* Medium Devices, Desktops */
    ".darasa-forum-score": {
      padding: "2px 5px",
      borderRadius: "5px",
      marginRight: "5px",
    },

    ".darasa-forum-created-by": {
      display: "inline",
    },

    ".darasa-forum-score-upvote, .darasa-forum-score-downvote": {
      margin: "0px 2px",
    },

    ".darasa-forum-thread-item-footer, .darasa-forum-post-item-footer": {
      lineHeight: "normal",
    },

    ".darasa-forum-score-upvote.color-primary, .darasa-forum-score-upvote-large.color-primary": {
      color: "#5cb85c",
    },

    ".darasa-forum-score-downvote.color-primary, .darasa-forum-score-downvote-large.color-primary": {
      color: "#d9534f",
    },

    ".darasa-forum-score-number-large.color-upvote, .darasa-forum-score-number.color-upvote": {
      color: "#5cb85c",
    },

    ".darasa-forum-score-number-large.color-downvote, .darasa-forum-score-number.color-downvote": {
      color: "#d9534f",
    },

    ".darasa-forum-score-large": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },

    ".darasa-forum-score-large > div": {
      padding: "3px",
      fontFamily: "Museosansrounded, sans-serif",
    },

    ".darasa-forum-created-by a, .post-container a": {
      color: "inherit",
    },

    ".list-group-item": {
      cursor: "pointer",
    },

    ".list-group-item h4": {
      fontWeight: "bold",
      color: "#333",
    },

    ".discussion-toolbar": {
      paddingBottom: "1em",
    },

    ".discussion-toolbar i": {
      paddingLeft: "0.5em",
    },

    ".darasa-forum-score-container": {
      maxWidth: "4em",
    },

    ".darasa-forum-post-item-footer .darasa-forum-score": {
      display: "inline",
    },

    ".darasa-forum-topic-container": {
      maxWidth: "5em",
    },

    ".darasa-forum-topic-description": {
      paddingBottom: "0.5em",
    },

    ".discussion-toolbar .tooltip-inner": {
      width: "20em",
      fontFamily: "Museosansrounded, sans-serif",
    },

    ".darasa-forum-callout": {
      display: "flex",
    },

    "#main .bs-callout-main": {
      border: "none",
    },

    "#main .row": {
      margin: "0 !important",
    },

    ".postcol": {
      width: "100%",
      display: "inline-block",
      marginLeft: "10px",
      marginTop: "5px",
    },

    ".bs-callout": {
      padding: "10px 20px",
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: "3px",
      background: "#fff",
    },
    ".bs-callout textarea": {
      resize: "vertical",
      height: "140px",
    },

    ".bs-callout h4": {
      marginTop: "0",
      marginBottom: "5px",
    },

    ".bs-callout p:last-child": {
      marginBottom: "0",
    },

    ".bs-callout code": {
      borderRadius: "3px",
    },

    ".bs-callout + .bs-callout": {
      marginTop: "-5px",
    },
    ".bs-callout-default": {
      borderLeftColor: "#777",
    },

    ".bs-callout-default h4": {
      color: "#777",
    },

    ".bs-callout-primary": {
      borderLeftColor: "#428bca",
    },

    ".bs-callout-primary h4": {
      color: "#428bca",
    },

    ".bs-callout-success": {
      borderLeftColor: "#5cb85c",
    },

    ".bs-callout-success h4": {
      color: "#5cb85c",
    },

    ".bs-callout-danger": {
      borderLeftColor: "#d9534f",
    },

    ".bs-callout-danger h4": {
      color: "#d9534f",
    },

    ".bs-callout-warning": {
      borderLeftColor: "#f0ad4e",
    },

    ".bs-callout-warning h4": {
      color: "#f0ad4e",
    },

    ".bs-callout-info": {
      borderLeftColor: "#5bc0de",
    },

    ".bs-callout-info h4": {
      color: "#5bc0de",
    },

    ".bs-callout-heading": {
      marginLeft: "15px",
    },
    ".bs-callout-heading h3, .bs-callout-heading h4, .bs-callout-heading h5, .bs-callout-heading h6": {
      display: "inline",
    },

    ".minicol": {
      float: "left",
      margin: "10px 0",
      textAlign: "center",
    },
    ".minicol .glyphicon": {
      display: "block",
    },
    ".minicol .post-score": {
      marginBottom: "0",
      marginTop: "3px",
      lineHeight: "1.3",
    },

    ".glyphicon-chevron-up-op": {
      marginBottom: "7px",
    },

    ".callout-title": {
      lineHeight: "1",
      marginTop: "5px !important",
      paddingLeft: "15px",
      paddingRight: "15px",
    },
    ".mde-textarea-wrapper textarea.mde-text": {
      height: "100px",
    },
    //@js-ignore
    ...theme.globals,
  })
);
