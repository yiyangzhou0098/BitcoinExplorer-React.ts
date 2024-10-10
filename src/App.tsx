/* App.tsx */
import { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './header/header';
import LeftSide from './side/leftside';
import { fetchBlockHeight } from './services/get_block_infos';
import TxMetricsChart from './charts/metrics';
import FeeRateMetricChart from './charts/feeRateMetric';

function App() {
  const [blockHeight, setBlockHeight] = useState<string>(' ');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const pollingRef = useRef<number | null>(null); 

  function onButtonRefresh() {
    setRefresh(prevRefresh => !prevRefresh);
  }

  useEffect(() => {
    if (refresh) {
      // Start polling every 3 seconds
      pollingRef.current = window.setInterval(() => {
        console.log("getting block height")
        onGetBlockHeight();
      }, 3000);
    } else {
      // Clear polling when `refresh` is false
      console.log("stop getting block height")

      if (pollingRef.current) {
        console.log("stop getting block height")
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    }

    // Cleanup interval on component unmount
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [refresh]);

  function onGetBlockHeight() {
    if(loading) {
      console.log("block height is loading")
      return
    }

    setLoading(true);

    fetchBlockHeight()
      .then((data) => {
        console.log(data);
        setBlockHeight(data.block_height);
      })
      .catch((error) => {
        console.error('Error fetching block height:', error);
      })
      .then(() => {
        console.log("block height is loaded")
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error set to loading status:', error);
      });
  }

  return (
    <div className="app-container">
      <Header blockHeight={blockHeight} refresh={refresh} onGetBlockHeight={onGetBlockHeight} onButtonRefresh={onButtonRefresh} />
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