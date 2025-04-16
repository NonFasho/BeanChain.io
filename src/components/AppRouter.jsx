// src/components/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Slide1 from '../pages/Slide1';
import '../App.css';
import NetworkMap from '../pages/NetworkMap';
import GPN from '../pages/GPN';
import Page from '../pages/Page';
import HomePage from '../pages/HomePage';
import DevExplorer from "../pages/DevExplorer";

const AppRouter = () => {
  return (
    <>
    <div className='page'>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/preppinYAbeanz" element={<Slide1 />} />
        <Route path="/page" element={<Page />} >
          <Route path="main-home" element={<HomePage />} />
        </Route>
        <Route path="/contact" element={<Welcome />} />
        <Route path="/gpn" element={<GPN />} />
        <Route path="/map" element={<NetworkMap />} />
        <Route path="/admin/leanfr42" element={<DevExplorer />} />
      </Routes>
    </div>
    </>
  );
};

export default AppRouter;