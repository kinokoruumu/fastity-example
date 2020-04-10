import { connect } from "react-redux";
import { RootState } from "../../../../store/reducer";
import { RouteRenderer as Component } from "./RouteRenderer";
import { dispatchable } from "../../../../foundation/utils/ConnectUtils";
import { locationChange } from "../../actions/LocationChangeAction";
import { replace } from "../../actions/ReplaceAction";
import { updateFatal } from "../../../app/actions/UpdateFatalAction";

export const RouteRenderer = connect(
  (state: RootState) => ({
    app: state.app,
    routing: state.routing,
  }),
  (dispatch) => ({
    replace: dispatchable(dispatch, replace),
    locationChange: dispatchable(dispatch, locationChange),
    updateFatal: dispatchable(dispatch, updateFatal),
  }),
)(Component);
