import { mensajeOk, mensajeError } from "../Main/actions";
import trace from "../../helpers/trace";
import fetch from "../../helpers/request";
import uriConfig from "../../config/api";


require('dotenv').config();

export const loginSuccess = (token = "") => ({
  type: "LOGIN_SUCCESS",
  token,
});
export const loggedIn = (flag) => ({
  type: "ESTA_LOGEADO",
  flag,
});
export const loading = (flag) => ({
  type: "LOADING_ENROLLAMIENTO",
  flag,
});
export const getToken = (token) => ({
  type: "GET_TOKEN",
  token,
});
export const setIdToken = (idToken, refreshToken) => ({
  type: "SET_TOKEN_ID",
  idToken,
  refreshToken,
});

export const qrGeneratedAction = (qrGenerated, qrValue, qrId) => ({
  type: "QR_GENERADO",
  qrGenerated,
  qrValue,
  qrId
});

export const sendingMail = (flag) => ({
  type: "SENDING_MAIL",
  flag,
});
export const mailSended = (flag) => ({
  type: "SENMAIL_SENDED",
  flag,
});
export const cleanStore = () => ({
  type: "CLEAN_STORE",
});


export const cleanStoreEnrolador = () => (dispatch) => {
  dispatch(cleanStore());
}

export const sendMail = (mail, body, b64) => async (dispatch) => {
  try {
    dispatch(sendingMail(true));
    const request = await fetch(`${uriConfig.apiQR.sendMail}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail, body, b64 }),
    }, dispatch).catch((error) => {
      console.log(`error: ${error}`);
    });

    const response = await request.json();
    if (response && response.ok) {
      dispatch(mensajeOk(`Correo enviado a ${mail}.`));
      dispatch(mailSended(true));
    } else {
      dispatch(mensajeError(`Error mandando correo a ${mail}.`));
    }
  } catch (error) {
    dispatch(mensajeError(`Error mandando correo a ${mail}.`));
  }
}

export const generarQR = (comercio, sucursal, caja) => async (dispatch) => {
  try {
    const profile = localStorage.getItem("cl.ripley.profile")
    dispatch(loading(true));
    const request = await fetch(`${uriConfig.apiQR.enrollarPuntoVenta}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comercio,
        caja,
        sucursal,
        profile
      }),
    }, dispatch).catch((error) => {
      console.log(`error: ${error}`);
      dispatch(loading(false));
      dispatch(mensajeError(`Error generando código QR.`));
    });
    if (request) {
      const response = await request.json();
      const {
        resource,
        id
      } = response;
      setTimeout(() => {
        dispatch(loading(false))
        dispatch(qrGeneratedAction(true, resource, id))
      }, 1000);
    } else {
      trace.error("ERROR_GENERANDO_QR");
      dispatch(loading(false))
      dispatch(mensajeError(`Error generando código QR.`));
    }
  } catch (err) {
    trace.error("ERROR_GENERANDO_QR", err);
    dispatch(loading(false))
    dispatch(mensajeError(`Error generando código QR.`));
    // throw err;
  }
};
