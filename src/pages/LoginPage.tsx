import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import SignUpModal from '../components/Login/SignUpModal';
import PasswordResetModal from '../components/Login/PasswordResetModal';
import IDFindModal from '../components/Login/IDFindModal';

const User = {
  Email: 'qoalstn44@naver.com',
  Password: '!ekfmstkfkd1',
};

function LoginPage() {
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

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch(() => {
      // ..
    });

  return (
    <Page>
      <LoginBox>
        <Logoimg src="https://user-images.githubusercontent.com/77392444/104844569-1b2b4a00-5912-11eb-9b1a-1b2b1b2b1b2b.png" />
        <TitleWrap>
          이메일과 비밀번호를
          <br />
          입력해주세요.
        </TitleWrap>
        <Top>
          <Id>
            <InputTitle>
              <FaUserAlt />
            </InputTitle>
            <IdInputWrap>
              <Input
                type="text"
                placeholder="user@gmail.com"
                value={email}
                onChange={handleChangeEmail}
              />
            </IdInputWrap>
            <ErrorMessageWrap>
              {!emailValid && email.length > 0 && (
                <div>이메일 형식이 올바르지 않습니다.</div>
              )}
            </ErrorMessageWrap>
          </Id>
          <Line />
          <Password>
            <FaLock />
            <PwInputWrap>
              <Input
                type="password"
                placeholder="영문, 숫자, 특수문자 포함 8자 이상 입렵해주세요."
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
  background-color: #fff7db;
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
  border: 1px solid #c6c6c3;
`;
const PwInputWrap = styled.div`
  display: flex;
  border-radius: 8px;
  padding: 16px;
`;

const Input = styled.input`
  width: 25vh;
  outline: none;
  border: none;
  background-color: transparent;
`;

const ErrorMessageWrap = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #ff0000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logoimg = styled.img`
  width: 100px;
  height: 100px;
  background-color: green;
`;

const LoginBox = styled.div``;

const Top = styled.div`
  border: 1px solid #c6c6c3;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 45rem;
  height: 8rem;
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
  width: 30rem;
  height: 4rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background: #f39340;
  border-radius: 40px;
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
