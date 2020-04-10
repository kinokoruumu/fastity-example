import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { ErrorBoundary } from "../../components/boundaries/ErrorBoundary";
import { GlobalStyle } from "../../styles/globalStyle";

export type Props = {
  children: React.ReactNode;
};

export type InjectProps = {};

type InjectedProps = Props & InjectProps;

type State = {};

const Main = styled.main`
  display: block;
`;

export class AppContainer extends React.PureComponent<InjectedProps, State> {
  public render(): React.ReactNode {
    const { children } = this.props;

    return (
      <>
        <GlobalStyle />
        <Helmet>
          <title>タイトル</title>
        </Helmet>
        <Main>
          <ErrorBoundary fallbackElement={<h1>404</h1>}>
            {children}
          </ErrorBoundary>
        </Main>
      </>
    );
  }
}
