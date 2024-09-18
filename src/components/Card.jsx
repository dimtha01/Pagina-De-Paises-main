import { Link } from "react-router-dom"
import { agregarPuntos } from "../util/util"

const Card = ({ item }) => {

  return (
    <>

      <div className="card" style={{ width: '15rem', height: '450px' }}>
        <img src={item.flags.png} className="card-img" alt="..." />
        <div className="card-body row">
          <h3 className="text-center lead font-weight-bold mb-2 col-12">{item.name.common}</h3>
          <p className="lead fs-6 mb-2 col-12">Idioma: {Object.values(item.languages || "").join(" / ")}</p>
          <p className="lead fs-6 mb-2 col-12">Población: {agregarPuntos(item.population)}  millones</p>
          <p className="lead fs-6 mb-2 col-12">Area: {agregarPuntos(item.area)}  mil km²</p>
        </div>
        <div className="card-footer d-flex align-content-center justify-content-center">
          <Link to={`/detalles/${item.name.common}`} className="btn btn-outline-light">Ver Detalles</Link>
        </div>
      </div>

    </>
  )
}

export default Card