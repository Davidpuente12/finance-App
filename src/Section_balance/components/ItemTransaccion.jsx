import { FaTrashAlt } from "react-icons/fa";

function ItemTransaccion({ tipo, dinero, id, onCompleted }) {
  return (
    <li className="ItemTransaccion" id={id}>
      <p>
        {tipo}: {dinero}
      </p>
      <span onClick={onCompleted}>{<FaTrashAlt />}</span>
    </li>
  );
}

export { ItemTransaccion };
