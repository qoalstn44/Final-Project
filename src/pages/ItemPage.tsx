import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { productCollection } from '../common/firebase';
import { ProductType } from '../components/types/Product';

function ProductCard() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(
    () =>
      onSnapshot(productCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        setProducts(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }),
        );
      }),
    [],
  );
  console.log(products, 'product');
  return (
    <MainContainer>
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
      </StyledPost>
    </MainContainer>
  );
}

export default ProductCard;

const MainContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50%;
`;

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
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

const Information = styled.div``;
