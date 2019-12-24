
require('dotenv').config();

let apiQRUri = '';


if (process.env.REACT_APP_ENV === 'qa') {
  apiQRUri = `${process.env.REACT_APP_APPLICATION_API_URI}`;
} else {
  apiQRUri = `${process.env.REACT_APP_APPLICATION_API_URI_PROD}`;
}

const apiQR = {
  getPuntosEnrolados: `${apiQRUri}/getPuntosEnrolados`,
  sendMail: `${apiQRUri}/sendMail`,
  enrollarPuntoVenta: `${apiQRUri}/enrollarPuntoVenta`,
  login: `${apiQRUri}/login`,
};

const uriConfig = {
  apiQR,
};

export default uriConfig;
