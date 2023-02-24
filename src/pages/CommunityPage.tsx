import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Communityapi from '../components/Community/Communityapi';


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
        <BContainer> 
          <LatestButton>최신순</LatestButton>
          <PopularButton>인기순</PopularButton>
          </BContainer>
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
      <CardContainer>
        <Communityapi/>
      </CardContainer>
    </MainContainer>
  );
};
export default CommunityPage;
const MainContainer = styled.div`
  margin-left: 15rem;
  margin-right:15rem;
  `;
  const AContainer = styled.div`
  display: flex; 
  justify-content: flex-end;
  `;
  const BContainer = styled.div`
  display: flex; 
  position: relative;
  right: 48rem;
  `;
  
  const SearchInput = styled.div`
    width: 80%;
    height: 2rem;
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.625rem;
    border-radius: 10rem;
    margin-top: 5rem;
    border: 0.0625rem solid #545451;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  
    input[type="text"] {
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
    width: 5rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10rem;
    background-color: #FFFFFC;
    margin-right: 0.625rem;
    color: #545451;
    border: none;
    font-size: 1rem;
    display: inline-block;
    border: 0.0625rem solid #545451;
  `;
  
  const LatestButton = styled.button`
    width: 5rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10rem;
    background-color: #E65925;
    color: #FFFFFC;
    border: none;
    font-size: 1rem;
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
    grid-template-columns: repeat(3,1fr);
    grid-gap: 1rem;
    `;
  
  const ASelectCategory = styled.select`
  width: 5rem;
  height: 2rem;
  border-radius: 10rem;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  margin-right: 0.625rem;
  color: #e65925;
  border: 0.0625rem solid #545451;
  position: relative;
  right: 2.5rem
`;