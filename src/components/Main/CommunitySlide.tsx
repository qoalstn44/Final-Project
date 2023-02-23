import React from 'react';
import { Navigate } from 'react-router';
import styled from 'styled-components';
import CommunityPage from '../../pages/CommunityPage';
import { useNavigate } from 'react-router';

function CommunitySlide() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h1
          style={{
            marginLeft: '50px',
          }}
        >
          인기게시글
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DDD></DDD>
        <DDD></DDD>
        <DDD></DDD>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'row', marginTop: '100px' }}
      >
        <DDD></DDD>
        <DDD></DDD>
        <DDD></DDD>
      </div>
      <OnclickButton onClick={() => navigate('/communitypage')}>
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
