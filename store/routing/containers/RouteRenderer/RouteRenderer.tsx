import React from "react";
import { History, Location } from "history";
import shallowEqual from "shallowequal";
import Router from "universal-router";
import { SCROLL_DURATION, scroller } from "../../../../client/scroller";
import {
  RouteLayout,
  RouterContext,
} from "../../../../foundation/routing/types";
import { DispatchableAction } from "../../../../foundation/utils/ConnectUtils";
import { updateFatal } from "../../../app/actions/UpdateFatalAction";
import { AppState } from "../../../app/reducers";
import { locationChange } from "../../actions/LocationChangeAction";
import { replace } from "../../actions/ReplaceAction";
import { HistoryContext } from "../../HistoryContext";
import { RouteParams, RouteState } from "../../reducer";
import { HttpStatusCode } from "../../../../foundation/utils/StatusCodeUtils";

type Point = {
  x: number;
  y: number;
};

const scrollPositionMap = new Map<string, Point>();

const defaultLayout: RouteLayout = {
  component: React.Fragment,
  props: {},
};

type ComponentProps = {
  children: React.ReactNode;
};

export type Props = {
  history: History;
  router: Router<RouterContext>;
  component: React.ReactType<ComponentProps>;
  initialLayout?: RouteLayout;
} & ComponentProps;

export type InjectProps = {
  app: AppState;
  routing: RouteState;
  replace: DispatchableAction<typeof replace>;
  locationChange: DispatchableAction<typeof locationChange>;
  updateFatal: DispatchableAction<typeof updateFatal>;
};

type InjectedProps = Props & InjectProps;

type State = {
  showTransitionProgress: boolean;
  layout: RouteLayout;
  children: React.ReactNode;
};

export class RouteRenderer extends React.PureComponent<InjectedProps, State> {
  public state: State;

  public constructor(props: InjectedProps) {
    super(props);

    const { history, initialLayout, children } = this.props;

    this.state = {
      showTransitionProgress: false,
      layout: initialLayout != null ? initialLayout : defaultLayout,
      children,
    };

    history.listen(this.handleLocationChange);
  }

  public componentDidMount(): void {
    this.adjustScrollPosition();
  }

  public componentDidUpdate(prevProps: InjectedProps): void {
    if (!shallowEqual(this.props.children, prevProps.children)) {
      this.adjustScrollPosition();
    }
  }

  public render(): React.ReactNode {
    const { history, component: Component } = this.props;
    const {
      // showTransitionProgress,
      layout: { component: LayoutComponent, props: layoutProps },
      children,
    } = this.state;

    return (
      <HistoryContext.Provider value={{ history }}>
        <Component>
          <LayoutComponent {...layoutProps}>{children}</LayoutComponent>
          {/* <TransitionProgress aria-label="ページを読み込み中" show={showTransitionProgress} /> */}
        </Component>
      </HistoryContext.Provider>
    );
  }

  private handleLocationChange = async (_: Location): Promise<void> => {
    const { history, router } = this.props;
    const { pathname } = history.location;

    this.setState({ showTransitionProgress: true });

    // 50x 系のエラーはページ遷移のタイミングで一旦クリアする
    if (this.props.app.fatal) {
      this.props.updateFatal(false);
    }

    try {
      this.storeScrollPosition();

      const {
        redirectTo,
        params,
        layout,
        content,
        statusCode,
        deferAction,
      } = await router.resolve(pathname);

      if (redirectTo != null) {
        this.props.replace(redirectTo);
      } else {
        const status = statusCode != null ? statusCode : HttpStatusCode.OK;

        this.setState({
          layout: layout != null ? layout : defaultLayout,
          children: content,
        });

        this.locationChange(params, status);
        this.adjustScrollPosition();

        if (deferAction != null) {
          deferAction();
        }
      }
    } catch (e) {
      this.setState({
        layout: defaultLayout,
        children: <h1>404</h1>,
      });
    }

    this.setState({ showTransitionProgress: false });
  };

  private locationChange(params: RouteParams, status: HttpStatusCode): void {
    const { history } = this.props;
    const { key, pathname, search, hash } = history.location;

    this.props.locationChange({
      key: key as string,
      action: history.action,
      pathname,
      search,
      hash,
      params,
      status,
    });
  }

  private storeScrollPosition(): void {
    const {
      history: {
        location: { pathname },
      },
    } = this.props;

    scrollPositionMap.set(pathname, {
      x: window.scrollX,
      y: window.scrollY,
    });
  }

  private scrollToHashPosition(hash: string): void {
    scroller.to(hash, {
      duration: SCROLL_DURATION.HASH,
    });
  }

  private adjustScrollPosition(): void {
    const {
      history: {
        action,
        location: { pathname, hash },
      },
    } = this.props;

    // initial view
    if (scrollPositionMap.size === 0 && action === "POP") {
      this.scrollToHashPosition(hash);

      return;
    }

    // POP
    if (action === "POP") {
      const { x, y } = scrollPositionMap.has(pathname)
        ? (scrollPositionMap.get(pathname) as Point)
        : { x: 0, y: 0 };
      window.scrollTo(x, y);

      return;
    }

    // puth or replace with hash
    if (hash != null && hash.length >= 1) {
      this.scrollToHashPosition(hash);

      return;
    }

    // other
    window.scrollTo(0, 0);
  }
}
