export const lightColors = {
  transparent: "#ffffff00", // 0
  white: "#ffffff", // 2
  darkBold: "#21277F", // 3
  darkMedium: "#424561", // 3
  darkRegular: "#77798C", // 3
  darkLight: "#C2C3CC", // 3
  lightColor: "#F7F7F7", // 3
  lightMediumColor: "#F3F3F3", // 3
  lightDarkColor: "#E6E6E6", // 3
  labelColor: "#909090", // 4
  inactiveButton: "#b7dbdd", // 6
  borderColor: "#f1f1f1", // 7
  // primary: "#21277F", // 8
  primaryHover: "#e3d0b6", // 9
  // secondary: "#ff5b60", // 10
  secondaryHover: "#FF282F", // 11
  // yellow: "#FBB979", // 12
  yellowHover: "#FFB369", // 13
  // blue: "#2e70fa", // 13
  lightBg: "#f4f4f4", // 14
  switch: "#028489", // 15

  black: "#000000",
  gray: {
    100: "#f9f9f9",
    200: "#F7F7F7",
    300: "#f4f4f4",
    400: "#F3F3F3",
    500: "#f1f1f1", // border alt color
    600: "#EdEdEd",
    700: "#E6E6E6", // border color
    800: "#C2C3CC",
    900: "#bdbdbd",
  },
  text: {
    bold: "#0D1136", // heading color
    medium: "#424561",
    regular: "#77798C", // regular text color
    light: "#909090",
    label: "#767676",
  },
  primary: {
    regular: "#652e8d", // primary color
    hover: "#5d2984",
    alternate: "#8324ca",
    light: "#9050bf",
  },
  secondary: {
    regular: "#ff5b60",
    hover: "#FF282F",
    alternate: "#fc5c63",
  },
  yellow: {
    regular: "#FFAD5E",
    hover: "#FFB369",
    alternate: "#f4c243",
  },
  blue: {
    regular: "#2e70fa",
    dark: "#161F6A",
    light: "#666D92",
    link: "#4285f4",
  },
  red: "#ea4d4a",
  success: "",
  warning: "",
  muted: "",
  highlight: "",
};
export const darkColors = {
  transparent: "#ffffff00", // 0
  white: "#ffffff", // 2
  darkBold: "#21277F", // 3
  darkMedium: "#424561", // 3
  darkRegular: "#77798C", // 3
  darkLight: "#C2C3CC", // 3
  lightColor: "#F7F7F7", // 3
  lightMediumColor: "#F3F3F3", // 3
  lightDarkColor: "#E6E6E6", // 3
  labelColor: "#909090", // 4
  inactiveButton: "#b7dbdd", // 6
  borderColor: "#f1f1f1", // 7
  // primary: "#21277F", // 8
  primaryHover: "#e3d0b6", // 9
  // secondary: "#ff5b60", // 10
  secondaryHover: "#FF282F", // 11
  // yellow: "#FBB979", // 12
  yellowHover: "#FFB369", // 13
  // blue: "#2e70fa", // 13
  lightBg: "#f4f4f4", // 14
  switch: "#028489", // 15

  black: "#000000",
  gray: {
    100: "#f9f9f9",
    200: "#F7F7F7",
    300: "#f4f4f4",
    400: "#F3F3F3",
    500: "#f1f1f1", // border alt color
    600: "#EdEdEd",
    700: "#E6E6E6", // border color
    800: "#C2C3CC",
    900: "#bdbdbd",
  },
  text: {
    bold: "#0D1136", // heading color
    medium: "#424561",
    regular: "#77798C", // regular text color
    light: "#909090",
    label: "#767676",
  },
  primary: {
    regular: "#652e8d", // primary color
    hover: "#5d2984",
    alternate: "#8324ca",
    light: "#9050bf",
  },
  secondary: {
    regular: "#ff5b60",
    hover: "#FF282F",
    alternate: "#fc5c63",
  },
  yellow: {
    regular: "#FFAD5E",
    hover: "#FFB369",
    alternate: "#f4c243",
  },
  blue: {
    regular: "#2e70fa",
    dark: "#161F6A",
    light: "#666D92",
    link: "#4285f4",
  },
  red: "#ea4d4a",
  success: "",
  warning: "",
  muted: "",
  highlight: "",
};

export const baseColor =
  localStorage.getItem("theme") === "light" ? lightColors : darkColors;
