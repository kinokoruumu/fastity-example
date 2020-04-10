import { applyMiddleware, createStore, DeepPartial, Store } from "redux";
import { History } from "history";
import { rootReducer, RootState } from "./reducer";
import { createRouteMiddleware } from "./routing/middlewares/RouteMiddleware";

export type RootStore = Store<RootState>;

export type ExtraArgument = {};

export function configureStore({
  history,
  preloadedState,
}: {
  history: History;
  preloadedState: DeepPartial<RootState>;
}): RootStore {
  const middlewares = [createRouteMiddleware(history)];

  if (process.title === "browser") {
    if (process.env.NODE_ENV !== "production") {
      middlewares.push(require("redux-logger").createLogger());
    }
  }

  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares),
  );
}
