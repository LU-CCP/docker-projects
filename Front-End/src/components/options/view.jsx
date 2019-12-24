import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
var QRCode = require('qrcode.react');

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function downloadQR(nemotecnico) {
    props.downloadQR(nemotecnico);
  }

  return (

    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <i class="material-icons">
          list
          </i>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{downloadQR(props.nemotecnico)}}>Descargar</MenuItem>
      </Menu>
      <div className="out-of-screen">
      <div  id={`qrSVG-${props.nemotecnico}`} className="qrContainer">
        <QRCode renderAs="svg" size={300} includeMargin={true} value={props.qrCode} />
        <div className=" t-center info-container">
                            {/* <div>
                              {`Comercio: ${props.comercioLabel}`}
                              <br />
                              {`Sucursal : ${props.sucursalLabel}`}
                              <br />

                              {`Caja  N°   : ${props.caja}`}

                            </div> */}
                          </div>
      </div>
      </div>
      <canvas id={`qrCanvas-${props.nemotecnico}`}></canvas>
    </div>
  );
}
