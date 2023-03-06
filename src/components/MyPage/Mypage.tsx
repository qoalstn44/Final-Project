import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { authService } from '../../common/firebase';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { FaCommentDots, FaFileSignature, FaUserAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

type UserData = {
  name: string;
  age: number;
  gender: 'male' | 'female';
};

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const FaCommentDotsIcon = () => (
    <UserIcon>
      <FaCommentDots />
    </UserIcon>
  );
  const FaFileSignatureIcon = () => (
    <UserIcon>
      <FaFileSignature />
    </UserIcon>
  );
  const FaUserAltIcon = () => (
    <UserIcon>
      <FaUserAlt />
    </UserIcon>
  );

  return (
    <SidebarContainer>
      <Logo src="img/Petalk.png" onClick={() => navigate('/')} />
      <Button
        onClick={() => navigate('/mypage')}
        className={location.pathname === '/mypage' ? 'active' : ''}
      >
        <FaUserAltIcon />내 정보
      </Button>
      <Button onClick={() => navigate('/myfile')}>
        <FaFileSignatureIcon />
        내가 작성한 글
      </Button>
      <Button onClick={() => navigate('/mycomment')}>
        <FaCommentDotsIcon />
        내가 작성한 댓글
      </Button>
    </SidebarContainer>
  );
};

const MyPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const auth = authService;
  const [user] = useAuthState(auth);
  const [data, setData] = useState<UserData>({
    name: '',
    age: 0,
    gender: 'male',
  });

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const userRef = firebase.firestore().collection('users').doc(user?.uid!);
      const snapshot = await userRef.get();
      setData(
        (snapshot.data() as UserData) || { name: '', age: 0, gender: 'male' },
      );
    };

    if (user) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      fetchData();
    }
  }, [user]);

  return (
    <UserCardContainer>
      <UserCard>
        <img src="https://picsum.photos/1" alt="Dummy image" />

        <div>{`닉네임: ${user?.displayName}`}</div>
        <p>{`이메일: ${user?.email}`}</p>
        <EditButton onClick={() => setModalOpen(true)}>수정하기</EditButton>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <h2>Modal Title</h2>
          <p>Modal content goes here</p>
        </Modal>
      </UserCard>
    </UserCardContainer>
  );
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <ModalOverlay open={open}>
      <ModalContent>
        <button onClick={onClose}>Close</button>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

type LayoutProps = {
  children: React.ReactNode;
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

const MyPageWithLayout: React.FC = () => {
  return (
    <Layout>
      <MyPage />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <MyPageWithLayout />
    </div>
  );
};

export default App;

const UserCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const UserCard = styled.div`
  width: 600px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #3f3030;
  font-size: 24px;
  padding: 40px;
  gap: 20px;
  font-weight: 600;
  line-height: 1.5;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 20px;
    object-fit: cover;
    object-position: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 28px;
    margin-bottom: 10px;
  }

  .email {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .data {
    font-size: 20px;
  }
`;

const EditButton = styled.button`
  background-color: #fff;
  border-radius: 5px;
  color: #3f3030;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #3f3030;
    color: #fff;
  }
`;

const SidebarContainer = styled.div`
  width: 350px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1b1b18;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  position: fixed;
  cursor: pointer;
`;

const Button = styled.button`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  color: #fff;
  width: 200px;
  height: 50px;
  cursor: pointer;
`;

const LayoutContainer = styled.div`
  display: flex;
`;

const Main = styled.div`
  margin-left: 200px;
`;

const Logo = styled.img`
  margin-top: 7rem;
  margin-bottom: 5rem;
`;

const UserIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
`;

const ModifyModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #555;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #0077cc;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #005fa3;
    }
  }
`;
