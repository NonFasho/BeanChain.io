import { useNavigate } from 'react-router-dom';
import './Slide2.css';

const Slide2 = () => {
    const navigate = useNavigate(); 

    return (
        <div className='slide-container slide-in-right'>
           <h1>WHILE WE BUILD</h1> 
           <p>CHECK OUT NEWS, LINKS, AND INFO HERE</p>
        </div>
    );
};

export default Slide2;