import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Modal from 'react-modal';

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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Find Modal"
    >
      <h2>Find ID</h2>
      <form onSubmit={handleFind}>
        <div>
          <label htmlFor="email">Email</label>
          <input
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
        <button type="submit">Find ID</button>
      </form>
    </Modal>
  );
};

export default IDFindModal;
