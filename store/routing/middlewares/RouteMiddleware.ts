import { History } from 'history';
import { Middleware } from 'redux';
import { go } from '../actions/GoAction';
import { goBack } from '../actions/GoBackAction';
import { goForward } from '../actions/GoForwardAction';
import { push } from '../actions/PushAction';
import { replace } from '../actions/ReplaceAction';

export function createRouteMiddleware(history: History): Middleware {
  return () => (next) => (action) => {
    if (push.match(action)) {
      history.push(action.payload);
    } else if (replace.match(action)) {
      history.replace(action.payload);
    } else if (go.match(action)) {
      history.go(action.payload);
    } else if (goBack.match(action)) {
      history.goBack();
    } else if (goForward.match(action)) {
      history.goForward();
    } else {
      return next(action);
    }
  };
}
