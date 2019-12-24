// External
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ActionReorder from "@material-ui/icons/Reorder";
import IconoNotificacion from "@material-ui/icons/NotificationsNone";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
// import { Scrollbars } from "react-custom-scrollbars";
import { Divider } from "@material-ui/core";
import CerrarIcon from "@material-ui/icons/PowerSettingsNew";
import Profile from "../../images/maleUser.png";
// import ImageLogo from "../../images/logoMVCA.svg";
import { signOut } from "../Login/actions";
import { getProfileData } from "../../helpers/util";


import styles from "./styles";

// importamos el theme
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MonacoTheme from "../../config/MonacoTheme";
import MenuList from "../Menu/view";
import { openMenu, closeMenu, navegarRuta } from "../Menu/actions";

const obtenerNombreCompleto = (profile) => {
  const nombre = profile.nombres !== null ? profile.nombres : "";
  const apellidos = profile.apellidos !== null ? profile.apellidos : "";
  return `${nombre} ${apellidos}`;
};


class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onSignOut = this.onSignOut.bind(this);
    this.handleSingIn = this.handleSingIn.bind(this);
    this.navegar = this.navegar.bind(this);
    this.state = {
      auth: true,
      anchorEl: null,
      anchorElProfile: null,
    };
  }



  navegar = (e) => {
    this.props.dispatch(navegarRuta(e));
  };

  componentDidMount() {
    // this.props.dispatch(getComunas());

  }

    /**
* Función encargada de mantener de captar los cambios en los props y setearlos en el state.
* @method componentWillReceiveProps
* @param {object} newProps : Nuevos Props
* @returns {undefined}
*/
componentWillReceiveProps(newProps) {

}



  onSignOut(e) {
    e.preventDefault();
    this.props.dispatch(signOut());
  }

  handleSingIn() {
    console.log("handleSingIn");
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });

    if (side === "left") {
      this.props.dispatch(openMenu());
    } else if (side === "hide") {
      this.props.dispatch(closeMenu());
    }
  };

  handleChange = (e, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleMenuProfile = (e) => {
    this.setState({ anchorElProfile: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ anchorElProfile: null });
  };


  render() {
    const { auth, anchorEl, anchorElProfile } = this.state;
    const openLista = Boolean(anchorEl);
    const openCard = Boolean(anchorElProfile);
    const userProfile= getProfileData();

    return (
      <div id="barra-tanner-sup" className="barra-tanner">
        <MuiThemeProvider muiTheme={MonacoTheme}>
          <AppBar position="static" style={styles.header} className="t-inicio-5">
            <Toolbar>
              <IconButton id="menu-lateral" className="btn-order t-inicio-2" onClick={this.toggleDrawer("left", true)} >
                <ActionReorder />
              </IconButton>
              <Drawer
                  id="drawer-menu"
                  open={this.props.menuIsOpen}
                  classes={{
                  paper: "contenedor-drawer-paper",
                }}
                  onClose={this.toggleDrawer("hide", false)}
                >
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={this.toggleDrawer("hide", false)}
                  >
                  <MenuList />
                  </div>
                </Drawer>
              {/* logotipo */}
              <div className="wrap-logo-header">
                  {/* <div onClick={this.navegar.bind(this, "/Inicio/view")}><img id="logo-nav-bar" style={styles.logo} src={ImageLogo} alt="logo" /></div> */}
                </div>
              {auth && (
                <div className="wrap-menu-barra">
                  <ul>
                    {/* { estadoCotizacion==="cotizacion" &&
                    <HeaderResumen></HeaderResumen>
                    } */}

                      <li className="t-inicio-3 hide">
                      <IconButton
                        id="btnNotificacion"
                        aria-owns="menu-notificaciones"
                        aria-haspopup="true"
                        tooltip="Notificaciones"
                        className="icon-notificacion"
                        onClick={this.handleMenu}
                        tooltipPosition="bottom-left"
                      >
                        <IconoNotificacion />
                      </IconButton>
                      <Menu
                          id="menu-notificaciones"
                          classes={{
                          paper: "contenedor-air-menu-lista",
                        }}
                          anchorEl={anchorEl}
                          anchorPosition={{ top: 50, left: 0 }}
                          anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                          transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                          open={openLista}
                          onClose={this.handleClose}
                        >
                        <div className="contenedor-air-menu-lista">
                            <List component="nav">
                            <ListItem>
                                <ListItemText primary="Nuevas Notificaciones" />
                              </ListItem>
                              <Divider />
                              </List>
                          </div>
                        </Menu>
                    </li>
                    <li>
                        <div className="division-menu"></div>
                      <div className="nombreUsuario ocultar-nombre"  id="Div_NombreUsuario" >
                            <div>{userProfile.email}</div>
                        { userProfile.rol ===1 && <span>Vendedor</span>}
                        { userProfile.rol ===2 && <span>Operaciones</span>}
                          </div>
                      </li>
                      <li className="t-inicio-4">
                      <IconButton
                          aria-owns="menu-appbar"
                          aria-haspopup="true"
                          className="icon-profile"
                          onClick={this.handleMenuProfile}
                        >
                        <Avatar
                          src={Profile}
                        />
                        </IconButton>
                      <Menu
                        id="menu-appbar"
                          anchorEl={anchorElProfile}
                        classes={{
                          paper: "contenedor-air-menu",
                        }}
                        anchorPosition={{ top: 50, left: 0 }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                          open={openCard}
                        onClose={this.handleClose}
                        >
                              <div className="contenedor-air-menu-profile">
                          <div className="img-wrap-air-menu">
                                  <img src={Profile} alt="perfil" />
                                </div>
                            <div className="datos-personales-air-menu m-t">
                            <div className="air-menu titulo">{obtenerNombreCompleto(userProfile)}</div>
                            <div className="air-menu subtitulo">{userProfile.email}</div>
                                <div className="air-menu subtitulo">Versión: {process.env.REACT_APP_APP_VERSION}</div>
                          </div>
                              <div className="m-t hide">
                            <Button onClick={this.handleClose} variant="contained" className="btn-primary-2" color="primary" size="small">Mi Cuenta</Button>
                          </div>
                          </div>
                        <Divider />
                        <ListItem id="cerrar-sesion-header" name="cerrar-sesion-header" button onClick={this.onSignOut}>
                            <ListItemText primary="Cerrar Sesión" />
                            <ListItemIcon>
                            <CerrarIcon style={styles.icon} />
                          </ListItemIcon>
                          </ListItem>
                      </Menu>
                    </li>
                  </ul>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>

    );
  }
}
Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.loginState.isLoggedIn,
  // userProfile: state.loginState.profile,
  menuIsOpen: state.menu.isOpen,
  //estadoCotizacion: state.simulacion.etapa,
  tour: state.loginState.profile.preferencias !== undefined ? state.loginState.profile.preferencias.tour : false,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
