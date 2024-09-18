import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Swal from 'sweetalert2';

ChartJS.register(ArcElement, Tooltip, Legend);

const API = 'https://restcountries.com/v3.1/all';

const Pies = () => {
  const [selectedCountries, setSelectedCountries] = useState(['', '']);
  const [countryNames, setCountryNames] = useState([]);
  const [areaData, setAreaData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Área (en miles de km²)',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [populationData, setPopulationData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Población (en millones)',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [largestAreaCountry, setLargestAreaCountry] = useState('');
  const [largestPopulationCountry, setLargestPopulationCountry] = useState('');

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 1)',
          font: {
            family: "'Nunito', sans-serif",
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'rgba(255, 255, 255, 1)',
        bodyColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      },
    },
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(API);
        const countries = await response.json();
        const names = countries.map(country => country.name.common);
        setCountryNames(names);
      } catch (error) {
        console.error('Error fetching country names:', error);
      }
    };

    fetchData();
  }, []);

  const handleCountryChange = (index, value) => {
    const updatedCountries = [...selectedCountries];
    updatedCountries[index] = value;
    setSelectedCountries(updatedCountries);
  };

  const fetchData = async () => {
    try {
      const responses = await Promise.all(selectedCountries.map(country =>
        fetch(`https://restcountries.com/v3.1/name/${country}`)
      ));
      const dataArr = await Promise.all(responses.map(response => response.json()));

      const areas = dataArr.map(data => data[0]?.area || 0);
      const populations = dataArr.map(data => data[0]?.population || 0);

      // Update Area Data
      setAreaData({
        labels: selectedCountries,
        datasets: [
          {
            label: 'Área (en miles de km²)',
            data: areas.map(area => area / 1000),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });

      // Update Population Data
      setPopulationData({
        labels: selectedCountries,
        datasets: [
          {
            label: 'Población (en millones)',
            data: populations.map(population => population / 1000000),
            backgroundColor: [
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });

      // Determine largest area country
      const maxAreaIndex = areas.indexOf(Math.max(...areas));
      setLargestAreaCountry(selectedCountries[maxAreaIndex]);

      // Determine largest population country
      const maxPopulationIndex = populations.indexOf(Math.max(...populations));
      setLargestPopulationCountry(selectedCountries[maxPopulationIndex]);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCompare = () => {
    if (selectedCountries[0] === selectedCountries[1]) {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "No puedes Seleccionar el mismo país!!!",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: 'rgba(255, 140, 0, 0.8)', // Fondo naranja transparente
        color: 'white', // Color de texto blanco
      });



      return;
    }
    fetchData();
  };

  return (
    <div className='m-3'>
      <div className="mb-3">
        <label htmlFor="country1" className="form-label">Primer país:</label>
        <select
          id="country1"
          className="form-select"
          value={selectedCountries[0]}
          onChange={(e) => handleCountryChange(0, e.target.value)}
        >
          <option value="">Seleccione un país</option>
          {countryNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="country2" className="form-label">Segundo país:</label>
        <select
          id="country2"
          className="form-select"
          value={selectedCountries[1]}
          onChange={(e) => handleCountryChange(1, e.target.value)}
        >
          <option value="">Seleccione un país</option>
          {countryNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
      </div>
      <div className='text-center'>
        <button className="btn btn-outline-light mb-3" onClick={handleCompare}>Comparar</button>
      </div>

      {largestAreaCountry && (
        <>
          <hr />
          <div className="mb-3 border m-2 p-2 rounded">
            <h3 className='lead text-center'>Comparación de Área (en miles de km²)</h3>
            <hr />
            <div>
              <Pie data={areaData} options={options} />
            </div>
            <p className="text-center mt-2 fs-6 lead">
              País con mayor área: {largestAreaCountry} ({areaData.datasets[0].data[selectedCountries.indexOf(largestAreaCountry)]} km²)
            </p>
          </div>
        </>
      )}

      {largestPopulationCountry && (
        <>
          <hr />
          <div className="mb-3 border m-2 p-2 rounded">
            <h3 className='lead text-center'>Comparación de Población (en millones)</h3>
            <hr />
            <div>
              <Pie data={populationData} options={options} />
            </div>
            <p className="text-center mt-2 fs-6 lead">
              País con mayor población: {largestPopulationCountry} ({populationData.datasets[0].data[selectedCountries.indexOf(largestPopulationCountry)]} millones)
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Pies;
