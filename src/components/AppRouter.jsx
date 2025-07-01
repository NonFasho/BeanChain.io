// src/components/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import '../App.css';
import NetworkMap from '../pages/NetworkMap';
import GPN from '../pages/GPN';
import Page from '../pages/Page';
import DevExplorer from "../pages/DevExplorer";
import ParallaxHome from '../home/ParallaxHome';
import SimpleHome from '../home/SimpleHome';
import PlayPage from '../pages/PlayPage';

const AppRouter = () => {
  return (
    <>
    <div className='page'>
      <Routes>
        <Route path="/" element={<ParallaxHome />} /> 
        <Route path="/nav" element={<Page />} >
          <Route path="home" element={<SimpleHome/>} />
          <Route path="map" element={<NetworkMap/>} />
          <Route path="gator" element={<PlayPage/>} />
        </Route>
        <Route path="/contact" element={<Welcome />} />
        <Route path="/gpn" element={<GPN />} />
        <Route path="/admin/leanfr42" element={<DevExplorer />} />
      </Routes>
    </div>
    </>
  );
};

export default AppRouter;