
const origenes = [
  { nombre: 'Monaco', id: 2 },
  { nombre: 'Monaco 2.0', id: 1 },
  { nombre: 'Seca', id: 3 },
];

const constantes = [
  {
    nombre: 'errorAsignacion', id: 1, codigo: 50000, descripcion: 'No se encontro responsable para asignar al nuevo estado.'
  }
];

const sistemaOrigen ={
  origenes
}

const errorEvaluacion = (solicitudId) => ({
  evaluacionId: null,
  solicitudId,
  estadoTransicionado: null,
  color: 'Error',
  listaMotivos: [],
  listaDocumentos: [],
  error: true,
  estadoActual: true,
  errorMensaje: 'Su solicitud no pudo ser evaluada, por favor intentelo mas tarde',
})

export default sistemaOrigen;
export { constantes, errorEvaluacion };
