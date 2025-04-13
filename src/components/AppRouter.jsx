// src/components/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Slide1 from '../pages/Slide1';
import Slide2 from '../pages/Slide2';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/slide1" element={<Slide1 />} />
      <Route path="/slide2" element={<Slide2 />} />
    </Routes>
  );
};

export default AppRouter;