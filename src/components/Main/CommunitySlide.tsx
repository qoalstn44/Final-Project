import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import styled from 'styled-components';
import CommunityPage from '../../pages/CommunityPage';
import { useNavigate } from 'react-router';
import { dbService } from '../../common/firebase';
import { doc, getDoc } from 'firebase/firestore';

function CommunitySlide() {
  const [popular, setPopular] = useState({ id: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const product = { id: 'fnSn5hJvOV4Ck9J0krIg' }; // replace "123" with the actual ID of the post you want to retrieve
      const docRef = doc(dbService, 'product', product.id);
      const docSnap = await getDoc(docRef);

      const newPopular = {
        id: docSnap.id,
        ...docSnap.data(),
      };

      setPopular(newPopular);
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
        인기글
      </h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {popular.id ? (
          <>
            <DDD data={popular} />
            <DDD data={popular} />
            <DDD data={popular} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3rem' }}>
        {popular.id ? (
          <>
            <DDD data={popular} />
            <DDD data={popular} />
            <DDD data={popular} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <OnclickButton onClick={() => navigate('/NewsPage')}>
        더보기
      </OnclickButton>
    </div>
  );
}

export default CommunitySlide;

const DDD = ({ data }: any) => {
  return (
    <div
      style={{
        width: '500px',
        height: '500px',
        backgroundColor: 'red',
        marginLeft: '50px',
      }}
    >
      <div>{data.title}</div>
      <div>{data.author}</div>
    </div>
  );
};

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
