import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { authService } from '../../common/firebase';

const MyPage: React.FC = () => {
  const auth = authService;
  const [user] = useAuthState(auth);
  const [data, setData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const fetchData = async () => {
      const userRef = firebase.firestore().collection('users').doc(user?.uid!);
      const snapshot = await userRef.get();
      setData(snapshot.data() || {});
    };

    if (user) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      fetchData();
    }
  }, [user]);

  return (
    <div>
      <h1>My Page</h1>
      <div>{`Welcome, ${user?.displayName}`}</div>
      <p>{`Your email is: ${user?.email}`}</p>
      <p>{`Your data is: ${JSON.stringify(data)}`}</p>
    </div>
  );
};

export default MyPage;
