import { post } from "../../http";
import { handleError } from "../globalActions";
import utils from "../../utils/Utils";
import { BASE_URL } from "../../constants";
import { utils as strings } from "../../constants/strings/fa";

export const FETCH_LOGIN_REQUEST_ACTION = "FETCH_LOGIN_REQUEST_ACTION";
export const FETCH_LOGIN_SUCCESS_ACTION = "FETCH_LOGIN_SUCCESS_ACTION";
export const FETCH_LOGIN_FAILURE_ACTION = "FETCH_LOGIN_FAILURE_ACTION";
export const FETCH_AUTH_ACTION = "FETCH_AUTH_ACTION";
export const FETCH_LOGOUT_REQUEST_ACTION = "FETCH_LOGOUT_REQUEST_ACTION";
export const CLEAR_LOGIN_REQUEST_ACTION = "CLEAR_LOGIN_REQUEST_ACTION";

export const fetchLoginAction = (username, password) => async (dispatch) => {
  const promise = post(`${BASE_URL}/u/users/login`, {
    username,
    password,
  });
  await handleLogin(dispatch, promise);
};

export const fetchSignupAction =
  (username, password, confirmPassword, name, family, email) =>
  async (dispatch) => {
    const promise = post(`${BASE_URL}/u/users/signup`, {
      username,
      password,
      password_confirmation: confirmPassword,
      name,
      family,
      email,
    });
    await handleLogin(dispatch, promise);
  };

export const fetchAuthAction = () => async (dispatch) => {
  try {
    const response = await post(`${BASE_URL}/u/users/auth`);
    if (utils.isJsonString(response.data) && response.data._result === "1") {
      utils.setLSVariable("user", JSON.stringify(response.data.item));
      dispatch({
        type: FETCH_AUTH_ACTION,
        payload: response.data.item,
      });
    }
  } catch {}
};

export const fetchLogoutAction = () => async (dispatch) => {
  try {
    utils.clearLS();

    await post(`${BASE_URL}/u/users/logout`);
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: FETCH_LOGOUT_REQUEST_ACTION,
  });
};

export const clearLogoutAction = () => async (dispatch) => {
  try {
    utils.clearLS();
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: CLEAR_LOGIN_REQUEST_ACTION,
  });
};

const handleLogin = async (dispatch, promise) => {
  dispatch({ type: FETCH_LOGIN_REQUEST_ACTION });

  try {
    const response = await promise;
    if (!utils.isJsonString(response.data)) {
      dispatch({
        type: FETCH_LOGIN_FAILURE_ACTION,
        payload: strings.notValidJson,
      });

      return;
    }

    if (response.data._result === "1") {
      utils.setLSVariable("user", JSON.stringify(response.data.item));
      window.location.reload();

      return;
    } else {
      handleError(response.data, dispatch);
      dispatch({
        type: FETCH_LOGIN_FAILURE_ACTION,
        payload: response.data._error,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_LOGIN_FAILURE_ACTION,
      payload: error.message,
    });
  }
};
