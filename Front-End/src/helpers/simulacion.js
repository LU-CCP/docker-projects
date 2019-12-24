/**
 * Obtiene arreglo de subProductos en base a objeto que los contiene
 * @author ggerena
 */
export const obtenerSubProductos = (obj) => {
  let result = [];
  for (const key in obj) {
    for (const innerKey in obj[key]) {
      if (innerKey == "subProductoNombre") {
        const aux = {
          subProductoNombre: obj[key][innerKey],
          subProductoId: obj[key].subProductoId,
        };
        result.push(aux);
      }
    }
  }
  result = result.filter((item, index, self) =>
    index === self.findIndex(((s) => (
      s.subProductoId === item.subProductoId && s.subProductoNombre === item.subProductoNombre
    ))));
  return result;
};

/**
 * Obtiene arreglo de canales en base al subProducto elegido
 * @author ggerena
 */
export const obtenerCanales = (obj, subProductoNombre) => {
  const result = [];
  for (const key in obj) {
    for (const innerKey in obj[key]) {
      if (innerKey == "subProductoNombre" && obj[key][innerKey] == subProductoNombre) {
        const aux = {
          canalNombre: obj[key].canalNombre,
          canalId: obj[key].canalId,
        };
        result.push(aux);
      }
    }
  }
  return result;
};
/**
 * Convierte a mayúscula la primera letra del string
 * @example =
 * capitalizarString("LALA")=> "Lala"
 * capitalizarString("lAlA")=> "Lala"
 * capitalizarString("lala y lolo")=> "Lala y lolo"
 * @param {string} entrada : "texto a capitalizar"
 * @returns {string} = "Texto a capitalizar"
 */
export const capitalizarString = (entrada) => {
  const aux = entrada.toLowerCase();
  return aux.charAt(0).toUpperCase() + aux.slice(1).toLowerCase();
};
/**
 * Convierte a mayúscula la primera letra de cada palabra del string
 * @example =
 * capitalizarStringCompleto("LALA")=> "Lala"
 * capitalizarStringCompleto("lAlA")=> "Lala"
 * capitalizarStringCompleto("lala y lolo")=> "Lala Y Lolo"
 * @param {string} entrada : "texto a capitalizar"
 * @returns {string} = "Texto A Capitalizar"
 */
export const capitalizarStringCompleto = (entrada) => entrada.toLowerCase().split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");
/**
 * Convierte a mayúscula la primera letra de cada palabra del string
 * @example =
 * unirStringConGuionBajo("LALA LALA")=> "LALA_LALA"
 * @param {string} entrada : "texto a unir"
 * @returns {string} = "Texto unido"
 */
export const unirStringConGuionBajo = (entrada) => entrada.split(" ").join("_");

/**
 * Verifica si dentro de un arreglo de elementos existe una llave/valor proporcionada
 * @method arrayContains
 * @param {string} array : Arreglo de datos
 * @param {string} attr : Atributo a buscar dentro del arreglo
 * @param {string} value : Valor del atributo a buscar
 * @returns {number} Se devuelve el índice del elemento, de los contrario false.
 */
export const arrayContains = (array, attr, value) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) return i;
  }
  return undefined;
};
