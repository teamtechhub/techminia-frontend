import React, { useReducer } from "react";
import { CurriculumContext } from "./curriculum.context";

const INITIAL_STATE = {
  subjects: null,
  classes: null,
  topics: null,
  syllabus: null,
  wizard_form: {
    subject: null,
    class: null,
    topic: null,
    syllabus: null,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "HANDLE_ON_INPUT_CHANGE":
      return { ...state, [action.payload.field]: action.payload.value };

    case "ADD_OR_UPDATE_SUBJECTS":
        return {
          ...state,
          wizard_form: {
            subject: action.payload.subject,
          },
        };

    case "DELETE_CONTACT":
      return {
        ...state,
        contact: state.contact.filter((item) => item.id !== action.payload),
      };
    case "ADD_OR_UPDATE_ADDRESS":
      if (action.payload.id) {
        return {
          ...state,
          address: state.address.map((item) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload }
              : item
          ),
        };
      }
      const newAdress = {
        ...action.payload,
        type: state.address.length === "0" ? "primary" : "secondary",
      };
      return {
        ...state,
        address: [...state.address, newAdress],
      };
    case "DELETE_ADDRESS":
      return {
        ...state,
        address: state.address.filter((item) => item.id !== action.payload),
      };
    case "ADD_CARD":
      const newCard = {
        id: action.payload.id,
        type: state.card.length === "0" ? "primary" : "secondary",
        cardType: action.payload.brand.toLowerCase(),
        name: state.name,
        lastFourDigit: action.payload.last4,
      };
      return {
        ...state,
        card: [newCard, ...state.card],
      };
    case "DELETE_CARD":
      return {
        ...state,
        card: state.card.filter((item) => item.id !== action.payload),
      };
    case "SET_PRIMARY_CONTACT":
      return {
        ...state,
        contact: state.contact.map((item) =>
          item.id === action.payload
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" }
        ),
      };
    case "SET_PRIMARY_ADDRESS":
      return {
        ...state,
        address: state.address.map((item) =>
          item.id === action.payload
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" }
        ),
      };
    case "SET_PRIMARY_SCHEDULE":
      return {
        ...state,
        schedules: state.schedules.map((item) =>
          item.id === action.payload
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" }
        ),
      };
    case "SET_PRIMARY_CARD":
      return {
        ...state,
        card: state.card.map((item) =>
          item.id === action.payload
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" }
        ),
      };
    default:
      return state;
  }
}

export const CurriculumProvider = ({ children }) => {
  const [curriculumState, curriculumDispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );
  console.log(curriculumState, 'curriculum provider state');

  return (
    <CurriculumContext.Provider value={{ curriculumState, curriculumDispatch }}>
      {children}
    </CurriculumContext.Provider>
  );
};
