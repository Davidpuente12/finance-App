function ItemTransaccion({ tipo, dinero, id, onCompleted }) {
  return (
    <li className="ItemTransaccion" id={id}>
      <p>
        {tipo}: {dinero}
      </p>
      <span onClick={onCompleted}>x</span>
    </li>
  );
}

export { ItemTransaccion };
