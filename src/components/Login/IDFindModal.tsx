import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Modal from 'react-modal';
import styled from 'styled-components';

type FindModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const IDFindModal: React.FC<FindModalProps> = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleFind = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setIsSent(true);
    } catch (error: unknown) {
      setErrorMessage(error as string);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <StyledModal
      isOpen={isOpen}
      // onRequestClose={onRequestClose}
      contentLabel="Find Modal"
      ariaHideApp={false}
    >
      <h2>아이디 찾기</h2>
      <form onSubmit={handleFind}>
        <Label htmlFor="email">이메일</Label>
        <div>
          <Input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {isSent && (
          <div>Email has been sent to {email}. Please check your email.</div>
        )}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
      <CompleteButton type="submit">완료</CompleteButton>
      <CloseButton onClick={onRequestClose}>x</CloseButton>
    </StyledModal>
  );
};

export default IDFindModal;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
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
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
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
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
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
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
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
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
