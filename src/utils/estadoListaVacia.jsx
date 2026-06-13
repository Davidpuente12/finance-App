function EstadoListaVacia({ currentTab }) {
  return (
    <div
      className={
        currentTab === "inicio"
          ? "estado-lista-vacia"
          : "estado-lista-vacia dark"
      }
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <p>No tienes transacciones registradas! </p>
    </div>
  );
}

export { EstadoListaVacia };
