import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Paginador from "../components/Paginador";

const API = "https://restcountries.com/v3.1/region/";
const ELEMENTOS_POR_PAGINA = 12;


const Continentes = () => {
  const params = useParams();
  const [datos, setDatos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const getDatos = async () => {
    try {
      const URI = API + params.id;
      const response = await fetch(URI);
      const data = await response.json();
      setDatos(data); // Asumo que quieres usar todos los datos devueltos por el API
      setTotalPaginas(Math.ceil(data.length / ELEMENTOS_POR_PAGINA));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDatos();
  }, [params.id]);
  const manejarCambioDePagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const indiceInicio = (paginaActual - 1) * ELEMENTOS_POR_PAGINA;
  const indiceFin = indiceInicio + ELEMENTOS_POR_PAGINA;
  const datosActuales = datos.slice(indiceInicio, indiceFin);

  return (
    <div className="container min-vh-100 text-center m-10 bg-gradient-to-r min-vh-100 rounded-3">
      <h1 className="text-center m-3 lead fs-1">{params.id.charAt(0).toUpperCase() + params.id.slice(1)}</h1>
      <div className="row">
        {Array.isArray(datos) && datos.length > 0 ? (
          datosActuales.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
              <Card item={item} />
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div className="contenedor-paginador">
        <Paginador paginaActual={paginaActual} totalPaginas={totalPaginas} manejarCambioDePagina={manejarCambioDePagina} />
      </div>

    </div>
  );
}

export default Continentes;
