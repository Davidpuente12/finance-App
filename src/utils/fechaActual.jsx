const hoy = new Date();
const mesActual = hoy.getMonth();
const añoActual = hoy.getFullYear();

const listaMesActual = (lista) => {
  return lista.filter((item) => {
    const fecha = new Date(item.fecha.replace(/-/g, "/"));
    return fecha.getFullYear() === añoActual && fecha.getMonth() === mesActual;
  });
};

const listaAñoActual = (lista) => {
  return lista.filter((item) => {
    const fecha = new Date(item.fecha.replace(/-/g, "/"));
    return fecha.getFullYear() === añoActual;
  });
};

export { listaMesActual, listaAñoActual };
