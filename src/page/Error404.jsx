import { Link } from "react-router-dom"

const Error404 = () => {
  return (
    <>
      <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center blur-background">
        <div className="container-fluid blur-overlay">
          <div className="row">
            <div className="col-12">
              <div className="text-center text-light">
                <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                  <span className="display-1 fw-bold">4</span>
                  <i className="bx bx-error-circle text-danger display-4" />
                  <span className="display-1 fw-bold">4</span>
                </h2>
                <h3 className="h2 mb-2">¡Ups! Estás perdido.</h3>
                <p className="mb-5">La página que estás buscando no se encontró.</p>
                <Link to="/" className="btn bsb-btn-5xl btn-outline-light rounded-pill px-5 fs-6 m-0" role="button">
                  Volver a Inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Error404