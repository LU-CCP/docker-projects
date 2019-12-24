const KeyVault = require('azure-keyvault');
const AuthenticationContext = require('adal-node').AuthenticationContext;
const secrets = require('./secrets');

const clientId = process.env.KV_APP_ID; // app id in azure AD
const clientSecret = process.env.KV_SECRET_ID; // secret for app in azure AD

// urls for database secrets
const userSecret = process.env.KV_SQL_SERVER_USER;
const passwordSecret = process.env.KV_SQL_SERVER_PASSWORD;
const dbSecret = process.env.KV_SQL_SERVER_BD;
const hostSecret = process.env.KV_SQL_SERVER_HOST;
const sessionTimeoutSecret = process.env.KV_SESSION_TIMEOUT;
const instrumentationKeySecret = process.env.KV_APPINSIGHTS_INSTRUMENTATION_KEY;
const allowedOriginsSecret = process.env.KV_ALLOWED_ORIGINS;

// Authenticator - retrieves the access token
const authenticator = function (challenge, callback) {
  const context = new AuthenticationContext(challenge.authorization);

  return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, (err, tokenResponse) => {
    if (err) throw err;

    const authorizationValue = `${tokenResponse.tokenType} ${tokenResponse.accessToken}`;

    return callback(null, authorizationValue);
  });
};

const credentials = new KeyVault.KeyVaultCredentials(authenticator);
const client = new KeyVault.KeyVaultClient(credentials);

let dbConfig;
let commonConfig;

const getSecrets = async function () {
  try {
    if (dbConfig !== undefined) {
      return dbConfig;
    }

    const [puser, ppassword, phost, pdb] = await Promise.all([
      client.getSecret(userSecret, null),
      client.getSecret(passwordSecret, null),
      client.getSecret(hostSecret, null),
      client.getSecret(dbSecret, null),
    ]);

    dbConfig = {
      user: puser.value,
      password: ppassword.value,
      server: phost.value,
      database: pdb.value,
      options: {
        encrypt: true
      }
    };

    return dbConfig;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getCommonSecrets = async function () {
  try {
    if (commonConfig !== undefined) {
      return commonConfig;
    }

    const [pstimeout, pinstrumentationKey, pallowedOrigins] = await Promise.all([
      client.getSecret(sessionTimeoutSecret, null),
      client.getSecret(instrumentationKeySecret, null),
      client.getSecret(allowedOriginsSecret, null)
    ]);

    commonConfig = {
      sessionTimeout: pstimeout.value,
      instrumentationKey: pinstrumentationKey.value,
      allowedOrigins: pallowedOrigins.value
    };

    return commonConfig;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

exports.dbConfig = getSecrets;
exports.commonConfig = getCommonSecrets;
