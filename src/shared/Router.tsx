import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { QueryClient, QueryClientProvider } from 'react-query';

function Router() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/detailPage/:id" element={<DetailPage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/itemPage" element={<ItemPage />} />
          <Route path="/postPage" element={<PostPage />} />
          <Route path="/communityPage" element={<CommunityPage />} />
          <Route path="/newsPage" element={<NewsPage />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default Router;
