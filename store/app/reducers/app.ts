import { reducerWithInitialState } from "typescript-fsa-reducers";
import { updateFatal } from "../actions/UpdateFatalAction";

export type AppState = {
  fatal: boolean;
};

export const initialState = {
  fatal: false,
};

export const appReducer = reducerWithInitialState<AppState>(initialState).case(
  updateFatal,
  (state, payload) => ({
    ...state,
    fatal: payload,
  }),
);
