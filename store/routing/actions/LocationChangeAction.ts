import { RouteState } from '../reducer';
import { actionCreator } from './actionCreator';

export type LocationChangePayload = RouteState;
export const locationChange = actionCreator<LocationChangePayload>('LOCATION_CHANGE');
