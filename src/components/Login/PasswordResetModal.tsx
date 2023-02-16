import React, { useState } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

type PasswordResetModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setSuccess(true);
      setLoading(false);
    } catch (error: unknown) {
      setError(error as string);
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Password Reset</h2>
      {error && <div>{error}</div>}
      {success ? (
        <div>Please check your email to reset your password.</div>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Reset Password'}
          </button>
        </form>
      )}
    </Modal>
  );
};

export default PasswordResetModal;
