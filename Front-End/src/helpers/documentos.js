import { mensajeError } from "../components/Main/actions";
import trace from "./trace";
import fetch from "../helpers/request";

const path = require('path')

function ValidURL(str) {
  const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(str)) {
    return false;
  }

  return true;
}

const documentos = async (data, nombre, dispatch) => {
  if (!data) return;

  try {
    const ext = path.extname(nombre);
    let href;
    if (ValidURL(data)) {
      href = data;
    } else {
      href = `data:application/${ext};base64,${encodeURIComponent(Buffer.from(data).toString('base64'))}`;
    }

    const downloadLink = document.createElement('a');
    downloadLink.download = nombre;


    const response = await fetch(href, { method:"GET" }, dispatch).catch((error) => {
      trace.error("ERROR_CARGAR_ESTADOS_DOCUMENTOS", error);
    });
    const { status } = response


    if (status !== 200) {
      throw new Error();
    } else if (status === 200) {
      downloadLink.href = href;
      downloadLink.onclick = function (e) { document.body.removeChild(e.target); };
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }
  } catch (error) {
    dispatch(mensajeError(`Ocurrio un error al intentar descargar ${nombre}.`));
    trace.error("ERROR_DESCARGA_DOCUMENTO_LINK", error);
  }
}
export default documentos

