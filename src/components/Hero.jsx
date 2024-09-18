import React, { useEffect, useState } from "react";
import Card from "./Card";
import Grafica from "../components/Grafica";
import Grafica_2 from "../components/Grafica_2";
import Grafica_3 from "../components/Grafica_3";
import Carousel from "../components/Carousel"

const API = 'https://restcountries.com/v3.1/all';

const Hero = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const getDatos = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setDatos(data); // Asumo que quieres usar todos los datos devueltos por el API
      } catch (error) {
        console.error(error);
      }
    };

    getDatos();
  }, []);

  // Obtener primeros datos para mostrar en la sección de países destacados
  const primerosDatos = datos.slice(0, 12);


  return (
    <>
      <div className="flex flex-column min-vh-50 hero">
        <header className="bg-gradient-to-r from-primary to-secondary py-5 py-md-8 py-lg-10">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <h1 className="text-white font-weight-bold mb-4 mb-md-0">
                  Explora el Mundo <i className="bx bx-world logo-icon" />
                </h1>
                <p className="text-gray-200 mb-2">
                  Descubre la belleza y diversidad de los países alrededor del mundo.
                </p>
                <p className="text-gray-200 mb-0">
                  Explora culturas fascinantes, paisajes impresionantes y tradiciones únicas que hacen de cada país una experiencia inolvidable.
                </p>
              </div>
              <div className="col-12 col-md-6 d-none d-md-block">
                <img src="/src/assets/Photoroom-20240713_214414.png" alt="" className="img-fluid" />
                <span className="w-100 h-auto shadow-lg rounded-md bg-muted d-block" />
              </div>
            </div>
          </div>
        </header>
        <main className="py-5 py-md-8 py-lg-10">
          <div className="container border rounded-2">
            <h2 className="text-center lead fs-2 m-2 mb-lg-8">Países Destacados</h2>
            <hr />
            <div className="row m-4 ">
              <div className="mb-4">
                <Carousel />
              </div>
              <hr />
              {primerosDatos.map((item, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
                  <Card item={item} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <div className="container bg-gradient-to-r-hero-2 rounded d-flex justify-content-center align-items-center py-4 ">
        <div className="row m-3">
          <div className="col-12 mb-4 ">
            <div className="container-fluid border text-light rounded-2 h-100">
              <h1 className="d-flex justify-content-center align-items-center m-2 lead">
                Área y Población de Países <i className='bx bx-line-chart fs-3 ms-2'></i>
              </h1>
              <hr />
              <div className="h-100">
                <Grafica />
              </div>
            </div>
          </div>
          <div className="col-12 mb-4 ">
            <div className="container-fluid border text-light rounded-2 h-100">
              <h1 className="d-flex justify-content-center align-items-center m-2 lead">
                Los 10 Paises con mas poblacion en el Mundo <i className='bx bx-line-chart fs-3 ms-2'></i>
              </h1>
              <hr />
              <div className="h-100">
                <Grafica_3 />
              </div>
            </div>
          </div>
          <div className="col-12  mb-4">
            <div className="container-fluid border rounded h-100">
              <h1 className="d-flex justify-content-center align-items-center m-2 lead">
                Comparación de Áreas y Población de Países <i className='bx bxs-bar-chart-alt-2 mx-2 fs-3'></i>
              </h1>
              <hr />
              <div className="h-100">
                <Grafica_2 />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Hero;
