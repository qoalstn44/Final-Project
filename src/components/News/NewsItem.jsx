import React from 'react';
import styled from 'styled-components';

const NewsItem = (props) => {
  return (
    <ItemContainer>
      <ItemData>
        <Title>{props.title}</Title>
        <ItemDatetime>{props.datetime}</ItemDatetime>
        <ItemContents>{props.contents}</ItemContents>
        <ItemUrl href={props.url}>링크 바로가기</ItemUrl>
      </ItemData>
    </ItemContainer>
  );
};

export default NewsItem;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  border: 1px solid #dddddd;
  padding: 3rem;
`;

const ItemData = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1rem;
`;

const ItemContents = styled.p`
  font-size: 0.8rem;
`;

const ItemUrl = styled.a`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-decoration: none;
  color: #8d8d8a;
`;

const ItemDatetime = styled.p`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  padding-left: 21rem;
`;
