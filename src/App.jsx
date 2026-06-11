import { Header } from "./header/header";
import { Targetas } from "./targetas/Targetas.jsx";
import { SectionRegistros } from "./Section_registro/section_registros.jsx";
import { useLocalStorage } from "./hook/useLocalStorage";
import { Modal } from "./Modal/Modal.jsx";
import { Formulario } from "./Modal/components/formulario.jsx";
import { useState } from "react";
import { ResumenMensual } from "./Section_estadisticas/resumenMensual.jsx";
import { ResumenAnual } from "./Section_estadisticas/resumenAnual.jsx";
import { ResumenIngresosVsGastos } from "./Section_estadisticas/resumenIngresosVsGastos.jsx";
import { listaAñoActual } from "./utils/fechaActual.jsx";

function App() {
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  // Estados de Datos
  const [transaccionAeditar, setTransaccionAeditar] = useState(null);
  const { lista, actualizarLista, loading } = useLocalStorage(
    "transacciones_finance_APP",
    [],
  );
  // Estados de Navegacion / UI
  const [currentTab, setCurrentTab] = useState("inicio");
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [filterCategory, setFilterCategory] = useState("todos");
  const [filterDate, setFilterDate] = useState(getTodayDate);
  console.log(lista);
  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const handleFilterTypeChange = (value) => {
    setFilterType(value);
    setFilterCategory("todos");
  };

  const handleFilterCategoryChange = (value) => {
    setFilterCategory(value);
  };

  const handleFilterDateChange = (value) => {
    setFilterDate(value);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterType("todos");
    setFilterCategory("todos");
    setFilterDate(getTodayDate());
  };

  //  Calculo de gastos para resumen y targetas
  const getSelectedMonthItems = (items, selectedDate) => {
    const [year, month] = selectedDate.split("-");
    return items.filter((item) => {
      const normalizedFecha = item.fecha.includes("-")
        ? item.fecha
        : new Date(item.fecha).toISOString().split("T")[0];
      const [itemYear, itemMonth] = normalizedFecha.split("-");
      return (
        Number(itemYear) === Number(year) && Number(itemMonth) === Number(month)
      );
    });
  };

  const selectedMonthItems = getSelectedMonthItems(lista, filterDate);
  const listaGastosMensual = selectedMonthItems.filter(
    (item) => item.tipo === "gasto",
  );
  const totalGastosMensual = listaGastosMensual.reduce(
    (acu, item) => acu + item.monto,
    0,
  );

  const totalIngresosMensual = selectedMonthItems
    .filter((item) => item.tipo === "ingreso")
    .reduce((acu, item) => acu + item.monto, 0);

  const balanceTotal = totalIngresosMensual - totalGastosMensual;

  function guardarTransaccion(transaccion) {
    if (transaccionAeditar) {
      const newlist = lista.map((item) => {
        if (item.id === transaccionAeditar.id) {
          return transaccion;
        }
        return item;
      });

      actualizarLista(newlist);
    } else {
      actualizarLista([...lista, transaccion]);
    }
    ClosedModal();
  }
  // MODAL
  function OpenModal() {
    setModal(true);
  }
  function abrirModalEditar(item) {
    setTransaccionAeditar(item);
    setModal(true);
    console.log(transaccionAeditar);
  }
  function ClosedModal() {
    setModal(false);
    setTransaccionAeditar(null);
  }

  return (
    <>
      <Header
        OpenModal={OpenModal}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <Targetas
        balanceTotal={balanceTotal}
        totalIngresos={totalIngresosMensual}
        totalGastos={totalGastosMensual}
        filterDate={filterDate}
      />

      {currentTab === "inicio" && (
        <main className="main-inicio">
          <ResumenMensual
            listaGastos={listaGastosMensual}
            totalGastos={totalGastosMensual}
            currentTab={currentTab}
          />

          <SectionRegistros
            currentTab={currentTab}
            lista={selectedMonthItems}
            actualizarLista={actualizarLista}
            loading={loading}
            onEdit={abrirModalEditar}
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
            filterType={filterType}
            onFilterTypeChange={handleFilterTypeChange}
            filterCategory={filterCategory}
            onFilterCategoryChange={handleFilterCategoryChange}
            filterDate={filterDate}
            onFilterDateChange={handleFilterDateChange}
            resetFilters={resetFilters}
          />
        </main>
      )}

      {currentTab === "registros" && (
        <main>
          <SectionRegistros
            lista={lista}
            actualizarLista={actualizarLista}
            loading={loading}
            onEdit={abrirModalEditar}
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
            filterType={filterType}
            onFilterTypeChange={handleFilterTypeChange}
            filterCategory={filterCategory}
            onFilterCategoryChange={handleFilterCategoryChange}
            filterDate={filterDate}
            onFilterDateChange={handleFilterDateChange}
            resetFilters={resetFilters}
          />
        </main>
      )}

      {currentTab === "estadisticas" && (
        <main>
          <ResumenMensual
            listaGastos={listaGastosMensual}
            totalGastos={totalGastosMensual}
            totalIngresos={totalIngresosMensual}
            currentTab={currentTab}
          />
          <ResumenAnual
            listaGastos={listaAñoActual(
              lista.filter((item) => item.tipo === "gasto"),
            )}
          />
          <ResumenIngresosVsGastos lista={listaAñoActual(lista)} />
        </main>
      )}

      <footer>
        <p>Finance App • Gestor de Finanzas Personales</p>
        <p className="footer-derechos">
          © 2026 Todos los derechos reservados. Tus datos se guardan de forma
          local y privada.
        </p>
      </footer>

      {modal && (
        <Modal>
          <Formulario
            guardarTransaccion={guardarTransaccion}
            transaccionAeditar={transaccionAeditar}
            ClosedModal={ClosedModal}
          ></Formulario>
        </Modal>
      )}
    </>
  );
}

export default App;
