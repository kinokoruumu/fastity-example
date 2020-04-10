import { actionCreator } from "./actionCreator";

export type UpdateFatalPayload = boolean;

export const updateFatal = actionCreator<UpdateFatalPayload>("UPDATE_FATAL");
