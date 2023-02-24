import styled from 'styled-components';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { dbService, authService } from '../common/firebase';
import { useEffect, useState } from 'react';

const DummyPage = () => {
  const [auth, setAuth] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setAuth(authService.currentUser?.uid);
    }, 1000);
  }, []);

  // 데이터 하나 가져오기
  const unsub = () => {
    try {
      onSnapshot(doc(dbService, 'post', auth), (doc) => {
        console.log('Current data: ', doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };
  // 데이터 전체 가져오기
  const unsub2 = () => {
    try {
      const q = query(
        collection(dbService, 'posts'),
        where('uid', '==', authService.currentUser.uid),
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledDummyDiv>
      <div>
        <StyledDummyImg src="img/cat.jpeg" alt="" />
      </div>
      <div>
        <h3>제목</h3>
        <p>내용</p>
        <button onClick={unsub2}>가져오기1</button>
      </div>
    </StyledDummyDiv>
  );
};

export default DummyPage;

const StyledDummyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: pink;
  border: 1px solid black;
  margin: auto;
  width: 20rem;
  height: 20rem;
  margin-top: 13rem;
`;

const StyledDummyImg = styled.img`
  width: 13rem;
`;
