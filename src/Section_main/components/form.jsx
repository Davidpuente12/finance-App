import { useState } from "react";

function Form({ visible }) {
  const [searchValue, setSearchValue] = useState("");

  return visible ? (
    <form action="">
      <label htmlFor="input_transaccion">Transaccion:</label>
      <input
        type="text"
        id="input_transaccion"
        placeholder="transaccion"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <button>Enviar</button>
    </form>
  ) : null;
}

export { Form };
