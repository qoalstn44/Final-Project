import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { dbService } from '../../common/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

function CommunitySlide() {
  const [popular, setPopular] = useState({ id: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      //   const posts = { id: 'yfjJR9ITPg5XOC6vVz6f' }; // replace "123" with the actual ID of the post you want to retrieve
      //   const docRef = doc(dbService, 'posts', posts.id);
      //   const docSnap = await getDocs(docRef);

      //   const newPopular = {
      //     id: docSnap.id,
      //     ...docSnap.data(),
      //   };

      //   setPopular(newPopular);
      // };
      // getData();
      const querySnapshot = await getDocs(collection(dbService, 'posts'));
      console.log(querySnapshot);
      const dataCall = querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
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
        <DDD></DDD>
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
