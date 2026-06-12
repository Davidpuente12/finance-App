import { FaTrashAlt } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { categorias_gastos, categorias_ingresos } from "../../utils/categorias";
import { formatearMonto } from "../../utils/formatearMonto";

const getCategoryIcon = (categoria, tipo) => {
  let cat;

  if (tipo === "gasto") {
    cat = categorias_gastos.find((cat) => cat.name === categoria);
  } else if (tipo === "ingreso") {
    cat = categorias_ingresos.find((cat) => cat.name === categoria);
  }

  return cat ? (
    <span
      style={{
        width: "25px",
        height: "25px",
        marginRight: "15px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        border: `1px solid ${cat.color}`,
        background: "black",
        borderRadius: "5px",
      }}
    >
      {cat.icon}
    </span>
  ) : (
    <span
      style={{
        width: "25px",
        height: "25px",
        marginRight: "15px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid var(--border-primary)",
        borderRadius: "5px",
        background: "black",
      }}
    >
      <IoWalletOutline />
    </span>
  );
};

const getCategotyColor = (categoria, tipo) => {
  let cat;

  if (tipo === "gasto") {
    cat = categorias_gastos.find((cat) => cat.name === categoria);
  } else if (tipo === "ingreso") {
    cat = categorias_ingresos.find((cat) => cat.name === categoria);
  }
  return cat ? (
    <b style={{ color: cat.color, fontSize: "var(--text-small)" }}>
      {cat.name}
    </b>
  ) : (
    <span style={{ fontSize: "var(--text-small)" }}>{categoria}</span>
  );
};

function ItemTransaccion({
  tipo,
  categoria,
  cantidad,
  fecha,
  descripcion,
  id,
  onDelete,
  onEdit,
}) {
  return (
    <li className="section-registros-items" id={id}>
      <div>
        {getCategoryIcon(categoria, tipo)}
        <p className="category-descripcion">
          <span>{descripcion ? descripcion : categoria}</span>
          {getCategotyColor(categoria, tipo)}
        </p>
      </div>

      <div>
        <div className="month-date">
          <b
            style={{
              color:
                tipo === "ingreso"
                  ? "var(--text-color-green)"
                  : "var(--text-color-red)",
            }}
          >
            {tipo === "ingreso" ? "+" : "-"} {formatearMonto(cantidad)}
          </b>
          <span className="item-fecha">{fecha}</span>
        </div>

        <span className="item-icon-edit" onClick={onEdit}>
          {<AiFillEdit />}
        </span>
        <span className="item-icon-delete" onClick={onDelete}>
          {<FaTrashAlt />}
        </span>
      </div>
    </li>
  );
}

export { ItemTransaccion };
