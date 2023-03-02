import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { dbService } from '../../common/firebase';
import styled from 'styled-components';

function Communityapi() {
  const [userData, setUserData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest'); // 기본값은 latest

  useEffect(() => {
    const getData = async () => {
      let querySnapshot;
      const q = query(
        collection(dbService, 'posts'),
        sortBy === 'latest'
          ? orderBy('createAt', 'desc')
          : orderBy('likes', 'desc'),
      );
      console.log(q.toString()); // 쿼리 확인용 로그 추가
      if (searchTerm) {
        querySnapshot = await getDocs(
          query(
            collection(dbService, 'posts'),
            where('title', '==', searchTerm),
            sortBy === 'latest'
              ? orderBy('createAt', 'desc')
              : orderBy('likes', 'desc'),
          ),
        );
        console.log(
          query(
            collection(dbService, 'posts'),
            where('title', '==', searchTerm),
            sortBy === 'latest'
              ? orderBy('createAt', 'desc')
              : orderBy('likes', 'desc'),
          ).toString(),
        ); // 쿼리 확인용 로그 추가
      } else {
        querySnapshot = await getDocs(q);
      }
      let PushData: any = [];
      querySnapshot.forEach((doc) => {
        PushData.push(doc.data());
      });
      setUserData(PushData);
    };

    getData();
  }, [searchTerm, sortBy]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(e.currentTarget.search.value.trim());
  };

  const handleSortBy = (sortBy: 'latest' | 'popular') => {
    setSortBy(sortBy);
  };

  return (
    <div>
      <SearchInput onSubmit={handleSearch}>
        <Searchs type="text" name="search" placeholder="검색" />
        <SearchButton type="submit">
          <img src="img/search.png" />
        </SearchButton>
      </SearchInput>
      <SortByContainer>
        <SortByButton
          isActive={sortBy === 'latest'}
          onClick={() => handleSortBy('latest')}
        >
          최신순
        </SortByButton>
        <SortByButton
          isActive={sortBy === 'popular'}
          onClick={() => handleSortBy('popular')}
        >
          인기순
        </SortByButton>
      </SortByContainer>
      <ProductContainer>
        {userData.map((data: any, index: number) => (
          <CardBox key={index}>
            <img src={data.imageUrl} />
            <CardName>
              <CardTitle>{data.title}</CardTitle>
              <CardContent>{data.author.name}</CardContent>
            </CardName>
          </CardBox>
        ))}
      </ProductContainer>
    </div>
  );
}
export default Communityapi;

const SearchInput = styled.form`
  width: 50rem;
  height: 1.5rem;
  margin: 2rem auto;
  padding: 0.625rem;
  border-radius: 10rem;
  margin-top: 6rem;
  border: 0.0625rem solid #545451;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
`;

const Searchs = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1.5rem;
  padding-left: 1rem;
  background-color: transparent;
  margin: auto;
`;

const SearchButton = styled.button`
  font-size: 1rem;
  line-height: 1.5;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ProductContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;

const CardBox = styled.div`
  width: 15rem;
  height: 15rem;
  border: 0.0625rem solid #e5e5e5;
  border-radius: 2rem;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  margin-bottom: 2rem;
  text-align: center;
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
`;

const CardContent = styled.div`
  position: relative;
  top: 1.1rem;
`;

const CardName = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const SortByContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const SortByButton = styled.button<{ isActive: boolean }>`
  border: none;
  font-size: 0.5rem;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  background-color: ${(props) => (props.isActive ? '#e65925' : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : 'black')};
  border-radius: 10rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #e65925;
    color: white;
  }
`;
