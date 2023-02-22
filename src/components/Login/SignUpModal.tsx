import React, { useState } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import styled from 'styled-components';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FaEye } from 'react-icons/fa';
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Sinup = async () => {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    navigate('/loginpage');
    console.log(result);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(handleSignUp);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      // 이메일 중복 확인navigate
      const signInMethods = await firebase
        .auth()
        .fetchSignInMethodsForEmail(email);
      if (signInMethods.length > 0) {
        setError('이메일이 중복 되었습니다.');
        setLoading(false);
        return;
      }

      // 이메일 등록
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setLoading(false);
      onRequestClose();
    } catch (error: unknown) {
      setError(error as string);
      setLoading(false);
    }
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
        <StyledModal
          isOpen={isOpen}
          // onRequestClose={onRequestClose}
          ariaHideApp={false}
        >
          <CloseButton onClick={onRequestClose}>x</CloseButton>
          <h2>회원가입</h2>

          {error && <div>{error}</div>}
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
          <CompleteButton type="submit" onClick={Sinup} disabled={loading}>
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
  top: 45rem;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 39rem;
  height: 33rem;
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
