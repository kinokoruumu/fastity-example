import { actionCreator } from './actionCreator';

export type GoPayload = number;
export const go = actionCreator<GoPayload>('GO');
