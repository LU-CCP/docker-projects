import React from "react";
import { connect } from "react-redux";
// import ReactDOMServer from 'react-dom/server';
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { LinearProgress, CircularProgress, Card, CardContent, Button, TextField } from "@material-ui/core";
import MonacoTheme from "../../config/MonacoTheme";
import "./enrollar.css";
import { navegarRuta } from "../Menu/actions";
import { generarQR, sendMail, cleanStoreEnrolador } from "../Enrollar/actions";
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import validaciones from "../../helpers/validaciones";
import htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import { formatearSucursalesYCajas } from "../../helpers/util";
var data = require('../../helpers/sucursales.json'); // forward slashes will depend on the file location


require('dotenv').config();
var QRCode = require('qrcode.react');



/**
 * Modulo de Servicio al cliente
 *
 * @version        1.0.0 - 9 Jul 2019
 * @author         Ignacio Aedo - ignacioa@lagash.com (Lagash)
 * @param {object} props : Props de react
 * @returns {JSX} : Componente EnrollarPuntoVenta
 *
 */
class EnrollarPuntoVenta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comercio: 833827006,
      sucursal: "",
      caja: "",
      comercioLabel: "",
      sucursalLabel: "",
      loading: false,
      data,
      email: "",
      share: false,
      mailSended:false,
      sendingMail:false,
    };
    this.handlerOnChange = this.handlerOnChange.bind(this);
    this.generarQR = this.generarQR.bind(this);
    this.downloadQR = this.downloadQR.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.navegar = this.navegar.bind(this);
    this.share = this.share.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  navegar(e) {
    this.props.dispatch(navegarRuta(e));
  };


  componentWillReceiveProps(newProps) {
    const { dispatch, mailSended,sendingMail } = this.props;

    if (newProps.mailSended !== mailSended) {
      this.setState({ mailSended: newProps.mailSended },()=>{
        dispatch(cleanStoreEnrolador());
        this.goBack();
      });
    }
    if (newProps.sendingMail !== sendingMail) {
      this.setState({ sendingMail: newProps.sendingMail },()=>{
      });
    }

  }

  sendMail() {
    const s = new XMLSerializer().serializeToString(document.getElementById("qrSVG"));
    const encodedData = window.btoa(s);
    let body = `<center><img src="data:image/svg+xml;base64,${encodedData}" /></center><br>${document.getElementById("mainContainerQRCode").innerHTML}`;
    const { email } = this.state;
    this.props.dispatch(sendMail(email, body, encodedData));
  }

  goBack(){
    this.setState({
      comercio: 833827006,
      sucursal: "",
      caja: "",
      comercioLabel: "",
      sucursalLabel: "",
      loading: false,
      email: "",
      share: false,
      mailSended:false,
      sendingMail: false,
    });
    this.props.dispatch(cleanStoreEnrolador());
  }

  share() {
    this.setState({ share: true });
  }




  handlerOnChange(e) {
    const { id, value, name } = e.target;
    const context = id || name;
    this.setState({
      [context]: value,
    },
    );
  }
  generarQR() {
    let { comercio, caja, data, sucursal } = this.state;
    const comercioLabel = data[1].comercios.find(x => x.id === comercio).name;
    const sucursalLabel = data[0].sucursales.find(x => x.id === sucursal).name;
    sucursal = formatearSucursalesYCajas(sucursal)
    caja = formatearSucursalesYCajas(caja)
    this.setState({ comercioLabel, sucursalLabel, nemotecnico: `${sucursalLabel}_${caja}` }, () => {
      this.props.dispatch(generarQR(comercio, sucursal, caja));
    })

  }



  downloadQR() {
    const { nemotecnico } = this.state;
    htmlToImage.toBlob(document.getElementById('mainQRInfo'))
  .then(function (blob) {
    saveAs(blob, `${nemotecnico}.png`);
  });
    // var canvas = document.getElementById('qrCanvas');
    // var svg = document.getElementById('qrSVG');
    // var ctx = canvas.getContext('2d');
    // var data = (new XMLSerializer()).serializeToString(svg);
    // var DOMURL = window.URL || window.webkitURL || window;

    // var img = new Image();
    // var svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    // var url = DOMURL.createObjectURL(svgBlob);

    // img.onload = function () {
    //   ctx.drawImage(img, 0, 0);
    //   DOMURL.revokeObjectURL(url);

    //   var imgURI = canvas
    //     .toDataURL('image/png')
    //     .replace('image/png', 'image/octet-stream');

    //   var evt = new MouseEvent('click', {
    //     view: window,
    //     bubbles: false,
    //     cancelable: true
    //   });

    //   var a = document.createElement('a');
    //   a.setAttribute('download', `${nemotecnico}.png`);
    //   a.setAttribute('href', imgURI);
    //   a.setAttribute('target', '_blank');

    //   a.dispatchEvent(evt);
    //   document.getElementById("qrCanvas").hidden = true;
    // };

    // img.src = url;

  }

  handleChange(event) {
    this.setState({}, oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }


  /**
* Funcion que renderiza el componente EnrollarPuntoVenta
* @method render
* @return {JSX} Retorna el componente EnrollarPuntoVenta
*/
  render() {
    const { comercio, sucursal, caja, data, email, sendingMail } = this.state;
    const { loading, qrGenerated, mailSended,qrValue} = this.props;
    return (
      <div id="enrolle-view">
        <MuiThemeProvider theme={MonacoTheme}>
          <div className="row">
            <div className="col-md-12">
              <Card>
                <CardContent>


                  {!loading && !qrGenerated &&
                  <form autocomplete="off" >
                  <input autocomplete="off"  id="hiddenElement" name="hidden" type="text"></input>
                  <div className="form-area-component">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="search-title">Enrolar punto</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 m-t">
                        <FormControl variant="outlined" className="input-1">
                          <InputLabel htmlFor="comercio">
                            Comercio
        </InputLabel>
                          <Select
                            value={comercio}
                            id="comercio"
                            variant="outlined"
                            onChange={this.handlerOnChange}
                            input={<OutlinedInput labelWidth={70} name="comercio" id="comercio" />}
                          >
                            {data[1].comercios.map((item, index) => (
                              <MenuItem value={item.id} key={index}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>

                        </FormControl>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 m-t">
                        <FormControl variant="outlined" className="input-1">
                          <InputLabel htmlFor="comercio">
                            Sucursal
        </InputLabel>
                          <Select
                            value={sucursal}
                            id="sucursal"
                            variant="outlined"
                            onChange={this.handlerOnChange}
                            input={<OutlinedInput labelWidth={70} name="sucursal" id="sucursal" />}
                          >
                            {data[0].sucursales.map((item, index) => (
                              <MenuItem value={item.id} key={index}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 m-t">
                        <FormControl className="input-1">

                          <TextField
                            label="Caja"
                            id="caja"
                            value={caja}
                            type="number"
                            onInput={(e) => {
                              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
                            }}
                            min={0}
                            variant="outlined"
                            name="void-caja"
                            onChange={this.handlerOnChange}
                          />
                        </FormControl>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 container-button-enrollar">
                        <Button id="btnEnrollar" variant="contained" size="large" color="primary" disabled={loading || (comercio === "" || sucursal === "" || caja === "")} onClick={this.generarQR}>
                          Guardar
                      </Button>

                      </div>
                    </div>
                  </div>
                  </form>
                  }
                  {loading && <div>
                    <div className="row">
                      <div className="col-12">
                        <p className="t-center">Generando QR.. Espere un momento.</p>
                      </div>

                    </div>
                    <LinearProgress className="m-t-lg" />
                  </div>
                  }
                  {!loading && qrGenerated && <div>
                    <div id="mainContainerQRCode">
                    <div className="row">
                          <p className="t-center">Se ha generado el código QR para enrolar correctamente</p>
                        </div>
                      <div id="mainQRInfo">
                        <div className=" row t-center qrContainer" onClick={this.downloadQR}>
                          <QRCode id="qrSVG" size={300} renderAs="svg" includeMargin={true} value={qrValue} />

                        </div>
                        {/* <div className="row">
                          <p className="t-center">ID : {qrId}</p>
                        </div> */}
                        {/* <div className="row">
                          <p className="t-center">Datos utilizados para generar este código:</p>

                        </div> */}
                        {/* <div className="row bg-w">
                          <div className=" t-center info-container">
                            <div>
                              {`Comercio: ${comercioLabel}`}
                              <br />
                              {`Sucursal : ${sucursalLabel}`}
                              <br />

                              {`Caja  N°   : ${caja}`}

                            </div>
                          </div>

                        </div> */}
                      </div>
                    </div>
                    <div className="botonera-container">
                      {!this.state.share && <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <Button id="btnCompartir" variant="contained" size="large" color="primary" onClick={() => this.share()}>
                            Compartir
                      </Button>
                        </div>
                      </div>}

                      {this.state.share &&
                        <div>
                          <div className="row" id="share-container">
                            <div className="col-lg-12 col-md-12 m-t">
                              <FormControl>

                                <TextField
                                  label="Email"
                                  id="email"
                                  value={email}
                                  type="test"
                                  variant="outlined"
                                  name="void-email"
                                  onChange={this.handlerOnChange}
                                />
                                {/* <Button id="btnSendMail" disabled={!validaciones.emailValidation(email)} variant="contained" size="large" color="primary"  onClick={()=>this.sendMail()}>
                          Enviar
                      </Button> */}
                                <div className="wrap-botones">
                                  <Button
                                    id="btnSendMail"
                                    disabled={ mailSended || email==="" || !validaciones.emailValidation(email) || sendingMail}
                                    variant="contained" color="primary" className="btn-block"
                                    onClick={() => this.sendMail()}
                                  >
                                    {sendingMail && <CircularProgress size={20} className="m-r" />}
                                    Enviar
                            </Button>

                            <Button
                                    id="downloadQR"
                                    disabled={sendingMail}
                                    variant="contained" color="primary" className="btn-block"
                                    onClick={this.downloadQR}
                                  >
                                    Descargar
                            </Button>
                                </div>
                              </FormControl>
                            </div>
                          </div>



                        </div>}



                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <Button id="btnVolver" variant="contained" size="large" color="primary" onClick={this.goBack}>
                            Volver
                      </Button>

                        </div>
                      </div>
                    </div>
                  </div>
                  }

                </CardContent>
              </Card>
              <canvas id="qrCanvas"></canvas>
            </div>
          </div>

        </MuiThemeProvider>
      </div>
    );
  }
}
/**
 * PropTypes para el EnrollarPuntoVenta
 */
EnrollarPuntoVenta.propTypes = {
  dispatch: PropTypes.any.isRequired,
};

/**
 * Se deben mapear los props acorde al state definido en el archivo state.js
 */
const mapStateToProps = (state) => ({
  loading: state.enrolladorState.loading,
  qrGenerated: state.enrolladorState.qrGenerated,
  qrValue: state.enrolladorState.qrValue,
  qrId: state.enrolladorState.qrId,
  sendingMail: state.enrolladorState.sendingMail,
  mailSended: state.enrolladorState.mailSended,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(EnrollarPuntoVenta);
