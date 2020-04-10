import { actionCreator } from './actionCreator';

export type GoBackPayload = void;
export const goBack = actionCreator<GoBackPayload>('GO_BACK');
