
/**
 *
 * Rut Utils
 *
 * @version        1.0.0 - 07 Sep 2018
 * @author         Ignacio Aedo - ignacioa
 *
 */

/**
 * Limpia el rut de caracteres especiales y no soportados.
 * @param {string} paramrut : 16.761.256-9
 * @returns {string} : 167512569
 */
const rutClean = (paramrut) => `${paramrut}`
  .toString().replace(/[^0-9kK]+/g, "").toUpperCase();


/**
 * Calcula el digito verificador para el rut
 * @param {number/string} paramrut : 16751256 / 16.751.256
 * @returns {string} = 9
 */
const rutCalcDv = (paramrut) => {
  const rut = rutClean(`${paramrut}`.toString());
  const reverseRut = `${rut}`.split("").reverse().join("");
  let result = 0;
  let n = 1;

  Object.keys(reverseRut).forEach((i) => {
    n += 1;
    result += parseInt(reverseRut[i], 10) * n;
    n = n === 7 ? 1 : n;
  });

  result = 11 - (result % 11);
  result = result === 11 ? 0 : result;
  return result === 10 ? "K" : `${result}`;
};


/**
 * Valida el número de rut
 * @example =
 * RUTvalidate('167512569') -> true
 * RUTvalidate('167512568') -> false
 * RUTvalidate('16.751.256-8') -> false
 * RUTvalidate('16.751.256-9') -> true
 * @param {string} paramrut : 16.761.256-9
 * @returns {boolean} = true
 */
const rutValidate = (paramrut) => {
  if (!paramrut) {
    return false;
  }
  let rut = paramrut.toString();
  if (rut.length >= 11) {
    if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
      return false;
    }
    rut = rutClean(rut);

    const dv = rut.slice(-1);
    const rutNumber = parseInt(rut.slice(0, -1), 10);
    return rutCalcDv(rutNumber) === dv;
  }
  return false;
};

/**
 * Permite formatear el número de rut
 * @param {string} paramrut Rut sin formato
 * @returns {string} Rut formateado
 */
const formatRut = (paramrut) => {
  const actual = (paramrut) ? paramrut.replace(/^0+/, "") : "";
  const withoutPoints = actual.replace(/\./g, "") || "";
  const actualClean = withoutPoints.replace(/-/g, "") || "";
  if (actualClean !== "" && actualClean.length > 1) {
    const start = actualClean.substring(0, actualClean.length - 1);
    let rut = "";
    let i = 0;
    let j = 1;
    for (i = start.length - 1; i >= 0; i--) { // eslint-disable-line no-plusplus
      const letter = start.charAt(i);
      rut = letter + rut;
      if (j % 3 === 0 && j <= start.length - 1) {
        rut = `.${rut}`;
      }
      j++; // eslint-disable-line no-plusplus
    }
    const dv = actualClean.substring(actualClean.length - 1);
    rut = `${rut}-${dv}`;
    return rut.toUpperCase();
  }
  return actualClean.toUpperCase();
};

/**
 * Valida si el número de rut es persona jurídica o  natural
 * @example isEmpresa('167512569') -> false
 * isEmpresa('760100889') -> true
 * @param {string} paramrut : Un rut válido (sin puntos ni guión), por ejemplo 167612569
 * @returns {boolean} Retorno si la validación es correcta o no
 */
const esRutEmpresa = (paramrut) => {
  const rut = Number(paramrut.toString().trim().slice(0, paramrut.length - 1).replace(/\D/g, ""));
  return (rut) ? (rut > 50000000) : false;
};

export default {
  rutValidate, rutCalcDv, rutClean, formatRut, esRutEmpresa,
};
export { rutValidate, rutCalcDv, rutClean, formatRut, esRutEmpresa };
