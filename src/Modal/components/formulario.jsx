import { useEffect, useRef, useState } from "react";
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
  const formularioRef = useRef(null);

  function handleSubmitMovil() {
    formularioRef.current?.requestSubmit();
  }

  useEffect(() => {
    if (transaccionAeditar?.tipo === "ingreso") {
      setTipoDeTransaccion("ingreso");
    } else {
      setTipoDeTransaccion("gasto");
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
          <div className="content-principal">
            <h3>Registrar Operacion</h3>

            <span className="icon-closed" onClick={ClosedModal}>
              ⨉
            </span>
          </div>

          <div className="content-principal">
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

            <span
              className="button-submit-movil"
              onClick={handleSubmitMovil}
              role="button"
              tabIndex={0}
              onKeyPress={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleSubmitMovil();
                }
              }}
            >
              Enviar
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
          formRef={formularioRef}
        />
      </section>
    </div>
  );
}

export { Formulario };
