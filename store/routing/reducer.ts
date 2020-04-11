import { Action } from 'history';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { HttpStatusCode } from '../../foundation/utils/StatusCodeUtils';
import { locationChange } from './actions/LocationChangeAction';

export type RouteParams = {
  [key: string]: string;
};

export type RouteState = {
  key: string;
  action: Action;
  pathname: string;
  search: string;
  hash: string;
  params: RouteParams;
  status: HttpStatusCode;
};

export const initialState: RouteState = {
  key: '',
  action: 'PUSH',
  pathname: '/',
  search: '',
  hash: '',
  params: {},
  status: HttpStatusCode.OK,
};

export const routeReducer = reducerWithInitialState<RouteState>(
  initialState,
).case(locationChange, (state, payload) => ({
  ...state,
  ...payload,
}));
