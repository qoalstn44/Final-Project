import React, { useEffect, useState } from 'react';
import { newsSearch } from '../components/News/Newsapi';
import NewsItem from '../components/News/NewsItem';
import styled from 'styled-components';
import Pagination from '../components/Detail/Pagination';

//기초데이터 state , 검색어 state, 쿼리 state 를 생성
const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('반려동물');

  //현재 페이지 상태
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState(0);

  // HTML 이상한 태그들 제거
  const stripHtmlTags = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  //query state 가 업데이트 하면 api 를 호출
  useEffect(() => {
    if (query.length > 0) {
      newsSearchHandler(query, true);
    }
  }, [query]);

  // 엔터를 눌렀을 때 호출 되는 함수
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      setQuery(text);
    }
  };

  // text 검색어가 바뀔 때 호출되는 함수.
  const onTextUpdate = (e) => {
    setText(e.target.value);
  };

  //newsSearchHandler 에서, api 를 호출 한후, 호출 한 데이터와, 현재 news state 를 병합
  const newsSearchHandler = async (query, reset) => {
    const params = {
      query, // 검색을 원하는 질의어
      sort: 'accuracy', // 결과 문서 정렬 방식, accuracy(정확도순) 또는 recency(최신순), 기본 값 accuracy
      page: 1, // 결과 페이지 번호, 1~50 사이의 값, 기본 값 1
      size: 10, // 한 페이지에 보여질 문서 수, 1~50 사이의 값, 기본 값 10
    };

    try {
      const { data } = await newsSearch(params);
      const documents = data.documents.map((doc) => ({
        ...doc,
        contents: stripHtmlTags(doc.contents),
        title: stripHtmlTags(doc.title), // 태그 제거 처리 추가
      }));

      if (reset) {
        setNews(documents);
      } else {
        setNews(news.concat(documents));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NewsContainer>
      <NewsAContainer>
        <NewsInput
          type="search"
          placeholder="검색"
          name="query"
          onKeyDown={onEnter} // enter
          onChange={onTextUpdate} // change
          value={text}
        />
        <SearchButton type="submit">
          <SearchButtonImg src="img/search.png" />
        </SearchButton>
      </NewsAContainer>
      <NewsBContainer>
        {news.map((item, index) => (
          <NewsItem
            key={index}
            title={item.title}
            url={item.url}
            contents={item.contents}
            datetime={item.datetime}
          />
        ))}
      </NewsBContainer>
      <Pagination total={page} page={pageNumber} setPage={setPageNumber} />
    </NewsContainer>
  );
};

export default NewsPage;
const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fffffc;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const NewsAContainer = styled.div`
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
const NewsBContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4rem;
  width: 40rem;
  gap: 1rem;
`;

const NewsInput = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1.2rem;
  color: #545451;
  padding-left: 0.7rem;
  position: relative;
  top: 0.08rem;
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
  position: relative;
  left: 0.3rem;
`;
