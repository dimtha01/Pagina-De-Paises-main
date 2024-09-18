import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = 'https://restcountries.com/v3.1/all';

export default function Bars() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Población',
        data: [],
        fill: true,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointRadius: 5,
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const countries = await response.json();

        // Ordena los países por población descendente y toma los 10 más poblados
        const topCountries = countries
          .sort((a, b) => b.population - a.population)
          .slice(0, 10);

        const labels = topCountries.map((country) => country.name.common);
        const populations = topCountries.map((country) => country.population);

        setData({
          labels,
          datasets: [
            {
              label: 'Población',
              data: populations,
              fill: true,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192,0.9)',
              pointRadius: 5,
              pointBorderColor: 'rgba(75, 192, 192, 1)',
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 1)  ', // Color de las líneas horizontales
        },
      },
      x: {
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 1)', // Color de las líneas verticales
        },
        ticks: { color: 'rgba(75, 192, 192, 1)' },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
