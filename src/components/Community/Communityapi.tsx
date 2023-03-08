import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { dbService } from '../../common/firebase';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Communityapi = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest'); // 기본값은 latest
  const defaultImage = 'img/Icon_OR.png';

  useEffect(() => {
    const getData = async () => {
      let querySnapshot;
      const q = query(
        collection(dbService, 'communities'),
        sortBy === 'latest'
          ? orderBy('createAt', 'desc')
          : orderBy('likes', 'desc'),
      );
      console.log(q.toString()); // 쿼리 확인용 로그 추가
      if (searchTerm) {
        querySnapshot = await getDocs(
          query(
            collection(dbService, 'communities'),
            where('title', '==', searchTerm),
            sortBy === 'latest'
              ? orderBy('createAt', 'desc')
              : orderBy('likes', 'desc'),
          ),
        );
        console.log(
          query(
            collection(dbService, 'communities'),
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
    <Container>
      <SearchForm onSubmit={handleSearch}>
        <Searchs type="text" name="search" placeholder="검색" />
        <SearchButton type="submit">
          <SearchButtonImg src="/img/search.png" />
        </SearchButton>
      </SearchForm>
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
        {userData.map((data: any, index: number) => {
          return (
            <CardBox
              key={index}
              onClick={() => {
                console.log('userData', data);
                navigate(`/DetailPage/${data.author.id}`, {
                  state: { data },
                });
              }}
            >
              <CardImg src={data.imgUrl ? data.imgUrl : defaultImage} />
              {/* imgUrl 속성을 사용하여 이미지 불러오기 */}
              <CardName>
                <CardTitle>{data.title}</CardTitle>
                <CardContent>{data.author.name}</CardContent>
              </CardName>
              <StyledHashTagDiv>
                <StyledHashTag>#데일리</StyledHashTag>
                <StyledHashTag>#내 새끼 자랑</StyledHashTag>
              </StyledHashTagDiv>
            </CardBox>
          );
        })}
      </ProductContainer>
    </Container>
  );
};
export default Communityapi;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  width: 30rem;
  height: 1rem;
  margin-top: 7rem;
  margin-bottom: 3rem;
  padding: 0.8rem 0.4rem;
  border-radius: 10rem;
  border: 1px solid #c6c6c3;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
`;

const Searchs = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1.2rem;
  color: #545451;
  padding-left: 1rem;
  background-color: transparent;

  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const SearchButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const SearchButtonImg = styled.img`
  width: 1.2rem;
  position: relative;
  bottom: 0.1rem;
  padding-right: 0.4rem;
`;

const ProductContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;

const CardBox = styled.div<{ onClick: any }>`
  width: 15rem;
  height: 15rem;
  border: 0.0625rem solid #e5e5e5;
  border-radius: 2rem;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  margin-bottom: 1rem;
  text-align: center;
  cursor: pointer;
  img {
    border-radius: 1.8rem 1.8rem 0 0;
    width: 15rem;
    height: 11rem;
  }
`;

const CardTitle = styled.h5`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  bottom: 1rem;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 14ch;
`;

const CardContent = styled.p`
  font-size: 0.4rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  position: relative;
  top: 0.5rem;
  /* top: 0.3rem; */
`;

const CardImg = styled.img`
  width: 1rem;
`;

const CardName = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const SortByContainer = styled.div`
  position: relative;
  right: 19.5rem;
  top: 1rem;
`;

const imgHeart = styled.img`
  width: 1rem;
`;

const SortByButton = styled.button<{ isActive: boolean }>`
  border: ${(props) => (props.isActive ? 'none' : '1px solid #8D8D8A')};
  font-size: 0.5rem;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  background-color: ${(props) => (props.isActive ? '#e65925' : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : 'black')};
  border-radius: 10rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #e65925;
    color: white;
    border: none;
  }
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const StyledHashTagDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 2.5rem;
`;

const StyledHashTag = styled.h5`
  font-family: 'Noto Sans KR', sans-serif;
  display: inline-block;
  background-color: #f39340;
  color: #fffffc;
  border-radius: 3px;
  padding: 0.1rem;
  font-size: 0.1rem;
  margin-left: 1rem;
`;
