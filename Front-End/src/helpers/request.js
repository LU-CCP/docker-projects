import "whatwg-fetch";
import { userHasLogout } from "../components/Login/actions";


/**
 * Comprueba el estado del request
 * @param  {function} dispatch se usa para despachar la acción de logout si corresponde.
 * @param  {object} response respuesta de la petición.
 * @returns {object} retorna la respuesta de la petición.
 */
function checkStatus(dispatch, response) {
  if (response.status === 401 && dispatch !== undefined) {
    dispatch(userHasLogout());
  }
  return response;
}

/**
 * Genera un request a una URL, retorn una promesa.
 * @param  {string} url la URL a la cual haremos el request.
 * @param  {object} options el objeto options que pasaríamos a un fetch convencional.
 * @param  {function} dispatch función necesaria para hacer logout si el request no es autorizado.
 * @returns {object}  retorna la respuesta de la petición.
 */
export default function request(url, options, dispatch) {
  if (options === undefined || dispatch === undefined || url === undefined) {
    throw new Error("Faltan parametros obligatorios para el request.");
  }

  if (!Object.prototype.hasOwnProperty.call(options, "headers")) {
    options.headers = { };
  }

  // options.headers.Authorization = process.env.REACT_APP_AUTHORIZATION_TOKEN;
  options.headers["Content-Type"] = "application/json";
  // options.headers["Monaco-T1"] = localStorage.getItem("cl.tanner.monaco.t1");

  return fetch(url, options)
    .then(checkStatus.bind(null, dispatch));
}
