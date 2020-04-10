import { actionCreator } from './actionCreator';

export type PushPayload = string;
export const push = actionCreator<PushPayload>('PUSH');
