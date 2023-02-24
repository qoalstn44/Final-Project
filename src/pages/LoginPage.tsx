import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { provider } from '../common/firebase';
import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router';
import SignUpModal from '../components/Login/SignUpModal';
import PasswordResetModal from '../components/Login/PasswordResetModal';
import IDFindModal from '../components/Login/IDFindModal';
import { useAppDispatch } from '../hooks/useRedux';
import { isLogin } from '../redux/modules/loginSlice';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllowed, setNotAllowed] = useState(false);

  const [idFindModalIsOpen, setIdFindModalIsOpen] = useState(false);
  const [passwordResetModalIsOpen, setPasswordResetModalIsOpen] =
    useState(false);
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);

  const openIdFindModal = () => setIdFindModalIsOpen(true);
  const closeIdFindModal = () => setIdFindModalIsOpen(false);
  const openPasswordResetModal = () => setPasswordResetModalIsOpen(true);
  const closePasswordResetModal = () => setPasswordResetModalIsOpen(false);
  const openSignUpModal = () => setSignUpModalIsOpen(true);
  const closeSignUpModal = () => setSignUpModalIsOpen(false);

  const onClickLogin = () => {
    if (emailValid && passwordValid) {
      setNotAllowed(false);
      navigate('/');
    } else {
      setNotAllowed(true);
    }
  };

  const handleButtonClickGoogleButton = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        dispatch(isLogin(user));
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
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
  return (
    <Page>
      <LogImg src="img/Petalk.png" />
      <LoginBox>
        <Top>
          <Id>
            <InputTitle>
              <>
                <FaUserAlts />
              </>
            </InputTitle>
            <IdInputWrap>
              <Input
                type="text"
                placeholder="아이디"
                value={email}
                onChange={handleChangeEmail}
              />
              <ErrorMessageWrap>
                {!emailValid && email.length > 0 && (
                  <PasswordInpit>*</PasswordInpit>
                )}
              </ErrorMessageWrap>
            </IdInputWrap>
          </Id>
          <Line />
          <Password>
            <>
              <FaLocks />
            </>
            <PwInputWrap>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호"
                value={password}
                onChange={handleChangePassword}
              ></Input>

              <ErrorMessageWrap>
                {!passwordValid && password.length > 0 && (
                  <PasswordInpit>
                    *
                    {/* <IconbButton onClick={handleShowPasswordClick}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconbButton> */}
                  </PasswordInpit>
                )}
              </ErrorMessageWrap>
            </PwInputWrap>
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
              <StyledGoogle>
                <StyledGoogleImg src="https://developers.google.com/identity/images/g-logo.png" />
                구글 로그인
              </StyledGoogle>
            </StyledGoogleLogin>
          </StyledGoogleLoginButton>
        </StyledGoogleLoginDiv>
        <Button>
          <SignUpButton onClick={openIdFindModal}>아이디 찾기</SignUpButton>

          <IDFindModal
            isOpen={idFindModalIsOpen}
            onRequestClose={closeIdFindModal}
          />
          <SignUpButton onClick={openPasswordResetModal}>
            비밀번호 찾기
          </SignUpButton>
          <PasswordResetModal
            isOpen={passwordResetModalIsOpen}
            onRequestClose={closePasswordResetModal}
          />
          <SignUpButton onClick={openSignUpModal}>회원가입</SignUpButton>
          <SignUpModal
            isOpen={signUpModalIsOpen}
            onRequestClose={closeSignUpModal}
          />
        </Button>
      </LoginBox>
    </Page>
  );
}

export default LoginPage;

const FaUserAlts = styled(FaUserAlt)`
  width: 2rem;
  height: 1.5rem;
`;

const FaLocks = styled(FaLock)`
  width: 2rem;
  height: 1.5rem;
`;

const PasswordInpit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0.5rem;
  font-size: 1.5rem;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 100vh;
  width: 100vw;
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
  width: 15rem;
  height: 2rem;
  padding-left: 1rem;
  outline: none;
  border: none;
  background-color: transparent;
`;

const ErrorMessageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: #ff0000;
  font-size: 1rem;
  font-weight: 600;
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
  width: 32rem;
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
  width: 6rem;
  height: 2rem;
  border: none;
  background: transparent;
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
  width: 15rem;
  border-radius: 4rem;
  margin-bottom: 2rem;
`;

const StyledGoogleLogin = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledGoogle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #262626;
  padding: 0.5rem 0;
  width: 30rem;
  height: 2rem;
`;

const StyledGoogleImg = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
`;

const LogImg = styled.img`
  width: 17rem;
  height: 4rem;
  margin-bottom: 5rem;
`;
