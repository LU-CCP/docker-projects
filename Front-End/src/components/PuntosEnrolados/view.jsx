
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { navegarRuta } from "../Menu/actions";
import { obtenerPuntosEnrolados } from "../PuntosEnrolados/actions"
import MonacoTheme from "../../config/MonacoTheme";
import MaterialTable from 'material-table';
import Options from '../options/view'
import htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
var sucursales = require('../../helpers/sucursales.json'); // forward slashes will depend on the file location
// import htmlToImage from 'html-to-image';
// import { saveAs } from 'file-saver';


class PuntosEnrolados extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.navegar = this.navegar.bind(this);
    this.downloadQR = this.downloadQR.bind(this);
    this.state = {
      anchorEl: false,
      columns: [
        { title: 'Comercio', field: 'comercio' },
        { title: 'Sucursal', field: 'sucursal' },
        { title: 'Caja', field: 'caja', type: 'numeric' },
        { title: 'CodigoInterno', field: 'codigoInterno' },
        { title: 'Creado por', field: 'creadoPor' },
        { title: 'Acciones', field: 'Acciones' },
      ],
      enroledPoints: [
      ],
    }
  }


  downloadQR(nemotecnico) {
    htmlToImage.toBlob(document.getElementById(`qrSVG-${nemotecnico}`))
  .then(function (blob) {
    saveAs(blob, `${nemotecnico}.png`);
  });

    // var canvas = document.getElementById(`qrCanvas-${nemotecnico}`);
    // var svg = document.getElementById(`qrSVG-${nemotecnico}`);
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
    //   document.getElementById(`qrCanvas-${nemotecnico}`).hidden = true;
    // };

    // img.src = url;

  }

  componentDidMount() {
    this.props.dispatch(obtenerPuntosEnrolados());
  }

  componentWillReceiveProps(newProps) {
    let { enroledPoints } = this.props;

    if (newProps.enroledPoints !== enroledPoints) {
      if (newProps.enroledPoints.length > 0) {
        let data = [];
        newProps.enroledPoints.forEach(e =>{
          const comercioLabel = sucursales[1].comercios.find(x => x.id === e.Comercio["_"]).name;
          const sucursalLabel = sucursales[0].sucursales.find(x => x.id === Number(e.Sucursal["_"])).name;
          data.push({ RowKey: e.RowKey["_"],comercio: e.Comercio["_"], sucursal: e.Sucursal["_"], caja: e.Caja["_"], codigoInterno: e.CodigoInterno["_"],creadoPor : ( e.UsuarioCreador && e.UsuarioCreador["_"]) ? e.UsuarioCreador["_"] : "No definido", QRCode: e.QRCode["_"],Acciones : <Options  comercioLabel={comercioLabel} sucursalLabel={sucursalLabel} caja={e.Caja["_"]} downloadQR={this.downloadQR} id={e.CodigoInterno["_"]} nemotecnico={`${sucursalLabel}_${e.Caja["_"]}`} qrCode={e.QRCode["_"]} />},)
        });
       this.setState({enroledPoints:data});
      }
    }
  }


  navegar = (e, params) => {
    this.props.dispatch(navegarRuta(e, params));
  };

  render() {
    const {columns,enroledPoints} = this.state;
    return (
      <MuiThemeProvider theme={MonacoTheme}>
        <div className="contenedor-fondo">
          <div className="wrap-txt-bienvenida t-inicio-1">
          <MaterialTable
            title="Puntos de venta enrolados"
            columns={columns}
            data={enroledPoints}
            id="puntosEnroladosTable"
            options={{
              filtering: false,
              exportButton: true,
              pageSizeOptions: [5, 10, 20,50,100,200,500]
            }}
            localization={
             { pagination : {
                labelDisplayedRows: "{from}-{to} de {count}",
                labelRowsPerPage: "Filas por página:",
                firstTooltip:" Primera",
                previousTooltip:"Anterior",
                nextTooltip:"Siguiente",
                lastTooltip:"Última",
                labelRowsSelect:"registros",
              },
              body:{
                emptyDataSourceMessage: 'No hay datos',
              },
              toolbar: {
                searchTooltip:"Buscar",
                searchPlaceholder:"Buscar",
              }
            }
          }
//           detailPanel={rowData => {
//             return (
//               <div className="qrContainer">
// <QRCode id={`qrSVG-${rowData.RowKey}`} renderAs="svg" includeMargin={true} value={rowData.QRCode} />

//               </div>

//             )
//           }}



    />
             </div>
             <canvas id="qrCanvas"></canvas>
        </div>

      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  enroledPoints: state.enroledPointsState.enroledPoints,
  loading: state.enroledPointsState.loading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

PuntosEnrolados.propTypes = {
  dispatch: PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PuntosEnrolados);
