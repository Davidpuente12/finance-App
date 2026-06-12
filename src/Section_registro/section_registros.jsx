import { useMemo } from "react";
import { ItemTransaccion } from "./components/ItemTransaccion";
import { IoMdSearch } from "react-icons/io";
import { categorias_gastos, categorias_ingresos } from "../utils/categorias";
// css
import "./section_registros.css";
import { ImOpt } from "react-icons/im";

function SectionRegistros({
  currentTab,
  lista,
  actualizarLista,
  loading,
  onEdit,
  searchQuery,
  onSearchQueryChange,
  filterType,
  onFilterTypeChange,
  filterCategory,
  onFilterCategoryChange,
  filterDate,
  onFilterDateChange,
  resetFilters,
}) {
  // fILTROS DEL BUSCADOR , CATEGORIAS Y TIPOS DE GASTOS
  const filteredTransactions = useMemo(() => {
    return lista
      .filter((item) => {
        const matchType = filterType === "todos" || item.tipo === filterType;
        const matchCategory =
          filterCategory === "todos" || item.categoria === filterCategory;
        const matchSearch =
          item.categoria
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()) ||
          item.descripcion
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase());

        const matchDate = (() => {
          if (!filterDate) return true;
          const [year, month] = filterDate.split("-");
          const itemFecha = item.fecha.includes("-")
            ? item.fecha
            : new Date(item.fecha).toISOString().split("T")[0];
          const [itemYear, itemMonth] = itemFecha.split("-");
          return (
            Number(itemYear) === Number(year) &&
            Number(itemMonth) === Number(month)
          );
        })();

        return matchType && matchCategory && matchSearch && matchDate;
      })
      .sort((a, b) => {
        const fechaA = new Date(a.fecha.replace(/-/g, "/"));
        const fechaB = new Date(b.fecha.replace(/-/g, "/"));
        return fechaB - fechaA;
      });
  }, [lista, filterType, filterCategory, searchQuery, filterDate]);

  //ELIMINAR ITEM
  function eliminarItem(itemDelete) {
    const nuevaLista = [...lista.filter((item) => item.id !== itemDelete)];
    actualizarLista(nuevaLista);
  }

  return (
    <>
      {currentTab === "inicio" ? (
        <section className="section-registros">
          <div className="section-registros-head">
            <h3>Ultimos registros</h3>
            <p className="ver-todos">Todos ({lista.length})</p>
          </div>

          <ul className="section-registros-lista">
            {loading && (
              <p style={{ textAlign: "center" }}>Estamos cargando...</p>
            )}
            {lista.length === 0 && !loading && (
              <p style={{ textAlign: "center" }}>
                No tienes transacciones registradas.!
              </p>
            )}

            {filteredTransactions.slice(0, 5).map((item) => {
              return (
                <ItemTransaccion
                  id={item.id}
                  key={item.id}
                  tipo={item.tipo}
                  categoria={item.categoria}
                  cantidad={item.monto}
                  fecha={item.fecha}
                  descripcion={item.descripcion}
                  onDelete={() => eliminarItem(item.id)}
                  onEdit={() => onEdit(item)}
                />
              );
            })}
          </ul>
        </section>
      ) : (
        <>
          <section className="sectionRegistros-filtros">
            <div className="sectionRegistros-filtros-head">
              <h3>Buscador e Historial</h3>
              <div className="sectionRegistros-search">
                <span>
                  <IoMdSearch />
                </span>
                <input
                  placeholder="Busca por concepto o categoria"
                  value={searchQuery}
                  onChange={(event) => onSearchQueryChange(event.target.value)}
                />
              </div>
            </div>

            <div className="registros-filtros-avanzados">
              <div>
                <label>TIPO DE MOVIMIENTO</label>
                <select
                  value={filterType}
                  onChange={(event) => onFilterTypeChange(event.target.value)}
                >
                  <option value="todos">Todas las transacciones</option>
                  <option value="ingreso">Solo Ingresos</option>
                  <option value="gasto">Solo Gastos</option>
                </select>
              </div>

              <div>
                <label>CATEGORIA</label>
                <select
                  value={filterCategory}
                  onChange={(event) =>
                    onFilterCategoryChange(event.target.value)
                  }
                >
                  <option value="todos">Todas las categorías</option>
                  {filterType === "todos" ? (
                    <>
                      <optgroup label="Gastos">
                        {categorias_gastos.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Ingresos">
                        {categorias_ingresos.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </optgroup>
                    </>
                  ) : filterType === "gasto" ? (
                    categorias_gastos.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))
                  ) : (
                    categorias_ingresos.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label>FECHA</label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(event) => {
                    onFilterDateChange(event.target.value);
                  }}
                />
              </div>

              <div>
                <button type="button" onClick={resetFilters}>
                  Resetear
                </button>
              </div>
            </div>
          </section>

          <section className="section-registros-pages">
            <ul
              className="section-registros-lista"
              style={{ borderRadius: "15px" }}
            >
              {loading && (
                <p style={{ textAlign: "center" }}>Estamos cargando...</p>
              )}
              {lista.length === 0 && !loading && (
                <p style={{ textAlign: "center" }}>
                  No tienes transacciones registradas.!
                </p>
              )}

              {filteredTransactions.map((item) => {
                return (
                  <ItemTransaccion
                    id={item.id}
                    key={item.id}
                    tipo={item.tipo}
                    categoria={item.categoria}
                    cantidad={item.monto}
                    fecha={item.fecha}
                    descripcion={item.descripcion}
                    onDelete={() => eliminarItem(item.id)}
                    onEdit={() => onEdit(item)}
                  />
                );
              })}
            </ul>
          </section>
        </>
      )}
    </>
  );
}

export { SectionRegistros };
