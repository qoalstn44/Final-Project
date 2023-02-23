import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

function ProductSlide() {
  const navigate = useNavigate();
  return (
    <div>
      <ProductReview>
        <h1>제품리뷰</h1>
        <DDD></DDD>
        <DDD></DDD>
        <DDD></DDD>
        <DDD></DDD>
        <DDD></DDD>
      </ProductReview>
      <OnclickButton onClick={() => navigate('/Itempage')}>
        더보기
      </OnclickButton>
    </div>
  );
}

export default ProductSlide;

const ProductReview = styled.div`
  width: 30%;
  height: 150rem;
  display: flex;
  flex-direction: column;
`;

const DDD = styled.div`
  width: 500px;
  height: 500px;
  background-color: red;
  margin-bottom: 1rem;
  margin-left: 1rem;
`;
const OnclickButton = styled.button`
  width: 5rem;
  height: 1rem;
  border: 1px solid white;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
  margin-top: 0.5rem;
  background-color: white;
`;
