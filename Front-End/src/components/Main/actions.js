export const esconderContenidoGeneral = () => ({
  type: "ESCONDER_CONTENIDO_GENERAL",
});

// export const cambiarMensajeCerrarSesion = (mensajeCerrarSesion) => ({
//   type: "CAMBIAR_MENSAJE_CERRAR_SESION_MAIN",
//   mensajeCerrarSesion,
// });

// export const mostrarContenidoGeneral = (vistaContenidoGeneral, funcionGuardar, funcionCerrar) => ({
//   type: "MOSTRAR_CONTENIDO_GENERAL",
//   vistaContenidoGeneral,
//   funcionGuardar,
//   funcionCerrar,
// });

// export const setErrorPage = (errorCode) => ({
//   type: "SET_ERROR_PAGE",
//   errorCode,
// });

export const mostrarMensaje = (mensaje, tipo, closeCLickOut) => ({
  type: "MOSTRAR_MENSAJE",
  mensaje,
  tipo,
  closeCLickOut,
});

export const ocultarMensaje = (tipo) => ({
  type: "OCULTAR_MENSAJE",
  tipo
});

function notificar(mensaje, tipo, closeCLickOut) {
  return function (dispatch) {
    dispatch(ocultarMensaje(tipo));
    dispatch(mostrarMensaje(mensaje, tipo, closeCLickOut));
    setTimeout(() => {
      dispatch(ocultarMensaje(tipo));
    }, 1000 * 5);
  };
}

export function mensajeOk(mensaje, closeCLickOut) {
  return function (dispatch) {
    dispatch(notificar(mensaje, "success", closeCLickOut));
  };
}

export function mensajeError(mensaje, closeCLickOut) {
  return function (dispatch) {
    dispatch(notificar(mensaje, "error", closeCLickOut));
  };
}

export function mensajeInfo(mensaje, closeCLickOut) {
  return function (dispatch) {
    dispatch(notificar(mensaje, "info", closeCLickOut));
  };
}

export function mensajeAlerta(mensaje, closeCLickOut) {
  return function (dispatch) {
    dispatch(notificar(mensaje, "warning", closeCLickOut));
  };
}
