const validaciones = {

  /**
* Evalua si el string a evaluar esta vacío.
* @param {string} textfield : Valor a evaluar
* @returns {bool} : Resultado de la validación
*/
  emptyText: (textfield) => {
    const str = (textfield) || "";
    if (str.trim() === "") {
      return false;
    }
    return true;
  },

  /**
 * Evalua si el valor entregado hace match con la expresión regular para correo electrónico.
 * @param {string} value : Valor a evaluar
 * @returns {bool} : Resultado de la validación
 */
  emailValidation: (value) => {
    if (!value)
      return true;
    const regularExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line max-len
    return regularExp.test(value);
  },
  isNormalInteger: (str, allowZero) => {
    if (!str)
      return true;
    if (allowZero) {
      return /^\+?(0|[1-9]\d*)$/.test(str);
    }
    return /^\+?([1-9]\d*)$/.test(str);
  },
  /**
 * Evalua si el valor entregado hace match con la expresión regular para validar teléfono celular
 * Dado que se guarda como número en la BD, no se evalua código de área (+56).
 * @param {string} str : Valor a evaluar
 * @param {number} ln : largo máximo permitido
 * @returns {bool} : Resultado de la validación
 */

  isMobileNumber: (str, ln) => {
    if (!str) {
      return true;
    } else if (str) {
      const len = (ln) || 9;
      return /^\+?([1-9]\d*)$/.test(str) && str.toString().length === len;
    }
    return false
  },
  /**
 * Evalua si el valor entregado hace es de un largo mínimo definido para la columna "calle" en la tabla de direccion en la BD
 *  DB_Automotriz.
 * @param {string} str : Valor a evaluar
 * @param {number} ln : largo máximo permitido. Si no se define es 10.
 * @returns {bool} : Resultado de la validación
 */
  isValidStreet: (str, ln) => {
    const len = (ln) || 10;
    if (str && str.length) {
      return str.toString().length >= len;
    }
    return false;
  },
  /**
 * Permite normalizar el objeto Cliente que se utiliza en la vista de DatosPersona.
 * @param {object} str :Objecto a normalizar.
 * @returns {object} : Objeto normalizado con valores por defecto.
 */
  normalizeClientObject: (obj) => {
    const newObject = {
      ...obj,
      nombreDireccion: obj.nombreDireccion || "",
      numeroDireccion: obj.numeroDireccion || "",
      oficinaDeptoDireccion: obj.oficinaDeptoDireccion || "",
      fechaNacimiento: obj.fechaNacimiento || "",
      fechaNacimientoRead: obj.fechaNacimiento || "",
      email: obj.email || "",
      movil: obj.movil || "",
      comuna: obj.comuna || 127,
      comunaRead: obj.comuna || 127,
      razonSocial: obj.razonSocial || "",
      nombreFantasia: obj.nombreFantasia || "",
      razonSocialRead: obj.razonSocial || "",
      nombreFantasiaRead: obj.nombreFantasia || "",
      genero: obj.genero || undefined,
    };
    return newObject;
  },
  /**
 * Permite validar que un nombre solo contiene letras y tildes. tambien permite definir un mínimo y máximo de largo en caso de ser necesario
 * @param {object} string String a evaluar
 * @returns {boolean} : Resultado de la validación
 */
  isValidName: (string) => /[a-zA-Z \u00E0-\u00FC]{1,50}/g.test(string),
  /**
 * Valida que un objeto tenga definición o sea true
 * @param {any} value Elemento a evaluar
 * @returns {boolean} : Resultado de la validación
 */
  isTruthy: (value) => value,
};


export default validaciones;

