import { mensajeError } from "../Main/actions";
import fetch from "../../helpers/request";
import uriConfig from "../../config/api";

require('dotenv').config();

export const loading = (flag) => ({
  type: "LOADING_ENROLAMIENTO",
  flag,
});

export const getEnroledPoints = (data) => ({
  type: "OBTENER_PUNTOS_ENROLADOS",
  data,
});

export const obtenerPuntosEnrolados = () => async (dispatch) => {
  try {
    dispatch(loading(true));
    const request = await fetch(`${uriConfig.apiQR.getPuntosEnrolados}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ limit:1000 }),
    }, dispatch).catch((error) => {
      console.log(`error: ${error}`);
    });

    const response = await request.json();
    if (response && response.ok) {
      dispatch(getEnroledPoints(response.data))
      dispatch(loading(false));
    } else {
      dispatch(mensajeError(`Error obteniendo puntos enrolados.`));
      dispatch(loading(false));
    }
  } catch (error) {
    dispatch(mensajeError(`Error obteniendo puntos enrolados`));
    dispatch(loading(false));
  }
}

