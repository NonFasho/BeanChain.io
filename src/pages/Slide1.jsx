import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Slide1.css';

const Slide1 = () => {
    const navigate = useNavigate(); 

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/slide2')
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);
    
    return (
        <div className='slide-container wipe-reveal'>
           <h1>YOU ARE HERE EARLY!</h1> 
           <p>We are currently in development.</p>
        </div>
    );
};

export default Slide1;