
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { navegarRuta } from "../Menu/actions";
import MonacoTheme from "../../config/MonacoTheme";


class Inicio extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.navegar = this.navegar.bind(this);
    this.state = {
    }
  }

  componentWillMount(){

  }

  navegar = (e, params) => {
    this.props.dispatch(navegarRuta(e, params));
  };

  render() {

    return (
      <MuiThemeProvider theme={MonacoTheme}>
        <div className="contenedor-fondo">

        </div>

      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

Inicio.propTypes = {
  dispatch: PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);
