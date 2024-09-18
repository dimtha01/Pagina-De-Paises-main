import { Link, useNavigate } from "react-router-dom";
import FiltroRegion from "./FiltroRegion";
import FiltroSubContinetes from "./FiltroSubContinetes";
import { useState } from "react";

const Header = () => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/Paginas/buscar', {
      state: inputValue,
    });
  };

  const handleHeaderClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-header rounded-5 shadow-lg navbar-custom"
        style={{
          borderWidth: '2px',
        }}
      >
        <div className="container-fluid" >
          <a className="navbar-brand" href="#">
            <div className="logo-container">
              <i className="bx bx-world logo-icon" />
              Países
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page" onClick={handleHeaderClick}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/paises" className="nav-link" onClick={handleHeaderClick}>
                  Paises
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Region
                </a>
                <ul className="dropdown-menu" onClick={handleHeaderClick}>
                  <FiltroRegion />
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sub Region
                </a>
                <ul className="dropdown-menu" onClick={handleHeaderClick}>
                  <FiltroSubContinetes />
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
            <form
              className="d-flex rounded-pill overflow-hidden border border-light"
              role="search"
              style={{ borderWidth: '2px' }}
              onSubmit={handleSubmit}
            >
              <input
                value={inputValue}
                onChange={handleChange}
                className="form-control rounded-0 border-0"
                type="search"
                placeholder="Buscar"
                aria-label="Search"
                style={{ borderRadius: '50px 0 0 50px', border: 'none' }}
              />
              <button
                className="btn btn-outline-light d-flex justify-content-center align-items-center rounded-0"
                type="submit"
                style={{
                  borderRadius: '0 50px 50px 0',
                  border: 'none',
                  borderLeft: '2px solid #ffffff', // Adding a border between input and button
                  outline: 'none',
                }}
              >
                <i className="bx bx-search-alt-2 fs-5"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
