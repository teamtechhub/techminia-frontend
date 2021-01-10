import React, { useReducer } from "react";
import { SearchContext } from "./search.context";

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return { ...state, text: action.payload.text };
    case "RESET":
      return { text: "" };
    default:
      return state;
  }
}

export const SearchProvider = ({ children, query = { text: "" } }) => {
  const [state, dispatch] = useReducer(reducer, query);
  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
