import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = "https://restcountries.com/v3.1/name/";

const Detalles = () => {
  const params = useParams();
  const [datos, setDatos] = useState([]);

  const getDatos = async () => {
    try {
      const URI = API + params.id + "?fullText=true";
      const response = await fetch(URI);
      const data = await response.json();
      setDatos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDatos();
  }, [params.id]);

  const coatOfArmsUrl = datos.length > 0 && datos[0].coatOfArms?.svg;

  const styles = {
    container: {
      position: 'relative',
      zIndex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo blanco semi-transparente
      padding: '20px',
      borderRadius: '8px',
    },
    fondo: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: coatOfArmsUrl ? `url(${coatOfArmsUrl})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'grayscale(50%) blur(2.5px)',
      opacity: 0.3,
      zIndex: -1,
    },
    wrapper: {
      position: 'relative',
      minHeight: '75vh',
    }
  };

  return (
    <>
      {datos.length > 0 ? (
        <div className="m-10 container-lg" style={styles.wrapper}>
          {coatOfArmsUrl && <div style={styles.fondo}></div>}
          <div style={styles.container}>
            <div className="row">
              <div className="col col-md-6 col-sm-12 py-2 border rounded">
                {datos[0].flags?.svg ? (
                  <div className="text-center border text-light rounded-2 my-2">
                    <h2 className="lead my-2 fs-4">Bandera de {datos[0].name.common}</h2>
                    <hr />
                    <img src={datos[0].flags.svg} alt={`Bandera de ${datos[0].name.common}`} className="m-4" width={500} />
                  </div>
                ) : (
                  <div className="text-center border text-light rounded-2">
                    <h2 className="lead my-2 fs-4">Bandera de {datos[0].name.common}</h2>
                    <hr />
                    <p>No disponible</p>
                  </div>
                )}
                {coatOfArmsUrl ? (
                  <div className="text-center border text-light rounded-2">
                    <h2 className="lead my-2 fs-4">Escudo de {datos[0].name.common}</h2>
                    <hr />
                    <img src={coatOfArmsUrl} alt={`Escudo de ${datos[0].name.common}`} className="m-4" width={500} />
                  </div>
                ) : (
                  <div className="text-center border text-light rounded-2">
                    <h2 className="lead my-2 fs-4">Escudo de {datos[0].name.common}</h2>
                    <hr />
                    <p>No disponible</p>
                  </div>
                )}
              </div>
              <div className="col col-md-6 col-sm-12 border rounded">
                <div className="p-4">
                  <h2>Información de {datos[0].name.common}</h2>
                  <p><strong>Capital:</strong> {datos[0].capital ? datos[0].capital[0] : "No disponible"}</p>
                  <p><strong>Región:</strong> {datos[0].region}</p>
                  <p><strong>Subregión:</strong> {datos[0].subregion}</p>
                  <p><strong>Población:</strong> {datos[0].population.toLocaleString()}</p>
                  <p><strong>Idiomas:</strong> {Object.values(datos[0].languages).join(", ")}</p>
                  <p><strong>Moneda:</strong> {Object.values(datos[0].currencies)[0].name} ({Object.values(datos[0].currencies)[0].symbol})</p>
                  <p><strong>Continente:</strong> {datos[0].continents[0]}</p>
                  <p><strong>Gentilicio:</strong> {datos[0].demonyms?.eng?.m || "No disponible"}</p>
                  <p><strong>Área:</strong> {datos[0].area.toLocaleString()} km²</p>
                  <p><strong>Fronteras:</strong> {datos[0].borders ? datos[0].borders.join(", ") : "No disponible"}</p>
                  <p><strong>Zona Horaria:</strong> {datos[0].timezones.join(", ")}</p>
                  <p><strong>Código del País:</strong> {datos[0].cca3}</p>
                  <p><strong>Dominio Superior:</strong> {datos[0].tld.join(", ")}</p>
                  <p><strong>Prefijo Telefónico:</strong> {datos[0].idd.root}{datos[0].idd.suffixes ? datos[0].idd.suffixes.join(", ") : ""}</p>
                  <p><strong>Nombre Nativo:</strong> {Object.values(datos[0].name.nativeName)[0]?.common || "No disponible"}</p>
                  <p><strong>Latitud y Longitud:</strong> {datos[0].latlng.join(", ")}</p>
                  <p><strong>Símbolos Nacionales:</strong> {datos[0].nationalSymbols?.join(", ") || "No disponible"}</p>
                  <p><strong>Mapas:</strong> <a href={datos[0].maps.googleMaps} target="_blank" rel="noopener noreferrer">Google Maps</a>, <a href={datos[0].maps.openStreetMaps} target="_blank" rel="noopener noreferrer">OpenStreetMap</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
};

export default Detalles;
