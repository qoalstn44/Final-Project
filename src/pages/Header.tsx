// import React, { Component } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <HeadBox>
        <HeadButton onClick={() => navigate('/')}>로고</HeadButton>
        <HeadButton onClick={() => navigate('/CommunityPage')}>
          커뮤니티
        </HeadButton>
        <HeadButton onClick={() => navigate('/ItemPage')}>제품리뷰</HeadButton>
        <HeadButton onClick={() => navigate('/NewsPage')}>뉴스</HeadButton>
        <SmallButton
          style={{
            marginLeft: '500px',
          }}
        >
          검색
        </SmallButton>
        <SmallButton onClick={() => navigate('/PostPage')}>글쓰기</SmallButton>
        <SmallButton onClick={() => navigate('/LoginPage')}>로그인</SmallButton>
      </HeadBox>
    </div>
  );
}

export default Header;

const HeadBox = styled.div`
  width: 100%;
  height: 10%;
  background-color: black;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const HeadButton = styled.button`
  width: 200px;
  height: 100px;
  background-color: black;
  margin-left: 50px;
  margin-right: 50px;
  color: white;
`;
const SmallButton = styled.button`
  width: 150px;
  height: 100px;
  background-color: green;
  margin-left: 20px;
  margin-right: 20px;
`;
