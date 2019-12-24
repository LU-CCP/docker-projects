import defaultState from "./state";

const enroledPointsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOADING_ENROLAMIENTO": {
      return Object.assign({}, state, {
        loading: action.flag,
      });
    }
    case "OBTENER_PUNTOS_ENROLADOS": {
      return Object.assign({}, state, {
        enroledPoints: action.data,
      });
    }
    default:
      return state;
  }
};

export default enroledPointsReducer;
