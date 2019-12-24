
/**
 * Limita el largo del telefono a 9 números
 * @param {string} telefono
 * @returns {string} telefono formateado
 */
const formatTelefono = (tel) => (tel ? tel.toString().substring(0, 9).replace(/[^0-9]+/g, "") : "");

const formatearSucursalesYCajas = (e) => (String(e).length === 1) ? `000${e}` : (String(e).length === 2) ? `00${e}` : (String(e).length === 3) ? `0${e}` : e;
const getProfileData = () => {
  let userProfile;
  try {
    userProfile = JSON.parse(localStorage.getItem("cl.ripley.profile") || {});
  } catch (error) {
    userProfile = {}
  } finally {
    return userProfile;
  }
}
export { formatTelefono, getProfileData, formatearSucursalesYCajas };
