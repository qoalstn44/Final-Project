import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Pagination(props: any) {
  const { total, page, setPage } = props;
  const [currPage, setCurrPage] = useState(page);

  // 페이지 목록의 첫 번째
  let firstNum = currPage - (currPage % 5) + 1;
  // 페이지 목록 끝
  let lastNum = currPage - (currPage % 5) + 5;

  // 전체 페이지
  const numPages = Math.ceil(total / 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setCurrPage(newPage);
  };

  return (
    <Nav>
      <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        &lt;
      </Button>

      <Button
        onClick={() => handlePageChange(firstNum)}
        aria-current={currPage === firstNum}
      >
        {firstNum}
      </Button>

      {/* 첫 페이지와 마지막 페이지 사이의 페이지 */}
      {Array.from({ length: 4 }, (_, i) => i + 1).map((_, i) => {
        if (i <= 2) {
          const pageNum = firstNum + 1 + i;
          return (
            <Button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              aria-current={currPage === pageNum}
            >
              {pageNum}
            </Button>
          );
        } else if (i >= 3) {
          return (
            <Button
              key={lastNum}
              onClick={() => handlePageChange(lastNum)}
              aria-current={currPage === lastNum}
            >
              {lastNum}
            </Button>
          );
        }
      })}

      <Button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === numPages}
      >
        &gt;
      </Button>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    margin: 0 4px;
  }
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: #f39340;
  color: white;
  font-size: 0.5rem;

  &:hover {
    background: #e65925;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: #f39340;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    font-weight: bold;
    cursor: pointer;
    transform: revert;
    text {
      font-family: 'Noto Sans KR', sans-serif;
    }
  }
`;

export default Pagination;
