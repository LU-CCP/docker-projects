
var config = require('./../settings/appsettings.secrets.json');
const { apiQRUri } = config

const apiQR = {
  pointOfSales: `${apiQRUri}/pointsOfSales`,
  tokens: `${apiQRUri}/tokens`,
  idTokens: `${apiQRUri}/idTokens`,
  refreshTokens: `${apiQRUri}/refreshTokens`,
};

const uriConfig = {
  apiQR,
};

exports.uriConfig = uriConfig;
