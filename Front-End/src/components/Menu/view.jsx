// External
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import Collapse from "@material-ui/core/Collapse";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import ExpandMore from "@material-ui/icons/ExpandMore";
import Icon from "@material-ui/core/Icon";
// import ImageLogo from "../../images/logoMVCA.svg";
import { setTestProperty, closeMenu } from "./actions";
// // import { obtenerListasCombosMantenedores } from "../Mantenedores/actions";
import { navegarRuta } from "../Menu/actions";
import { signOut } from "../Login/actions";
import styles from "./styles";
import "./menu.css";
import routesConfig from "../../config/routes";
import apiConfig from "../../config/api";
import { getProfileData } from "../../helpers/util";
// import { getAllBandeja, limpiarListadoBandeja } from "../Bandeja/actions";
// import { limpiarStoreSimulacionCotizacion } from "../Simulacion/actions"

class Menu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.cargarDependenciasDeRuta = this.cargarDependenciasDeRuta.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.navegar = this.navegar.bind(this);
    this.state = {
      open: false,
      toggle: [],
    };
  }


  onSignOut(e) {
    e.preventDefault();
    this.props.dispatch(signOut());
  }

  cargarDependenciasDeRuta(ruta) {
    this.props.dispatch(closeMenu());
    this.props.dispatch(setTestProperty(ruta));

    const rutaEmpresa = routesConfig.mantenedores.empresa;
    const lista = {};
    switch (ruta) {
      case routesConfig.mantenedores.bono.bonoAuto: {
        lista.bonoAuto = true;
        // // this.props.dispatch(obtenerListasCombosMantenedores(lista));
        // VEHICULO
      break;
      }
      case routesConfig.mantenedores.vehiculo.marca: {
        lista.filtro = null;
        lista.endpoint = apiConfig.apiVehiculo.marca;
        lista.listado = "listadoMarca";
        // // this.props.dispatch(obtenerListasCombosMantenedores(lista));
      break;
      }
      case routesConfig.mantenedores.vehiculo.modelo: {
        // el mantenedor de modelos necesita adicionalmente los datos de tipo de vehiculo y marcas
        // // this.props.dispatch(obtenerListasCombosMantenedores({ filtro: null, endpoint: apiConfig.apiVehiculo.marca, listado: "listadoMarca" }));
        // // this.props.dispatch(obtenerListasCombosMantenedores({ filtro: null, endpoint: apiConfig.apiComun.tipoVehiculo, listado: "tipoVehiculo" }));
        lista.filtro = null;
        lista.endpoint = apiConfig.apiVehiculo.modelo;
        lista.listado = "listadoModelo";
        // // this.props.dispatch(obtenerListasCombosMantenedores(lista));
        break;
      }
      case rutaEmpresa.red: {
        lista.filtro = null;
        lista.endpoint = apiConfig.apiEmpresa.red;
        lista.listado = "listadoRed";
        // this.props.dispatch(obtenerListasCombosMantenedores(lista));
        break;
      }
      case rutaEmpresa.automotora: {
        lista.filtro = null;
        lista.endpoint = apiConfig.apiEmpresa.automotora;
        lista.listado = "listadoAutomotora";
        // this.props.dispatch(obtenerListasCombosMantenedores(lista));
        break;
      }
      case rutaEmpresa.local: {
        lista.filtro = null;
        lista.endpoint = apiConfig.apiEmpresa.local;
        lista.listado = "listadoLocal";
        // this.props.dispatch(obtenerListasCombosMantenedores(lista));
        break;
      }
      case rutaEmpresa.parque: {
        lista.filtro = null;
        lista.endpoint = apiConfig.apiEmpresa.parque;
        lista.listado = "listadoParque";
        // this.props.dispatch(obtenerListasCombosMantenedores(lista));
        // SAC
        break;
      }
      case routesConfig.sac.moduloSac: {
        lista.filtro = null;
        lista.endpoint = apiConfig.apiPersona.persona;
        lista.cliente = {};
        // this.props.dispatch(obtenerListasCombosMantenedores(lista));
        // PERMISO
        break;
      }
      case routesConfig.mantenedores.permiso.rol: {
        lista.filtro = null;
        lista.endpoint = apiConfig.apiPermiso.rol;
        lista.listado = "listadoRol";
        // this.props.dispatch(obtenerListasCombosMantenedores(lista));
        break;
      }
      case routesConfig.mantenedores.permiso.menu: {
        lista.filtro = null;
        lista.endpoint = apiConfig.apiPermiso.menu;
        lista.listado = "listadoMenu";
        // this.props.dispatch(obtenerListasCombosMantenedores(lista));
        break;
      }
      case routesConfig.mantenedores.permiso.usuario: {
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: null,
        //   endpoint: apiConfig.apiPermiso.usuario,
        //   listado: "listadoUsuario",
        // }));
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: null,
        //   endpoint: apiConfig.apiPermiso.rol,
        //   listado: "listadoRol",
        // }));
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: { limitt: 9999, offset: 0 },
        //   endpoint: apiConfig.apiEmpresa.local,
        //   listado: "listadoLocal",
        // }));
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: { codigo: "SECCIONES" },
        //   endpoint: apiConfig.apiParametro.parametro,
        //   listado: "listadoSeccion",
        // }));
        break;
      }
      case routesConfig.mantenedores.parametros.parametro: {
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: null,
        //   endpoint: apiConfig.apiParametro.parametro,
        //   listado: "listadoParametro",
        // }));
        break;
      }
      case routesConfig.mantenedores.permiso.item: {
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: null,
        //   endpoint: apiConfig.apiComun.item,
        //   listado: "listadoItem",
        // }));
        break;
      }
      case routesConfig.mantenedores.asignacion.asignacionCircular: {
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: null,
        //   endpoint: apiConfig.apiPermiso.asignacion,
        //   listado: "listadoAsignacion",
        // }));
        break;
      }
      case routesConfig.mantenedores.busqueda: {
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: null,
        //   endpoint: apiConfig.apiComun.producto,
        //   listado: "listadoProducto",
        // }));
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: null,
        //   endpoint: apiConfig.apiComun.subproducto,
        //   listado: "listadoSubProducto",
        // }));
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: null,
        //   endpoint: apiConfig.apiComun.canal,
        //   listado: "listadoCanal",
        // }));
        break;
      }
      case routesConfig.mantenedores.misSolicitudes: {
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: null,
        //   endpoint: apiConfig.apiComun.producto,
        //   listado: "listadoProducto",
        // }));
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: null,
        //   endpoint: apiConfig.apiComun.subproducto,
        //   listado: "listadoSubProducto",
        // }));
        // this.props.dispatch(obtenerListasCombosMantenedores({
        //   filtro: null,
        //   endpoint: apiConfig.apiComun.canal,
        //   listado: "listadoCanal",
        // }));
        break;
      }
      default: break;
    }
  }

  navegar(e){
    // if (e === routesConfig.bandeja.base) {
    //   // this.props.dispatch(limpiarListadoBandeja());
    //   // this.props.dispatch(getAllBandeja());
    // }
    this.props.dispatch(navegarRuta(e));
  };

  handleClick = (e) => {
    this.setState((state) => ({
      open: !state.open,
      [e]: !this.state[e],
    }));
  };

  build = (items) => {
    let dict = { á: "a", é: "e", í: "i", ó: "o", ú: "u", " ": "-" };
    const menu = [];
    if (items) {
      items.map((item) => {
        // No tiene padre y no tiene hijo
        if (item.padre === 0 && item.submenu.length === 0) {
          const parentItem = (
            <div onClick={this.navegar.bind(this, item.ruta)}>
              <ListItem
                id={(`${item.nombre}-${item.ruta}`).replace(
                  /[^\w]/gi,
                  (char) => { return dict[char] || char; }
                )}
                classes={{ root: "list-item" }}
                button
                key={item.id}
              >
                <ListItemIcon>
                  <Icon className="material-icons icon-menu">{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText classes={{ primary: "list-item-txt" }} primary={item.nombre} />
              </ListItem>
            </div>);
          menu.push(parentItem);
        }
        // else if (item.padre === 0 && item.submenu.length > 0) { // No tiene padre y tiene hijo
        //   const parentWithChild = (
        //     <div>
        //       <ListItem
        //         id={(`${item.nombre}-${item.ruta}`).replace(
        //           /[^\w]/gi,
        //           (char) => { return dict[char] || char; }
        //         )}
        //         classes={{ root: "list-item" }}
        //         button
        //         key={item.id.toString()}
        //         onClick={this.handleClick.bind(this, item.nombre)}
        //       >
        //         <ListItemIcon>
        //           <Icon className="material-icons icon-menu">{item.icon}</Icon>
        //         </ListItemIcon>
        //         <ListItemText classes={{ primary: "list-item-txt" }} primary={item.nombre} />
        //         {this.state[item.nombre] ? <ExpandLess /> : <ExpandMore />}
        //       </ListItem>
        //       <Collapse component="li" in={this.state[item.nombre]} timeout="auto" unmountOnExit>
        //         <List style={{ paddingLeft: "15px" }} disablePadding>
        //           {
        //             this.build(item.submenu)
        //           }
        //         </List>
        //       </Collapse>
        //     </div>);
        //   menu.push(parentWithChild);
        // } else if (item.padre > 0 && item.submenu.length === 0) { // Tiene padre y no tiene hijo
        //   const childItem = (
        //     <div onClick={this.navegar.bind(this, item.ruta)}>
        //       <ListItem
        //         id={(`${item.nombre}-${item.ruta}`).replace(
        //           /[^\w]/gi,
        //           (char) => { return dict[char] || char; }
        //         )}
        //         classes={{ root: "list-item" }}
        //         button
        //         key={item.id}
        //         onClick={() => this.cargarDependenciasDeRuta(item.ruta)}
        //       >
        //         <ListItemIcon>
        //           <Icon className="material-icons icon-menu">{item.icon}</Icon>
        //         </ListItemIcon>
        //         <ListItemText classes={{ primary: "list-item-txt" }} primary={item.nombre} />
        //       </ListItem>
        //     </div>);
        //   menu.push(childItem);
        // } else if (item.padre > 0 && item.submenu.length > 0) { // Tiene padre y tiene hijo
        //   const childWithChild = (
        //     <div>
        //       <ListItem
        //         id={(`${item.nombre}-${item.ruta}`).replace(
        //           /[^\w]/gi,
        //           (char) => { return dict[char] || char; }
        //         )}
        //         classes={{ root: "list-item" }}
        //         button
        //         key={item.id.toString()}
        //         onClick={this.handleClick.bind(this, item.nombre)}
        //       >
        //         <ListItemIcon>
        //           <Icon className="material-icons icon-menu">{item.icon}</Icon>
        //         </ListItemIcon>
        //         <ListItemText classes={{ primary: "list-item-txt" }} primary={item.nombre} />
        //         {this.state[item.nombre] ? <ExpandLess /> : <ExpandMore />}
        //       </ListItem>
        //       <Collapse component="li" in={this.state[item.nombre]} timeout="auto" unmountOnExit>
        //         <List style={{ paddingLeft: "15px" }} disablePadding>
        //           {
        //             this.build(item.submenu)
        //           }
        //         </List>
        //       </Collapse>
        //     </div>
        //   );
        //   menu.push(childWithChild);
        // }
        return undefined;
      });
    }
    return menu;
  }



  render() {
    const userProfile= getProfileData();
    return (
      <div id="menu-view">
        <List>
          <ListItem>
            <div style={styles.wrapLogo} >
              {/* <img style={styles.logo} src={ImageLogo} alt="Logo" /> */}
            </div>
          </ListItem>
            { (userProfile.rol ===1 || userProfile.rol ===0) && <div onClick={this.navegar.bind(this, "/Enrollar/view")}>
            <ListItem
                classes={{ root: "list-item" }}
                button
                className={this.props.testProperty === "/Enrollar/view" && "active"}
              >
              <ListItemIcon>
                  <Icon className="material-icons icon-menu">home</Icon>
                </ListItemIcon>
                <ListItemText classes={{ primary: "list-item-txt" }} primary="Enrolar punto de venta" />
              </ListItem>
          </div>}
          {(userProfile.rol ===2 || userProfile.rol ===0) &&<div onClick={this.navegar.bind(this, "/PuntosEnrolados/view")}>
            <ListItem
                classes={{ root: "list-item" }}
                button
                className={this.props.testProperty === "/PuntosEnrolados/view" && "active"}
              >
              <ListItemIcon>
                  <Icon className="material-icons icon-menu">dashboard</Icon>
                </ListItemIcon>
                <ListItemText classes={{ primary: "list-item-txt" }} primary="Administrar puntos de venta" />
              </ListItem>
          </div>}
          {this.build(this.props.mainMenu)}

            <ListItem id="cerrar-sesion-menu" name="cerrar-sesion-menu" classes={{ root: "list-item" }} button onClick={this.onSignOut}>
            <ListItemIcon>
                <Icon className="material-icons icon-menu">exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText classes={{ primary: "list-item-txt" }} primary="Cerrar Sesión" />
          </ListItem>
        </List>
      </div>
    );
  }
}

Menu.propTypes = {
  dispatch: PropTypes.any.isRequired,
  testProperty: PropTypes.any,
  mainMenu: PropTypes.any,
};

Menu.defaultProps = {
  mainMenu: [],
  testProperty: undefined,
};

const mapStateToProps = (state) => ({
  testProperty: state.menu.testProperty,
  isOpen: state.menu.isOpen,
  userProfile: state.loginState.profile,
  error: state.loginState.errors.summary,
  ruta: state.menu.ruta,
  menuIsOpen: state.menu.isOpen,
  mainMenu: JSON.parse(localStorage.getItem("cl.tanner.monaco.menu")),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
