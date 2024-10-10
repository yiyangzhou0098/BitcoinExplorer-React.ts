import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  Chart,
  ChartOptions,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import './metrics.css';

// Register Chart.js components
Chart.register(TimeScale, LinearScale, PointElement, LineElement);

// Define ChartData interface for general metrics data
interface ChartData {
  date: Date;
  value: number;
}

// Define a props interface for the base component
interface MetricsProps {
  fetchData: () => Promise<ChartData[]>; // Function to fetch the data
  title: string; // Title of the chart
  yLabel: string; // Label for the Y-axis
}

const BaseMetrics: React.FC<MetricsProps> = ({ fetchData, title, yLabel }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setChartData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [fetchData]);

  const data = {
    labels: chartData.map((data) => new Date(data.date)),
    datasets: [
      {
        label: yLabel,
        data: chartData.map((data) => data.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="metrics-container">
      <h2>{title}</h2>
      <div className="metrics-list">
        <div className="metric-item">
          <div className="chart-container">
            <Line data={data} options={options} />
          </div>
          <p className="metric-title">{yLabel}</p>
        </div>
      </div>
    </div>
  );
};

export default BaseMetrics;
