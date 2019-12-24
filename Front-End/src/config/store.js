// External
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { logger } from "redux-logger";

// Default States
import mainState from "../components/Main/state";
import menuState from "../components/Menu/state";
import loginState from "../components/Login/state";
import enrolladorState from "../components/Enrollar/state";
import enroledPointsState from "../components/PuntosEnrolados/state";

// Reducers
import mainReducer from "../components/Main/reducer";
import menuReducer from "../components/Menu/reducer";
import loginReducer from "../components/Login/reducer";
import enrolladorReducer from "../components/Enrollar/reducer";
import enroledPointsReducer from "../components/PuntosEnrolados/reducer";

const rootState = {
  main: mainState,
  menu: menuState,
  loginState,
  enrolladorState,
  enroledPointsState,
};

const appReducer = combineReducers({
  main: mainReducer,
  menu: menuReducer,
  loginState: loginReducer,
  enrolladorState:enrolladorReducer,
  enroledPointsState:enroledPointsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_HAS_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

const middlewares = [];
let store = {};
middlewares.push(thunkMiddleware);

if (process.env.NODE_ENV === "development") {
  // Adds logs to debug state changes
  middlewares.push(logger);

  const composeEnhancers =
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  store = createStore(rootReducer, rootState, enhancer);
} else {
  store = createStore(
    rootReducer,
    rootState,
    applyMiddleware(...middlewares)
  );
}

export default store;
