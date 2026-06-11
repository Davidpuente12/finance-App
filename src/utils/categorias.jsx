import { LiaBicycleSolid } from "react-icons/lia";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiShoppingCart2Line } from "react-icons/ri";
import { RiShoppingBag4Line } from "react-icons/ri";
import { PiHouseLineBold } from "react-icons/pi";
import { MdElectricalServices } from "react-icons/md";
import { RiBusFill } from "react-icons/ri";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { LuGamepad2 } from "react-icons/lu";
import { TbBusinessplan } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { IoIosWifi } from "react-icons/io";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { AiOutlineDollarCircle } from "react-icons/ai";

const categorias_gastos = [
  { name: "Restaurante", icon: <IoFastFoodOutline />, color: "#f16262" },
  { name: "Supermercado", icon: <RiShoppingCart2Line />, color: "#ef4444" },
  { name: "Vivienda", icon: <PiHouseLineBold />, color: "#ffac1c" },
  { name: "Servicios", icon: <MdElectricalServices />, color: "#e7ab42" },
  { name: "Internet", icon: <IoIosWifi />, color: "#3b82f6" },
  { name: "Transporte", icon: <RiBusFill />, color: "#34c9e4" },
  { name: "Vehiculo", icon: <MdOutlineDirectionsCar />, color: "#34c9e4" },
  // { name: "Bicicleta", icon: <LiaBicycleSolid />, color: "#34c9e4" },
  { name: "Compras", icon: <RiShoppingBag4Line />, color: "#fa51a6" },
  { name: "Entretenimiento", icon: <LuGamepad2 />, color: "#fa51a6" },
  { name: "Salud", icon: <MdOutlineHealthAndSafety />, color: "#10b981" },
  { name: "Educación", icon: <FaUniversity />, color: "#8b5cf6" },
  { name: "Inversiones", icon: <TbBusinessplan />, color: "#84cc16" },
  { name: "Otros", icon: <IoWalletOutline />, color: "#6b7280" },
];

const categorias_ingresos = [
  { name: "Salario", icon: <FaHandHoldingDollar />, color: "#d9c71f" },
  { name: "Inversiones", icon: <AiOutlineDollarCircle />, color: "#84cc16" },
  { name: "Otros", icon: <IoWalletOutline />, color: "#06b6d4" },
];

export { categorias_gastos, categorias_ingresos };
