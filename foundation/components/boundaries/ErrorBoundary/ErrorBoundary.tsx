import React from "react";
import shallowEqual from "shallowequal";

export type Props = {
  children: React.ReactNode;
  fallbackElement: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.PureComponent<Props, State> {
  public state: State = {
    hasError: false,
  };

  public componentDidUpdate(prevProps: Props): void {
    if (
      this.state.hasError === true &&
      !shallowEqual(this.props.children, prevProps.children)
    ) {
      this.setState({
        hasError: false,
      });
    }
  }

  public componentDidCatch(): void {
    this.setState({
      hasError: true,
    });
  }

  public render(): React.ReactNode {
    const { children, fallbackElement } = this.props;
    const { hasError } = this.state;

    return hasError ? fallbackElement : children;
  }
}
