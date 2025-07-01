// src/components/GameContainer.jsx
import { useEffect, useRef } from 'react';

export default function GameContainer() {
  const gameRef = useRef(null);

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/gator/dist/index.html'; // path to your built game
    iframe.width = '640';
    iframe.height = '480';
    iframe.style.border = 'none';
    iframe.allow="fullscreen; storage-access";
    //iframe.sandbox="allow-scripts allow-same-origin";
    gameRef.current.appendChild(iframe);
  }, []);

  return (
    <div
      id="game-wrapper"
      style={{
        width: '640px',
        height: '480px',
        margin: 'auto',
        border: '2px solid #ccc',
        overflow: 'hidden',
      }}
    >
      <div ref={gameRef}></div>
    </div>
  );
}
