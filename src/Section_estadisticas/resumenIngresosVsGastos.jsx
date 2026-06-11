import { useMemo } from "react";
import { formatearMonto } from "../utils/formatearMonto";

function ResumenIngresosVsGastos({ lista }) {
  const monthlyBarChartData = useMemo(() => {
    const monthsData = {};
    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    const today = new Date();
    const currentYear = today.getFullYear();

    for (let month = 0; month < 12; month++) {
      const key = `${currentYear}-${String(month + 1).padStart(2, "0")}`;
      monthsData[key] = {
        label: `${monthNames[month]} ${currentYear.toString().substr(-2)}`,
        ingresos: 0,
        gastos: 0,
      };
    }

    lista.forEach((item) => {
      const [year, month] = item.fecha.split("-");
      const dateObj = new Date(Number(year), Number(month) - 1);
      if (dateObj.getFullYear() !== currentYear) return;

      const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`;
      if (monthsData[key]) {
        if (item.tipo === "ingreso") {
          monthsData[key].ingresos += item.monto;
        } else {
          monthsData[key].gastos += item.monto;
        }
      }
    });

    return Object.values(monthsData);
  }, [lista]);

  const maxMonthlyValue = useMemo(() => {
    let max = 1000; // Mínimo de escala protector
    monthlyBarChartData.forEach((m) => {
      if (m.ingresos > max) max = m.ingresos;
      if (m.gastos > max) max = m.gastos;
    });
    return max * 1.1; // Margen superior del 10%
  }, [monthlyBarChartData]);

  return (
    <section className="resumen-ingVsEgre">
      <div className="resumen-ingVsEgre-header">
        <h3>Evolución de Ingresos vs. Gastos</h3>
        <p>
          Historial comparativo de todo el año actual para evaluar el balance
          neto de tu billetera.
        </p>
      </div>
      <div className="resumen-ingVsEgre-body">
        {monthlyBarChartData.map((dataPoint, idx) => {
          const incHeight = (dataPoint.ingresos / maxMonthlyValue) * 100;
          const expHeight = (dataPoint.gastos / maxMonthlyValue) * 100;

          return (
            <div key={idx} className="resumen-ingVsEgre-body-barras">
              {/* Tooltip Hover */}
              <div className="tooltipHover">
                <p className="tooltipTitle">{dataPoint.label}</p>
                <p style={{ color: "var(--text-color-green" }}>
                  Ingreso: {formatearMonto(dataPoint.ingresos)}
                </p>
                <p style={{ color: "var(--text-color-red" }}>
                  Gasto: {formatearMonto(dataPoint.gastos)}
                </p>
                <p className="tooltipNeto">
                  Neto:{" "}
                  <span
                    style={{
                      color:
                        dataPoint.ingresos - dataPoint.gastos >= 0
                          ? "var(--text-color-green"
                          : "var(--text-color-red",
                    }}
                  >
                    {formatearMonto(dataPoint.ingresos - dataPoint.gastos)}
                  </span>
                </p>
              </div>

              <div className="content-barras">
                <div
                  className="barra-ingresos"
                  style={{ height: `${Math.max(incHeight, 2)}%` }}
                />
                <div
                  className="barra-gastos"
                  style={{ height: `${Math.max(expHeight, 2)}%` }}
                />
              </div>

              <span className="barras-info">{dataPoint.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { ResumenIngresosVsGastos };
