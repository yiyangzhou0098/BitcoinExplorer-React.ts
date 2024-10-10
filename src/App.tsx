/* App.tsx */
import { useState } from 'react';
import './App.css';
import Header from './header/header';
import LeftSide from './side/leftside';
import { fetchBlockHeight } from './services/get_block_infos';
import TxMetricsChart from './charts/metrics';
import FeeRateMetricChart from './charts/feeRateMetric';

function App() {
  const [blockHeight, setBlockHeight] = useState<string>(' ');

  function onGetBlockHeight() {
    fetchBlockHeight()
      .then((data) => {
        console.log(data);
        setBlockHeight(data.block_height);
      })
      .catch((error) => {
        console.error('Error fetching block height:', error);
      });
  }

  return (
    <div className="app-container">
      <Header blockHeight={blockHeight} onGetBlockHeight={onGetBlockHeight} />
      <div className="content-container">
        <LeftSide />
        <div className='body-container'>
          {/* Add main content here */}
          <h4 className='on-chain-h4'>On-Chain Metrics</h4>
          <TxMetricsChart />
          <h4 className='off-chain-h4'>Off-Chain Metrics</h4>
          <FeeRateMetricChart />

        </div>
      </div>
    </div>
  );
}

export default App;