import { Action, Dispatch } from 'redux';
import {
  ThunkAction as ReduxThunkAction,
  ThunkDispatch as ReduxThunkDispatch,
} from 'redux-thunk';
import { RootState } from './reducer';
import { ExtraArgument } from './';

export type GetState = () => RootState;

export type DispatchProp = {
  dispatch: Dispatch;
};

export type ThunkDispatch<A extends Action> = ReduxThunkDispatch<
  RootState,
  ExtraArgument,
  A
>;

export type ThunkAction<R, A extends Action> = ReduxThunkAction<
  R,
  RootState,
  ExtraArgument,
  A
>;
