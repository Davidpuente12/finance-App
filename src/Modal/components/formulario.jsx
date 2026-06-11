import { useEffect, useState } from "react";
import { EnviarTransaccion } from "./Enviar_transaccion";
import "../modal.css";

function Formulario({ guardarTransaccion, transaccionAeditar, ClosedModal }) {
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
          <span className="icon-closed" onClick={ClosedModal}>
            ⨉
          </span>
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
