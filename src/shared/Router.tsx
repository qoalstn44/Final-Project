import React, {useState} from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import DetailPage from '../pages/DetailPage';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import ItemPage from '../pages/ItemPage';
import PostPage from '../pages/PostPage';
import CommunityPage from '../pages/CommunityPage';
import NewsPage from '../pages/NewsPage';
import Header from '../pages/Header';
import Footer from '../pages/Footer';


function Router({isLoggedIn}:any) {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
          {/* {isLoggedIn ? (
            <>
            <Route path="/postpage">
              <PostPage/>
            </Route>
            </>
          ):(
            <>
            <Route path="/loginpage">
              <LoginPage/>
            </Route>
            </>
          )} */}
      
        <Route path="/" element={<MainPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/itempage" element={<ItemPage/>} />
        <Route path="/postpage" element={<PostPage />} />
        <Route path="/communitypage" element={<CommunityPage />} />
        <Route path="/newspage" element={<NewsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
