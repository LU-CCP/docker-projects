
/**
 *
 * Number Utils
 *
 * @version        1.0.0 - Feb 2019
 * @author         Juan Briones
 *
 */

/**
 * Limpia el número de todos los caracteres inválidos.
 * @param {string} string : A+a234Bbe-3
 * @returns {string} : 2343
 */
export function numberClean(string) {
  if (!string || string.length === 0)
    return null;
  const result = string.match(/\d/g);
  return result ? result.join('') : '';
}

/**
 * Limpia el número de todos los caracteres inválidos, excepto el /.
 * @param {string} string : A+a23/4Bbe-3
 * @returns {string} : 23/43
 */
export function numberClean2(string) {
  if (!string || string.length === 0)
    return "";
  return string.replace(/[^\d/]/g, '');
}
