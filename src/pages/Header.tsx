import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { isLogin, notLogin } from '../redux/modules/loginSlice';

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
          <StyledHeaderLogo src="/img/Petalk.png" alt="로고" />
        </HeadButton>
        <HeadButton onClick={() => navigate('/CommunityPage')}>
          커뮤니티
        </HeadButton>
        <HeadButton onClick={() => navigate('/ItemPage')}>제품리뷰</HeadButton>
        <HeadButton onClick={() => navigate('/NewsPage')}>뉴스</HeadButton>
        <StyledSmallButtonDiv>
          {!user?.email ? (
            <>
              <StyledLogin
                onClick={() => {
                  navigate('/LoginPage');
                }}
              >
                LOG IN
              </StyledLogin>
            </>
          ) : (
            <>
              <SmallButton onClick={() => navigate('/PostPage')}>
                글쓰기
              </SmallButton>
              <SmallButton onClick={() => navigate('/Mypage')}>
                마이페이지
              </SmallButton>
              <StyledLogin
                onClick={() => {
                  onClickLogout();
                }}
              >
                LOGOUT
              </StyledLogin>
            </>
          )}
        </StyledSmallButtonDiv>
      </HeadBox>
    </div>
  );
}
export default Header;

const HeadBox = styled.div`
  width: 100%;
  height: 6%;
  background-color: black;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const StyledHeaderLogo = styled.img`
  width: 9rem;
  position: relative;
  bottom: 0.15rem;
  left: 1rem;
`;

const HeadButton = styled.button`
  width: 6rem;
  height: 2rem;
  background-color: transparent;
  color: white;
  border-color: transparent;
  font-size: 20px;
  margin: auto;
  cursor: pointer;
`;

const StyledSmallButtonDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-left: 10rem;
`;
const SmallButton = styled.button`
  width: 6rem;
  background-color: transparent;
  border-color: transparent;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;

const StyledLogin = styled.button`
  padding-right: 1rem;
  width: 6rem;
  background-color: transparent;
  border-color: transparent;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;
