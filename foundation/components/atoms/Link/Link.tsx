import { History } from "history";
import React from "react";
import styled from "styled-components";
import { isModifiedMouseEvent } from "../../../../client/utils/EventUtils";
import { DispatchableAction } from "../../../../foundation/utils/ConnectUtils";
import { push } from "../../../../store/routing/actions/PushAction";
import {
  HistoryContext,
  HistoryContextValues,
} from "../../../../store/routing/HistoryContext";

const HTTP_URL_REG = /^https?:\/\//;
const HASH_URL_REG = /^#/;

const Container = styled.a`
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

export type Props = React.ComponentPropsWithoutRef<"a">;

export type InjectProps = {
  push: DispatchableAction<typeof push>;
};

type State = {};

type InjectedProps = Props & InjectProps;

export class Link extends React.PureComponent<InjectedProps, State> {
  private history: History | null = null;

  public render(): React.ReactNode {
    return (
      <HistoryContext.Consumer>{this.renderInContext}</HistoryContext.Consumer>
    );
  }

  private renderInContext = ({
    history,
  }: HistoryContextValues): React.ReactNode => {
    const { target, rel, ...rest } = this.props;

    this.history = history as History;

    return (
      <Container
        {...rest}
        target={target}
        rel={target === "_blank" && rel == null ? "noopener noreferrer" : rel}
        onClick={this.handleClick}
      />
    );
  };

  private handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (
      this.history == null ||
      this.props.href == null ||
      !!this.props.target ||
      e.button !== 0 ||
      isModifiedMouseEvent(e)
    ) {
      return;
    }

    // ハッシュはデフォルトの挙動を取る
    if (HASH_URL_REG.test(this.props.href)) {
      return;
    }

    // `http` を含む URL の場合は HTMLAnchorElement の動作を止めない
    // (親要素で `preventDefault` が呼ばれている場合は別)
    if (HTTP_URL_REG.test(this.props.href)) {
      return;
    }

    e.preventDefault();

    this.props.push(this.props.href);
  };
}
