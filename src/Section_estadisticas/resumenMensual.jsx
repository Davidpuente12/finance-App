import { useMemo } from "react";
import { categorias_gastos } from "../utils/categorias";
import { formatearMonto } from "../utils/formatearMonto";
import "../Section_estadisticas/resumen.css";

function ResumenMensual({
  listaGastos,
  totalGastos,
  totalIngresos,
  currentTab,
}) {
  const agruparGastos = useMemo(() => {
    const grupos = {};

    categorias_gastos.forEach(
      (cat) => (grupos[cat.name] = { ...cat, total: 0 }),
    );

    listaGastos.forEach((item) => {
      // Si la categoría no existe, se crea.
      if (!grupos[item.categoria]) {
        grupos[item.categoria] = {
          name: item.categoria,
          color: "#9ca3af",
          icon: "🛍️",
          total: 0,
        };
      }
      grupos[item.categoria].total += item.monto;
    });

    return Object.values(grupos).sort((a, b) => b.total - a.total);
  }, [listaGastos]);

  const graficos = useMemo(() => {
    const gastosReales = agruparGastos.filter((cat) => cat.total > 0);
    const totalGastos = gastosReales.reduce((sum, item) => sum + item.total, 0);

    let anguloActual = 0;
    const datosDelAngulo = gastosReales.map((item) => {
      const porcentaje = totalGastos > 0 ? (item.total / totalGastos) * 100 : 0;
      const angulo = (porcentaje / 100) * 360;
      const inicioAngulo = anguloActual;
      const finAngulo = anguloActual + angulo;

      return {
        ...item,
        porcentaje,
        inicioAngulo,
        finAngulo,
      };
    });

    return datosDelAngulo;
  }, [agruparGastos]);

  const porcentajeRespectoAIngresos = useMemo(() => {
    const gastosReales = agruparGastos.filter((cat) => cat.total > 0);

    return gastosReales.map((item) => {
      return totalIngresos > 0 ? (item.total / totalIngresos) * 100 : 0;
    });
  }, [agruparGastos, totalIngresos]);

  return (
    <>
      {currentTab === "inicio" ? (
        <section className="resumenMensualInicio">
          <div className="resumenMensualInicio-header">
            <h3>Resumen Mensual</h3>
            <p className="ver-todos">
              Todos (<span>{listaGastos.length}</span>)
            </p>
          </div>

          <div className="resumenMensualInicio-body">
            <div className="resumenMensualInicio-grafico">
              <svg viewBox="0 0 42 42">
                <circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#1e293b"
                  strokeWidth="4.5"
                />

                {/* Segmentos de Categorías */}
                {graficos.map((slice, idx) => {
                  const totalLength = 100;
                  const offset = graficos
                    .slice(0, idx)
                    .reduce((sum, s) => sum + s.porcentaje, 0);

                  return (
                    <circle
                      key={idx}
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth="5"
                      strokeDasharray={`${slice.porcentaje} ${totalLength - slice.porcentaje}`}
                      strokeDashoffset={-offset}
                    />
                  );
                })}
              </svg>

              <p>
                <span>Gastos</span>
                <span className="numero">{formatearMonto(totalGastos)}</span>
              </p>
            </div>

            <div className="resumenMensualInicio-lista">
              {graficos.slice(0, 4).map((item, index) => (
                <div key={index} className="resumenMensual-itemsLista">
                  <p>
                    <span style={{ color: item.color }}> {item.icon}</span>{" "}
                    <span>{item.name}</span>
                  </p>
                  <p>{formatearMonto(item.total)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="seccionResumenEstadisticas">
          <div className="seccionResumenEstadisticas-grafico">
            <div className="seccionResumenEstadisticas-title">
              <h3>Resumen Mensual</h3>
              <p>
                De todas las categorias del mes actual. Aqui podras encontrar:{" "}
                <br />
                <span style={{ color: "var(--text-color-primary)" }}>
                  Porcentaje sobre total de Gastos
                </span>
                <br />
                <span style={{ color: "var(--text-color-green)" }}>
                  Porcentaje sobre total de Ingresos
                </span>
              </p>
            </div>

            <div className="grafico-circular">
              <svg viewBox="0 0 42 42">
                <circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#1e293b"
                  strokeWidth="4.5"
                />

                {graficos.map((slice, idx) => {
                  const totalLength = 100;
                  const offset = graficos
                    .slice(0, idx)
                    .reduce((sum, s) => sum + s.porcentaje, 0);

                  return (
                    <circle
                      key={idx}
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth="5"
                      strokeDasharray={`${slice.porcentaje} ${totalLength - slice.porcentaje}`}
                      strokeDashoffset={-offset}
                    />
                  );
                })}
              </svg>

              <p className="text-grafico">
                <span>Gastos</span>
                <span className="numero">{formatearMonto(totalGastos)}</span>
              </p>
            </div>
          </div>

          <div className="seccionResumenEstadisticas-lista">
            {graficos.map((item, index) => (
              <div key={index} className="resumenMensual-itemsLista">
                <p>
                  <span style={{ color: item.color }}> {item.icon}</span>{" "}
                  <span>{item.name}</span>
                </p>
                <p>
                  <span>{formatearMonto(item.total)}</span>
                  <span style={{ color: "var(--text-color-primary)" }}>
                    {item.porcentaje.toFixed(1)}%
                  </span>
                  <span style={{ color: "var(--text-color-green)" }}>
                    {porcentajeRespectoAIngresos[index].toFixed(1)} %
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export { ResumenMensual };
