export const initialState = {
  isSticky: false,
  isSidebarSticky: true,
  currentForm: "view",
  isReload: false,
};

export function reducer(state, { type }) {
  switch (type) {
    case "POST":
      return {
        ...state,
        currentForm: "post",
      };
    case "VIEW":
      return {
        ...state,
        currentForm: "view",
      };
    case "MANAGE":
      return {
        ...state,
        currentForm: "manage",
      };
    case "EDIT":
      return {
        ...state,
        currentForm: "edit",
      };
    case "RELOAD":
      return {
        ...state,
        isReload: true,
      };
    case "REMOVE_RELOAD":
      return {
        ...state,
        isReload: false,
      };
    case "SET_STICKY":
      return {
        ...state,
        isSticky: true,
      };
    case "REMOVE_STICKY":
      return {
        ...state,
        isSticky: false,
      };
    case "SET_SIDEBAR_STICKY":
      return {
        ...state,
        isSidebarSticky: true,
      };
    case "REMOVE_SIDEBAR_STICKY":
      return {
        ...state,
        isSidebarSticky: false,
      };
    default: {
      throw new Error(`Unsupported action type: ${type}`);
    }
  }
}
