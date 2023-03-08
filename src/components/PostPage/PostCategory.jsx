import React, { useState } from 'react';
import styled from 'styled-components';

const PostCategory = () => {
  const categories = [
    { value: '카테고리', name: '카테고리' },
    { value: '커뮤니티', name: '커뮤니티' },
    { value: '제품리뷰', name: '제품리뷰' },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);

  const categorySelect = (event) => {
    return setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <AContainer>
        <ASelectCategory value={selectedCategory} onChange={categorySelect}>
          {categories.map((category) => (
            <option value={category.value}>{category.name}</option>
          ))}
        </ASelectCategory>
      </AContainer>
    </div>
  );
};

export default PostCategory;

const AContainer = styled.div`
  position: relative;
  right: 23.1rem;
  bottom: 1rem;
`;

const ASelectCategory = styled.select`
  color: #c6c6c3;
  border: 1px solid #c6c6c3;
  padding: 0.5rem 0.4rem;
  font-weight: bold;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
