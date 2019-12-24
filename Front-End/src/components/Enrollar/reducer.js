import defaultState from "./state";

const enrolladorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "USER_HAS_LOGOUT": {
      return defaultState;
    }
    case "LOADING_ENROLLAMIENTO": {
      return Object.assign({}, state, {
        loading: action.flag,
      });
    }
    case "SENMAIL_SENDED": {
      return Object.assign({}, state, {
        mailSended: action.flag,
      });
    }
    case "CLEAN_STORE": {
      return Object.assign({}, state, {
        comercio: "",
        sucursal: "",
        caja: "",
        comercioLabel: "",
        sucursalLabel: "",
        loading: false,
        email: "",
        share: false,
        mailSended:false,
        qrGenerated:false,
      });
    }


    case "SENDING_MAIL": {
      return Object.assign({}, state, {
        sendingMail: action.flag,
      });
    }

    case "GET_TOKEN": {
      return Object.assign({}, state, {
        token: action.token,
      });
    }
    case "SET_TOKEN_ID": {
      return Object.assign({}, state, {
        idToken: action.idToken,
      });
    }
    case "QR_GENERADO": {
      const { qrGenerated, qrValue, qrId } = action;
      return Object.assign({}, state, {
        loading: false,
        qrGenerated,
        qrValue,
        qrId,
      });
    }
    default:
      return state;
  }
};

export default enrolladorReducer;
