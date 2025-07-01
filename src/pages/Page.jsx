import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page.css';
import '../App.css';
import { Outlet } from 'react-router-dom';

const Page = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='page'>
      <div className='body'>
        <div className='banner'>
          <nav className='navbar'>
            <div className="nav-left">
              <img
                src="/bean-logo.png"
                alt="Logo"
                className="nav-logo"
                onClick={() => navigate('/nav/home')}
                style={{ cursor: 'pointer' }}
              />
              
            </div>
            
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <button onClick={() => navigate('/nav/map')}>NETWORK MAP</button>
              <button onClick={() => window.location.href = 'https://limabean.xyz'}>LIMABEAN WALLET</button>
              <button onClick={() => window.location.href = 'https://discord.gg/t64HF9B33T'}>DISCORD</button>
              <button onClick={() => window.location.href = 'https://github.com/BeanChain-Core'}>GITHUB</button>
              <button onClick={() => navigate('/')}>INTERACTIVE HOME</button>
            </div>
          </nav>
        </div>

        <div className='booya'>
          <Outlet />
        </div>
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2025 BeanChain Network</p>
          <div className="footer-links">
            <a href="https://limabean.xyz" target="_blank" rel="noopener noreferrer">LimaBean Wallet</a>
            <a href="https://discord.gg/t64HF9B33T" target="_blank" rel="noopener noreferrer">Discord</a>
            <a href="https://github.com/BeanChain-Core" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;

