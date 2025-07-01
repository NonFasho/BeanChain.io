import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ParallaxHome.css';

const SimpleHome = () => {
  const navigate = useNavigate();

  return (
    <div className="page home-bg" style={{ position: 'relative', minHeight: '100vh', overflow: 'visible' }}>
      {/* Foreground content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '10vh' }}>
        <div className="text-par-h">
          <h1>Welcome to BeanChain</h1>
          <p>Click the Buddy Helper Drone to join our Discord!</p>
          <p>~ use the nav bar above to explore ~</p>
        </div>

        <div className="drone-stack" style={{ zIndex: 20 }}>
          <a href="https://discord.gg/t64HF9B33T" target="_blank" rel="noopener noreferrer" className="drone-link">
            <img src="/assets/bg/buddy-discord.png" className="buddy bobbing" alt="rn" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SimpleHome;

