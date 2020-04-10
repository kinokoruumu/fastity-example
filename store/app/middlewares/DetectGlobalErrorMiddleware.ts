import { Middleware } from "redux";
import { FatalHttpError } from "../../../foundation/utils/HttpUtils";
import { updateFatal } from "../actions/UpdateFatalAction";

/**
 * 各種 Action の payload or meta から、アプリケーションの状態遷移
 *
 * fatal: `fatal` フラグを立てる (エラー表示を行う)
 */
export function createDetectGlobalErrorMiddleware(): Middleware {
  return (store) => (next) => (action) => {
    if (
      action.error === true &&
      action.meta != null &&
      action.meta.fatal === true
    ) {
      if (action.payload == null) {
        store.dispatch(updateFatal(true));
        throw new FatalHttpError();
      }
    }

    return next(action);
  };
}
