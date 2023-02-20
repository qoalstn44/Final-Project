import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { provider } from '../common/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router';
import SignUpModal from '../components/Login/SignUpModal';
import PasswordResetModal from '../components/Login/PasswordResetModal';
import IDFindModal from '../components/Login/IDFindModal';
import { useDispatch } from 'react-redux';
import { isLogin } from '../redux/modules/loginSlice';
import { authService } from '../common/firebase';

const User = {
  Email: 'qoalstn44@naver.com',
  Password: '!ekfmstkfkd1',
};

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllowed, setNotAllowed] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const onClickLogin = () => {
    if (email === User.Email && password === User.Password) {
      alert('로그인 성공');
    } else {
      alert('로그인 실패');
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const regex = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;
    if (regex.test(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  useEffect(() => {
    if (emailValid && passwordValid) {
      setNotAllowed(false);
      return;
    }
    setNotAllowed(true);
  }, [emailValid, passwordValid]);

  // 구글 로그인
  const auth = getAuth();
  const handleButtonClickGoogleButton = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        console.log('로그인 되었습니다.');
        navigate('/');
      })
      .catch(() => {
        console.log('로그인이 실패 하였습니다.');
      });
  };

  return (
    <Page>
      <LoginBox>
        <Top>
          <Id>
            <InputTitle>
              <FaUserAlt />
            </InputTitle>
            <IdInputWrap>
              <Input
                type="text"
                placeholder="아이디"
                value={email}
                onChange={handleChangeEmail}
              />
            </IdInputWrap>
            <ErrorMessageWrap>
              {!emailValid && email.length > 0 && (
                <p>이메일 형식이 올바르지 않습니다.</p>
              )}
            </ErrorMessageWrap>
          </Id>
          <Line />
          <Password>
            <FaLock />
            <PwInputWrap>
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={handleChangePassword}
              />
            </PwInputWrap>
            <ErrorMessageWrap>
              {!passwordValid && password.length > 0 && (
                <div>비밀번호 형식이 올바르지 않습니다.</div>
              )}
            </ErrorMessageWrap>
          </Password>
        </Top>
        <Button>
          <LoginButton onClick={onClickLogin} disabled={notAllowed}>
            로그인
          </LoginButton>
        </Button>
        <StyledGoogleLoginDiv>
          <StyledGoogleLoginButton onClick={handleButtonClickGoogleButton}>
            <StyledGoogleLogin>
              <StyledGoogle src="img/google.png" alt="구글" />
              <h3>구글계정으로 시작하기</h3>
            </StyledGoogleLogin>
          </StyledGoogleLoginButton>
        </StyledGoogleLoginDiv>
        <Button>
          <SignUpButton onClick={openModal}>아이디 찾기</SignUpButton>
          <IDFindModal isOpen={modalIsOpen} onRequestClose={closeModal} />
          <SignUpButton onClick={openModal}>비밀번호 찾기</SignUpButton>
          <PasswordResetModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
          />
          <SignUpButton onClick={openModal}>회원가입</SignUpButton>
          <SignUpModal isOpen={modalIsOpen} onRequestClose={closeModal} />
        </Button>
      </LoginBox>
    </Page>
  );
}

export default LoginPage;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: black;
  height: 100vh;
  width: 100vw;
`;
const TitleWrap = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
  font-size: 26px;
  font-weight: bold;
  color: #262626;
`;

const InputTitle = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  color: #262626;
`;

const IdInputWrap = styled.div`
  display: flex;
  border-radius: 8px;
  padding: 16px;
`;

const Line = styled.div`
  border: 0.5px solid #c6c6c3;
  width: 32rem;
  position: relative;
  right: 1rem;
`;
const PwInputWrap = styled.div`
  display: flex;
  border-radius: 8px;
  padding: 16px;
`;

const Input = styled.input`
  padding: 1rem 13rem;
  padding-left: 1rem;
  outline: none;
  border: none;
  background-color: transparent;
`;

const ErrorMessageWrap = styled.div`
  font-size: 12px;
  color: #ff0000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 3rem;
  border-radius: 30px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #c6c6c3;
  background-color: #f4f4f4;
  border-radius: 30px;
  width: 30rem;
  height: 8rem;
  padding: 1rem;
`;

const Id = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Password = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.button`
  width: 28rem;
  height: 4rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background: #f39340;
  color: white;
  border-radius: 40px;
  border: none;
  cursor: pointer;
  :disabled {
    background: #c6c6c3;
  }
`;

const SignUpButton = styled.button`
  width: 8rem;
  height: 2rem;
  background: #f39340;
  border-radius: 20px;
  cursor: pointer;
  :disabled {
    background: #c6c6c3;
  }
`;

const StyledGoogleLoginDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledGoogleLoginButton = styled.button`
  border: 1px solid #c6c6c3;
  background-color: transparent;
  cursor: pointer;
  padding: 1rem 2rem;
  border-radius: 40px;
`;

const StyledGoogleLogin = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledGoogle = styled.img`
  width: 3rem;
  height: 3.4rem;
  margin-right: 1rem;
`;
