/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
// External
import React from "react";
import { connect } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import "../../styles/style.css";


// // Mantenedores
// import MantenedorRed from "../Mantenedores/Empresa/Red/detalle";
// import MantenedorAutomotora from "../Mantenedores/Empresa/Automotora/detalle";
// import MantenedorClasAutomotora from "../Mantenedores/Empresa/ClasificacionAutomotora/detalle";
// import MantenedorLocal from "../Mantenedores/Empresa/Local/detalle";
// import MantenedorParque from "../Mantenedores/Empresa/Parque/detalle";
// import MantenedorMarca from "../Mantenedores/Vehiculos/Marca/detalle";
// import MantenedorModelo from "../Mantenedores/Vehiculos/Modelo/modelo-detalle";
import { esconderContenidoGeneral } from "../Main/actions";
// import MantenedorBono from "../Mantenedores/Bono/detalle";
// import MatenedorTasaPiso from "../Mantenedores/Tasa/TasaPiso/detalle";
// import MantenedorUsuario from "../Mantenedores/Permiso/Usuario/detalle";
// import MantenedorMenu from "../Mantenedores/Permiso/Menu/detalle";
// import MantenedorRol from "../Mantenedores/Permiso/Rol/detalle";
// import MatenedorItem from "../Mantenedores/Item/detalle";
// import MatenedorParametro from "../Mantenedores/Parametro/parametro-detalle";
// import MantenedorListaNegra from "../Mantenedores/ListaNegra/detalle";

const ContenidoGeneralVista = (props) => {

      return ("No existe detalles para el componente, agregalo en Main/contenidoGeneral.jsx");

};

class ContenidoGeneral extends React.Component {
  cerrarContenidoGeneral = () => {
    this.props.dispatch(esconderContenidoGeneral());
  }

  render() {
    return (
      <Drawer
        open={this.props.contenidoVisible}
        anchor="right"
        onClose={this.cerrarContenidoGeneral}
      >
        <ContenidoGeneralVista vista={this.props.vistaContenidoGeneral} />
        {/* Estos botones no se renderean */}
        <div className="row">
          <div className="col-xs-6">
            {this.props.funcionCerrar && this.props.vistaContenidoGeneral ?

              <Button
                color="default"
                onClick={this.props.funcionCerrar}
              >
                        Cerrar
              </Button>
              : null
            }
          </div>
          <div className="col-xs-6">
            {this.props.funcionGuardar && this.props.vistaContenidoGeneral ?
              <Button
                color="primary"
                onClick={this.props.funcionGuardar}
              >
                        Guardar
              </Button>
              : null
            }
          </div>
        </div>
        {/* Fin Estos botones no se renderean */}
      </Drawer>
    );
  }
}
const mapStateToProps = (state) => ({
  contenidoVisible: state.main.contenidoVisible,
  vistaContenidoGeneral: state.main.vistaContenidoGeneral,
  funcionGuardar: state.main.funcionGuardar,
  funcionCerrar: state.main.funcionCerrar,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContenidoGeneral);
