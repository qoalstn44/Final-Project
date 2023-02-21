import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const CommunityPage = () => {
  const categories = [
    { value: '강아지', label: '강아지' },
    { value: '고양이', label: '고양이' },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);

  return (
    <MainContainer>
      <SearchInput>
        <input type="text" placeholder="검색" />
        <SearchIcon />
      </SearchInput>
      <AContainer>
        <ASelectCategory
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </ASelectCategory>
      </AContainer>
      <BContainer>
        <LatestButton>최신순</LatestButton>
        <PopularButton>인기순</PopularButton>
      </BContainer>
      <CardContainer>
        <Card>
          <CardImage src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg" />
          <CardContent>
            <CardTitle>제목이 들어갈거야</CardTitle>
            <CardAuthor>작성자</CardAuthor>
          </CardContent>
          <CardTag>#댕댕이</CardTag>
          <LikeButton>
            <img src="img/Blacklike.png" />
          </LikeButton>
        </Card>
        <Card>
          <CardImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTtDdt1taLoi8wC4jAv1GzVZiwDUBnZaK65Q&usqp=CAU" />
          <CardContent>
            <CardTitle>제목이 들어갈거야</CardTitle>
            <CardAuthor>작성자</CardAuthor>
          </CardContent>
          <CardTag>#댕댕이</CardTag>
          <LikeButton>
            <img src="img/Blacklike.png" />
          </LikeButton>
        </Card>
        <Card>
          <CardImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmyYcaoHkLhqeyrwBIvL62dZq-IYcMmYmYUQ&usqp=CAU" />
          <CardContent>
            <CardTitle>제목이 들어갈거야</CardTitle>
            <CardAuthor>작성자</CardAuthor>
          </CardContent>
          <CardTag>#댕댕이</CardTag>
          <LikeButton>
            <img src="img/Redlike.png" />
          </LikeButton>
        </Card>
        <Card>
          <CardImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFSBkfNyXpG7mMy6VbgsZEsIWVK6wAdeX6w&usqp=CAU" />
          <CardContent>
            <CardTitle>제목이 들어갈거야</CardTitle>
            <CardAuthor>작성자</CardAuthor>
          </CardContent>
          <CardTag>#댕댕이</CardTag>
          <LikeButton>
            <img src="img/Blacklike.png" />
          </LikeButton>
        </Card>
      </CardContainer>
    </MainContainer>
  );
};
export default CommunityPage;
const MainContainer = styled.div`
  margin-left: 15rem;
  margin-right: 15rem;
`;
const AContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const BContainer = styled.div`
  flex-direction: row-reverse;
`;

const SearchInput = styled.div`
  width: 70rem;
  height: 3rem;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red;
  padding: 0.625rem;
  border-radius: 10rem;
  margin-top: 10rem;
  border: 0.0625rem solid #545451;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  input[type='text'] {
    width: 90%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 1.5rem;
    padding: 0;
  }
`;

const SearchIcon = styled.span`
  font-size: 5rem;
  margin-right: 5rem;
`;

const PopularButton = styled.button`
  width: 8rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  background-color: #fffffc;
  margin-right: 0.625rem;
  color: #545451;
  border: none;
  font-size: 1.5rem;
  display: inline-block;
  border: 0.0625rem solid #545451;
`;

const LatestButton = styled.button`
  width: 8rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  background-color: #e65925;
  color: #fffffc;
  border: none;
  font-size: 1.5rem;
  margin-right: 0.625rem;
  display: inline-block;
  border: 0.0625rem solid #545451;
`;

const CardContainer = styled.div`
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  margin-top: 3.125rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;

const Card = styled.div`
  width: 30rem;
  height: 30rem;
  border: 0.0625rem solid #e5e5e5;
  border-radius: 2rem;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  margin-bottom: 2rem;
`;

const CardImage = styled.img`
  width: 100%;
  height: 75%;
  object-fit: cover;
`;

const CardContent = styled.div`
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  margin-left: -1rem;
`;

const CardTitle = styled.h2`
  width: 70%;
  font-size: 1.5rem;
  margin-top: 1.5rem;
`;

const CardAuthor = styled.span`
  font-size: 1rem;
  margin-left: 0.625rem;
  display: flex;
  justify-content: flex-end;
`;

const CardTag = styled.span`
  width: 20%;
  font-size: 1rem;
  background-color: #f39340;
  padding: 0.3125rem;
  border-radius: 2rem;
  margin-right: 0.625rem;
  margin-left: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -1rem;
`;

const LikeButton = styled.button`
  width: 4rem;
  height: 4rem;
  background-color: #fffffc;
  border-radius: 4rem;
  border: none;
  font-size: 1.25rem;
  color: red;
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 0.625rem;
  margin-top: 0.625rem;
  &:hover {
    transform: scale(1.2);
  }
`;

const ASelectCategory = styled.select`
  width: 9rem;
  height: 4rem;
  border-radius: 10rem;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  margin-right: 0.625rem;
  color: #e65925;
  border: 0.0625rem solid #545451;
  padding: 1rem;
`;
