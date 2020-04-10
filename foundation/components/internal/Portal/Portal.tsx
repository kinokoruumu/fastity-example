import React from "react";
import ReactDOM from "react-dom";

export type Props = {
  children: React.ReactNode;
  onRendered?: Function;
  prepend?: boolean;
};

type State = {
  mounted: boolean;
};

export class Portal extends React.PureComponent<Props, State> {
  public state: State = {
    mounted: false,
  };

  private wrapper: HTMLElement | null = null;

  public componentDidMount(): void {
    const { onRendered } = this.props;

    if (this.wrapper == null) {
      this.wrapper = document.createElement("div");
      this.wrapper.className = "portal";
    }

    if (this.props.prepend) {
      document.body.insertBefore(this.wrapper, document.body.firstChild);
    } else {
      document.body.appendChild(this.wrapper);
    }

    this.setState({
      mounted: true,
    });

    if (onRendered != null) {
      this.forceUpdate(() => {
        onRendered();
      });
    }
  }

  public componentWillUnmount(): void {
    if (this.wrapper != null) {
      document.body.removeChild(this.wrapper);
      this.wrapper = null;
    }
  }

  public render(): React.ReactNode {
    const { children } = this.props;
    const { mounted } = this.state;

    if (!mounted || this.wrapper == null) {
      return null;
    }

    return ReactDOM.createPortal(children, this.wrapper);
  }
}
