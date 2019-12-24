import defaultState from "./state";

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ESCONDER_CONTENIDO_GENERAL":
      return Object.assign({}, state, {
        contenidoVisible: false,
        funcionGuardar: null,
        funcionCerrar: null
      });

    case "MOSTRAR_CONTENIDO_GENERAL":
      return Object.assign({}, state, {
        contenidoVisible: true,
        funcionGuardar: action.funcionGuardar,
        funcionCerrar: action.funcionCerrar,
        vistaContenidoGeneral: action.vistaContenidoGeneral,
      });
    case "SET_ERROR_PAGE":
      return Object.assign({}, state, {
        errorPage: action.errorCode,
      });
    case "MOSTRAR_MENSAJE":
      return Object.assign({}, state, {
        mensaje: {
          texto: action.mensaje,
          esVisible: true,
          tipo: action.tipo,
          closeCLickOut: action.closeCLickOut
        }
      });
    case "OCULTAR_MENSAJE":
      return Object.assign({}, state, { mensaje: { texto: "", esVisible: false, tipo: state.mensaje.tipo } });
    default:
      return state;
  }
};

export default mainReducer;
