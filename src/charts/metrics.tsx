import { useEffect, useState } from 'react';
import { fetchAllTxData } from '../services/data_services';
import './metrics.css';

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

  Chart.register(TimeScale, LinearScale, PointElement, LineElement);


interface Chart_Daily_Tx_Count {
  date: Date;
  tx_count: number;
}

const TxMetricsChart: React.FC = () => {
  const [chart_Daily_Tx_Count, setChart_Daily_Tx_Count] = useState<Chart_Daily_Tx_Count[]>([]);

  useEffect(() => {
    fetchAllTxData()
      .then((data) => {
        setChart_Daily_Tx_Count(data);
      })
      .catch((error) => {
        console.error('Error fetching transaction data:', error);
      });
  }, []);

  const data = {
    labels: chart_Daily_Tx_Count.map((data) => new Date(data.date)),
    datasets: [
      {
        label: 'Daily Transaction Count',
        data: chart_Daily_Tx_Count.map((data) => data.tx_count),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
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
        type: 'linear', // Use 'linear' as the scale type for Y axis
        beginAtZero: true,
      },
    },
  };

  const h2_title: string = "Bitcoin Transaction on The Network (Daily, 7DMA)"
  return (
    <div className="metrics-container">
      <h2>{h2_title}</h2>
      <div className="metrics-list">
        <div className="metric-item">
          <div className="chart-container">
            <Line data={data} options={options} />
          </div>
          <p className="metric-title">Daily Transaction Count</p>
        </div>
      </div>
    </div>
  );
};

export default TxMetricsChart;