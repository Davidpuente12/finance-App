import "./targetas.css";
import { formatearMonto } from "../utils/formatearMonto";

function Targetas({ balanceTotal, totalIngresos, totalGastos, filterDate }) {
  const formatSelectedPeriod = (dateString) => {
    if (!dateString) return "ACTUAL";
    const [year, month] = dateString.split("-");
    const monthNames = [
      "ENERO",
      "FEBRERO",
      "MARZO",
      "ABRIL",
      "MAYO",
      "JUNIO",
      "JULIO",
      "AGOSTO",
      "SEPTIEMBRE",
      "OCTUBRE",
      "NOVIEMBRE",
      "DICIEMBRE",
    ];
    const monthIndex = Number(month) - 1;
    if (monthIndex < 0 || monthIndex > 11) return "ACTUAL";
    return `${monthNames[monthIndex]} ${year}`;
  };

  const selectedPeriodLabel = formatSelectedPeriod(filterDate);

  return (
    <div className="main-cards">
      <article className="card-balance">
        <div>
          <p className="card-textTitle">
            BALANCE TOTAL <b className="card-textDate">{selectedPeriodLabel}</b>
          </p>
          <p className={balanceTotal < 0 ? "number-red" : "number"}>
            {formatearMonto(balanceTotal)}
          </p>
        </div>

        {balanceTotal < 0 ? (
          <p className="cards-textSmall">
            <b className="card-textRed">Deuda</b> en este periodo.
          </p>
        ) : (
          <p className="cards-textSmall">
            <b className="card-textGreen">Flujo saludable</b> en este periodo.
          </p>
        )}
      </article>

      <article className="card-ingreso">
        <div>
          <p className="card-textTitle">TOTAL INGRESOS</p>
          <p className="number-green">
            <b>{formatearMonto(totalIngresos)}</b>
          </p>
        </div>

        <p className="cards-textSmall">
          <span className="green">suma total</span> de fondos añadidos.
        </p>
      </article>

      <article className="card-gasto">
        <div>
          <p className="card-textTitle">TOTAL GASTOS</p>
          <p className="number-red">{formatearMonto(totalGastos)}</p>
        </div>

        <p className="cards-textSmall">
          <span className="red">suma total</span> de fondos añadidos.
        </p>
      </article>
    </div>
  );
}

export { Targetas };
