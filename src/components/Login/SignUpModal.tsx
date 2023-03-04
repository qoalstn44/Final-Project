import React, { useState } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import styled from 'styled-components';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useNavigate } from 'react-router';

// auth를 사용하는 코드

type SignUpModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children?: React.ReactNode;
};

const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('비밀번호 또는 비밀번호 확인을 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 이메일 유효성 검사
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!emailRegex.test(email)) {
      setError('이메일 형식이 유효하지 않습니다.');
      return;
    }

    // 비밀번호 유효성 검사
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      setError(
        '비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자리로 입력해주세요.',
      );
      return;
    }

    try {
      setLoading(true);

      // 이메일 중복 확인
      const signInMethods = await firebase
        .auth()
        .fetchSignInMethodsForEmail(email);
      if (signInMethods.length > 0) {
        setError('이메일이 중복 되었습니다.');
        setLoading(false);
        return;
      }

      // 회원가입 진행
      const auth = getAuth();
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      setLoading(false);
      navigate('/loginpage');
      console.log(result);
    } catch (error: unknown) {
      setError(error as string);
      setLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <StyledBock>
        <StyledModal isOpen={isOpen} ariaHideApp={false}>
          <CloseButton onClick={onRequestClose}>x</CloseButton>
          <h2>회원가입</h2>

          {error && <div>{error}</div>}
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Label>닉네임</Label>
            <div>
              <Input
                type="text"
                value={name}
                onChange={handleNameChange}
                required
              ></Input>
            </div>
            <Label>이메일</Label>
            <div>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              ></Input>
            </div>
            <Label>비밀번호</Label>

            <div>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              ></Input>
            </div>

            <Label>비밀번호 확인</Label>
            <div>
              <Input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              ></Input>
            </div>
          </form>
          <CompleteButton
            type="submit"
            onClick={handleSignUp}
            disabled={loading}
          >
            완료
          </CompleteButton>
        </StyledModal>
      </StyledBock>
    </>
  );
};

export default SignUpModal;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CompleteButton = styled.button`
  width: 30rem;
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

const StyledBock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0, 75%);
  z-index: -1;
`;

const StyledModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  background-color: white;
  border-radius: 2rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  width: 30rem;
  height: 3rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 3.5rem;
  height: 3.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ccc;
  &:hover {
    color: #333;
  }
`;
