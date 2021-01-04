/* eslint-disable react-hooks/rules-of-hooks */
import { useCreateContext } from "../create-context";
import { reducer, initialState } from "./app.reducer";

const [state, useDispatch, provider] = useCreateContext(initialState, reducer);
export const useStickyState = state;
export const useAppState = state;
export const useStickyDispatch = useDispatch;
export const StickyProvider = provider;
