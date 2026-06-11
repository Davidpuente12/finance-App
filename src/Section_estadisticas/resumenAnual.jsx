import { formatearMonto } from "../utils/formatearMonto";

function ResumenAnual({ listaGastos }) {
  const añoActual = new Date().getFullYear();
  const mesesDelAño = [
    { clave: "01", label: "Ene" },
    { clave: "02", label: "Feb" },
    { clave: "03", label: "Mar" },
    { clave: "04", label: "Abr" },
    { clave: "05", label: "May" },
    { clave: "06", label: "Jun" },
    { clave: "07", label: "Jul" },
    { clave: "08", label: "Ago" },
    { clave: "09", label: "Sep" },
    { clave: "10", label: "Oct" },
    { clave: "11", label: "Nov" },
    { clave: "12", label: "Dic" },
  ];

  const gastoPorMes = mesesDelAño.reduce((acumulador, mes) => {
    acumulador[`${añoActual}-${mes.clave}`] = 0;
    return acumulador;
  }, {});

  listaGastos.forEach((item) => {
    const fecha = new Date(item.fecha.replace(/-/g, "/"));
    if (fecha.getFullYear() !== añoActual) return;

    const key = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
    gastoPorMes[key] = (gastoPorMes[key] || 0) + item.monto;
  });

  const resumenMensual = mesesDelAño.map((mes) => {
    const key = `${añoActual}-${mes.clave}`;
    return {
      mes: `${mes.label} ${añoActual.toString().substr(-2)}`,
      total: gastoPorMes[key] || 0,
    };
  });

  const maxGasto = Math.max(...resumenMensual.map((item) => item.total), 1);

  const totalGastos = resumenMensual.reduce((acumulador, item) => {
    return acumulador + item.total;
  }, 0);
  const mesesConGasto = resumenMensual.filter((item) => item.total > 0);

  const promedioMensual = totalGastos / mesesConGasto.length;

  return (
    <section className="resumen-anual">
      <div className="resumen-anual-header">
        <h3>Resumen Anual</h3>
        <p>Historial por cada mes del año actual.</p>
      </div>

      <div className="resumen-anual-body">
        <div className="barras-wrapper">
          {resumenMensual.map((data) => {
            const esElMaximo = data.total === maxGasto && maxGasto > 0;

            return (
              <div key={data.mes} className="columna">
                <div className="etiqueta-gasto">
                  ${data.total.toLocaleString()}
                </div>
                <div
                  className="barra"
                  style={{
                    height: `${(data.total / maxGasto) * 100}%`,
                    backgroundColor: esElMaximo ? "#ff6b6b" : "#4facfe",
                  }}
                ></div>
                <div className="etiqueta-mes">{data.mes}</div>
              </div>
            );
          })}
        </div>

        <div className="resumen-anual-info">
          <p>
            <b style={{ color: "var(--text-color-red)" }}>TOTAL GASTADO</b>
            {formatearMonto(totalGastos)}
          </p>
          <p>
            <b style={{ color: "var(--text-color-primary)" }}>
              PROMEDIO MENSUAL
            </b>{" "}
            {formatearMonto(promedioMensual.toFixed())}
          </p>
        </div>
      </div>
    </section>
  );
}

export { ResumenAnual };
