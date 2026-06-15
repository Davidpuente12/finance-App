import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { EnviarTransaccion } from "./Enviar_transaccion";
import "../modal.css";

function Formulario({
  guardarTransaccion,
  transaccionAeditar,
  ClosedModal,
  onDelete,
}) {
  const [tipoDeTransaccion, setTipoDeTransaccion] = useState("gasto");

  useEffect(() => {
    if (transaccionAeditar?.tipo === "ingreso") {
      setTipoDeTransaccion("ingreso");
    }
  }, [transaccionAeditar]);

  function DatosDelFormulario({ monto, categoria, fecha, descripcion }) {
    guardarTransaccion({
      tipo: tipoDeTransaccion,
      monto,
      categoria,
      fecha,
      descripcion,
      id: transaccionAeditar?.id ?? Date.now(),
    });
  }

  return (
    <div className="section-modal">
      <section>
        <div className="section-modal-header">
          <h3>Registrar Operacion</h3>
          <div className="icons-modal">
            {transaccionAeditar && onDelete && (
              <span
                className="icon-delete-modal"
                onClick={() => {
                  onDelete(transaccionAeditar.id);
                  ClosedModal();
                }}
              >
                <FaTrashAlt />
              </span>
            )}

            <span className="icon-closed" onClick={ClosedModal}>
              ⨉
            </span>
          </div>
        </div>

        <div className="section-modal-panel">
          <button
            className={
              tipoDeTransaccion === "gasto" ? "btn-rojo" : "btn-transparente"
            }
            onClick={() => setTipoDeTransaccion("gasto")}
          >
            Gastos
          </button>
          <button
            className={
              tipoDeTransaccion === "ingreso" ? "btn-verde" : "btn-transparente"
            }
            onClick={() => setTipoDeTransaccion("ingreso")}
          >
            Ingresos
          </button>
        </div>

        <EnviarTransaccion
          DatosDelFormulario={DatosDelFormulario}
          transaccionAeditar={transaccionAeditar}
          tipoDeTransaccion={tipoDeTransaccion}
        />
      </section>
    </div>
  );
}

export { Formulario };
