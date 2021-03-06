/* eslint-disable react-hooks/rules-of-hooks */
import React, { useReducer } from "react";
import { DrawerContext } from "./drawer.context";
import { useCreateContext } from "../create-context";

const initialState = {
  isOpen: false,
  drawerComponent: "AUTHENTICATION_FORM",
  data: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_DRAWER":
      alert("openning");
      return {
        ...state,
        isOpen: true,
        drawerComponent: action.drawerComponent,
        data: action.data,
      };
    case "CLOSE_DRAWER":
      return {
        ...state,
        isOpen: false,
        drawerComponent: null,
        data: null,
      };
    case "TOGGLE":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}
export const DrawerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [useDrawerState, useDrawerDispatch, DrawerProviderz] = useCreateContext(
    initialState,
    reducer
  );
  return (
    <DrawerContext.Provider
      value={{
        state,
        dispatch,
        useDrawerState,
        useDrawerDispatch,
        DrawerProviderz,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

const [
  useDrawerState,
  useDrawerDispatch,
  DashboardDrawerProvider,
] = useCreateContext(initialState, reducer);

export { useDrawerState, useDrawerDispatch, DashboardDrawerProvider };
