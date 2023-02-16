import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
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
      <div>
        <button onClick={() => setModalIsOpen(true)}>회원가입</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="name">아이디</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="nickname">닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  // value={user.nickname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="password">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="password">비밀번호 확인</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" onClick={() => setModalIsOpen(false)}>
              확인
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
    </div>
  );
};

export default SignUpForm;

const StyledPostModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;
