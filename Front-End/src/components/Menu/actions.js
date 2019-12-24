// Action Creators
export const openMenu = () => ({
  type: "OPEN_MENU",
});

export const setTestProperty = (testPropertyValue) => ({
  type: "TEST_ACTION",
  testPropertyValue,
});

export const closeMenu = () => ({
  type: "CLOSE_MENU",
});

export const navegarRuta = (ruta, params) => ({
  type: "NAVEGAR_RUTA",
  ruta,
  params,
});
