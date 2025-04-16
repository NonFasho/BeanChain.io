import { useNavigate } from 'react-router-dom';
import './Page.css';
import { Outlet } from 'react-router-dom';

const Page = () => {
    const navigate = useNavigate(); 

    return (
        <>
        <header>
            <h1>BEANCHAIN NETWORK</h1>
        </header>
        <div className='body'>
            <div className='banner'>
                <img src="/banner.png" alt="BeanChain Banner" className="banner-img" />
            </div>
            <div className='booya'>
                <Outlet />
            </div>
            <div className='bottom-banner'>
                <p>Hi</p>
            </div>
        </div>
        <footer className="app-footer">
            <p>© 2025 BeanChain Network • <a href="https://limabean.xyz">LimaBean*Wallet</a></p>
        </footer>
        </>
    );
};

export default Page;