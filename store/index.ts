import { applyMiddleware, createStore, DeepPartial, Store } from "redux";
import { History } from "history";
import thunk from "redux-thunk";
import { rootReducer, RootState } from "./reducer";
import { createRouteMiddleware } from "./routing/middlewares/RouteMiddleware";
import { APIClient } from "../foundation/utils/APIClientUtils";
import { infrastructure } from "../infra";

export type RootStore = Store<RootState>;

export type ExtraArgument = {
  apiClient: APIClient;
};

export function configureStore({
  history,
  apiClient,
  preloadedState,
}: {
  history: History;
  apiClient: APIClient;
  preloadedState: DeepPartial<RootState>;
}): RootStore {
  const extraArgument: ExtraArgument = {
    ...infrastructure,
    apiClient,
  };

  const middlewares = [
    thunk.withExtraArgument(extraArgument),
    createRouteMiddleware(history),
  ];

  if (process.title === "browser") {
    if (process.env.NODE_ENV !== "production") {
      middlewares.push(require("redux-logger").createLogger());
    }
  }

  return createStore(
    rootReducer,
    preloadedState as any, // TODO: as any消す
    applyMiddleware(...middlewares),
  );
}
