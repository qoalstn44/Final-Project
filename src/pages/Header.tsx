import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  return (
    <div>
      <HeadBox>
        <HeadButton>로고</HeadButton>
        <HeadButton>커뮤니티</HeadButton>
        <HeadButton>제품리뷰</HeadButton>
        <HeadButton>뉴스</HeadButton>

        <SmallButton
          style={{
            marginLeft: '500px',
          }}
        >
          검색
        </SmallButton>
        <SmallButton>글쓰기</SmallButton>
        <SmallButton>로그인</SmallButton>
      </HeadBox>
    </div>
  );
}

export default Header;

const HeadBox = styled.div`
  width: 100%;
  height: 100px;
  background-color: black;
  display: flex;
  flex-direction: row;
`;

const HeadButton = styled.button`
  width: 200px;
  height: 100px;
  background-color: white;
  margin-left: 50px;
  margin-right: 50px;
`;
const SmallButton = styled.button`
  width: 150px;
  height: 100px;
  background-color: green;
  margin-left: 20px;
  margin-right: 20px;
`;
