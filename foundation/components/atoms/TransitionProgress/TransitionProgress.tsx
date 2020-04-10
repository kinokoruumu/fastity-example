import React from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { LoadingBar, Props as LoadingBarProps } from "./internal/LoadingBar";
import { Portal } from "../../internal/Portal";

const Wrapper = styled.span`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  display: none;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: opacity;

  &.transition-progress-enter,
  &.transition-progress-enter-done,
  &.transition-progress-exit {
    display: block;
  }

  &.transition-progress-enter {
    opacity: 0;
    transition-duration: 280ms;
  }

  &.transition-progress-enter-active {
    opacity: 1;
  }

  &.transition-progress-exit {
    opacity: 1;
    transition-duration: 220ms;
  }

  &.transition-progress-exit-active {
    opacity: 0;
  }
`;

export type Props = LoadingBarProps & {
  show: boolean;
};

export const TransitionProgress = ({ show, ...rest }: Props) => (
  <Portal>
    <CSSTransition
      in={show}
      classNames="transition-progress"
      appear={true}
      mountOnEnter={true}
      timeout={show ? 150 : 75}
    >
      <Wrapper>
        <LoadingBar {...rest} />
      </Wrapper>
    </CSSTransition>
  </Portal>
);
