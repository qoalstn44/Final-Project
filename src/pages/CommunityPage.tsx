import React from 'react';
import styled from 'styled-components';

function CommunityPage() {
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
      <div
        style={{ display: 'flex', flexDirection: 'row', marginTop: '100px' }}
      >
        <DDD></DDD>
        <DDD></DDD>
        <DDD></DDD>
      </div>
      ;
    </div>
  );
}

export default CommunityPage;

const DDD = styled.div`
  width: 500px;
  height: 500px;
  background-color: red;
  margin-left: 50px;
`;
