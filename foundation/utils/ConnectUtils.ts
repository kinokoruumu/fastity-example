import { ThunkAction, ThunkDispatch } from '../../store/types';

type AnyActionFunc = (...args: any[]) => any;

export type ThunkActionReturnType<T extends AnyActionFunc> = T extends (
  ...args: any[]
) => ThunkAction<infer R, any>
  ? R
  : never;

export type DispatchableAction<T extends AnyActionFunc> = (
  ...args: Parameters<T>
) => ThunkActionReturnType<T>;

export function dispatchable<T extends AnyActionFunc>(
  dispatch: ThunkDispatch<ReturnType<T>>,
  action: T,
): DispatchableAction<T> {
  return ((...args: any[]) => dispatch(action(...args))) as any;
}
