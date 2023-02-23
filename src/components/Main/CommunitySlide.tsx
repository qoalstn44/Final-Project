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
        커뮤니티
      </h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DDD>
          <SmallBox></SmallBox>
          <div>{userData[0]?.title}</div>
        </DDD>
        <DDD>
          <SmallBox></SmallBox>
          {userData[1]?.title}
        </DDD>
        <DDD>
          <SmallBox></SmallBox>
          {userData[2]?.title}
        </DDD>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3rem' }}>
        <DDD>
          <SmallBox></SmallBox>
          {userData[3]?.title}
        </DDD>
        <DDD>
          <SmallBox></SmallBox>
          {userData[4]?.title}
        </DDD>
        <DDD>
          <SmallBox></SmallBox>
          {userData[5]?.title}
        </DDD>
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
  background-color: black;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  color: white;
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

const SmallBox = styled.div`
  width: 500px;
  height: 300px;
  background-color: green;
`;
