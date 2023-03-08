import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isLogin } from '../redux/modules/loginSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { provider } from '../common/firebase';
import SignUpModal from '../components/Login/SignUpModal';
import PasswordResetModal from '../components/Login/PasswordResetModal';

interface LoginFormState {
  email: string;
  password: string;
}

export function LoginPage(): JSX.Element {
  const openPasswordResetModal = () => setPasswordResetModalIsOpen(true);
  const closePasswordResetModal = () => setPasswordResetModalIsOpen(false);
  const openSignUpModal = () => setSignUpModalIsOpen(true);
  const closeSignUpModal = () => setSignUpModalIsOpen(false);

  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [, setLoginInfo] = useState<User | null>(null);
  const dispatch = useDispatch(); // useAppDispatch 대신 useDispatch 사용
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllowed, setNotAllowed] = useState(false);

  const [passwordResetModalIsOpen, setPasswordResetModalIsOpen] =
    useState(false);
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
  const [, setError] = useState<string | null>(null);

  //

  const localStorage = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
    }
  };

  // 로컬스토리지
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // 유저가 로그인한 상태이므로 홈페이지로 이동합니다.
        dispatch(isLogin(user));
        if (user.email) {
          localStorage('email', user.email);
        }
        setLoginInfo(user); // 로그인 정보 저장
        navigate('/');
      } else {
        setLoginInfo(null); // 로그아웃 상태인 경우 로그인 정보 초기화
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  //

  // 이메일, 비밀번호 입력
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'email') {
      setEmail(value);
      const regex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (regex.test(value)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    } else if (name === 'password') {
      setPassword(value);
      const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
      if (regex.test(value)) {
        setPasswordValid(true);
      } else {
        setPasswordValid(false);
      }
    }
  };
  // 로그인
  const onClickLogin = () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(isLogin(user));
        navigate('/');
        // 로그인 성공 시 로컬 스토리지에 이메일 정보 저장
        localStorage('email', email);
      })
      .catch((error) => {
        const errorMessage = error.message;
        window.alert(errorMessage);
        setError(errorMessage);
      });
  };

  // 로그인 버튼 활성화
  useEffect(() => {
    if (emailValid && passwordValid) {
      setNotAllowed(false);
      return;
    }
    setNotAllowed(true);
  }, [emailValid, passwordValid]);
  // 엔터키로 로그인
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickLogin();
    }
  };

  // 구글 로그인
  const handleButtonClickGoogleButton = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
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
                type="email"
                name="email"
                placeholder="아이디"
                value={email}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
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
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
              ></Input>

              <ErrorMessageWrap>
                {!passwordValid && password.length > 0 && (
                  <PasswordInpit>*</PasswordInpit>
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
  align-items: center;
  position: relative;
  top: 0.5rem;
  font-size: 1.5rem;
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #1b1b18;
  height: 100vh;
  width: 100vw;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const InputTitle = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  color: #262626;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const IdInputWrap = styled.div`
  display: flex;
  border-radius: 8px;
  padding: 16px;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
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
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const Input = styled.input`
  width: 15rem;
  height: 2rem;
  padding-left: 1rem;
  outline: none;
  border: none;
  background-color: transparent;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
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
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
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
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
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
  text {
    font-family: 'Noto Sans KR', sans-serif;
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
  text {
    font-family: 'Noto Sans KR', sans-serif;
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
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
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
  position: relative;
  top: 2rem;
  width: 17rem;
  height: 4rem;
  margin-bottom: 5rem;
`;
