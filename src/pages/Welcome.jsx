import './Welcome.css';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-text">WELCOME TO BEANCHAIN</h1>
      <p className="text2">POWERED BY OUTLANDISH CREATIVE LLC</p>
      <button onClick={() => navigate('/preppinYAbeanz')}>ENTER</button>
    </div>
  );
};

export default Welcome;

