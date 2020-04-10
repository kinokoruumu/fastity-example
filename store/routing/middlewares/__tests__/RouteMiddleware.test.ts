import { createMemoryHistory, History } from 'history';
import { createMiddlewareStubs, MiddlewareStubs } from '../../../../foundation/redux.mock';
import { go } from '../../actions/GoAction';
import { goBack } from '../../actions/GoBackAction';
import { goForward } from '../../actions/GoForwardAction';
import { push } from '../../actions/PushAction';
import { replace } from '../../actions/ReplaceAction';
import { createRouteMiddleware } from '../RouteMiddleware';

describe('RouteMiddleware', () => {
  let history: History;
  let stubs: MiddlewareStubs;

  beforeEach(() => {
    history = createMemoryHistory();
    stubs = createMiddlewareStubs(createRouteMiddleware(history));
  });

  test('Should call history method', () => {
    expect(history.location.pathname).toBe('/');

    stubs.invoke(push('/path/to'));
    expect(history.location.pathname).toBe('/path/to');

    stubs.invoke(push('/foo'));
    expect(history.location.pathname).toBe('/foo');

    stubs.invoke(replace('/bar'));
    expect(history.location.pathname).toBe('/bar');

    stubs.invoke(go(-1));
    expect(history.location.pathname).toBe('/path/to');

    stubs.invoke(goForward());
    expect(history.location.pathname).toBe('/bar');

    stubs.invoke(goBack());
    expect(history.location.pathname).toBe('/path/to');
  });

  test('Should calls the next function', () => {
    stubs.invoke({ type: '' });
    expect(stubs.next).toHaveBeenCalled();
  });
});
