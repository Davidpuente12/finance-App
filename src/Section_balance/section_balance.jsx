import { useState } from "react";
import { ItemTransaccion } from "./components/ItemTransaccion";
import "./section_balance.css";

const listaOfExpenses = [
  { tipo: "Supermercado", gasto: 18000 },
  { tipo: "Panaderia", gasto: 32000 },
  { tipo: "Bicicleta", gasto: 20000 },
  { tipo: "Servicios", gasto: 50000 },
];

function SectionBalance() {
  const [lista, setLista] = useState(listaOfExpenses);
  const [value, setValue] = useState("");

  //componentes derivados de lista
  const gastoMayor =
    lista.length > 0
      ? lista.reduce((max, actual) => {
          return actual.gasto > max.gasto ? actual : max;
        })
      : { tipo: "N/A", gasto: 0 };

  const numeroGasto = lista.length;
  const encontrarGasto = lista.filter((item) => {
    return item.tipo.toLowerCase().includes(value.toLowerCase());
  });

  //actualizar lista
  function eliminarItem(index) {
    const nuevaLista = [...lista];
    const indice = nuevaLista.findIndex((item, indice) => {
      if (indice === index) {
        return item;
      }
    });
    nuevaLista.splice(indice, 1);
    setLista(nuevaLista);
  }

  return (
    <section className="section_estadistica">
      <div className="content-list">
        <input
          type="text"
          placeholder="Buscar gastos"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <ul>
          {encontrarGasto.map((item, index) => {
            return (
              <ItemTransaccion
                id={index}
                key={index}
                tipo={item.tipo}
                dinero={item.gasto}
                onCompleted={() => eliminarItem(index)}
              />
            );
          })}
        </ul>

        <div>
          <p>Numero de gastos: {numeroGasto}</p>{" "}
          <p>Gasto mayor: {gastoMayor.gasto}</p>
        </div>
      </div>
    </section>
  );
}

export { SectionBalance };
