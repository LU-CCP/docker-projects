/**
 *  AutorizarComponente
 *
 *  @description Funcion que permite mostrar un componente solo si el usuario tiene permiso para ver el componente
 *  @param       id del componente : string => Corresponde al identificador unico del componente (en camelCase)
 *                                             este id tiene que estar seteado en la bd.
 *
 *  @example     en una view (jsx) sea el componente "CabeceraDetalle" y su id "detalleCotizacion.cabeceraDetalle"
 *               usar de la siguiente forma:
 *
 *  { autorizarComponente("detalleCotizacion.cabeceraDetalle") &&
 *     (<CabeceraDetalle
 *       ...
 *       />) }
 *
 */

import _ from "lodash";
import claimsUsuario from "../config/claimsUsuario";

const autorizarComponente = function (componenteId) {
  const componentes  = claimsUsuario().componentes;

  return _.hasIn(componentes, componenteId, false);
}

export default autorizarComponente;
