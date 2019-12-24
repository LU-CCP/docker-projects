import defaultState from "./state";

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "PROFILE_SUCCESS": {
      const { profile } = action;

      localStorage.setItem("cl.ripley.profile", JSON.stringify(profile));

      return Object.assign({}, state, {
        isFetching: false,
        errors: { email: "", password: "", summary: "" },
        profile,
      });
    }
    case "LOAD_ROLE_SELECT": {
      return Object.assign({}, state, {
        loadRoleForm: true,
      });
    }
    case "ESTA_LOGEADO":
      return Object.assign({}, state, {
        isLoggedIn: action.flag,
      });
    case "ROLE_SELECTED": {
      const perfil = Object.assign({}, state.profile, { rol: action.rolId });
      return Object.assign({}, state, {
        profile: perfil,
        loadRoleForm: false,
      });
    }
    case "LOGIN_REQUESTED": {
      return Object.assign({}, state, {
        isFetching: true,
        route: action.route,
      });
    }
    case "LOGIN_SUCCESS": {
      return Object.assign({}, state, {
        isFetching: false,
        token: action.token,
        loginFailed: false,
        isLoggedIn: true,
        errors: { email: "", password: "", summary: "" },
      });
    }
    case "VALIDATE_SESSION_REQUESTED": {
      return Object.assign({}, state, {
        isFetching: true,
        route: action.route,
      });
    }
    case "VALIDATE_SESSION_SUCCESS": {
      return Object.assign({}, state, {
        isFetching: false,
      });
    }
    case "VALIDATE_SESSION_FAILURE": {
      return Object.assign({}, state, {
        isLoggedIn: false,
        errors: action.loginErrors,
      });
    }
    case "OBTENER_MENU": {
      return Object.assign({}, state, {
        listMenu: action.listadoMenu,
      });
    }
    case "OBTENER_COMPONENTES": {
      return Object.assign({}, state, {
        componentes: action.componentesXRol,
      });
    }
    case "LOGIN_FAILURE": {
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: false,
        loginFailed: action.loginFailed,
        token: "",
        token2: "",
        errors: action.loginErrors,
      });
    }
    case "UNEXPECTED_ERROR": {
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: false,
        loginFailed: true,
        errors: action.errors,
      });
    }
    case "EMAIL_INPUT_CHANGED": {
      const credentials = {
        email: action.email,
        password: state.credentials.password,
      };

      return Object.assign({}, state, {
        credentials,
      });
    }
    case "PASSWORD_INPUT_CHANGED": {
      const credentials = {
        email: state.credentials.email,
        password: action.password,
      };

      return Object.assign({}, state, {
        credentials,
      });
    }
    case "LOAD_STATE_FROM_SIGNUP": {
      return Object.assign({}, state, {
        isFetching: false,
        accountId: action.accountId,
        credentials: { email: action.email, password: "" },
        errors: { email: "", password: "", summary: "" },
      });
    }
    case "LIST_MENU": {
      return Object.assign({}, state, {
        mainMenu: action.menuList,
      });
    }
    case "HIDE_SNACK_BAR": {
      return Object.assign({}, state, {
        loginFailed: false,
      });
    }
    case "USER_HAS_LOGOUT": {
      return defaultState;
    }
    // Reducers should always return a state.
    default:
      return state;
  }
};

export default loginReducer;
