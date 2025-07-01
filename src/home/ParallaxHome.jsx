import React, { useEffect, useRef, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useNavigate } from 'react-router-dom';

import './ParallaxHome.css';

export default function ParallaxHome() {
  const parallaxRef = useRef();
  const [showButton, setShowButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const container = parallaxRef.current?.container?.current;

    const handleScroll = () => {
      const currentY = container.scrollTop;
      if (currentY > lastScrollY + 5) {
        setShowButton(false);
      } else if (currentY < lastScrollY - 5) {
        setShowButton(true);
      }
      setLastScrollY(currentY);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="parallax-container">
      {showButton && (
        <button
          className="exit-interactive-btn"
          onClick={() => navigate('/nav/home')}
        >
          Exit Interactive
        </button>
      )}
      <Parallax ref={parallaxRef} pages={3.8} style={{ top: 0, left: 0 }}>

        {/* BACKGROUND SKY */}
        <ParallaxLayer offset={0} speed={0} factor={3.5}>
          <img src="/assets/bg/parallax-sky.png" className="full-bg" alt="sky" />
        </ParallaxLayer>

        {/* BUILDINGS */}
        <ParallaxLayer offset={0.2} speed={0.3} factor={4.5}>
          <img src="/assets/bg/parallax-buildings.png" className="full-bg" alt="buildings" />
        </ParallaxLayer>

        {/* FOREGROUND */}
        <ParallaxLayer offset={1.5} speed={0.6} factor={3.5}>
          <img src="/assets/bg/parallax-foreground.png" className="full-bg" alt="foreground" />
        </ParallaxLayer>
        
        <ParallaxLayer
          offset={0.2}
          speed={0.4}
          factor={0.5}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            flexDirection: 'column',
            textAlign: 'center',
            padding: '0 0'
          }}
        >
          <div className="text-par-h">
            <h1>Welcome to BeanChain</h1>
            <h3>Scroll down to explore</h3>
            <p>Or tap <em>“Exit Interactive”</em> to switch to simplified viewing mode.</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={0.6} speed={0.6} style={{ zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="drone-stack" style={{ marginLeft: '8vw' }}>
            <a href="/map" target="_blank" rel="noopener noreferrer" className="drone-link">
              <img src="/assets/bg/buddy-pn.png" className="buddy bobbing" alt="rn" />
            </a>
            <div className="hologram-box">
              <h2>Hi! I'm Helper3000</h2>
              <h3>Wanna know some basics about our network?</h3>
              <p>Click me to view an Interactive Map of the Network</p>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={0.99} speed={0.5} style={{ zIndex: 10, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div className="drone-stack" style={{ marginRight: '20vw' }}>
            <a href="https://limabean.xyz" target="_blank" rel="noopener noreferrer" className="drone-link">
              <img src="/assets/bg/buddy-wallet.png" className="buddy bobbing" alt="pn" />
            </a>
            <div className="hologram-box">
              <h3>BEAN! Check out our native wallet as it develops! Generate and save your private key and address now!</h3>
              <p>Click me for LimaBean Wallet</p>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.2} speed={0.3} style={{ zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="drone-stack" style={{ marginRight: '6vw' }}>
            <a href="https://theoutlandishcreative.com" target="_blank" rel="noopener noreferrer" className="drone-link">
              <img src="/assets/bg/buddy-oc.png" className="buddy bobbing" alt="pn" />
            </a>
            <div className="hologram-box">
              <h3>I'm Outt! Ambassador from Outlandish Creative LLC, they Power BeanChain!</h3>
              <p>Click me to check out their site</p>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.8} speed={0.4} style={{ zIndex: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <div className="drone-stack" style={{ marginLeft: '25vw' }}>
            <a href="https://discord.gg/t64HF9B33T" target="_blank" rel="noopener noreferrer" className="drone-link">
              <img src="/assets/bg/buddy-discord.png" className="buddy bobbing" alt="rn" />
            </a>
            <div className="hologram-box">
              <h3>BEEP BEAN BOOp... O HI!</h3>
              <p>Click me to join our Discord</p>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.6} style={{ zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="drone-stack" style={{ marginLeft: '12vw' }}>
            <a href="https://github.com/BeanChain-Core" target="_blank" rel="noopener noreferrer" className="drone-link">
              <img src="/assets/bg/buddy-git.png" className="buddy bobbing" alt="gpn" />
            </a>
            <div className="hologram-box">
              <h3>I'm here to show you all our juicy src code!</h3>
              <p>Click me to see our GitHub</p>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.6}
          speed={0.4}
          factor={2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            flexDirection: 'column',
            textAlign: 'center',
            padding: '0 0'
          }}
        >
          <div className="text-par-h2">
            <h1>JOIN US AS WE BUILD</h1>
            <p>THE BEANS ONLY GROW IF YOU WATER THEM</p>
          </div>
        </ParallaxLayer>
        
      </Parallax>
    </div>
  );
}



