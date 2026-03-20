import img_alimentos from "../../assets/Img_alimentos.png";

function Items({ text, funcion }) {
  return (
    <li className="type-expenses" onClick={funcion}>
      <img src={img_alimentos} alt={text} />
      <p>{text}</p>
    </li>
  );
}

export { Items };
