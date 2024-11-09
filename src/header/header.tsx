/* header.tsx */
import React from 'react';
import './header.css';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  blockHeight: string;
  onGetBlockHeight: () => void;
}

const Header: React.FC<HeaderProps> = ({ blockHeight, onGetBlockHeight }) => {

  const [refresh, setRefresh] = useState(false);
  const pollingRef = useRef<number | null>(null); 
  
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
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

  return (
    <header className="header">
      <div className="header-logo">
        <h1>THE BLOCK</h1>
      </div>
      <div className="header-block-height">
        <span>Block Height: {blockHeight}</span>
        <button className="block-height-btn" onClick={onClick}>{refresh ? "Stop Refreshing" : "Refresh"} Block Height</button>

      </div>
      <div className="header-menu">
        <nav>
          <ul>
            <li><a href="#">News</a></li>
            <li><a href="#">Data</a></li>
            <li><a href="#">Research</a></li>
            <li><a href="#">Prices</a></li>
            <li><a href="#">Indices</a></li>
            <li><a href="#">Podcasts</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Learn</a></li>
            <li><a href="#">Newsletters</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;