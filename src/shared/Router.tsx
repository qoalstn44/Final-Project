import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailPage from '../pages/DetailPage';
import LandingPage from '../pages/LandingPage';
import Logepage from '../pages/LogePage';
import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<Logepage />} />
        <Route path="/Login" element={<MainPage />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
