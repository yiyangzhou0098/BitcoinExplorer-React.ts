/* leftside.tsx */
import './leftside.css';

const LeftSide = () => {
  return (
    <aside className="left-sidebar">
      <div className="sidebar-menu">
        <ul>
          <li><a href="#">Spot</a></li>
          <li><a href="#">Futures</a></li>
          <li><a href="#">Bitcoin ETFs</a></li>
          <li><a href="#">Ethereum ETFs</a></li>
          <li><a href="#">Crypto Indices</a></li>
          <li><a href="#">CME COTs</a></li>
          <li><a href="#">Options</a></li>
          <li><a href="#">Sports Tokens</a></li>
          <li><a href="#">Prices</a></li>
          <li><a href="#">Companies</a></li>
          <li><a href="#">Exchange Tokens</a></li>
          <li className="stablecoins">
            <span>Stablecoins</span>
            <ul>
              <li><a href="#">USD Pegged</a></li>
              <li><a href="#">Non-USD Pegged</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default LeftSide;