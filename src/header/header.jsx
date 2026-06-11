import { MdSpaceDashboard } from "react-icons/md";
import { RiAlignItemBottomFill } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";

function Header({ OpenModal, currentTab, setCurrentTab }) {
  return (
    <header>
      <h1>Finance App</h1>
      <div className="header-navegation">
        <button
          onClick={() => setCurrentTab("inicio")}
          className={
            currentTab === "inicio" ? "button-active" : "button-inActive"
          }
        >
          <MdSpaceDashboard /> Inicio
        </button>
        <button
          onClick={() => setCurrentTab("registros")}
          className={
            currentTab === "registros" ? "button-active" : "button-inActive"
          }
        >
          <TiThMenu /> Registros
        </button>
        <button
          onClick={() => setCurrentTab("estadisticas")}
          className={
            currentTab === "estadisticas" ? "button-active" : "button-inActive"
          }
        >
          <RiAlignItemBottomFill /> Estadisticas
        </button>
      </div>
      <button className="button-modal" onClick={OpenModal}>
        <IoMdAdd /> Nuevo registro
      </button>
    </header>
  );
}

export { Header };
