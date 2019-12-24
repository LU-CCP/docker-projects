/* eslint-disable react/prefer-stateless-function */
import React from "react";
import PropTypes from "prop-types";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
// import { Snackbar, IconButton, SnackbarContent } from "@material-ui/core/Snackbar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

// theme
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MonacoTheme from "../../../config/MonacoTheme";

/**
 * CustomSnackBar Component
 *
 * @description        El componente CustomSnackbar permite lanzar notificaciones al usuario
 *                     las notificaciones son 4: Ok (verde), Error (rojo), Alerta (amarillo) e Info (azul)
 *                     la forma de invocarlas es a traves de dispatch ej:
 *
 *   import { mensajeOk, mensajeError, mensajeAlerta y mensajeInfo   } from ".../components/Main/actions";
 *
 *   dispatch(mensajeOk("La operacion se ha realizado existoamente.")); =>  Muestra un mensaje de success (verde)
 *   dispatch(mensajeError("No se ha podido realizar la operación.")); =>  Muestra un mensaje de error (rojo)
 *
 */

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = (theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
});

function MySnackbarContent(props) {
  const {
    classes, className, message, onClose, variant, ...other
  } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

class CustomSnackBar extends React.Component {
  handleClose = () => {
    if (this.props.closeCLickOut)
      this.props.handleClose();
  }
  render() {
    return (
      <MuiThemeProvider theme={MonacoTheme}>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.props.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.props.handleClose}
            variant={this.props.variant || "info"}
            message={this.props.message}
          />
        </Snackbar>
      </MuiThemeProvider>
    );
  }
}
CustomSnackBar.defaultProps = {
  closeCLickOut: true,
};
CustomSnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
  closeCLickOut: PropTypes.bool,
};

export default CustomSnackBar;
