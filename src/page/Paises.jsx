import { useEffect, useState } from "react";
import Card from "../components/Card";
import Paginador from "../components/Paginador";

const API = 'https://restcountries.com/v3.1/all';
const ELEMENTOS_POR_PAGINA = 10;

const Paises = () => {
    const [datos, setDatos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);

    const getDatos = async () => {
        try {
            const respuesta = await fetch(API);
            const data = await respuesta.json();
            setDatos(data);
            setTotalPaginas(Math.ceil(data.length / ELEMENTOS_POR_PAGINA));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    const manejarCambioDePagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const indiceInicio = (paginaActual - 1) * ELEMENTOS_POR_PAGINA;
    const indiceFin = indiceInicio + ELEMENTOS_POR_PAGINA;
    const datosActuales = datos.slice(indiceInicio, indiceFin);

    return (
        <div className="container m-10 bg-gradient-to-r min-vh-100 rounded-3">
            <div className="row">
                <h1 className="m-3 lead fs-1">Todos los Paises</h1>
                {datosActuales.map((item, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
                        <Card item={item} />
                    </div>
                ))}
            </div>
            <Paginador paginaActual={paginaActual} totalPaginas={totalPaginas} manejarCambioDePagina={manejarCambioDePagina} />
        </div>
    );
}

export default Paises;
