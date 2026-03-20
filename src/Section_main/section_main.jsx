import { useState } from "react";

//estilos
import "./section_main.css";

//componentes
import { Items } from "./components/Items_of_list";
import { Form } from "./components/form";

const defaultItems = [
  { text: "Alimentos" },
  { text: "Ropa" },
  { text: "Servicios" },
  { text: "Servicios" },
  { text: "Servicios" },
  { text: "Servicios" },
  { text: "Servicios" },
  { text: "Servicios" },
  { text: "Servicios" },
  { text: "Servicios" },
];

function SectionMain() {
  const [estado, setEstado] = useState(false);
  const toggle = () => setEstado(!estado);
  return (
    <section className="section_main">
      <div className="list-expenses">
        <h2>Gastos</h2>
        <ul className="buttons-expenses">
          {defaultItems.map((item, index) => (
            <Items key={index} text={item.text} funcion={toggle} />
          ))}
        </ul>
      </div>

      <div className="set-expenses">
        <Form visible={estado} />
      </div>
    </section>
  );
}

export { SectionMain };
