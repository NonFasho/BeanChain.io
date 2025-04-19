import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Slide1.css';

const Slide1 = () => {
    const navigate = useNavigate(); 

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/map')
        }, 6000);

        return () => clearTimeout(timer);
    }, [navigate]);
    
    return (
        <div className='slide-container wipe-reveal'>
            <div className="bean-bounce">
                <img src="/BunnySlippers.png" />
            </div>
            <h1>YOU ARE HERE EARLY!</h1> 
            <p className="fade-in">WE ARE CURRENTLY PREPPIN THE BEANS</p>
            <p>LOADING SOME INTERACTIVE INFO</p>
        </div>
    );
};

export default Slide1;