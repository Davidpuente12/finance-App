import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [lista, setLista] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    const parced = stored ? JSON.parse(stored) : initialValue;

    const temporizador = setTimeout(() => {
      setLista(parced);
      setLoading(false);
    }, 500);

    return () => clearTimeout(temporizador);
  }, [key]);

  function actualizarLista(newList) {
    localStorage.setItem(key, JSON.stringify(newList));
    setLista(newList);
  }

  return {
    lista,
    actualizarLista,
    loading,
  };
}

export { useLocalStorage };
