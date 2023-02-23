import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { dbService } from '../../common/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore';

function CommunitySlide() {
  const [popular, setPopular] = useState({ id: '' });
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(dbService, 'posts'));
      console.log(querySnapshot);
      let PushData: any = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        PushData.push(doc.data());
      });
      console.log('확인', PushData);
      setUserData(PushData);
    };
    getData();
  }, []);
  return (
    <div>
      <h1
        style={{
          marginLeft: '50px',
        }}
      >
        뉴스피드
      </h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DDD>{userData[0]?.contents}</DDD>
        <DDD></DDD>
        <DDD></DDD>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3rem' }}>
        <DDD></DDD>
        <DDD></DDD>
        <DDD></DDD>
      </div>
      <OnclickButton onClick={() => navigate('/NewsPage')}>
        더보기
      </OnclickButton>
    </div>
  );
}

export default CommunitySlide;

const DDD = styled.div`
  width: 500px;
  height: 500px;
  background-color: red;
  margin-left: 50px;
`;

const OnclickButton = styled.button`
  width: 5rem;
  height: 1rem;
  border: 1px solid white;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  margin-left: 3rem;
  margin-top: 1rem;
  background-color: white;
`;
