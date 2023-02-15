import React, { useState } from 'react';
import Modal from 'react-modal';
interface IUser {
  name: string;
  email: string;
  password: string;
}

interface Props {
  isOpen: any;
}

const SignUpForm = ({ isOpen }: Props) => {
  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors: string[] = [];
    if (!user.name) {
      errors.push('Name is required');
    }
    if (!user.email) {
      errors.push('Email is required');
    }
    if (!user.password) {
      errors.push('Password is required');
    }
    setErrors(errors);
    if (errors.length === 0) {
      console.log('Submitting User:', user);
      // TODO: 서버로 사용자 데이터를 전송
      setModalIsOpen(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>회원가입</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Sign Up</button>
          <button type="button" onClick={() => setModalIsOpen(false)}>
            Cancel
          </button>
          {errors.length > 0 && (
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default SignUpForm;
