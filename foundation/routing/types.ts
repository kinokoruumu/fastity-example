import { LoadableLibrary } from '@loadable/component';
import { History } from 'history';
import { QueryParams, ResolveRoute, RouteContext } from 'universal-router';
import { RootStore } from '../../store';
import { HttpStatusCode } from '../utils/StatusCodeUtils';

export type RouterContext = {
  store: RootStore;
  history: History;
};

export type OwnerRouteActionContext = RouteContext<RouterContext> &
  RouterContext & {
    params: QueryParams;
  };

export type RouteActionContext = OwnerRouteActionContext & {
  params: QueryParams;
  firstOrPush: boolean;
};

export type ChildRouteAction = ResolveRoute<RouterContext, RouteActionPayload>;
export type Middleware = (
  context: OwnerRouteActionContext,
) => Promise<RouteActionPayload>;

export type RouteLayout<C extends React.ComponentType = any> = {
  component: C;
  props: C extends React.ComponentType<infer P>
    ? P extends { children: any }
      ? Omit<P, 'children'>
      : any
    : any;
};

export type RouteActionPayload<L extends React.ComponentType<any> = any> = {
  library?: LoadableLibrary<PageRoute>;
  statusCode?: HttpStatusCode;
  redirectTo?: string;
  layout?: RouteLayout<L>;
  content?: React.ReactNode;
  path?: string;
  params?: QueryParams;
  deferAction?: DeferPageAction; // 初期表示時は client/index で実行され、以降の遷移時は RouteRenderer.handleLocationChange で実行
};

export type PageAction = (
  context: RouteActionContext,
) => Promise<RouteActionPayload>;
export type DeferPageAction = (context: RouteActionContext) => Promise<any>;

export type PageRoute = {
  action: PageAction;
  deferAction?: DeferPageAction;
};
