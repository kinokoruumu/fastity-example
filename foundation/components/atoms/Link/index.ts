import { connect } from 'react-redux';
import { dispatchable } from '../../../../foundation/utils/ConnectUtils';
import { push } from '../../../../store/routing/actions/PushAction';
import { Link as Container, Props } from './Link';

export { Props };

export const Link = connect(null, (dispatch) => ({
  push: dispatchable(dispatch, push),
}))(Container);
