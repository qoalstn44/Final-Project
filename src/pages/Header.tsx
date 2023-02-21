import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { notLogin } from '../redux/modules/loginSlice';
import { FaSearch } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.login.user);
  const dispatch = useAppDispatch();

  //로그아웃
  const auth = getAuth();
  const onClickLogout = (): void => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert('로그아웃 되었습니다.');
        dispatch(notLogin());
        navigate('/');
      })
      .catch((error: any) => {
        // An error happened.
        console.log('error:', error);
      });
  };
  return (
    <div>
      <HeadBox>
        <HeadButton onClick={() => navigate('/')}>
          <img src="img/Petalk.png.png" />
        </HeadButton>
        <HeadButton onClick={() => navigate('/CommunityPage')}>
          커뮤니티
        </HeadButton>
        <HeadButton onClick={() => navigate('/ItemPage')}>제품리뷰</HeadButton>
        <HeadButton onClick={() => navigate('/NewsPage')}>뉴스</HeadButton>
        <SmallButton
          style={{
            marginLeft: '500px',
          }}
        >
          <FaSearch
            className="icon"
            size="24"
            color="white"
            style={{
              marginRight: '10px',
            }}
          />
          검색
        </SmallButton>
        {!user?.uid ? (
          <>
            <SmallButton
              onClick={() => {
                navigate('/LoginPage');
              }}
            >
              LOG IN
            </SmallButton>
          </>
        ) : (
          <>
            <SmallButton onClick={() => navigate('/PostPage')}>
              글쓰기
            </SmallButton>
            <SmallButton onClick={() => navigate('/PostPage')}>
              글쓰기
            </SmallButton>
            <SmallButton onClick={() => navigate('/Mypage')}>
              마이페이지
            </SmallButton>
            <SmallButton
              onClick={() => {
                onClickLogout();
                openModal();
              }}
            >
              LOGOUT
            </SmallButton>
          </>
        )}
      </HeadBox>
    </div>
  );
}

export default Header;

const HeadBox = styled.div`
  width: 100%;
  height: 10%;
  background-color: black;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const HeadButton = styled.button`
  width: 30rem;
  height: 1.5rem;
  background-color: black;

  color: white;
  border-color: black;
  font-size: 20px;
  margin: auto;
`;
const SmallButton = styled.button`
  width: 20rem;
  height: 1.5rem;
  background-color: black;
  margin: auto;
  border-color: black;
  color: white;
  font-size: 15px;
`;
function dispatch(arg0: { payload: undefined; type: 'login/notLogin' }) {
  throw new Error('Function not implemented.');
}
