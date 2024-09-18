import { useLocation } from "react-router-dom";

const Buscar = () => {
  const location = useLocation(); // Obtener la ubicación actual de la página
  const valueSearch = location.state; // Obtener el valor de búsqueda de la ubicación actual
  console.log(valueSearch);
  return (
    <></>
  )
}

export default Buscar