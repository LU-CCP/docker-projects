const loginState = {
  errors: { summary: "", email: "", password: "" },
  credentials: { email: "", password: "" },
  profile: {
    usuarioId: "",
    rut: "",
    nombre: "",
    apellidos: "",
    email: "",
    canal: { id: 2, nombre: "Directo" },
    roles: "",
    ubicacion: [{ entidad: "local", idInterno: 4, nombre: "Derco Movicenter" },
      { entidad: "automotora", idInterno: 4, nombre: "vespucio norte" }],
    rol: "",
    preferencias:{},
    componentes: ""
  },
  loadRoleForm: false,
  menu: [],
  componentes: {},
  token: "",
  token2: "",
  accountId: "",
  listMenu: [],
  isFetching: false,
  isLoggedIn: false,
  loginFailed: false,
  route: { path: "/", params: "" },
};

export default loginState;
