import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  ChartOptions,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter
import { fetchFeeEstimations } from '../services/data_services';
import './metrics.css';

// Register Chart.js components
Chart.register(LinearScale, PointElement, LineElement);

interface FeeEstimation {
    block_target: number,
    fee_rate: number,
    estimated_at: Date;
}

const FeeRateMetricChart: React.FC = () => {
  const [feeEstimations, setFeeEstimations] = useState<FeeEstimation[]>([]);

  useEffect(() => {
    fetchFeeEstimations()
      .then((data) => {
        setFeeEstimations(data);
      })
      .catch((error) => {
        console.error('Error fetching fee estimations:', error);
      });
  }, []);

  const data = {
    labels: feeEstimations.map((data) => data.fee_rate),
    datasets: [
      {
        label: 'Block Target',
        data: feeEstimations.map((data) => data.block_target),
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
        type: 'linear',
        title: {
          display: true,
          text: 'Fee Rate (sats/vB)',
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Block Target',
        },
      },
    },
  };

  return (
    <div className="metrics-container">
      <h2>Bitcoin Fee Rate Estimations (Block Targets)</h2>
      <div className="metrics-list">
        <div className="metric-item">
          <div className="chart-container">
            <Line data={data} options={options} />
          </div>
          <p className="metric-title">Fee Rate vs Block Target</p>
        </div>
      </div>
    </div>
  );
};

export default FeeRateMetricChart;
