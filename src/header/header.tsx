/* header.tsx */
import React from 'react';
import './header.css';

interface HeaderProps {
  blockHeight: string;
  refresh: boolean;
  onGetBlockHeight: () => void;
  onButtonRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ blockHeight, refresh, onGetBlockHeight, onButtonRefresh }) => {

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onButtonRefresh();
  }

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