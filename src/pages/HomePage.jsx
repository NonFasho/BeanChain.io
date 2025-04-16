import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';


const HomePage = () => {
    const navigate = useNavigate(); 

    return (
        <div className='boom'>
            <div className='button-panel'>
                <button id='b1' className='button' onClick={() => navigate('/map')}>
                    Learn About The Network
                </button>
                <button id='b2' className='button'></button>
                <button id='b3' className='button'></button>
            </div>
       
        </div>
    );
};

export default HomePage;