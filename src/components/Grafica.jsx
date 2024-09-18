import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const API = 'https://restcountries.com/v3.1/all';

const LinesChart = () => {
  const [datas, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Área (mil de km²)',
        data: [],
        tension: 0.5,
        fill: true,
        borderColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        pointRadius: 5,
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        yAxisID: 'area', // Assigning this dataset to 'area' axis
      },
      {
        label: 'Población (millones)',
        data: [],
        tension: 0.6,
        fill: true,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointRadius: 5,
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        yAxisID: 'population', // Assigning this dataset to 'population' axis
      },
    ],
  });

  const options = {
    scales: {
      area: {
        type: 'linear',
        position: 'left',
        min: 0,
        ticks: { color: 'rgba(255, 255, 255, 1)' },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      population: {
        type: 'linear',
        position: 'right',
        min: 0,
        ticks: { color: 'rgba(75, 192, 192, 1)' },
        grid: {
          color: 'rgba(75, 192, 192, 0.2)',
        },
      },
      x: {
        ticks: { color: 'rgba(255, 255, 255, 1)' },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
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

  const getPrimeraPalabra = (str) => {
    return str.split(' ')[0];
  };

  useEffect(() => {
    const getDatos = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();

        // Function to get random unique indexes
        const getIndicesAleatorios = (longitud, count) => {
          const indices = new Set();
          while (indices.size < count) {
            const indiceAleatorio = Math.floor(Math.random() * longitud);
            indices.add(indiceAleatorio);
          }
          return Array.from(indices);
        };

        const IndicesAleatorios = getIndicesAleatorios(data.length, 10);

        const etiquetas = IndicesAleatorios.map(index => getPrimeraPalabra(data[index].name.common));
        const areas = IndicesAleatorios.map(index => data[index].area / 1000);
        const poblaciones = IndicesAleatorios.map(index => data[index].population / 1000000);

        setData({
          labels: etiquetas,
          datasets: [
            {
              ...datas.datasets[0], // Keep existing dataset properties
              data: areas,
            },
            {
              ...datas.datasets[1], // Keep existing dataset properties
              data: poblaciones,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getDatos();
  }, []);

  return <Line data={datas} options={options} />;
};

export default LinesChart;
