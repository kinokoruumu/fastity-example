import { combineReducers } from "redux";
import { appReducer } from "./app/reducers/app";
import { routeReducer } from "./routing/reducer";

export const rootReducer = combineReducers({
  app: appReducer,
  routing: routeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
