// External
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../Login/view";
import { loggedIn } from "../Login/actions";
import routesConfig from "../../config/routes";
import Header from "../Header/view";

import { getProfileData } from "../../helpers/util";
import PuntosEnrolados from "../PuntosEnrolados/view";
import EnrollarPuntoVenta from "../Enrollar/view";
import ContenidoGeneral from "./contenidoGeneral";


//necesarios para mostrar los mensajes de usuario
import { ocultarMensaje } from "../../components/Main/actions";
import CustomSnackBar from "../ComponentesGenericos/snackBar/customSnackBar";
// import { ErrorHandler } from "../ErrorHandler/view";

/**
 * Modulo de control de routing (Main)
 *
 * @param {object} props : Props de react
 * @returns {JSX} : Componente Main
 *
 */
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state ={
      isLoggedIn: false,
    }
  }

  /**
  * Función que se ejecuta despues del constructor. En este componente se comprueba el login exitoso.
  * @method componentDidMount
  * @return {undefined}
  */

  componentDidMount() {
     const { isLoggedIn, dispatch } = this.props;
     if (!isLoggedIn) {
        const flag = localStorage.getItem("cl.ripley.pay.loggedIn") || false;
         dispatch(loggedIn(flag));
     }
    //   const t1 = localStorage.getItem("cl.tanner.monaco.t1") || "";
    //   const t2 = localStorage.getItem("cl.tanner.monaco.t1") || "";
    //   const role = localStorage.getItem("cl.tanner.monaco.rol") || "";
    //   const email = claimsUsuario().email || "";
    //   const usuarioId = claimsUsuario().id;

    //   if (t1 !== "" && t2 !== "" && role !== "") {
    //     dispatch(validateSession(t1));
    //     dispatch(obtenerSubProductoCanal(email, role));
    //     dispatch(obtenerAutomotoraLocal(email, role));
    //     dispatch(getSolicitudesPorUsuario(usuarioId));
    //   }
    // }
  }

  componentWillReceiveProps(newProps){
    const {isLoggedIn} = this.props;
    if(isLoggedIn !== newProps.isLoggedIn){
      this.setState({isLoggedIn:newProps.isLoggedIn });
    }
  }

  handleClose () {
    this.props.dispatch(ocultarMensaje());
  };

  /**
* Funcion que renderiza el componente Main.
* En este renderiado se declaran todos los posibles path para poder hacer routing. En caso de de crear un componente y
* querer llegar a el por medio de URL se debe agregar aquí.
* @method render
* @return {JSX} Retorna el componente Main
*/
  render() {
    const { ruta } = this.props;
    const { isLoggedIn } = this.state;
    const userProfile= getProfileData();
    return (

      <Router forceRefresh={true}>
        <div>
          <div>
            {!isLoggedIn
              ? (
                <div>
                  <Login />
                </div>
              )
              : (
                <div>
                  <Header />
                  <div className="wrap-contenido-global">
                    {ruta === "/"  && userProfile.rol ===2 ? <PuntosEnrolados /> : null}
                    {ruta === "/"  && userProfile.rol ===1 ? <EnrollarPuntoVenta /> : null}
                    {ruta === "/"  && userProfile.rol ===0 ? <PuntosEnrolados /> : null}
                    {ruta === routesConfig.base.puntosEnrolados ? <PuntosEnrolados /> : null}
                    {ruta === routesConfig.base.enrollarPuntoVenta ? <EnrollarPuntoVenta /> : null}
                  </div>
                  <ContenidoGeneral />
                  <CustomSnackBar
                    open={this.props.mostrarMensaje}
                    message={<span id="message-id">{this.props.mensaje}</span>}
                    variant={this.props.tipoMensaje}
                    handleClose={() => this.handleClose()}
                    closeCLickOut={this.props.closeCLickOut}
                  />
                </div>
              )
            }
          </div>
        </div>
      </Router>

    );
  }
}

Main.propTypes = {
  isLoggedIn: PropTypes.any.isRequired,
  dispatch: PropTypes.any.isRequired,
  ruta: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  // errorPage: state.main.errorPage,
  isLoggedIn: state.loginState.isLoggedIn,
  ruta: state.menu.ruta,
  // contenidoVisible: state.main.contenidoVisible,
  mensaje: state.main.mensaje.texto,
  tipoMensaje: state.main.mensaje.tipo,
  mostrarMensaje: state.main.mensaje.esVisible,
  closeCLickOut: state.main.mensaje.closeCLickOut,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
