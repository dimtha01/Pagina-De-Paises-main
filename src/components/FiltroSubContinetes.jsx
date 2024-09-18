import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API = 'https://restcountries.com/v3.1/all';

const FiltroSubContinetes = () => {
  const [subregiones, setSubregiones] = useState([]);

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      // Extraer las subregiones únicas
      const uniqueSubregiones = [...new Set(data.map(country => country.subregion))].filter(Boolean);
      setSubregiones(uniqueSubregiones);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDatos();
  }, []);
  return (
    <>
      {subregiones.map((item, index) => (
        <li key={index}><Link to={`/subContinentes/${item}`} className="dropdown-item" href="#">{item}</Link></li>
      ))}
    </>
  )
}

export default FiltroSubContinetes