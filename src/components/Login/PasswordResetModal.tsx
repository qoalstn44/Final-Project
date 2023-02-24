import React, { useState } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import styled from 'styled-components';

type PasswordResetModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setLoading(false);
      setSuccess(true);
    } catch (error: unknown) {
      setError(error as string);
      setLoading(false);
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  return (
    <StyledModal
      isOpen={isOpen}
      // onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <h2>비밀번호 찾기</h2>
      {error && <div>{error}</div>}
      {success ? (
        <div>Please check your email to reset your password.</div>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <Label>이메일</Label>
          <div>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <Label>아이디</Label>
          <div>
            <Input type="text" value={id} onChange={handleIdChange} required />
          </div>
        </form>
      )}

      <CompleteButton type="submit" disabled={loading}>
        {loading ? 'Loading...' : '완료'}
      </CompleteButton>
      <CloseButton
        onClick={() => {
          onRequestClose();
          setSuccess(false);
          setError(null);
        }}
      >
        x
      </CloseButton>
    </StyledModal>
  );
};

export default PasswordResetModal;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
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

const StyledModal = styled(Modal)`
  position: fixed;
  top: 25rem;
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
