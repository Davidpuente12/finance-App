import { useState } from "react";

// const listaOfExpenses = [
//   { tipo: "Supermercado", gasto: 18000 },
//   { tipo: "Panaderia", gasto: 32000 },
//   { tipo: "Bicicleta", gasto: 20000 },
//   { tipo: "Servicios", gasto: 50000 },
// ];

// CUSTM HOOK

function useLocalStorage(key, initialValue) {
  // localStorage
  let localStoragelist = localStorage.getItem(key);
  let parcedlista;

  if (!localStoragelist) {
    console.log("storage vacio");
    parcedlista = initialValue;
    localStorage.setItem("gastos", JSON.stringify(initialValue));
  } else {
    console.log("storage lleno");
    parcedlista = JSON.parse(localStoragelist);
  }

  const [item, setItem] = useState(parcedlista);

  // actualizar lista
  function actualizarLista(newList) {
    localStorage.setItem("gastos", JSON.stringify(newList));
    setItem(newList);
  }

  return [item, actualizarLista];
}

export { useLocalStorage };
