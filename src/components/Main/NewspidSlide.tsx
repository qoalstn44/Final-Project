import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { newsSearch } from '../News/Newsapi';
import NewsItem from '../News/NewsItem';

function NewspidSlide() {
  const stripHtmlTags = (html: any) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('반려동물');
  const newsSearchHandler = async (query: string, reset: boolean) => {
    const params = {
      query, // 검색을 원하는 질의어
      sort: 'accuracy', // 결과 문서 정렬 방식, accuracy(정확도순) 또는 recency(최신순), 기본 값 accuracy
      page: 1, // 결과 페이지 번호, 1~50 사이의 값, 기본 값 1
      size: 10, // 한 페이지에 보여질 문서 수, 1~50 사이의 값, 기본 값 10
    };

    try {
      const { data } = await newsSearch(params);
      const documents = data.documents.map(
        (doc: { contents: any; title: any }) => ({
          ...doc,
          contents: stripHtmlTags(doc.contents),
          title: stripHtmlTags(doc.title), // 태그 제거 처리 추가
        }),
      );

      if (reset) {
        setNews(documents);
      } else {
        setNews(news.concat(documents));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newsSearchHandler(query, true);
  }, [query]);

  const navigate = useNavigate();
  return (
    <Stdiv>
      <h1
        style={{
          marginLeft: '7rem',
          marginBottom: '0rem',
        }}
      >
        뉴스
      </h1>
      <NewsBContainer>
        {news.slice(0, 3).map((item: any, index) => (
          <NewsItem
            key={index}
            title={item.title}
            url={item.url}
            contents={item.contents}
            datetime={item.datetime}
          />
        ))}
      </NewsBContainer>
    </Stdiv>
  );
}

export default NewspidSlide;

function stripHtmlTags(contents: any) {
  throw new Error('Function not implemented.');
}

function setNews(documents: any) {
  throw new Error('Function not implemented.');
}

const NewsBContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4rem;
  width: 65rem;
  gap: 1rem;
`;

const Stdiv = styled.div`
  width: 90rem;
  margin-left: 6rem;
`;
