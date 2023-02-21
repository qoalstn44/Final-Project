import React from 'react';
import { Navigate } from 'react-router';
import styled from 'styled-components';
import CommunityPage from '../../pages/CommunityPage';
import { useNavigate } from 'react-router';

function NewspidSlide() {
  const navigate = useNavigate();
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

export default NewspidSlide;

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
