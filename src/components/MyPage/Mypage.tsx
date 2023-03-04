import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { authService } from '../../common/firebase';
import styled from 'styled-components';

type UserData = {
  name: string;
  age: number;
  gender: 'male' | 'female';
};

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </SidebarContainer>
  );
};

const MyPage: React.FC = () => {
  const auth = authService;
  const [user] = useAuthState(auth);
  const [data, setData] = useState<UserData>({
    name: '',
    age: 0,
    gender: 'male',
  });

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
        <div>My Page</div>
        <div>{`${user?.displayName}`}</div>
        <p>{`Your email is: ${user?.email}`}</p>
        <p>{`Your data is: ${JSON.stringify(data)}`}</p>
      </UserCard>
    </UserCardContainer>
  );
};

type LayoutProps = {
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
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const UserCard = styled.div`
  width: 600px;
  height: 400px;
  background-color: #3f3030;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
`;

const SidebarContainer = styled.div`
  width: 200px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #363738;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
`;

const LayoutContainer = styled.div`
  display: flex;
`;

const Main = styled.div`
  margin-left: 200px;
`;
