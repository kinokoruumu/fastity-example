import loadable from "@loadable/component";
import { PageRoute } from "./routing/types";
import { action } from "./routing/utils";

export const routes = [
  {
    path: "",
    action: action(
      loadable.lib<PageRoute>(() => import("./pages/Top")),
    ),
  },
  {
    path: "/second",
    action: action(
      loadable.lib<PageRoute>(() => import("./pages/Second")),
    ),
  },
  {
    path: "/promise",
    action: action(
      loadable.lib<PageRoute>(() => import("./pages/Promise")),
    ),
  },
];
