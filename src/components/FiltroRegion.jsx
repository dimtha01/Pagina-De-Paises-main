import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API = 'https://restcountries.com/v3.1/all';

const FiltroRegion = () => {
  const [continentes, setContinentes] = useState([]);

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      // Extraer los continentes únicos
      const uniqueContinentes = [...new Set(data.map(country => country.region))].filter(Boolean);
      setContinentes(uniqueContinentes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDatos();
  }, []);

  return (
    <>
      {continentes.map((item, index) => (
        <li key={index}><Link to={`/continentes/${item}`} className="dropdown-item" href="#">{item}</Link></li>
      ))}
    </>

  )
};

export default FiltroRegion;
