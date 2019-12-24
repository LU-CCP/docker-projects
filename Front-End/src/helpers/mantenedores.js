
/**
 *
 * Mantenedores Utils
 *
 * @version        1.0.0 - Feb 2019
 * @author         Juan Briones
 *
 */

/**
 * Limpia el número de todos los caracteres inválidos.
 * @param {number} dataCount : 12345
 * @returns {number} : 12345
 */
export function counterSize(dataCount) {
  if (!dataCount)
    return null;
  if (dataCount < 1000)
    return 15;
  if (dataCount >= 1000 && dataCount < 10000)
    return 12;
  if (dataCount >= 10000 && dataCount < 100000)
    return 10;
  if (dataCount > 100000)
    return 9;
}
