import React from "react";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    const infoPersonal = this.props.UserInfo.auth.userProfile.cv.informacionPersonal;

    this.state = {
      imageUser: this.props.imageUser,
      roles: this.props.UserInfo.auth.userProfile ? this.props.UserInfo.auth.userProfile.roles : null,
      email: infoPersonal.datosContacto.email ? infoPersonal.datosContacto.email.toLowerCase() : "Sin email registrado",
      nombre: `${infoPersonal.primerNombre} ${infoPersonal.segundoNombre} ${infoPersonal.apellidoPaterno} ${infoPersonal.apellidoMaterno}`,
    };
  }

  render() {
    let roles = null;
    const listaRoles = [];
    if (this.state.roles) {
      this.state.roles.forEach((element) => {
        listaRoles.push(element.rol);
      });
      roles = listaRoles.join(", ");
    }

    const tooltip = <span style={{ textAlign: "end" }}>{this.state.nombre}<br />{this.state.email}<br />{roles}</span>;

    return (
      <div>
        <IconButton
          iconButtonElement={

            <IconButton
              style={{ width: "auto", padding: 0 }}
              tooltip={tooltip}
              tooltipPosition="bottom-left"
              iconStyle={{
                marginLeft: "10px", paddingTop: "0px", borderRadius: "50%", width: 25, cursor: "pointer",
              }}
            >
              <img src={this.state.imageUser} alt="" />
            </IconButton>
          }
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          targetOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem id="cerrar-sesion-menuitem" name="cerrar-sesion-menuitem" primaryText="Cerrar Sesión" onClick={() => this.props.doLogout()} />
        </IconButton >
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UserInfo: state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
