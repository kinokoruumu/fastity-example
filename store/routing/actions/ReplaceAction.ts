import { actionCreator } from './actionCreator';

export type ReplacePayload = string;
export const replace = actionCreator<ReplacePayload>('REPLACE');
