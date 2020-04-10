import { combineReducers } from "redux";
import { routeReducer } from "./routing/reducer";

export const rootReducer = combineReducers({
  routing: routeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
