import styled from 'styled-components';
import Communityapi from '../components/Community/Communityapi';
import Pagination from '../components/Detail/Pagination';
import { useState } from 'react';

const CommunityPage = () => {
  // 현재 페이지 상태
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState(0);

  return (
    <Container>
      <MainContainer>
        <CardContainer>
          <Communityapi />
        </CardContainer>
      </MainContainer>
      <Pagination total={page} page={pageNumber} setPage={setPageNumber} />
    </Container>
  );
};

export default CommunityPage;

const Container = styled.div`
  background-color: #fffffc;
`;

const MainContainer = styled.div``;

const CardContainer = styled.div``;
