import utils from "../../utils/Utils";
import * as actions from "./userActions";

const primaryState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const initialState = {
  isAuthenticated: !!utils.getLSUser(),
  user: utils.getLSUser() ?? null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_LOGIN_REQUEST_ACTION:
      return { ...state, loading: true, error: null };
    case actions.FETCH_LOGIN_SUCCESS_ACTION:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        loading: false,
        error: null,
      };
    case actions.FETCH_AUTH_ACTION:
      return {
        ...state,
        user: payload,
      };
    case actions.FETCH_LOGIN_FAILURE_ACTION:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };
    case actions.FETCH_LOGOUT_REQUEST_ACTION:
      return { ...primaryState };
    case actions.CLEAR_LOGIN_REQUEST_ACTION:
      return { ...primaryState };
    default:
      return state;
  }
};

export default userReducer;
