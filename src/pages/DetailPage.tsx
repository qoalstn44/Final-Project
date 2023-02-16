  import { useEffect, useState } from 'react';
  import styled from 'styled-components';
  //@ts-ignore
  import CommentList from '../components/Detail/CommentList';
  import { useQuery } from 'react-query';
  import { readComment } from './api';

  const DetailPage = () => {
    {
      // 댓글 가져오기
      const { data: CommentData, isLoading: CommentLoading } = useQuery(
        'Comments',
        readComment,
      );
      // 스크롤을 0, 0으로 맞춤 (맨 위)
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      let itemData: CommentType[];
      if (CommentData === undefined) {
        itemData = [];
      } else {
        itemData = CommentData?.filter((data: CommentType) => data.userId);
      }
      if (CommentLoading) {
        return <div>댓글 로딩중...</div>;
      }
      return (
        <StyledPost>
          <StyledTitle>여기는 글 제목 입니다. </StyledTitle>
          <StyledInfo>
            <StyledId>ID</StyledId>
            <StyledImg src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg" />
          </StyledInfo>
          <StyledContent>
            여기는 게시글 입니다 이러쿵 저러쿵 궁시렁 궁시렁{' '}
          </StyledContent>
          <StyledImgContainer>
            <StyledImgContent src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg" />
          </StyledImgContainer>
          <ComentTag>#댕댕이</ComentTag>
          <CommentListWrap>
            <CommentList itemData={itemData} userId={''} /> : <></>
            {'}'}
          </CommentListWrap>
        </StyledPost>
      );
    }
  };
  export default DetailPage;

  const StyledPost = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 10rem auto;
    border: 0.0625rem solid lightgray;
    padding: 1rem;
  `;

  const StyledTitle = styled.h2`
    font-size: 3rem;
    margin-bottom: 1rem;
  `;

  const StyledInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  `;

  const StyledId = styled.p`
    font-size: 2rem;
    margin-right: 1rem;
  `;

  const StyledImg = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
  `;

  const StyledContent = styled.p`
    font-size: 2rem;
    text-align: justify;
    margin-bottom: 1rem;
  `;

  const StyledImgContainer = styled.div`
    width: 100%;
    text-align: center;
  `;

  const StyledImgContent = styled.img`
    width: 40%;
    height: auto;
    margin-bottom: 1rem;
  `;

  const CommentListWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const ComentTag = styled.span`
  width: 5rem;
  font-size: 1rem;
  background-color: #F39340;
  padding: 0.3125rem;
  border-radius: 2rem;
  display: flex;
  justify-content:center;
  align-items: center;
`;