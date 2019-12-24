import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import fetch from "../../helpers/request";
import uriConfig from "../../config/api";

require('dotenv').config();

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: (process.env.REACT_APP_DEV_ENV === 'TEST') ? process.env.REACT_APP_APPLICATION_INSIGHTS : process.env.REACT_APP_APPLICATION_INSIGHTS_PROD
  }
});

appInsights.loadAppInsights();

// const azure = require('azure-storage');
// login events
export const loginRequested = (path = "/", params = "") => ({
  type: "LOGIN_REQUESTED",
  route: {
    path,
    route: {
      path,
      params,
    },
  },
});

export const loginSuccess = (token = "") => ({
  type: "LOGIN_SUCCESS",
  token,
});
export const loggedIn = (flag) => ({
  type: "ESTA_LOGEADO",
  flag,
});

export const loginFailure = (loginFailed = true, loginErrors = {
  email: "",
  password: "",
  summary: ""
}) => ({
  type: "LOGIN_FAILURE",
  loginErrors,
  loginFailed,
});

// load profile
export const profileSuccess = (profile) => ({
  type: "PROFILE_SUCCESS",
  profile,
});

export const selectRol = () => ({
  type: "LOAD_ROLE_SELECT",
});

export const roleSelected = (rolId) => ({
  type: "ROLE_SELECTED",
  rolId,
});

// input events
export const emailInputChanged = (email = "") => ({
  type: "EMAIL_INPUT_CHANGED",
  email,
});

export const passwordInputChanged = (password = "") => ({
  type: "PASSWORD_INPUT_CHANGED",
  password,
});

// signout events
export const userHasLogout = () => ({
  type: "USER_HAS_LOGOUT",
});

export const loadStateFromSignUp = (token = "", email = "", accountId = "") => ({
  type: "LOAD_STATE_FROM_SIGNUP",
  token,
  email,
  accountId,
});

export const unexpectedError = (errors) => ({
  type: "UNEXPECTED_ERROR",
  errors,
});

export const hideSnackBar = () => ({
  type: "HIDE_SNACK_BAR",
});

export const crearMenu = (listadoMenu) => ({
  type: "OBTENER_MENU",
  listadoMenu,
});

export const perfilarComponentes = (componentesXRol) => ({
  type: "OBTENER_COMPONENTES",
  componentesXRol,
});

export const validateRequested = () => ({
  type: "VALIDATE_SESSION_REQUESTED",
});

export const validateSuccess = () => ({
  type: "VALIDATE_SESSION_SUCCESS",
});

export const validateFailure = (loginErrors = {
  email: "",
  password: "",
  summary: "Ha finalizado el tiempo de la sesión."
}) => ({
  type: "VALIDATE_SESSION_FAILURE",
  loginErrors,
});


// public methods
export function signOut() {
  return function (dispatch, getState) {
    localStorage.removeItem("cl.ripley.pay.loggedIn");
    dispatch(userHasLogout());
  };
}

export function doLogin(path, params) {
  return  async function (dispatch, getState) {

    dispatch(loginRequested(path, params));

    const state = getState().loginState;

    const { email, password } = state.credentials

    const errors = {
      email: "",
      password: "",
      summary: "Ingrese campos requeridos."
    };

    if (!email || email === "") {
      errors.email = "El usuario es requerido.";
    }

    if (!password || password === "") {
      errors.password = "El password es requerido.";
    }

    if (errors.email || errors.password) {
      dispatch(loginFailure(true, errors));
      return;
    }

    try {
      const request = await fetch(`${uriConfig.apiQR.login}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }, dispatch).catch((error) => {
        console.log(`error: ${error}`);
      });
      const response = await request.json();
      if (response && response.ok) {
        appInsights.trackTrace({
          message: `Sesión iniciada con el usuario ${email}`
        });
        dispatch(profileSuccess(response.profile));
        localStorage.setItem("cl.ripley.pay.loggedIn", true);
        dispatch(loggedIn(true));
      } else {
        errors.summary = response.msg;
        dispatch(loginFailure(true, errors));
      }
    } catch (error) {
      errors.summary = "Error conectando al servidor.";
      dispatch(loginFailure(true, errors));
    }
  }
}
