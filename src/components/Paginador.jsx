import React from "react";

const Paginador = ({ paginaActual, totalPaginas, manejarCambioDePagina }) => {
  if (totalPaginas <= 1) {
    return null;
  }

  return (
    <>
      <div className="container text-center bg-gradient-to-r rounded-3">
        <nav aria-label="Page navigation example" className="text-center">
          <ul className="pagination justify-content-center paginador-transparente m-4">
            <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
              <a className="page-link bg-black text-light" href="#" onClick={(e) => { e.preventDefault(); manejarCambioDePagina(paginaActual - 1); }}>Anterior</a>
            </li>
            {[...Array(totalPaginas).keys()].map(numeroPagina => (
              <li key={numeroPagina} className={`page-item ${paginaActual === numeroPagina + 1 ? 'active' : ''}`}>
                <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); manejarCambioDePagina(numeroPagina + 1); }}>
                  {numeroPagina + 1}
                </a>
              </li>
            ))}
            <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
              <a className="page-link bg-black text-light" href="#" onClick={(e) => { e.preventDefault(); manejarCambioDePagina(paginaActual + 1); }}>Siguiente</a>
            </li>
          </ul>
        </nav>

      </div>
    </>
  );
};

export default Paginador;
