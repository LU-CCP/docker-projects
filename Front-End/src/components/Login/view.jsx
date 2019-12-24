import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from "@material-ui/icons/MailOutline";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { IconButton } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import "./login.css";
import ImgLogo from "../../images/logoMVCA_azul.png";
import CustomSnackBar from "../ComponentesGenericos/snackBar/customSnackBar";
import { doLogin, emailInputChanged, passwordInputChanged, loginFailure, hideSnackBar } from "./actions";
import MonacoTheme from "../../config/MonacoTheme";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.props.dispatch(loginFailure(false)); // resets error state
    this.state = {
      showPassword: false,
    };
  }

  componentWillReceiveProps(newProps){
    const {roles} = this.props;
    if(roles !== newProps.roles && newProps.roles.length > 0){
      this.setState({rol: newProps.roles[0].rolId});
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(doLogin("/", ""));
  }



  onChange(e) {
    switch (e.target.name) {
      case "email":
        this.props.dispatch(emailInputChanged(e.target.value));
        return;
      case "password":
        this.props.dispatch(passwordInputChanged(e.target.value));
        break;
      default:
    }
  }

  handleClose = () => {
    this.props.dispatch(hideSnackBar());
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  render() {
    /* eslint-disable */
    if (this.props.isLoggedIn) {
      if (this.props.route) {
        const qs = queryString.stringify(this.props.route.params);
        return (<Redirect to={`${this.props.route.path}?${qs}`} />);
      }
      return (<Redirect to="/" />);
    }

    const loginForm = (<form action="/" onSubmit={this.onSubmit}>
      <div className="wrap-logo">
        <img src={ImgLogo} alt="logo" />
      </div>
      <div className="txt-bajada">
       Utiliza tu <b>Usuario Ripley</b> para ingresar a la aplicación.
      </div>
      <div className="wrap-formulario">
        <div className="wrap-input">
          <FormControl className="input-1">

            <TextField
            label="Email"
              id="adornment-email"
              type="email"
              name="email"
              variant="outlined"
              onChange={this.onChange}
              errortext={this.props.errors.email}
              endAdornment={
                <InputAdornment position="start">
                  <MailOutline />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="wrap-input">
          <FormControl className="input-1">

            <TextField
            label="Contraseña"
              id="adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              onChange={this.onChange}
              name="password"
              errortext={this.props.errors.password}
              value={this.props.credentials.password}
              variant="outlined"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>

      <div className="wrap-botones">
        <Button id="iniciar-sesion-btn" type="submit" variant="contained" color="primary" className="btn-block" disabled={!!this.props.isFetching}>
          {this.props.isFetching && <CircularProgress size={20} className="m-r" />}
          Iniciar Sesión
        </Button>
        {/* ESTA FUNCIONALIDAD NO ESTARÁ DISPONIBLE POR AHORA */}
        {/* <Button id="olvido-contraseña-btn" color="primary" className="btn-block">¿ Olvidaste tu contraseña ?</Button> */}
        <div className="air-menu subtitulo m-t-lg">Versión: {process.env.REACT_APP_APP_VERSION}</div>
      </div>

      <CustomSnackBar
        open={this.props.loginFailed}
        message={<span id="message-id">{this.props.errors.summary}</span>}
        variant="error"
        handleClose={() => this.handleClose()}
      />
                       </form>);

    const form = [];

    if (!this.props.isLoggedIn) {
      form.push(loginForm);
    }
    return (
      <MuiThemeProvider theme={MonacoTheme}>
        <div id="login-view" className="wrap-login">
          <div className="seccion-1-login bg-login">
            <div className="img-auto"></div>
            <div className="img-personas"></div>
          </div>
          <div className="seccion-2-login">
            { form }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Login.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  loginFailed: PropTypes.bool,
  errors: PropTypes.object,
  credentials: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  loadRoleForm: PropTypes.bool.isRequired,
  roles: PropTypes.arr,
};

Login.defaultProps = {
  loginFailed: false,
  errors: false,
  credentials: false,
  roles: [],
};

const mapStateToProps = (state) => ({
  credentials: { email: state.loginState.credentials.email, password: state.loginState.credentials.password },
  loginFailed: state.loginState.loginFailed,
  isLoggedIn: state.loginState.isLoggedIn,
  isFetching: state.loginState.isFetching,
  errors: state.loginState.errors,
  roles: state.loginState.profile.roles,
  // rol: state.loginState.loadRoleForm ? null : state.loginState.profile.rol,
  // loadRoleForm: state.loginState.loadRoleForm,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
