import defaultState from "./state";

const menuReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OPEN_MENU": {
      return Object.assign({}, state, {
        isOpen: true,
      });
    }
    case "TEST_ACTION": {
      return Object.assign({}, state, {
        testProperty: action.testPropertyValue,
      });
    }
    case "CLOSE_MENU": {
      return Object.assign({}, state, {
        isOpen: false,
      });
    }
    case "NAVEGAR_RUTA":
      return Object.assign({}, state, {
        isOpen: false,
        ruta: action.ruta,
        params: action.params,
      });

    default:
      return state;
  }
};

export default menuReducer;
