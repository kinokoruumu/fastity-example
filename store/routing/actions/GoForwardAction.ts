import { actionCreator } from './actionCreator';

export type GoForwardPayload = void;
export const goForward = actionCreator<GoForwardPayload>('GO_FORWARD');
